"use client";

import { motion } from "framer-motion";
import { inviteContent } from "@/lib/invite-content";
import { Clock, MapPin, Flower2 } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function InviteDetails() {
  const { letter, whyToday, plan, details, promises, closing } = inviteContent;

  return (
    <div className="mt-14 w-full max-w-2xl space-y-10">
      <motion.section
        custom={0}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fade}
        className="rounded-3xl border border-white/90 bg-white/60 p-8 shadow-lg shadow-[#89cff0]/15 backdrop-blur-md md:p-10"
      >
        <div className="space-y-5 text-[#4a6b7c] leading-relaxed md:text-lg">
          {letter.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      <motion.section
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fade}
        className="rounded-3xl border border-white/90 bg-white/60 p-8 shadow-lg shadow-[#89cff0]/15 backdrop-blur-md md:p-10"
      >
        <h2
          className="mb-6 text-2xl font-semibold text-[#2c4a5e] md:text-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {whyToday.title}
        </h2>
        <ul className="space-y-4">
          {whyToday.points.map((point, i) => (
            <li key={i} className="flex gap-4 text-[#5a7a8c] md:text-lg">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#89cff0]" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        custom={2}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fade}
        className="rounded-3xl border border-white/90 bg-white/60 p-8 shadow-lg shadow-[#89cff0]/15 backdrop-blur-md md:p-10"
      >
        <h2
          className="mb-3 text-2xl font-semibold text-[#2c4a5e] md:text-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {plan.title}
        </h2>
        <p className="mb-8 text-[#5a7a8c] leading-relaxed md:text-lg">
          {plan.description}
        </p>
        <motion.div className="space-y-6">
          {plan.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative border-l-2 border-[#b8e0f5] pl-6"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#89cff0]">
                {step.time}
              </p>
              <h3
                className="text-lg font-semibold text-[#2c4a5e] md:text-xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-[#5a7a8c] leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        custom={3}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fade}
        className="rounded-3xl border border-white/90 bg-white/60 p-8 shadow-lg shadow-[#89cff0]/15 backdrop-blur-md md:p-10"
      >
        <h2
          className="mb-6 flex items-center gap-2 text-2xl font-semibold text-[#2c4a5e] md:text-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <MapPin className="h-6 w-6 text-[#89cff0]" />
          {details.title}
        </h2>
        <dl className="space-y-4">
          {details.items.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 border-b border-[#d4eef9]/80 pb-4 last:border-0 last:pb-0 sm:grid-cols-[140px_1fr]"
            >
              <dt className="text-sm font-semibold uppercase tracking-wide text-[#89cff0]">
                {item.label}
              </dt>
              <dd className="text-[#4a6b7c] md:text-lg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </motion.section>

      <motion.section
        custom={4}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fade}
        className="rounded-3xl border border-[#f8c8dc]/50 bg-gradient-to-br from-white/70 to-[#f0f8ff]/80 p-8 shadow-lg shadow-[#f8c8dc]/20 backdrop-blur-md md:p-10"
      >
        <h2
          className="mb-6 flex items-center gap-2 text-2xl font-semibold text-[#2c4a5e] md:text-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <Flower2 className="h-6 w-6 text-[#89cff0]" />
          {promises.title}
        </h2>
        <ul className="space-y-4">
          {promises.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[#5a7a8c] leading-relaxed md:text-lg"
            >
              <Flower2 className="mt-1 h-4 w-4 shrink-0 text-[#89cff0]" />
              {item}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.p
        custom={5}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
        className="text-center text-lg leading-relaxed text-[#5a7a8c] md:text-xl"
      >
        <Clock className="mx-auto mb-3 h-5 w-5 text-[#89cff0]" />
        {closing}
      </motion.p>
    </div>
  );
}
