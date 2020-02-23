import { useEffect } from "react";

export default function useKeyboard() {
  const emitter = new EventTarget();

  useEffect(() => {
    const onKeyUp = event => {
      emitter.dispatchEvent(new CustomEvent("key", {detail: event.key}));
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [emitter, document]);

  return emitter;
}
