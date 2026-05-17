"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingInput } from "@/components/ui/floating-input";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FileText } from "lucide-react";

export interface MeetingFormData {
  name: string;
  place: string;
  address: string;
  people: string;
  time: string;
  phone: string;
  email: string;
  personalInfo: string;
  details: string;
  notes: string;
}

const initialForm: MeetingFormData = {
  name: "",
  place: "",
  address: "",
  people: "",
  time: "",
  phone: "",
  email: "",
  personalInfo: "",
  details: "",
  notes: "",
};

export function FormSection({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState<MeetingFormData>(initialForm);

  const update = (key: keyof MeetingFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section id="form" className="relative px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-400/80">
            Step 02
          </p>
          <div className="mb-4 flex items-center justify-center gap-2 text-white/40">
            <FileText className="h-4 w-4" />
            <span className="text-xs">Digital recreation of your PDF form</span>
          </div>
          <h2
            className="text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Official Meeting Request
          </h2>
          <p className="mt-4 text-white/45">
            Same fields. Zero paper cuts. Infinite gradients.
          </p>
        </motion.div>

        <GlassCard delay={0.15} className="!p-6 md:!p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FloatingInput
                id="name"
                label="Name"
                value={form.name}
                onChange={update("name")}
                hint="The person I want to see"
                required
              />
              <FloatingInput
                id="place"
                label="Place"
                value={form.place}
                onChange={update("place")}
                hint="Café? Park? Secret designer headquarters?"
              />
            </div>

            <FloatingInput
              id="address"
              label="Address"
              value={form.address}
              onChange={update("address")}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FloatingInput
                id="people"
                label="People"
                value={form.people}
                onChange={update("people")}
                hint="Just us? Squad? Creative council?"
              />
              <FloatingInput
                id="time"
                label="Time"
                value={form.time}
                onChange={update("time")}
                hint="Today works. Obviously."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FloatingInput
                id="phone"
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
              />
              <FloatingInput
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
              />
            </div>

            <FloatingInput
              id="personalInfo"
              label="Personal Information"
              value={form.personalInfo}
              onChange={update("personalInfo")}
              hint="Fun facts, hot takes, favorite font (no judgment if Comic Sans)"
              multiline
            />

            <FloatingInput
              id="details"
              label="Details"
              value={form.details}
              onChange={update("details")}
              multiline
            />

            <FloatingInput
              id="notes"
              label="Notes"
              value={form.notes}
              onChange={update("notes")}
              hint="Anything else the system should know"
              multiline
            />

            <motion.div
              className="pt-4"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
            >
              <MagneticButton type="submit" className="w-full md:w-auto">
                Submit Meeting Request
              </MagneticButton>
            </motion.div>
          </form>
        </GlassCard>
      </motion.div>
    </section>
  );
}
