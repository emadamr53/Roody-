"use client";

import { motion } from "framer-motion";

export function FlowerBouquet({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <motion.span
        className="block text-7xl md:text-8xl"
        animate={{ y: [0, -8, 0], rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        💐
      </motion.span>
    </motion.div>
  );
}
