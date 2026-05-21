"use client";

import { useEffect, useState } from "react";
import { CopilotContainer } from "../components/CopilotContainer";
import { listenToContext } from "./ContextBridge";

export default function CopilotRoot(props: any) {
  const [context, setContext] = useState(props?.context || null);

  useEffect(() => {
    const unsubscribe = listenToContext(setContext);
    return unsubscribe;
  }, []);

  return <CopilotContainer context={context} />;
}
