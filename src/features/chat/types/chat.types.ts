export type MessageRole = "user" | "assistant" | "system" | "tool";

export type MessageStatus = "pending" | "sent" | "received" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  status?: MessageStatus;
  toolName?: string;
  metadata?: Record<string, unknown>;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
}

export type ChatAction =
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_MESSAGE"; payload: Partial<ChatMessage> & { id: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET_CHAT" };
