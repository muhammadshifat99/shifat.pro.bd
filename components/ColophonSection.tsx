import type { ReactNode } from "react";
import { content } from "@/lib/content";

// snapshot of the build at time of writing — refresh on big deploys
const BUILD = "dev";
const BUILD_DATE = "2026-09-10";

// brand glyphs inlined so the icons inherit the anchor's text color
// (<img> would pin currentColor to black)
type SocialGlyph = { viewBox: string; node: ReactNode };
const SOCIAL_ICONS: Record<string, SocialGlyph> = {
  GitHub: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    ),
  },
  X: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    ),
  },
  LinkedIn: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    ),
  },
};

const STACK = ["next@16.3.1", "react@19.2.8", "tailwindcss@4"];
const LIBRARIES = ["motion@13.1.0", "three@0.185.1", "lucide-react@0.577.0"];

function Term({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-medium uppercase leading-[16px] tracking-[0.5px] text-neutral-500 dark:text-neutral-400">
      {children}
    </span>
  );
}

function Value({ href, children }: { href?: string; children: React.ReactNode }) {
  const cls = "font-mono text-[14px] leading-[20px] text-foreground";
  if (!href) return <span className={cls}>{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} underline decoration-foreground/40 underline-offset-2`}
    >
      {children}
    </a>
  );
}

// each cell draws its own right/bottom dashed edge; the grid container draws
// top/left — every hairline renders exactly once, at any column span
const CELL =
  "flex flex-col gap-1 border-b border-r border-dashed border-neutral-200 bg-background px-4 py-3 dark:border-neutral-800";

function StackList({ term, items, className = "" }: { term: string; items: string[]; className?: string }) {
  return (
    <div className={`${CELL} ${className}`}>
      <Term>{term}</Term>
      <div className="flex flex-col gap-[2px]">
        {items.map((item) => (
          <Value key={item}>{item}</Value>
        ))}
      </div>
    </div>
  );
}

export function ColophonSection() {
  const github = content.socials.find((s) => s.label === "GitHub")!.url;
  return (
    <section className="w-full">
      <div className="flex items-baseline justify-between gap-4 text-[14px] leading-[20px]">
        <span className="font-mono font-medium text-foreground">{content.domain}</span>
        <span className="text-right text-[10px] text-neutral-500 dark:text-neutral-400">{content.headlineFull}.</span>
      </div>

      {/* dashed hairline grid: container draws top/left, each cell its own
          right/bottom edge — every line renders once, at any column span */}
      <div className="mt-[14px] grid grid-cols-2 overflow-hidden rounded-lg border-t border-l border-dashed border-neutral-200 lg:grid-cols-4 dark:border-neutral-800">
        <div className={CELL}>
          <Term>Crafted by</Term>
          <Value href={github}>{content.name}</Value>
        </div>
        <div className={CELL}>
          <Term>Build</Term>
          <Value>{BUILD}</Value>
        </div>
        <div className={CELL}>
          <Term>Date</Term>
          <Value>{BUILD_DATE}</Value>
        </div>
        <div className={CELL}>
          <Term>Registry</Term>
          <Value>1 item</Value>
        </div>
        <div className={CELL}>
          <Term>Deployed on</Term>
          <Value>GitHub Pages</Value>
        </div>
        <div className={CELL}>
          <Term>Source code</Term>
          <Value href={github}>GitHub</Value>
        </div>
        <div className={CELL}>
          <Term>Domain</Term>
          <Value>{content.domain.split(".")[0]}</Value>
        </div>
        <div className={CELL}>
          <Term>Typeface</Term>
          <Value>Geist</Value>
        </div>
        <StackList term="Stack" items={STACK} className="col-span-2 lg:col-span-2" />
        <StackList term="Libraries" items={LIBRARIES} className="col-span-2 lg:col-span-2" />
      </div>

      {/* bottom bar: credit block left, socials right (inline glyphs) */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-col gap-[2px] font-mono text-[13px] leading-[18px] text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            Designed &amp; Made with
            <svg viewBox="0 0 256 256" className="size-3" aria-hidden>
              <path
                d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </span>
          <span className="text-xs">© 2026 {content.name}. All rights reserved.</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {content.socials.map((s, i, list) => {
            const glyph = SOCIAL_ICONS[s.label];
            return (
              <span key={s.label} className="flex items-center gap-3">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="size-4 text-neutral-500 transition-colors duration-300 hover:text-foreground dark:text-neutral-400"
                >
                  <svg viewBox={glyph.viewBox} className="size-full" aria-hidden>
                    {glyph.node}
                  </svg>
                </a>
                {i < list.length - 1 && (
                  <span aria-hidden className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
