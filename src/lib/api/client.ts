import { APIError } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  timeout?: number;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    signal,
    headers = {},
    timeout = 10000,
  } = options;

  const controller = new AbortController();

  // Merge external signal (if provided)
  const combinedSignal = signal || controller.signal;

  // Timeout logic
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    let data: unknown;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new APIError(
        res.status,
        (data as any)?.message || "Something went wrong",
      );
    }

    return data as T;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new APIError(408, "Request timeout");
    }

    throw error;
  }
}
