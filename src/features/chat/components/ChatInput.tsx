"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        className="flex-1 rounded-md border px-3 py-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />

      <button
        onClick={handleSend}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Send
      </button>
    </div>
  );
}
