import type { Metadata } from "next";
import { ogImage } from "@/lib/metadata";

// See app/work/layout.tsx for why the metadata sits in a layout rather than in
// the page: page.tsx is a Client Component, and `metadata` is Server Component
// only. The canonical keeps this route from inheriting the root's `canonical: "/"`.
export const metadata: Metadata = {
  title: "Tech Stack — React, Next.js, TypeScript & AI Tools",
  description:
    "The stack Muhammad Shifat builds with — TypeScript, React, Next.js, Node.js, Python and cloud platforms, plus the AI tools behind his automation work.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Tech Stack — React, Next.js, TypeScript & AI Tools",
    description:
      "TypeScript, React, Next.js, Node.js, Python and cloud platforms, plus the AI tools behind the automation work.",
    url: "/skills",
    images: [ogImage],
  },
};

export default function SkillsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
