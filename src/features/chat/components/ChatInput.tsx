"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t p-4 bg-gray-900">
      <div className="max-w-3xl mx-auto flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2 disabled:opacity-50"
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
        />

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
