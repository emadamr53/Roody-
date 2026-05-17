"use client";

import { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroSection } from "@/components/sections/hero-section";
import { AuthSection } from "@/components/sections/auth-section";
import { FormSection } from "@/components/sections/form-section";
import { LoadingOverlay } from "@/components/sections/loading-overlay";
import { RevealSection } from "@/components/sections/reveal-section";
import { TerminalSection } from "@/components/sections/terminal-section";

gsap.registerPlugin(ScrollTrigger);

export function MeetingRequestPage() {
  const [loading, setLoading] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0.6 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: mainRef },
  );

  const scrollToAuth = useCallback(() => {
    document.getElementById("auth")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    setShowReveal(true);
  }, []);

  const handleYes = useCallback(() => {
    setShowSuccess(true);
  }, []);

  return (
    <main ref={mainRef}>
      <HeroSection onBegin={scrollToAuth} />

      <div data-parallax>
        <AuthSection />
      </div>

      <div data-parallax>
        <FormSection onSubmit={handleSubmit} />
      </div>

      <div data-parallax>
        <TerminalSection />
      </div>

      <footer className="border-t border-white/5 px-6 py-12 text-center">
        <p className="text-xs text-white/25">
          Built with questionable amounts of animation libraries — because you
          deserve better than a Google Form.
        </p>
        <p className="mt-2 text-xs text-white/15">
          © {new Date().getFullYear()} Friendship Systems Inc. · Not affiliated
          with Figma (yet)
        </p>
      </footer>

      <LoadingOverlay active={loading} onComplete={handleLoadingComplete} />

      <RevealSection
        visible={showReveal}
        onYes={handleYes}
        showSuccess={showSuccess}
      />
    </main>
  );
}
