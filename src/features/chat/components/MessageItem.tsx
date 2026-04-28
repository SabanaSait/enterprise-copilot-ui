"use client";

import type { ChatMessage } from "../types/chat.types";

interface Props {
  message: ChatMessage;
}

export function MessageItem({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
