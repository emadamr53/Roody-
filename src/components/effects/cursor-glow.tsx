"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[200] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:block"
      style={{
        left: x,
        top: y,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)",
        filter: "blur(8px)",
      }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
