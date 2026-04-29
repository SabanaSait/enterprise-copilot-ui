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
        className={`max-w-[75%] px-4 py-3 rounded-xl leading-relaxed text-sm ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.content ||
          (message.role === "assistant" && message.status === "typing" && (
            <span className="italic text-gray-500 animate-pulse">● ● ●</span>
          ))}
      </div>
    </div>
  );
}
