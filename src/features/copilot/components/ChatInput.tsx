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
    <div className="border-t border-gray-800 bg-gray-900 py-3 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <textarea
            className="flex-1 bg-transparent px-3 py-2 max-h-32 overflow-y-auto text-gray-100 placeholder-gray-400 focus:outline-none resize-none disabled:opacity-50 custom-scrollbar"
            value={input}
            disabled={isLoading}
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);

              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            title="Send message"
            className="self-end px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
