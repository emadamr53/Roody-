"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FlowerBouquet } from "./flower-bouquet";
import { inviteContent } from "@/lib/invite-content";
import { Check } from "lucide-react";

export function SuccessMoment() {
  const { success } = inviteContent;

  useEffect(() => {
    const colors = ["#89cff0", "#b8e0f5", "#f8c8dc", "#ffd6e8", "#ffffff"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center px-4 text-center"
    >
      <FlowerBouquet className="mb-8" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-semibold text-[#2c4a5e] md:text-5xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {success.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-lg text-lg leading-relaxed text-[#5a7a8c] md:text-xl"
      >
        {success.message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-10 w-full rounded-3xl border border-white/90 bg-white/70 p-8 text-left shadow-lg shadow-[#89cff0]/15 md:p-10"
      >
        <h3
          className="mb-6 text-xl font-semibold text-[#2c4a5e]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What happens next
        </h3>
        <ul className="space-y-4">
          {success.nextSteps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 text-[#5a7a8c] leading-relaxed md:text-lg"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#89cff0]/20">
                <Check className="h-3.5 w-3.5 text-[#6bb3d9]" />
              </span>
              {step}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 max-w-md text-lg italic text-[#6bb3d9] md:text-xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {success.signOff}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mt-10 flex gap-3 text-3xl"
      >
        {["🌷", "💙", "🌸", "💐", "🌺"].map((f, i) => (
          <motion.span
            key={f}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {f}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
