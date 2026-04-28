"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat.types";
import { MessageItem } from "./MessageItem";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 && (
        <div className="text-gray-400 text-center mt-20">
          Start a conversation with your Copilot
        </div>
      )}
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div className="text-sm text-gray-500 animate-pulse">
          AI is thinking...
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
