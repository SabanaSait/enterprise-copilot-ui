"use client";
import { useReducer, useRef } from "react";
import type {
  ChatMessage,
  ChatState,
  ChatAction,
  MessageStatus,
} from "../types/chat.types";
import { streamMessageFromAPI } from "@/lib/api/chat.api";
import { APIError } from "@/lib/api/errors";

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
  status: MessageStatus = "sent",
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
    status,
  };
}

export function useChat(context?: any) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // For cancelling ongoing stream
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Cancel previous request if any
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage = createMessage("user", content);
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    const aiMessage = createMessage("assistant", "", "typing");
    dispatch({ type: "ADD_MESSAGE", payload: aiMessage });

    let accumulatedContent = "";

    try {
      await streamMessageFromAPI(
        {
          message: content,
          context,
        },
        (chunk) => {
          accumulatedContent += chunk;

          dispatch({
            type: "UPDATE_MESSAGE",
            payload: {
              id: aiMessage.id,
              content: accumulatedContent,
              status: "typing",
            },
          });
        },
        controller.signal,
      );

      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          id: aiMessage.id,
          status: "sent",
        },
      });
    } catch (error: any) {
      console.error(error);

      if (error.name === "AbortError") return;

      let errorText = "Something went wrong. Please try again.";

      if (error instanceof APIError) {
        errorText = error.message;
      }

      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          id: aiMessage.id,
          content: errorText,
          status: "error",
        },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetChat = () => {
    // Cancel any ongoing stream
    abortControllerRef.current?.abort();
    dispatch({ type: "RESET_CHAT" });
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage,
    resetChat,
  };
}
