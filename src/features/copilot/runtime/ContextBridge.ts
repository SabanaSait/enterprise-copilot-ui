export function listenToContext(callback: (ctx: any) => void) {
  const handler = (event: any) => {
    callback(event.detail);
  };

  window.addEventListener("copilot:context", handler);

  return () => {
    window.removeEventListener("copilot:context", handler);
  };
}
