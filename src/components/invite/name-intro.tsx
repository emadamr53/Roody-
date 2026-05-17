"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "Roody";
const TYPE_SPEED_MS = 180;
const PAUSE_AFTER_MS = 1600;

const ORBIT_FLOWERS = ["🌸", "🌷", "🌺", "💐", "❀", "✿", "🌸", "🌷"];

interface NameIntroProps {
  onComplete: () => void;
}

export function NameIntro({ onComplete }: NameIntroProps) {
  const [visible, setVisible] = useState(true);
  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const orbit = useMemo(
    () =>
      ORBIT_FLOWERS.map((emoji, i) => ({
        emoji,
        angle: (i / ORBIT_FLOWERS.length) * 360,
        delay: i * 0.12,
      })),
    [],
  );

  useEffect(() => {
    if (displayed.length >= NAME.length) {
      const pause = setTimeout(() => setTypingDone(true), PAUSE_AFTER_MS);
      return () => clearTimeout(pause);
    }

    const timer = setTimeout(() => {
      setDisplayed(NAME.slice(0, displayed.length + 1));
    }, TYPE_SPEED_MS);

    return () => clearTimeout(timer);
  }, [displayed]);

  useEffect(() => {
    if (!typingDone) return;

    const exit = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 700);
    }, 400);

    return () => clearTimeout(exit);
  }, [typingDone, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0f8ff] via-[#e8f4fc] to-[#dff0fa]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <FallingPetals />

          <div className="relative flex flex-col items-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-[#89cff0]"
            >
              For
            </motion.p>

            <div className="relative">
              {orbit.map((item, i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute left-1/2 top-1/2 select-none"
                  style={{
                    fontSize: 28 + (i % 3) * 8,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.4, 0.85, 0.4],
                    scale: [0.9, 1.1, 0.9],
                    x: [
                      Math.cos((item.angle * Math.PI) / 180) * 100 - 14,
                      Math.cos((item.angle * Math.PI) / 180) * 115 - 14,
                      Math.cos((item.angle * Math.PI) / 180) * 100 - 14,
                    ],
                    y: [
                      Math.sin((item.angle * Math.PI) / 180) * 70 - 14,
                      Math.sin((item.angle * Math.PI) / 180) * 85 - 14,
                      Math.sin((item.angle * Math.PI) / 180) * 70 - 14,
                    ],
                    rotate: [0, 12, -8, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.emoji}
                </motion.span>
              ))}

              <motion.h1
                className="relative z-10 text-center text-6xl font-semibold tracking-wide text-[#2c4a5e] md:text-8xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {displayed.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-[#89cff0] align-middle"
                />
              </motion.h1>
            </div>

            <AnimatePresence>
              {displayed.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex gap-2"
                >
                  {["🌸", "💙", "🌷"].map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * i, type: "spring" }}
                      className="text-2xl"
                    >
                      {f}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {typingDone && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center text-lg text-[#5a7a8c] md:text-xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Please scroll down when you are ready
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FallingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        emoji: ORBIT_FLOWERS[i % ORBIT_FLOWERS.length],
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 4,
        size: 16 + Math.random() * 14,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none opacity-50"
          style={{
            left: `${p.x}%`,
            top: "-5%",
            fontSize: p.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(p.id) * 40, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
