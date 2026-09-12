"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { SignatureGlyph } from "@/components/Signature";
import { content } from "@/lib/content";

const HELLOS = ["Hello", "مرحبا", "স্বাগতম", "你好", "آداب"];

type Phase = "words" | "signature" | "moving";

export function WelcomeLoader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("words");
  const [path, setPath] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endScale: number;
  } | null>(null);

  useEffect(() => {
    const START_H = 128; // 8rem
    const el = document.getElementById("hero-signature");
    const r = el?.getBoundingClientRect();
    const w = START_H * (1920 / 1080);
    setPath({
      startX: (window.innerWidth - w) / 2,
      startY: (window.innerHeight - START_H) / 2,
      endX: r ? r.left : Math.max(8, window.innerWidth / 2 - 286),
      endY: r ? r.top : 102,
      endScale: r ? r.height / START_H : 0.75,
    });
  }, []);

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setPhase("signature"), 180);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= HELLOS.length - 2) {
          clearInterval(id);
          setTimeout(() => setPhase("signature"), 380);
          return HELLOS.length - 1;
        }
        return i + 1;
      });
    }, 280);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "signature") return;
    const t = setTimeout(() => setPhase("moving"), 550);
    return () => clearTimeout(t);
  }, [phase]);

  const handleAnimationComplete = () => {
    if (phase === "moving") {
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome"
    >
      {phase === "words" || !path ? (
        <div className="relative flex h-full w-full items-center justify-center">
          {/* pure fade: outgoing word fades out completely before the next
              fades in (mode="wait") — no movement, so nothing to mask and no
              double-exposure overlap */}
          <div className="flex h-[32px] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`word-${HELLOS[index]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeInOut" }}
                className="flex items-center justify-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="size-[5px] shrink-0 rounded-full bg-foreground"
                />
                <span className="whitespace-nowrap text-[20px] font-medium leading-[1.2] tracking-tight text-foreground md:text-[24px]">
                  {HELLOS[index]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.svg
          key="signature"
          viewBox="0 0 1920 1080"
          className="text-foreground"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${content.name} wordmark`}
          initial={{
            opacity: 0,
            filter: "blur(6px)",
            x: path.startX,
            y: path.startY,
            scale: 1,
          }}
          animate={
            phase === "moving"
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.endX,
                  y: path.endY,
                  scale: path.endScale,
                  transition: { duration: 0.7, ease: EASE_OUT },
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.startX,
                  y: path.startY,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    filter: { duration: 0.5, ease: "easeOut" },
                  },
                }
          }
          onAnimationComplete={handleAnimationComplete}
          style={
            {
              position: "fixed",
              top: 0,
              left: 0,
              height: "8rem",
              width: "auto",
              transformOrigin: "top left",
              willChange: "transform, opacity",
            } as const
          }
        >
          <SignatureGlyph />
        </motion.svg>
      )}
    </motion.div>
  );
}
