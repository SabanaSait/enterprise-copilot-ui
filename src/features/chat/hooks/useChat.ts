"use client";
import { useReducer } from "react";
import type { ChatMessage, ChatState, ChatAction } from "../types/chat.types";

const initialState: ChatState = {
  messages: [],
  isLoading: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? { ...msg, ...action.payload } : msg,
        ),
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "RESET_CHAT":
      return initialState;

    default:
      return state;
  }
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
    status: "sent",
  };
}

function mockAIResponse(userInput: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI Response to: "${userInput}"`);
    }, 1000);
  });
}

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1. Add user message
    const userMessage = createMessage("user", content);
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    // 2. Set loading
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // 3. Get AI response
      const response = await mockAIResponse(content);

      // 4. Add assistant message
      const aiMessage = createMessage("assistant", response);
      dispatch({ type: "ADD_MESSAGE", payload: aiMessage });
    } catch (error) {
      console.error(error);

      const errorMessage = createMessage(
        "assistant",
        "Something went wrong. Please try again.",
      );

      dispatch({ type: "ADD_MESSAGE", payload: errorMessage });
    } finally {
      // 5. Stop loading
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetChat = () => {
    dispatch({ type: "RESET_CHAT" });
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage,
    resetChat,
  };
}
