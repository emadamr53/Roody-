"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function MouseLight() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.07), transparent 50%)`,
      }}
    />
  );
}
