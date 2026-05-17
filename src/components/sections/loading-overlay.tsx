"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOADING_MESSAGES } from "@/lib/constants";
import dynamic from "next/dynamic";

const LottieLoader = dynamic(
  () => import("@/components/ui/lottie-loader").then((m) => m.LottieLoader),
  { ssr: false },
);

interface LoadingOverlayProps {
  active: boolean;
  onComplete: () => void;
}

export function LoadingOverlay({ active, onComplete }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    setMessageIndex(0);
    setProgress(0);

    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1400);

    const start = Date.now();
    const duration = 7000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(progressInterval);
        clearInterval(msgInterval);
        setTimeout(onComplete, 600);
      }
    }, 50);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[#060a12]/95 px-6 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 60%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <LottieLoader className="h-40 w-40 md:h-52 md:w-52" />

            <motion.p
              className="mt-8 font-mono text-sm text-violet-300/90 md:text-base"
              key={messageIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>

            <motion.div className="mt-10 w-64 md:w-80">
              <div className="mb-2 flex justify-between font-mono text-xs text-white/40">
                <span>Processing</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </motion.div>

            <motion.p
              className="mt-6 text-xs text-white/25"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Please do not refresh. The vibes are compiling.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
