"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const FLOWERS = ["🌸", "🌷", "💐", "🌺", "✿", "❀"];

export function FloatingFlowers() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: FLOWERS[i % FLOWERS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 5,
        rotate: Math.random() * 360,
      })),
    [],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden opacity-40"
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [p.rotate, p.rotate + 15, p.rotate],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
}
