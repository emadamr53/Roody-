"use client";

import { useEffect, useRef } from "react";
import { KEYBOARD_SECRETS } from "@/lib/easter-eggs";

export function useKeyboardEasterEgg() {
  const buffer = useRef("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer.current = (buffer.current + e.key.toUpperCase()).slice(-8);
      for (const [code, message] of Object.entries(KEYBOARD_SECRETS)) {
        if (buffer.current.endsWith(code)) {
          console.log(`%c${message}`, "color: #A855F7; font-size: 13px;");
          window.dispatchEvent(
            new CustomEvent("easter-egg", { detail: { code, message } }),
          );
          buffer.current = "";
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
