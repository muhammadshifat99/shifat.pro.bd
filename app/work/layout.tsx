import type { Metadata } from "next";
import { ogImage } from "@/lib/metadata";

// Metadata lives in this layout rather than in page.tsx because that page is a
// Client Component, and the `metadata` export is Server Component only. A layout
// in the same segment IS a Server Component, so it can carry the metadata while
// still wrapping the client page — no need to split the animation code out.
//
// `alternates.canonical` is the important line. Without it this route inherits
// the root layout's `canonical: "/"`, which told Google this page was a duplicate
// of the homepage and got it consolidated away rather than indexed.
export const metadata: Metadata = {
  title: "Experience — AI Automation & Full-Stack Development",
  description:
    "Muhammad Shifat's experience — CMO at NPC Automators, an AI automation agency in Bangladesh, and a freelance full-stack web developer since 2020.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Experience — AI Automation & Full-Stack Development",
    description:
      "CMO at NPC Automators, an AI automation agency in Bangladesh, and a freelance full-stack developer since 2020.",
    url: "/work",
    images: [ogImage],
  },
};

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
