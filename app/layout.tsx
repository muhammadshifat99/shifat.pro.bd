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
  title: "Muhammad Shifat | AI Automation & Digital Marketing Expert Bangladesh",
  description:
    "Muhammad Shifat, aka Shifat NPC — Digital Marketing Enthusiast & Chief Marketing Officer at NPC Automators, an AI automation agency in Bangladesh. Building AI agents, workflow automation, and full-stack apps in TypeScript, React, and Next.js. ডিজিটাল মার্কেটিং ও এআই অটোমেশন বিশেষজ্ঞ বাংলাদেশ।",
  keywords: [
    // ── Identity ──
    "Muhammad Shifat",
    "Shifat NPC",

    // ── AI automation agency — Bangladesh ──
    "AI automation agency Bangladesh",
    "AI automation company Bangladesh",
    "AI agency Bangladesh",
    "automation agency Dhaka",
    "AI solutions Bangladesh",
    "hire AI automation expert Bangladesh",

    // ── AI automation agency — worldwide ──
    "AI automation agency",
    "AI automation services",
    "AI automation company",
    "AI agency",
    "AI agent development agency",
    "AI workflow automation services",
    "AI process automation agency",
    "custom AI solutions for business",
    "AI chatbot automation agency",
    "AI-powered marketing automation",
    "AI sales automation agency",
    "AI CRM automation",
    "AI automation for ecommerce",
    "autonomous AI agents for business",
    "no-code AI automation",

    // ── Trending 2025-2026 ──
    "agentic AI",
    "AI agents as a service",
    "autonomous AI agents",
    "AI orchestration",
    "multi-agent systems",
    "AI copilot development",
    "hyperautomation",
    "intelligent process automation",
    "LLM-powered agents",
    "AI agent builder",
    "agentic RAG",
    "AI-native agency",

    // ── Automation platforms ──
    "n8n automation expert",
    "Make.com automation agency",
    "Zapier automation expert",

    // ── Programming languages ──
    "HTML developer",
    "CSS expert",
    "JavaScript programmer",
    "PHP developer",
    "TypeScript developer",
    "Laravel expert",

    // ── Tech stack ──
    "React developer",
    "Next.js developer",
    "MERN stack developer",
    "React UI",
    "Tailwind UI",
    "Flutter UI",

    // ── Web developer — Bangladesh ──
    "web developer Bangladesh",
    "web developer BD",
    "web developer in Bangladesh",
    "bangladesh web developer",
    "full stack developer Bangladesh",
    "full stack web developer",
    "software engineer in Bangladesh",
    "React developer Bangladesh",
    "Next.js developer Bangladesh",
    "TypeScript developer Bangladesh",
    "full stack developer Dhaka",
    "hire web developer Bangladesh",
    "freelance full stack developer Bangladesh",
    "SaaS application developer Bangladesh",
    "affordable full stack developer",
    "best freelance web developer Bangladesh",
    "it engineer in Bangladesh",
    "it engineer resume",

    // ── Web developer — worldwide ──
    "web developer",
    "freelance web developer",
    "freelance full stack developer",
    "remote full stack developer",
    "hire full-stack developer",
    "freelance React developer remote",
    "React Node.js developer for hire",
    "remote web developer for hire",
    "end-to-end web development services",

    // ── WordPress ──
    "WordPress developer",
    "WordPress expert",
    "WordPress website development",
    "WordPress website design",
    "WordPress designer",
    "WordPress customization",
    "WordPress theme customization",
    "WordPress plugin development",
    "WordPress SEO",
    "WordPress speed optimization",
    "WordPress security",
    "WordPress bug fixes",
    "WordPress migration",
    "WordPress landing page",
    "WordPress website redesign",
    "WordPress malware removal",
    "WordPress ecommerce website",
    "WordPress Elementor expert",
    "WordPress Divi website",
    "WordPress specialist",
    "Full stack WordPress developer",
    "WordPress consultant",
    "Custom WordPress website",
    "Responsive WordPress design",
    "Figma to WordPress",
    "PSD to WordPress",
    "WordPress theme development",
    "WooCommerce",
    "WooCommerce online store",
    "WooCommerce theme customization",
    "Divi theme customization",
    "Elementor page design",
    "Avada theme customization",

    // ── Shopify ──
    "Shopify developer",
    "Shopify UI",
    "Shopify online store",
    "Shopify theme customization",
    "Shopify store design",
    "Shopify products update",

    // ── Wix ──
    "Wix website designer",
    "Wix website development",
    "Wix website customization",
    "Wix website redesign",
    "Responsive Wix website design",

    // ── Design tools ──
    "Figma designer",
    "Figma to HTML",
    "Figma to Webflow",
    "Webflow developer",
    "Webflow designer",
    "Framer website",
    "Framer designer",
    "Sketch designer",
    "Adobe XD designer",
    "Illustrator",
    "Photoshop",

    // ── UI/UX Design ──
    "UI UX designer",
    "UX UI designer",
    "UI UX design",
    "UX research",
    "UX audit",
    "UI design system",
    "UX strategy",
    "wireframing",
    "prototyping",
    "user-centered design",
    "B2B SaaS UI UX",
    "SaaS dashboard design",
    "CRM design",
    "ERP design",
    "mobile app UI UX",
    "Figma mobile app design",
    "responsive UI UX design",
    "conversion optimization",
    "WCAG accessible design",
    "design handoff",
    "component library",
    "scalable UI kit",

    // ── Ecommerce ──
    "ecommerce UX design",
    "ecommerce web design",
    "high-converting ecommerce",
    "ecommerce website design",
    "online store design",
    "ecommerce conversion optimization",

    // ── Website types ──
    "responsive business website",
    "personal blog website",
    "portfolio website",
    "real estate website",
    "dental website",
    "cleaning website",
    "hotel booking website",
    "booking website",
    "any website design",
    "mobile responsive design",

    // ── Website services ──
    "website bug fix",
    "website speed optimization",
    "domain hosting setup",
    "website responsive fix",
    "basic SEO optimization",
    "website customization",

    // ── CSE student — Bangladesh ──
    "CSE student Bangladesh",
    "computer science student BD",
    "CSE student portfolio Bangladesh",
    "tech student Bangladesh",
    "young developer Bangladesh",
    "student developer BD",
    "Bangladeshi developer community",
    "open source contributor Bangladesh",
    "GSOC contributor Bangladesh",
    "Bangladeshi developer GitHub",

    // ── Digital marketing — Bangladesh ──
    "digital marketing Bangladesh",
    "digital marketing agency Bangladesh",
    "social media marketing agency Bangladesh",
    "Facebook marketing agency Bangladesh",
    "SEO expert Bangladesh",
    "content marketing Bangladesh",
    "growth marketing Bangladesh",
    "performance marketing Bangladesh",
    "AI-powered digital marketing Bangladesh",
    "digital marketing for startups Bangladesh",
    "conversion rate optimization Bangladesh",
    "local SEO service Bangladesh",
    "WhatsApp marketing service Bangladesh",

    // ── Digital marketing — worldwide ──
    "growth marketing agency",
    "growth marketing strategy",
    "marketing automation agency",
    "marketing automation tools",
    "AI marketing automation",
    "performance marketing",
    "demand generation",
    "content strategy",
    "brand strategy",
    "AI-powered lead generation",
    "lead nurturing automation",
    "marketing automation workflows",
    "AI-driven customer segmentation",
    "product-led growth",
    "AI SEO automation",

    // ── Business & growth — Bangladesh ──
    "business growth Bangladesh",
    "startup Bangladesh",
    "entrepreneur Bangladesh",
    "SME Bangladesh",
    "tech startup Bangladesh",
    "business automation Bangladesh",
    "online business Bangladesh",
    "business strategy Bangladesh",

    // ── Business & growth — worldwide ──
    "business automation",
    "AI for business",
    "AI automation tools",
    "automate business processes",
    "business process automation AI",
    "AI-powered business automation",
    "best AI tools for small business",
    "AI agents for business automation",
    "AI workflow automation platforms",
    "AI automation ROI",
    "automation for founders",
    "SME automation",
    "scaling business with AI",
    "enterprise AI automation",
    "digital transformation",

    // ── Freelancing — Bangladesh ──
    "freelancer Bangladesh",
    "freelance developer Bangladesh",
    "freelance marketer Bangladesh",
    "Fiverr Bangladesh",
    "Upwork Bangladesh",
    "online earning Bangladesh",
    "remote work Bangladesh",
    "affordable freelance developer Bangladesh",
    "top rated Bangladeshi freelancer",
    "5 star rated freelancer",

    // ── Freelancing — worldwide ──
    "freelance AI automation expert",
    "freelance automation expert",
    "remote developer for hire",
    "freelance tech consultant",

    // ── Branding & visual design ──
    "brand identity design",
    "logo design",
    "SaaS branding",
    "brand guide",
    "UI animation",
    "micro-interactions",
    "motion UI",
    "graphic designer",
    "product designer",
    "game UI designer",

    // ── Industries served ──
    "FinTech UI UX",
    "Crypto UI UX",
    "Web3 design",
    "Healthcare UI UX",
    "HealthTech design",
    "EdTech UI UX",
    "AI UI UX",

    // ── Additional ──
    "process automation",
    "tech enthusiast",
    "digital marketing enthusiast",
    "open source contributor",
    "SaaS development",
    "AI integrations",
    "SaaS UI UX design",
    "dashboard design",
    "landing page design",
    "website design",
    "MVP development",
    "web app development",
    "mobile app development",

    // ── Bangla/Bengali keywords (বাংলা) ──
    "ওয়েব ডেভেলপার বাংলাদেশ",
    "ওয়েব ডিজাইন বাংলাদেশ",
    "ওয়েবসাইট ডেভেলপমেন্ট বাংলাদেশ",
    "ডিজিটাল মার্কেটিং বাংলাদেশ",
    "এআই অটোমেশন বাংলাদেশ",
    "ফুল স্ট্যাক ডেভেলপার বাংলাদেশ",
    "সফটওয়্যার ইঞ্জিনিয়ার বাংলাদেশ",
    "ওয়ার্ডপ্রেস ডেভেলপার",
    "ওয়ার্ডপ্রেস ওয়েবসাইট",
    "ই-কমার্স ওয়েবসাইট",
    "ফ্রিল্যান্সার বাংলাদেশ",
    "ফ্রিল্যান্স ডেভেলপার",
    "ফাইভার বাংলাদেশ",
    "আপওয়ার্ক বাংলাদেশ",
    "অনলাইন আয় বাংলাদেশ",
    "সিএসই স্টুডেন্ট বাংলাদেশ",
    "প্রোগ্রামিং বাংলাদেশ",
    "সোশ্যাল মিডিয়া মার্কেটিং",
    "ফেসবুক মার্কেটিং",
    "এসইও এক্সপার্ট বাংলাদেশ",
    "গ্রাফিক ডিজাইনার",
    "ইউআই ডিজাইনার",
    "মোবাইল অ্যাপ ডেভেলপমেন্ট",
    "রিয়েক্ট ডেভেলপার",
    "নেক্সট জেএস ডেভেলপার",
    "টাইপস্ক্রিপ্ট ডেভেলপার",
    "এআই এজেন্ট",
    "বিজনেস অটোমেশন",
    "ওয়ার্কফ্লো অটোমেশন",
    "শপিফাই ডেভেলপার",
    "উইক্স ওয়েবসাইট",
    "ফিগমা ডিজাইনার",
    "ওয়েবফ্লো ডেভেলপার",
    "এসএমই বাংলাদেশ",
    "স্টার্টআপ বাংলাদেশ",
    "বিজনেস গ্রোথ বাংলাদেশ",
    "ডিজিটাল মার্কেটিং এজেন্সি",
    "এআই মার্কেটিং",
    "কনটেন্ট মার্কেটিং",
    "পারফরম্যান্স মার্কেটিং",
    "গ্রোথ মার্কেটিং",
    "ওয়েবসাইট স্পিড অপটিমাইজেশন",
    "ওয়েবসাইট সিকিউরিটি",
    "এসইও সার্ভিস",
    "ডোমেইন হোস্টিং",
    "ই-কমার্স সলিউশন",
    "কাস্টম ওয়েবসাইট",
    "রেসপন্সিভ ডিজাইন",
  ],
  metadataBase: new URL("https://shifat.pro.bd"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-light.png" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Muhammad Shifat | Digital Marketing & AI Automation Expert Bangladesh",
    description:
      "Digital Marketing Enthusiast & CMO at NPC Automators. AI agents, workflow automation, full-stack development, and growth marketing in TypeScript, React, and Next.js. ডিজিটাল মার্কেটিং ও এআই বিশেষজ্ঞ।",
    url: "https://shifat.pro.bd",
    siteName: "Muhammad Shifat",
    images: [
      {
        url: "https://shifat.pro.bd/avatar.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Shifat — AI Automation & Full-Stack Developer",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shifat | Digital Marketing & AI Expert",
    description:
      "Digital Marketing Enthusiast & CMO at NPC Automators. AI automation, full-stack development, and growth marketing. ডিজিটাল মার্কেটিং বিশেষজ্ঞ।",
    images: ["https://shifat.pro.bd/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Hero images as head preloads: the welcome gate hides content with
  // visibility:hidden (loads start but unprioritized), so on a cold cache
  // images could still be fetching when the loader lifts and pop in late.
  preload("/avatar.png", { as: "image" });
  preload("/projects/placeholder.png", { as: "image" });
  // Both signature variants: the welcome loader animates one in ~1.5s after
  // load, before the theme-hidden variant would otherwise be fetched.
  preload("/hero-signeture-black.png", { as: "image" });
  preload("/hero-signeture-white.png", { as: "image" });

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${overusedGrotesk.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
          <DockBar />
        </ThemeProvider>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Shifat",
              alternateName: "Shifat NPC",
              url: "https://shifat.pro.bd",
              image: "https://shifat.pro.bd/avatar.png",
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
              founder: {
                "@type": "Person",
                name: "Muhammad Shifat",
              },
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
      </body>
    </html>
  );
}
