"use client";

import type { ChatMessage } from "../types/chat.types";
import { MessageItem } from "./MessageItem";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}

      {isLoading && <div className="text-sm text-gray-500">Thinking...</div>}
    </div>
  );
}
