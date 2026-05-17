"use client";

import { useEffect } from "react";
import { CONSOLE_JOKES } from "@/lib/easter-eggs";

export function useConsoleEasterEggs() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      for (let i = 0; i < CONSOLE_JOKES.length; i += 2) {
        const msg = CONSOLE_JOKES[i];
        const style = CONSOLE_JOKES[i + 1];
        if (typeof msg === "string" && typeof style === "string") {
          console.log(msg, style);
        }
      }
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, []);
}
