"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { inviteContent } from "@/lib/invite-content";

interface AcceptCardProps {
  onAccept: () => void;
}

export function AcceptCard({ onAccept }: AcceptCardProps) {
  const { accept } = inviteContent;
  const [value, setValue] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const [focused, setFocused] = useState(false);
  const [sending, setSending] = useState(false);

  const trimmed = value.trim().toLowerCase();
  const isAccept = trimmed === accept.word;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;

    setSending(true);
    try {
      await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply: trimmed,
          name: inviteContent.herName,
          accepted: isAccept,
        }),
      });
    } catch {
      // Still continue even if save fails
    }
    setSending(false);

    if (isAccept) {
      onAccept();
      return;
    }

    setShake(true);
    setHintIndex((i) => (i + 1) % accept.hints.length);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-md"
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-8 shadow-xl shadow-[#89cff0]/20 backdrop-blur-xl md:p-10",
          shake && "animate-shake",
        )}
        style={{
          boxShadow:
            "0 20px 60px rgba(137, 207, 240, 0.25), 0 0 0 1px rgba(255,255,255,0.8) inset",
        }}
      >
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 text-5xl opacity-30"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🌸
        </motion.div>

        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#89cff0]">
          {accept.label}
        </p>

        <p className="mb-2 text-center text-lg text-[#4a6b7c]">
          {accept.instruction}
        </p>
        <p
          className="mb-8 text-center text-3xl font-semibold text-[#6bb3d9] md:text-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {accept.word}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={accept.placeholder}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className={cn(
                "w-full rounded-2xl border-2 bg-white/90 px-5 py-4 text-center text-lg text-[#2c4a5e] outline-none transition-all duration-300 placeholder:text-[#89cff0]/60",
                focused || value
                  ? "border-[#89cff0] shadow-[0_0_0_4px_rgba(137,207,240,0.2)]"
                  : "border-[#d4eef9]",
                isAccept && "border-[#e8a4c4] text-[#c45c8a]",
              )}
            />
            <AnimatePresence>
              {isAccept && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-emerald-500"
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: sending ? 1 : 1.02, y: sending ? 0 : -2 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-white transition-all duration-300",
              isAccept
                ? "bg-gradient-to-r from-[#89cff0] to-[#6bb3d9] shadow-lg shadow-[#89cff0]/40"
                : "bg-gradient-to-r from-[#b8e0f5] to-[#89cff0] shadow-md",
            )}
          >
            <Send className="h-4 w-4" />
            {sending
              ? "Sending..."
              : isAccept
                ? accept.buttonReady
                : accept.buttonDefault}
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {!isAccept && value.length > 0 && (
            <motion.p
              key={hintIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-sm text-[#6bb3d9]"
            >
              {accept.hints[hintIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
