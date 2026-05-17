"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DodgeButton } from "@/components/sections/dodge-button";
import { CheckCircle2, Heart } from "lucide-react";

interface RevealSectionProps {
  visible: boolean;
  onYes: () => void;
  showSuccess: boolean;
}

export function RevealSection({
  visible,
  onYes,
  showSuccess,
}: RevealSectionProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!visible) {
      setPhase(0);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => {
        setPhase(2);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#8B5CF6", "#A855F7", "#EC4899", "#38BDF8"],
        });
      }, 2200),
      setTimeout(() => setPhase(3), 3800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  if (!visible && !showSuccess) return null;

  return (
    <AnimatePresence>
      {(visible || showSuccess) && (
        <motion.section
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#060a12]/98 px-6 backdrop-blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <SuccessState key="success" />
            ) : (
              <motion.div
                key="reveal"
                className="max-w-2xl text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.p
                  className="font-mono text-xs uppercase tracking-[0.4em] text-violet-400/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 1 ? 1 : 0 }}
                >
                  Final Review
                </motion.p>

                <motion.h2
                  className="mt-6 text-3xl font-bold text-white/90 md:text-5xl"
                  style={{ fontFamily: "var(--font-space)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: phase >= 1 ? 1 : 0,
                    y: phase >= 1 ? 0 : 20,
                  }}
                >
                  Meeting Request Status
                </motion.h2>

                <AnimatePresence>
                  {phase >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, filter: "blur(12px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="mt-10"
                    >
                      <p className="bg-gradient-to-r from-emerald-400 via-violet-400 to-fuchsia-400 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl">
                        APPROVED 😌
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {phase >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="mt-12 text-xl text-white/60 md:text-2xl">
                        So... are we meeting today?
                      </p>

                      <motion.div
                        className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <MagneticButton onClick={onYes}>
                          Yes obviously
                        </MagneticButton>
                        <DodgeButton />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function SuccessState() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#8B5CF6", "#EC4899"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#A855F7", "#38BDF8"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div
      className="max-w-lg text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-white/10"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
      </motion.div>

      <h3
        className="text-3xl font-bold md:text-4xl"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Excellent choice.
      </h3>
      <p className="mt-4 text-lg text-white/50">
        Developer happiness increased by{" "}
        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
          300%
        </span>
      </p>

      <motion.div
        className="mt-8 flex items-center justify-center gap-2 text-sm text-white/40"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="h-4 w-4 fill-fuchsia-500/50 text-fuchsia-400" />
        See you soon
        <Heart className="h-4 w-4 fill-fuchsia-500/50 text-fuchsia-400" />
      </motion.div>
    </motion.div>
  );
}
