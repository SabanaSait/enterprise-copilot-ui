"use client";
import { useReducer } from "react";
import type {
  ChatMessage,
  ChatState,
  ChatAction,
  MessageStatus,
} from "../types/chat.types";

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

    const userMessage = createMessage("user", content);
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const aiMessage = createMessage("assistant", "", "typing");

      dispatch({ type: "ADD_MESSAGE", payload: aiMessage });

      const fullText = `AI Response to: "${content}"`;

      let currentText = "";

      for (let i = 0; i < fullText.length; i++) {
        currentText += fullText[i];

        await new Promise((resolve) => setTimeout(resolve, 20));

        dispatch({
          type: "UPDATE_MESSAGE",
          payload: {
            id: aiMessage.id,
            content: currentText,
          },
        });
      }
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
