"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface DodgeButtonProps {
  className?: string;
  onDodge?: () => void;
}

export function DodgeButton({ className, onDodge }: DodgeButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodge = useCallback(
    (clientX: number, clientY: number) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = clientX - centerX;
      const distY = clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < 140) {
        const angle = Math.atan2(distY, distX);
        const flee = 120 + Math.random() * 60;
        const newX = x.get() - Math.cos(angle) * flee;
        const newY = y.get() - Math.sin(angle) * flee;

        const maxOffset = 180;
        x.set(Math.max(-maxOffset, Math.min(maxOffset, newX)));
        y.set(Math.max(-maxOffset, Math.min(maxOffset, newY)));

        setDodgeCount((c) => c + 1);
        onDodge?.();
      }
    },
    [x, y, onDodge],
  );

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => dodge(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) dodge(touch.clientX, touch.clientY);
      }}
      onClick={(e) => {
        e.preventDefault();
        dodge(e.clientX + 200, e.clientY);
      }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-medium text-white/70 backdrop-blur-md transition-colors hover:border-white/25",
        className,
      )}
    >
      <motion.span
        animate={{ rotate: dodgeCount % 2 === 0 ? 0 : [-2, 2, 0] }}
        transition={{ duration: 0.2 }}
      >
        I am busy
      </motion.span>
      {dodgeCount > 3 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/40"
        >
          Nice try 😌
        </motion.span>
      )}
    </motion.button>
  );
}
