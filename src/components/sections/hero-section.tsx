"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INTRO_SEQUENCE } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ChevronDown } from "lucide-react";

const stagger = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroSection({ onBegin }: { onBegin: () => void }) {
  const [step, setStep] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (step < INTRO_SEQUENCE.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 1800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowTitle(true), 600);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-20 pb-16"
    >
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50 backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        System v2.0 — Over-Engineered Edition
      </motion.div>

      <motion.div
        className="mb-12 h-8 text-center font-mono text-sm text-violet-300/80 md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence mode="wait">
          {step > 0 && step <= INTRO_SEQUENCE.length && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {INTRO_SEQUENCE[step - 1]}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showTitle && (
          <motion.div
            className="max-w-4xl text-center"
            initial="hidden"
            animate="show"
          >
            <motion.h1
              custom={0}
              variants={stagger}
              className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Meeting Request
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text">
                System
              </span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={stagger}
              className="mx-auto mt-6 max-w-lg text-lg text-white/50 md:text-xl"
            >
              An unnecessarily over-engineered invitation.
            </motion.p>

            <motion.div
              custom={2}
              variants={stagger}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <MagneticButton onClick={onBegin}>
                Begin Review Process
              </MagneticButton>
              <p className="text-xs text-white/30">
                No designers were harmed in the making of this UI*
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onBegin}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: showTitle ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
