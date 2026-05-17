"use client";

import { motion } from "framer-motion";
import { LenisProvider } from "./lenis-provider";
import { FloatingFlowers } from "@/components/invite/floating-flowers";
import { SoftGlow } from "@/components/invite/soft-glow";

export function RomanticShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <motion.div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f0f8ff] via-[#e8f4fc] to-[#dff0fa]">
        <SoftGlow />
        <FloatingFlowers />
        {children}
      </motion.div>
    </LenisProvider>
  );
}
