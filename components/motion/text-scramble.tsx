"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/";

export interface TextScrambleProps {
  text: string;
  duration?: number;
  glyphs?: string;
  className?: string;
  style?: CSSProperties;
  active?: boolean;
  /**
   * Drop the visually-hidden duplicate copy. TextScramble normally renders the
   * text twice — once in `sr-only` so assistive tech gets a stable string while
   * the visible copy churns through random glyphs, once `aria-hidden` for the
   * animation. That makes the element's textContent read the sentence twice
   * over, which is harmless in a paragraph but not inside a heading, where an
   * extractor takes the doubled string as the page's subject. Set this when an
   * ancestor already supplies `aria-label` — then the visible copy is the only
   * text in the DOM and the accessible name comes from the label.
   */
  singleCopy?: boolean;
}

export function TextScramble({
  text,
  duration,
  glyphs = DEFAULT_GLYPHS,
  className,
  style,
  active = true,
  singleCopy = false,
}: TextScrambleProps) {
  const reduce = useReducedMotion() ?? false;
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active || reduce || !glyphs) {
      setDisplay(text);
      return;
    }

    const characters = text.split("");
    const startedAt = performance.now();
    const animationDuration =
      duration ?? Math.min(760, Math.max(420, characters.length * 32));
    let frame = 0;
    let lastUpdate = 0;

    const animate = (now: number) => {
      if (now - lastUpdate >= 40) {
        lastUpdate = now;
        const progress = Math.min((now - startedAt) / animationDuration, 1);
        const settled = Math.floor(progress * characters.length);
        setDisplay(
          characters
            .map((character, index) => {
              if (index < settled || character === " ") return character;
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join("")
        );
      }

      if (now - startedAt < animationDuration) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, glyphs, reduce, text]);

  return (
    <span
      className={cn("whitespace-pre-wrap break-words", className)}
      style={style}
    >
      {!singleCopy && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">{reduce ? text : display}</span>
    </span>
  );
}
