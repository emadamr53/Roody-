"use client";

import { motion } from "framer-motion";

export function AmbientBlobs() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-violet-600/20 blur-[120px]"
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[40%] h-[45vh] w-[45vh] rounded-full bg-fuchsia-600/15 blur-[100px]"
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-sky-500/10 blur-[90px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
