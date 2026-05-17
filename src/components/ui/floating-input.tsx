"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingInputProps {
  id: string;
  label: string;
  hint?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
}

export function FloatingInput({
  id,
  label,
  hint,
  type = "text",
  value,
  onChange,
  multiline = false,
  required,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedClass = cn(
    "peer w-full rounded-xl border bg-white/[0.03] px-4 pt-6 pb-2 text-white/90 outline-none transition-all duration-300",
    "border-white/10 focus:border-violet-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  );

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{
          y: active ? -8 : 12,
          scale: active ? 0.75 : 1,
          x: active ? -4 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-none absolute left-4 z-10 origin-left font-medium",
          active ? "text-violet-400" : "text-white/40",
        )}
      >
        {label}
        {required && <span className="text-fuchsia-400"> *</span>}
      </motion.label>

      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(sharedClass, "resize-none min-h-[120px]")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
        />
      )}

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            className="absolute bottom-0 left-4 right-4 h-px origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-transparent"
          />
        )}
      </AnimatePresence>

      {hint && (
        <p className="mt-2 text-xs text-white/30">{hint}</p>
      )}
    </div>
  );
}
