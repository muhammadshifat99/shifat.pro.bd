"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { GitHubHoverCard } from "@/components/Hero/GitHubHoverCard";
import { XHoverCard } from "@/components/Hero/XHoverCard";
import { LinkedInHoverCard } from "@/components/Hero/LinkedInHoverCard";
import { WelcomeGate } from "@/components/WelcomeGate";
import { useWelcomeDone } from "@/components/WelcomeDoneContext";
import { Button, ButtonLink } from "@/components/motion/button";
import { ActionSwapCascadeText, ActionSwapIcon } from "@/components/motion/action-swap";
import { TextScramble } from "@/components/motion/text-scramble";
import { ContributionGraph } from "@/components/ContributionGraph";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArchiveSection } from "@/components/ArchiveSection";
import { ColophonSection } from "@/components/ColophonSection";
import { AskAI } from "@/components/AskAI";
import { FAQSection } from "@/components/FAQSection";
import { SignatureGlyph } from "@/components/Signature";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";
import { content } from "@/lib/content";

const GH_CARD_W = 290;
const GH_CARD_HALF = GH_CARD_W / 2;

const SOCIAL = Object.fromEntries(content.socials.map((s) => [s.label, s.url])) as Record<
  (typeof content.socials)[number]["label"],
  string
>;

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Hero copy settles without ever touching opacity. The welcome loader is an
// opaque `fixed inset-0` overlay, so the `hidden` pose is never actually seen —
// and browsers exclude opacity:0 content from LCP, which would hold the hero's
// largest paint until the intro finished (~1.6s). Blur/offset still read as the
// same rise-and-sharpen reveal once the loader fades off it.
const HERO_REVEAL = {
  hidden: { y: 14, filter: "blur(6px)" },
  visible: { y: 0, filter: "blur(0px)" },
};

// Defined once because it serves two roles on the h1: the visible scramble text
// and the heading's accessible name. Passing it twice by hand would let the two
// drift apart.
const HERO_HEADLINE = `Hi, I'm ${content.name}, ${content.headline}.`;

function HeroContent() {
  const welcomeDone = useWelcomeDone();
  const [pillHovered, setPillHovered] = useState<"x" | "gh" | "li" | null>(null);
  const [pillOffset, setPillOffset] = useState(0);
  const [pillCardY, setPillCardY] = useState(0);
  const [mailCopied, setMailCopied] = useState(false);
  const reduce = useReducedMotion() ?? false;
  // same bottom treatment as the work page: content rises above the fixed
  // blur/dock zone as the page scrolls
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "200px"]);
  const ghWrapperRef = useRef<HTMLDivElement>(null);
  const xWrapperRef = useRef<HTMLDivElement>(null);
  const liWrapperRef = useRef<HTMLDivElement>(null);
  const pillRowRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<SVGSVGElement>(null);

  // magnetic ink: the resting signature leans toward a nearby cursor (max ~3px
  // drift + ~1.2deg tilt) and settles back with a soft spring when it leaves
  const sigMagX = useMotionValue(0);
  const sigMagY = useMotionValue(0);
  const sigMagR = useMotionValue(0);
  const sigSpringX = useSpring(sigMagX, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringY = useSpring(sigMagY, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringR = useSpring(sigMagR, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleSigMagnetic = (e: React.MouseEvent) => {
    const el = sigRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const RADIUS = 240;
    if (dist > RADIUS || dist === 0) {
      sigMagX.set(0);
      sigMagY.set(0);
      sigMagR.set(0);
      return;
    }
    const pull = 1 - dist / RADIUS;
    sigMagX.set((dx / dist) * 3 * pull);
    sigMagY.set((dy / dist) * 3 * pull);
    sigMagR.set((dx / RADIUS) * 1.2);
  };

  // one shared card morphs between the three pills: x/y are relative to the pill
  // row and clamp to the viewport, so switching buttons glides instead of jumping
  const pillWrapperRefs = { x: xWrapperRef, gh: ghWrapperRef, li: liWrapperRef };
  const getPillOffset = (e: React.MouseEvent) => {
    if (!pillRowRef.current) return 0;
    const r = pillRowRef.current.getBoundingClientRect();
    const clamped = Math.min(Math.max(e.clientX, GH_CARD_HALF + 12), document.documentElement.clientWidth - GH_CARD_HALF - 12);
    return clamped - r.left - GH_CARD_HALF;
  };
  const hoverPill = (target: "x" | "gh" | "li", e: React.MouseEvent) => {
    setPillOffset(getPillOffset(e));
    const wrapper = pillWrapperRefs[target].current;
    if (wrapper && pillRowRef.current) {
      setPillCardY(wrapper.getBoundingClientRect().bottom - pillRowRef.current.getBoundingClientRect().top + 12);
    }
    setPillHovered(target);
  };

  return (
    <div
      className="relative flex flex-1 flex-col bg-background text-foreground"
      onMouseMove={handleSigMagnetic}
    >
      <motion.div className="flex flex-1 flex-col items-center justify-start px-6 pt-16" style={{ paddingBottom: pb }}>
        <div className="flex w-full max-w-[672px] flex-col items-start text-left">
        {/* Painted from first render even though the welcome loader covers it:
            the loader flies its own copy of this wordmark down to exactly this
            rect, so revealing an already-drawn signature is pixel-identical —
            and it keeps the hero out of the loader's LCP shadow. */}
        <motion.svg
          viewBox="0 0 1920 1080"
          id="hero-signature"
          ref={sigRef}
          className="-ml-4 mb-6 h-24 w-auto shrink-0 self-start text-foreground"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${content.name} wordmark`}
          style={{ x: sigSpringX, y: sigSpringY, rotate: sigSpringR }}
        >
            <SignatureGlyph />
        </motion.svg>

        {/* The page's only h1, and the one sentence that names the entity —
            heading level is independent of the 22px visual size here. Without
            it every heading on the page started at h2, which left screen
            readers and LLM extractors without a stated primary subject.
            aria-label carries the accessible name and singleCopy keeps the
            text out of the DOM twice, so the heading's textContent is the
            sentence exactly once rather than doubled. */}
        <h1
          aria-label={HERO_HEADLINE}
          className="text-[22px] font-medium leading-none text-foreground"
          style={{ fontFamily: "var(--font-overused-grotesk)" }}
        >
          <TextScramble text={HERO_HEADLINE} active={welcomeDone} singleCopy />
        </h1>

        <motion.div
          variants={HERO_REVEAL}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="mt-6 space-y-6"
        >
          <div>
            <h2
              className="mb-2 text-[15px] font-medium text-foreground"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              Who is Muhammad Shifat?
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              Muhammad Shifat (Shifat NPC) is the Chief Marketing Officer at{" "}
              <a
                href={content.projects[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-700 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
              >
                {content.projects[0].name}
              </a>
              , an AI automation agency based in Bangladesh. A digital marketing
              enthusiast and full-stack developer, he works primarily in
              TypeScript, React, and Next.js — building AI agents and automation
              systems, and running the marketing that drives business growth.
            </p>
          </div>

          <div>
            <h2
              className="mb-2 text-[15px] font-medium text-foreground"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              What I Do — AI Automation &amp; Workflow Systems
            </h2>
            <p className="mb-3 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              I help business owners and founders replace repetitive manual work with AI-driven systems. At NPC Automators, this means:
            </p>
            <ul className="space-y-1.5 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                Designing and deploying custom AI agents
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                Building workflow automation pipelines
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                Integrating AI tools into existing business systems
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                Developing internal dashboards for operational visibility
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                Running the digital marketing — brand, content, and demand
                generation
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="mb-2 text-[15px] font-medium text-foreground"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              Background
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              I started as a full-stack developer in the React and Next.js
              ecosystem, then moved into AI automation — and into digital
              marketing, which turned out to be the same job from the other end.
              Now I split my time between turning repetitive business processes
              into &quot;invisible employees&quot; and getting those systems in
              front of the people who need them.
            </p>
          </div>

          <div>
            <h2
              className="mb-2 text-[15px] font-medium text-foreground"
              style={{ fontFamily: "var(--font-overused-grotesk)" }}
            >
              Who I Work With — SMEs, Founders &amp; Business Owners
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              NPC Automators works with business owners, founders, and SMEs who want to cut operational overhead through automation rather than hiring more staff.
            </p>
          </div>
        </motion.div>

        <div ref={pillRowRef} className="relative mt-8">
        <motion.div
          className="flex flex-wrap gap-1"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + (welcomeDone ? 0 : 0.4) }}
        >
          <div>
            <Button
              variant="pill"
              size="pill"
              layout
              // Motion's border-radius projection only engages for radii set
              // via style — the class alone leaves the caps elliptical mid-FLIP
              style={{ borderRadius: "13.5px" }}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(content.email);
                } catch {}
                setMailCopied(true);
                setTimeout(() => setMailCopied(false), 1400);
              }}
            >
              <span className="flex items-center self-center pr-[6px]">
              <span className="flex size-[13px] shrink-0 items-center justify-center text-[#171717] dark:text-white">
                  <ActionSwapIcon value={mailCopied ? "tick" : "copy"}>
                    {mailCopied ? (
                      <svg
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-full"
                      >
                        <path
                        d="M1.5 4.5L3.6 6.6L7.5 2.1"
                        stroke="currentColor"
                        // 9-unit viewBox renders at 13px (×1.44) — 0.7 ≈ 1px on screen
                        strokeWidth="0.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-full"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </ActionSwapIcon>
                </span>
              </span>
              <ActionSwapCascadeText value={mailCopied ? "Copied!" : content.email} />
            </Button>
          </div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={xWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("x", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href={SOCIAL.X}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={ghWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("gh", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href={SOCIAL.GitHub}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={liWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("li", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href={SOCIAL.LinkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {pillHovered && (
            <motion.div
              initial={{ opacity: 0, y: pillCardY + 16, filter: "blur(12px)", x: pillOffset, height: pillHovered === "gh" ? 138 : 175 }}
              animate={{ opacity: 1, y: pillCardY, filter: "blur(0px)", x: pillOffset, height: pillHovered === "gh" ? 138 : 175 }}
              exit={{ opacity: 0, y: pillCardY + 10, filter: "blur(10px)" }}
              transition={{
                opacity: { duration: 0.2, ease: "easeOut" },
                y: { duration: 0.2, ease: "easeOut" },
                filter: { duration: 0.24, ease: "easeOut" },
                x: { type: "tween", duration: 0.16, ease: "easeOut" },
                height: { type: "tween", duration: 0.2, ease: "easeOut" },
              }}
              className="pointer-events-none absolute left-0 top-0 z-20 w-[290px] overflow-hidden rounded-[12px] bg-white p-[16px] shadow-[0px_53px_79px_rgba(0,0,0,0.1)] dark:bg-zinc-900"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={pillHovered}
                  initial={pillHovered === "x" ? { opacity: 0, filter: "blur(6px)" } : false}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={pillHovered === "x" ? { opacity: 0, filter: "blur(6px)" } : { opacity: 0, filter: "blur(0px)" }}
                  transition={pillHovered === "x" ? { duration: 0.16, ease: "easeOut" } : { duration: 0 }}
                >
                  {pillHovered === "x" ? <XHoverCard /> : pillHovered === "gh" ? <GitHubHoverCard /> : <LinkedInHoverCard />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.33 }}
          className="mt-10 w-full"
        >
          <ContributionGraph />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.4 }}
          className="mt-14 w-full"
        >
          <ProjectsSection />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.47 }}
          className="mt-6 w-full"
        >
          <ArchiveSection />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.54 }}
          className="mt-14 w-full"
        >
          <AskAI />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.58 }}
          className="mt-14 w-full"
        >
          <FAQSection />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.61 }}
          className="mt-14 w-full"
        >
          <ColophonSection />
        </motion.div>
        </div>
      </motion.div>
      {/* progressive blur at the bottom — exact mask values from magicui */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </div>
  );
}

// Stamped at build time. This is a static export, so it moves whenever the site
// is rebuilt and redeployed — which is exactly the freshness signal a
// ProfilePage is meant to carry.
const BUILD_DATE = new Date().toISOString().split("T")[0];

export default function Home() {
  return (
    <>
      <WelcomeGate>
        <HeroContent />
      </WelcomeGate>

      {/* Page-scoped structured data. These live here, not in app/layout.tsx,
          because they describe *this page*: ProfilePage is "this page is about
          that person", and the FAQPage answers appear only on this route.

          Shipping them site-wide put FAQPage markup on /work, /skills and
          /playground, where no FAQ is visible — a schema/content mismatch, not
          just a wasted tag. Person, Organization and WebSite stay in the
          layout, because they describe entities that exist independently of
          any one page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            // Named so the node is referenceable rather than an anonymous
            // assertion; without it this is a new entity on every page that
            // carries it.
            "@id": "https://shifat.pro.bd/#webpage",
            url: "https://shifat.pro.bd",
            dateModified: BUILD_DATE,
            mainEntity: { "@id": "https://shifat.pro.bd/#person" },
            isPartOf: { "@id": "https://shifat.pro.bd/#website" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is Muhammad Shifat?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Shifat NPC is the online handle of Muhammad Shifat, the Chief Marketing Officer at NPC Automators, an AI automation agency. He works primarily in TypeScript, React, and Next.js, focusing on AI agents and workflow automation.",
                },
              },
              {
                "@type": "Question",
                name: "What does Muhammad Shifat do?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Muhammad Shifat (Shifat NPC) builds AI-powered automation systems, custom dashboards, and full-stack web applications, and leads marketing at NPC Automators.",
                },
              },
              {
                "@type": "Question",
                name: "What is NPC Automators?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NPC Automators is an AI automation agency that builds AI agents, workflow automation, AI integrations, custom automation systems, and internal dashboards for business owners, founders, and SMEs.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
