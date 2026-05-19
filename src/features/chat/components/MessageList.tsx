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
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl mx-auto w-full px-4 py-6 flex flex-col">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-24">
            Start a conversation with your Copilot "Sana"
          </div>
        )}

        {messages.map((msg, index) => {
          const prevMessage = messages[index - 1];

          const isGrouped = prevMessage && prevMessage.role === msg.role;

          return (
            <MessageItem
              key={msg.id}
              message={msg}
              isGrouped={isGrouped}
              isAvatarEnabled={true}
            />
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
