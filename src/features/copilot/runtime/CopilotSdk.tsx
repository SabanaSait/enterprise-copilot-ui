"use client";

import { createRoot } from "react-dom/client";
import CopilotRoot from "./CopilotRoot";

let root: any = null;

console.log("copilot bundle loaded");

export function mount(el: HTMLElement, props?: any) {
  if (!root) {
    root = createRoot(el);
  }

  root.render(<CopilotRoot {...props} />);
}

export function update(props: any) {
  if (root) {
    root.render(<CopilotRoot {...props} />);
  }
}

export function unmount() {
  if (root) {
    root.unmount();
    root = null;
  }
}

// 👇 expose globally
if (typeof window !== "undefined") {
  (window as any).Copilot = {
    mount,
    update,
    unmount,
  };
}
