"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat.types";
import { MessageItem } from "./MessageItem";

interface Props {
  messages: ChatMessage[];
}

export function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="max-w-3xl mx-auto w-full p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-20">
            Start a conversation with your Copilot
          </div>
        )}

        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
