"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerBouquet } from "./flower-bouquet";
import { AcceptCard } from "./accept-card";
import { SuccessMoment } from "./success-moment";
import { InviteDetails } from "./invite-details";
import { NameIntro } from "./name-intro";
import { inviteContent } from "@/lib/invite-content";

export function RomanticInvitePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { greeting, headline, subheadline, footer } = inviteContent;

  return (
    <>
      {!introComplete && (
        <NameIntro onComplete={() => setIntroComplete(true)} />
      )}

      <main
        className={`relative flex min-h-[100dvh] flex-col items-center px-5 py-16 pb-24 transition-opacity duration-700 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-2xl flex-col items-center"
            >
              <FlowerBouquet className="mb-8" />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#89cff0]"
              >
                {greeting}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-center text-4xl font-semibold leading-tight text-[#2c4a5e] md:text-6xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-5 max-w-lg text-center text-xl text-[#5a7a8c] md:text-2xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {subheadline}
              </motion.p>

              <InviteDetails />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-14 w-full"
              >
                <AcceptCard onAccept={() => setAccepted(true)} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl"
            >
              <SuccessMoment />
            </motion.div>
          )}
        </AnimatePresence>

        {introComplete && !accepted && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center text-xs text-[#89cff0]/80"
          >
            {footer}
          </motion.footer>
        )}
      </main>
    </>
  );
}
