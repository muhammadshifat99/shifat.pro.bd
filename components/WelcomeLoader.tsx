"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { SignatureGlyph } from "@/components/Signature";
import { content } from "@/lib/content";

// Intro pacing. This plays on every page load and every visitor waits it out
// behind an opaque overlay before they can see or scroll anything, so the whole
// sequence is budgeted in one place. Time-to-content is
//   GREETING.length * CHAR_MS + SETTLE_MS + HOLD_MS + FLY_MS
// which is ~2.18s here (29 * 38 + 180 + 200 + 700). The typing run is by far
// the largest term, so the greeting's length is the main pacing lever — see the
// measurement note on GREETING below.
const CHAR_MS = 38; // per-character typing cadence
const SETTLE_MS = 180; // beat on the finished line — without it the completed
// sentence is replaced by the wordmark on the very frame its last letter lands
const HOLD_MS = 200; // wordmark blurs in, holds, then travels
const FLY_MS = 700; // the travel itself — keep in sync with the SVG transition
const EXIT_MS = 350; // overlay fade, during which content is already revealed

// Typed out one character at a time. 29 chars at CHAR_MS is ~1.1s, which is the
// bulk of the intro — anything longer is a visible wait on repeat visits.
// Measured against Geist at the 20px mobile size with tracking-tight: 249px
// wide, vs 303px available at a 320px viewport, so `whitespace-nowrap` below
// still holds on the narrowest phone.
const GREETING = "Hello! Happy to see you here.";

type Phase = "words" | "signature" | "moving";

export function WelcomeLoader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const [typed, setTyped] = useState(0);
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
      setTyped(GREETING.length);
      const t = setTimeout(() => setPhase("signature"), 120);
      return () => clearTimeout(t);
    }
    // one character per CHAR_MS, then hand over to the wordmark
    let i = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= GREETING.length) {
        clearInterval(id);
        settle = setTimeout(() => setPhase("signature"), SETTLE_MS);
      }
    }, CHAR_MS);
    return () => {
      clearInterval(id);
      clearTimeout(settle);
    };
  }, [reduce]);

  useEffect(() => {
    if (phase !== "signature") return;
    const t = setTimeout(() => setPhase("moving"), HOLD_MS);
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
      transition={{ duration: EXIT_MS / 1000, ease: "easeOut" }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome"
    >
      {phase === "words" || !path ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="flex h-[32px] w-full items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="size-[5px] shrink-0 rounded-full bg-foreground"
              />
              <span className="whitespace-nowrap text-[20px] font-medium leading-[1.2] tracking-tight text-foreground md:text-[24px]">
                {/* The complete string lives here, static and unanimated, so
                    crawlers and screen readers always get the whole sentence
                    even though the visible copy below is still mid-type. Same
                    string in both spans, so this is the standard visually-
                    hidden a11y pattern, not cloaking. */}
                <span className="sr-only">{GREETING}</span>
                <span aria-hidden="true">
                  {GREETING.slice(0, typed)}
                  {/* The caret sits *between* the typed prefix and the untyped
                      remainder so its x tracks the last revealed character. Move
                      it after the remainder and it pins to the full string's
                      width and never moves — which is exactly what it did. */}
                  {!reduce && (
                    <motion.span
                      className="ml-1.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] rounded-full bg-foreground"
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{
                        duration: 1,
                        times: [0, 0.5, 0.5, 1],
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                  {/* The untyped remainder is transparent rather than absent —
                      it holds the line's full width so the centred row never
                      reflows as characters arrive. The caret contributes a
                      constant width, so it adds no drift. */}
                  <span className="opacity-0">{GREETING.slice(typed)}</span>
                </span>
              </span>
            </div>
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
                  transition: { duration: FLY_MS / 1000, ease: EASE_OUT },
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
