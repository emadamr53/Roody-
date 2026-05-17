"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function MagneticButton({
  children,
  className,
  glow = true,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>();

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-10 py-4 text-base font-semibold text-white shadow-xl transition-shadow duration-300",
        glow && "shadow-violet-500/30 hover:shadow-violet-500/50",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={false}
        whileHover={{
          boxShadow: "0 0 60px rgba(168, 85, 247, 0.5)",
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <RippleLayer />
    </motion.button>
  );
}

function RippleLayer() {
  return (
    <motion.span
      className="pointer-events-none absolute inset-0 rounded-full border border-white/20"
      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
