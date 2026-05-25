"use client";

import { CopilotContainer } from "@/features/copilot/components/CopilotContainer";
import { useEffect, useState } from "react";

// Context types for incoming messages
type CopilotContext = {
  page?: string;
  userId?: string;
  filters?: Record<string, any>;
  selection?: Record<string, any>;
  metadata?: Record<string, any>;
};

export default function EmbedPage() {
  const [context, setContext] = useState<CopilotContext | null>(null);
  const ALLOWED_ORIGIN =
    process.env.NEXT_PUBLIC_COPILOT_HOST_ORIGIN || "http://localhost:4200";

  // Listen for messages from Enterprise Admin (host app)
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== ALLOWED_ORIGIN) return;

      if (
        event.data &&
        typeof event.data === "object" &&
        event.data?.type === "COPILOT_CONTEXT"
      ) {
        setContext(event.data.payload ?? {});
      }
    };

    window.addEventListener("message", handler);

    // Notify parent that Copilot is ready
    window.parent.postMessage({ type: "COPILOT_READY" }, ALLOWED_ORIGIN);

    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    const sendResize = () => {
      window.parent.postMessage(
        {
          type: "COPILOT_RESIZE",
          height: document.documentElement.scrollHeight,
        },
        ALLOWED_ORIGIN,
      );
    };

    sendResize();
    window.addEventListener("resize", sendResize);

    return () => window.removeEventListener("resize", sendResize);
  }, []);

  return <CopilotContainer context={context} />;
}
