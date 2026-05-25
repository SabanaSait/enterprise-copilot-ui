import { APIError } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type ChatRequest = {
  message: string;
  context?: any;
};

export type ChatResponse = {
  reply: string;
};

export async function streamMessageFromAPI(
  data: ChatRequest,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
) {
  const res = await fetch(`${BASE_URL}/chat/stream`, {
    method: "POST",
    body: JSON.stringify({
      message: data.message,
      ...(data.context ? { context: data.context } : {}),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!res.ok) {
    throw new APIError(res.status, "Streaming request failed");
  }

  if (!res.body) {
    throw new APIError(500, "No stream available");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new APIError(499, "Stream aborted");
    }
    throw error;
  }
}
