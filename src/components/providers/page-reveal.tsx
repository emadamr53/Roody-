"use client";

import { motion } from "framer-motion";

export function PageReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-[300] bg-[#0a0f1a] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </motion.div>
  );
}
