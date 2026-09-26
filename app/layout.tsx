import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { content } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { DockBar } from "@/components/DockBar";
import { SiteShell } from "@/components/SiteShell";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-Medium.woff2",
  weight: "500",
  variable: "--font-overused-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Shifat | AI Automation & Digital Marketing Expert",
  description:
    "Muhammad Shifat — CMO at NPC Automators, an AI automation agency in Bangladesh. Building AI agents, workflow systems, and full-stack apps.",
  metadataBase: new URL("https://shifat.pro.bd"),
  alternates: {
    canonical: "/",
  },
  // index/follow restate the default; max-image-preview:large is the one that
  // actually does something — without it Google will not show a full-width
  // thumbnail, which is the whole point of shipping a 1200x630 card.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-light.png" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    // Kept identical to `title` above rather than a longer variant. A feed card
    // truncates near 60 chars, and "Bangladesh" — the only word the long version
    // added — is already covered by the description and the domain.
    title: "Muhammad Shifat | AI Automation & Digital Marketing Expert",
    // Social cards have more room than the SERP snippet (Twitter's
    // summary_large_image allows ~200), so this is longer than `description`
    // above.
    //
    // No Bangla here or in `description`. Bangla copy in metadata advertises a
    // Bangla page that does not exist — the site has no /bn route, so a Bangla
    // searcher who clicks lands on English. The one Bangla line that is live
    // (the Poro Webzine tagline in lib/content.ts) belongs to a Bengali
    // literary project and stays.
    description:
      "Muhammad Shifat (Shifat NPC) — CMO at NPC Automators. AI agents, workflow automation, and full-stack development in TypeScript.",
    url: "https://shifat.pro.bd",
    siteName: "Muhammad Shifat",
    images: [
      {
        // A purpose-built 1200x630 card, not the 400x400 avatar. The square
        // was below the size both Facebook and X recommend for a large card,
        // so it rendered cropped and soft. JSON-LD `image` still points at the
        // square avatar — that one is a portrait, and square is correct there.
        url: "https://shifat.pro.bd/og.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Shifat — AI Automation & Digital Marketing",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shifat | Digital Marketing & AI Expert",
    description:
      "Digital Marketing Enthusiast & CMO at NPC Automators. AI automation, full-stack development, and growth marketing.",
    images: ["https://shifat.pro.bd/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Hero images as head preloads: the welcome gate renders content behind an
  // opaque loader, so unprioritised image requests would still be in flight
  // when the loader lifts and pop in late.
  //
  // The wordmark is the only one worth preloading — it is the LCP candidate and
  // is on screen from the first frame. avatar.webp is not: it only ever appears
  // inside a hover card, so preloading it competes with the wordmark for
  // bandwidth on every load that never hovers anything.
  //
  // Only the dark-mode variant is listed — next-themes starts every visitor on
  // dark (defaultTheme="dark", enableSystem={false}), so the light wordmark is
  // dead weight on the critical path and loads on demand if toggled.
  preload("/hero-signeture-white.webp", { as: "image" });

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${overusedGrotesk.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
          <DockBar />
        </ThemeProvider>

        {/* JSON-LD Structured Data */}
        {/* The site itself, as a node other blocks can point at. Declared here
            rather than inline inside another block's property: an inline copy
            has no @id, so nothing can reference it and the site and its author
            stay two loose statements instead of one graph. `publisher` points
            back at the Person below, which is what ties them together.

            WebSite, Person and Organization live in the root layout because
            they describe entities that exist independently of any one page.
            ProfilePage and FAQPage describe one specific page, so they live in
            app/page.tsx instead — see the note there.

            `alternateName` feeds Google's site-name feature, which reads it as
            a preference-ordered list — the first entry it has confidence in
            wins. "Shifat NPC" leads the alternates because that is what the
            brand is searched by; the bare domain is the documented last resort
            and has to stay lowercase to be read as a preference rather than an
            arbitrary string. The site-name docs say to nest these in the
            existing WebSite node rather than emit a second block. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://shifat.pro.bd/#website",
              name: "Muhammad Shifat",
              alternateName: ["Shifat NPC", "Shifat", "shifat.pro.bd"],
              url: "https://shifat.pro.bd",
              inLanguage: "en",
              publisher: { "@id": "https://shifat.pro.bd/#person" },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://shifat.pro.bd/#person",
              name: "Muhammad Shifat",
              alternateName: "Shifat NPC",
              url: "https://shifat.pro.bd",
              image: "https://shifat.pro.bd/avatar.jpg",
              jobTitle: "Chief Marketing Officer",
              worksFor: {
                "@type": "Organization",
                name: "NPC Automators",
                url: "https://npcautomators.com",
              },
              knowsAbout: [
                "AI Automation",
                "TypeScript",
                "React",
                "Next.js",
                "Workflow Automation",
              ],
              sameAs: [
                "https://linkedin.com/in/muhammadshifat99",
                "https://github.com/muhammadshifat99",
                "https://x.com/ShifatNPC",
                "https://www.fiverr.com/mdshifat99",
                "https://www.upwork.com/freelancers/~018921bdbb7673d3ae",
              ],
            }),
          }}
        />
                <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NPC Automators",
              alternateName: "Engineering Invisible Employees",
              url: "https://npcautomators.com",
              description:
                "AI automation agency building AI agents, workflow automation, AI integrations, custom automation systems, and internal dashboards for business owners, founders, and SMEs.",
              founder: { "@id": "https://shifat.pro.bd/#person" },
            }),
          }}
        />
              </body>
    </html>
  );
}
