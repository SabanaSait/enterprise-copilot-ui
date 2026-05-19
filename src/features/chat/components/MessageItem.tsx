"use client";

import { Avatar } from "./Avatar";
import type { ChatMessage } from "../types/chat.types";
import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  message: ChatMessage;
  isGrouped: boolean;
  isAvatarEnabled: boolean;
}

export function MessageItem({ message, isGrouped, isAvatarEnabled }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } ${isGrouped ? "mb-2" : "mb-5"}`}
    >
      {!isGrouped && isAvatarEnabled && (
        <div className="mt-1">
          <Avatar
            isUser={isUser}
            src={!isUser ? "/assistant-avatar.png" : undefined}
          />
        </div>
      )}

      <div className="flex flex-col max-w-[75%] sm:max-w-[70%]">
        {/* {!isGrouped && isAvatarEnabled && (
          <div
            className={`text-xs text-gray-400 mb-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {isUser ? "You" : "Sana"}
          </div>
        )} */}

        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar
        ${
          isUser
            ? "bg-blue-500 text-white self-end rounded-br-md border border-blue-300/40"
            : "bg-gray-800 text-gray-100 border rounded-bl-md border-gray-700 self-start"
        }`}
        >
          {message.status === "typing" ? (
            <span className="italic text-gray-500 animate-pulse">● ● ●</span>
          ) : (
            message.content && <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}
