"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { TERMINAL_LINES } from "@/lib/easter-eggs";
import { Terminal } from "lucide-react";

export function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 400);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section id="terminal" className="relative px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="mb-4 flex items-center justify-center gap-2 text-white/40">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-xs">Hidden in plain sight</span>
          </motion.div>
          <h2
            className="text-2xl font-bold md:text-3xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Developer Terminal
          </h2>
        </motion.div>

        <GlassCard className="!p-0 overflow-hidden font-mono text-sm">
          <motion.div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs text-white/30">
              meeting-request — zsh
            </span>
          </motion.div>

          <motion.div className="space-y-2 p-6">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line.type === "command"
                    ? "text-white/90"
                    : line.type === "success"
                      ? "text-emerald-400/90"
                      : line.type === "warn"
                        ? "text-amber-400/90"
                        : "text-violet-300/80"
                }
              >
                {line.text}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block h-4 w-2 bg-violet-400/80"
            />
          </motion.div>
        </GlassCard>

        <motion.p
          className="mt-6 text-center text-xs text-white/25"
          whileHover={{ color: "rgba(168,85,247,0.6)" }}
        >
          Hover the terminal window for good luck ✨
        </motion.p>
      </motion.div>
    </section>
  );
}
