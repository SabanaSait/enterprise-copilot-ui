"use client";

import { useState } from "react";
import Image from "next/image";
import { useChat } from "../hooks/useChat";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";

export function ChatContainer({
  showHeader = true,
  onClose,
}: {
  showHeader?: boolean;
  onClose?: () => void;
}) {
  const { messages, isLoading, sendMessage } = useChat();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsCollapsed(false)}
        className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full shadow-lg border border-gray-600 ease-in-out ${isCollapsed ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <Image
          src="/assistant-avatar.png"
          alt="Copilot"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-sm">Copilot</span>
      </button>

      <div
        className={`flex flex-col h-full border-l border-gray-700 bg-gray-900 transition-all duration-300 ease-in-out ${isCollapsed ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {showHeader && (
              <>
                <Image
                  src="/assistant-avatar.png"
                  alt="Copilot"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="font-semibold">Enterprise Copilot</div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="text-gray-400 hover:text-white text-sm"
              title="Minimize"
            >
              ➖
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white text-sm"
                title="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <MessageList messages={messages} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </>
  );
}
