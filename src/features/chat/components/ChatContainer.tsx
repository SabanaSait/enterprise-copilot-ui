"use client";

import { useChat } from "../hooks/useChat";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";

export function ChatContainer() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex h-screen flex-col">
      <div className="p-4 text-xl font-semibold border-b">
        Enterprise Copilot
      </div>
      <MessageList messages={messages} isLoading={isLoading}></MessageList>
      <ChatInput onSend={sendMessage} isLoading={isLoading}></ChatInput>
    </div>
  );
}
