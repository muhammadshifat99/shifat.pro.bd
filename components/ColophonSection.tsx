import type { ReactNode } from "react";
import { content } from "@/lib/content";

// snapshot of the build at time of writing — refresh on big deploys
const BUILD = "dev";
const BUILD_DATE = "2026-09-10";

// brand glyphs inlined so the icons inherit the anchor's text color
// (<img> would pin currentColor to black). Keyed by social label; the footer
// renders the full presence set (the hero pills bookend the primary three).
type SocialGlyph = { viewBox: string; node: ReactNode };
const SOCIAL_GLYPHS: Record<string, SocialGlyph> = {
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
  Instagram: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
      />
    ),
  },
  Facebook: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      />
    ),
  },
  Discord: {
    viewBox: "0 0 24 24",
    node: (
      <path
        fill="currentColor"
        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
      />
    ),
  },
};

const STACK = ["next@16.3.1", "react@19.2.8", "tailwindcss@4"];
// three@0.185.1 was listed here but the package was never imported anywhere —
// the 31MB dependency has been dropped, so the credit goes with it. Swap in
// another library that actually ships in this build if the column should stay
// at three entries (next-themes, react-apple-emojis and radix-slot all qualify).
const LIBRARIES = ["motion@13.1.0", "lucide-react@0.577.0"];

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

      {/* bottom bar: credit block left, full social set right (inline glyphs) */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
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
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3.5">
          {content.socials.map((s) => {
            const glyph = SOCIAL_GLYPHS[s.label];
            if (!glyph) return null;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="size-4 text-neutral-500 transition-colors duration-300 hover:text-foreground dark:text-neutral-400"
              >
                <svg viewBox={glyph.viewBox} className="size-full" aria-hidden>
                  {glyph.node}
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
