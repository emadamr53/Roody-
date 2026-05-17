"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { MOOD_OPTIONS, CSS_JUDGMENT_OPTIONS } from "@/lib/constants";
import { Coffee, Sparkles, Zap, Eye } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export function AuthSection() {
  const [mood, setMood] = useState("");
  const [coffee, setCoffee] = useState([70]);
  const [cssJudgment, setCssJudgment] = useState("");
  const [energy, setEnergy] = useState([55]);

  return (
    <section id="auth" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-violet-400/80">
            Step 01
          </p>
          <h2
            className="text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Friendship Authentication
          </h2>
          <p className="mt-4 text-white/45">
            Please verify you are, in fact, my favorite designer — and not a
            bot pretending to critique my margins.
          </p>
        </motion.div>

        <GlassCard delay={0.1}>
          <div className="space-y-8">
            <FieldGroup
              icon={<Sparkles className="h-4 w-4 text-violet-400" />}
              label="Current mood?"
              hint="Honesty encouraged. Sass optional."
            >
              <motion.div className="grid gap-2 sm:grid-cols-2">
                {MOOD_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    onClick={() => setMood(opt.value)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300",
                      mood === opt.value
                        ? "border-violet-500/50 bg-violet-500/10 text-white shadow-[0_0_24px_rgba(139,92,246,0.2)]"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.05]",
                    )}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </motion.div>
            </FieldGroup>

            <FieldGroup
              icon={<Coffee className="h-4 w-4 text-amber-400" />}
              label="Coffee dependency level"
              hint={`${coffee[0]}% — ${coffeeLabel(coffee[0])}`}
            >
              <Slider.Root
                value={coffee}
                onValueChange={setCoffee}
                max={100}
                step={1}
                className="relative flex h-6 w-full touch-none select-none items-center"
              >
                <Slider.Track className="relative h-2 grow rounded-full bg-white/10">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-amber-400 bg-[#0a0f1a] shadow-lg shadow-amber-500/30 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
              </Slider.Root>
            </FieldGroup>

            <FieldGroup
              icon={<Eye className="h-4 w-4 text-fuchsia-400" />}
              label="Chances of judging my CSS"
              hint="Be gentle. I tried my best."
            >
              <motion.div className="space-y-2">
                {CSS_JUDGMENT_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    onClick={() => setCssJudgment(opt.value)}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-all",
                      cssJudgment === opt.value
                        ? "border-fuchsia-500/40 bg-fuchsia-500/10 text-white"
                        : "border-transparent text-white/50 hover:bg-white/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        cssJudgment === opt.value
                          ? "bg-fuchsia-400"
                          : "bg-white/20",
                      )}
                    />
                    {opt.label}
                  </motion.button>
                ))}
              </motion.div>
            </FieldGroup>

            <FieldGroup
              icon={<Zap className="h-4 w-4 text-sky-400" />}
              label="Energy level today"
              hint={energyHint(energy[0])}
            >
              <Slider.Root
                value={energy}
                onValueChange={setEnergy}
                max={100}
                step={1}
                className="relative flex h-6 w-full touch-none select-none items-center"
              >
                <Slider.Track className="relative h-2 grow rounded-full bg-white/10">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-sky-600 to-violet-500" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-sky-400 bg-[#0a0f1a] shadow-lg shadow-sky-500/30 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400/50" />
              </Slider.Root>
            </FieldGroup>

            <motion.p
              className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-xs text-white/35"
              whileHover={{ borderColor: "rgba(139,92,246,0.3)" }}
            >
              🔐 Authentication status:{" "}
              <span className="text-emerald-400/90">
                Friendship verified (probably)
              </span>
            </motion.p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function FieldGroup({
  icon,
  label,
  hint,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        {icon}
        <Label className="text-base text-white/90">{label}</Label>
      </div>
      {children}
      {hint && <p className="text-xs text-white/35">{hint}</p>}
    </motion.div>
  );
}

function coffeeLabel(v: number) {
  if (v < 30) return "Decaf? Bold choice.";
  if (v < 60) return "Functional human.";
  if (v < 85) return "Designer fuel levels optimal.";
  return "You are the coffee now.";
}

function energyHint(v: number) {
  if (v < 25) return "Low battery — meetings optional.";
  if (v < 50) return "Mild enthusiasm detected.";
  if (v < 75) return "Ready for creative chaos.";
  return "Maximum vibes. Proceed.";
}
