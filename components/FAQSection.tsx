"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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
              {/* The heading wraps the button, not the other way round: <button>
                  only accepts phrasing content, so an <h3> inside one is invalid
                  HTML. This is the WAI-ARIA accordion pattern, and it gives the
                  questions real heading structure for crawlers and LLM
                  extractors rather than leaving them as bare spans. */}
              <h3>
                <button
                  id={`faq-button-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <span>{item.question}</span>
                  <ChevronIcon open={isOpen} />
                </button>
              </h3>
              {/* Always mounted and always in the served HTML — only its height
                  animates. Previously the answer was inside <AnimatePresence>
                  gated on isOpen, so the text existed nowhere but the JSON-LD,
                  which put the structured data out of step with the page. */}
              <motion.div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
                }
                className="overflow-hidden"
              >
                <p className="pb-4 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.answer}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
