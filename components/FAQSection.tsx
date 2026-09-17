"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";

const FAQ_ITEMS = [
  {
    question: "Who is Muhammad Shifat?",
    answer:
      "Shifat NPC is the online handle of Muhammad Shifat, the Chief Marketing Officer at NPC Automators, an AI automation agency. He works primarily in TypeScript, React, and Next.js, focusing on AI agents and workflow automation.",
  },
  {
    question: "What does Muhammad Shifat do?",
    answer:
      "Muhammad Shifat (Shifat NPC) builds AI-powered automation systems, custom dashboards, and full-stack web applications, and leads marketing at NPC Automators.",
  },
  {
    question: "What is NPC Automators?",
    answer:
      "NPC Automators is an AI automation agency that builds AI agents, workflow automation, AI integrations, custom automation systems, and internal dashboards for business owners, founders, and SMEs.",
  },
] as const;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="w-full">
      <h2
        className="mb-6 text-lg font-medium text-foreground"
        style={{ fontFamily: "var(--font-overused-grotesk)" }}
      >
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <span>{item.question}</span>
                <ChevronIcon open={isOpen} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
