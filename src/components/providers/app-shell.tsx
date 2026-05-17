"use client";

import { LenisProvider } from "./lenis-provider";
import { PageReveal } from "./page-reveal";
import { AmbientBlobs } from "@/components/effects/ambient-blobs";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { MouseLight } from "@/components/effects/mouse-light";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { Particles } from "@/components/effects/particles";
import { useConsoleEasterEggs } from "@/hooks/use-console-easter-eggs";
import { useKeyboardEasterEgg } from "@/hooks/use-keyboard-easter-egg";

export function AppShell({ children }: { children: React.ReactNode }) {
  useConsoleEasterEggs();
  useKeyboardEasterEgg();

  return (
    <LenisProvider>
      <PageReveal>
        <div className="relative min-h-screen bg-[#0a0f1a] text-white selection:bg-violet-500/30">
          <AmbientBlobs />
          <Particles />
          <MouseLight />
          <CursorGlow />
          <NoiseOverlay />
          {children}
        </div>
      </PageReveal>
    </LenisProvider>
  );
}
