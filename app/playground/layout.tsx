import type { Metadata } from "next";
import { ogImage } from "@/lib/metadata";

// See app/work/layout.tsx for why the metadata sits in a layout rather than in
// the page. The canonical is what stops this route inheriting the root's
// `canonical: "/"` and being treated as a duplicate of the homepage.
//
// No `robots: { index: false }` here: the page is empty today, but it is a real
// destination in the dock and is intended to be filled, so it stays indexable.
export const metadata: Metadata = {
  title: "Craft — Experiments & Playground Projects",
  description:
    "Experiments and side projects by Muhammad Shifat — front-end, motion and interaction work built with React and Next.js.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "Craft — Experiments & Playground Projects",
    description:
      "Experiments and side projects — front-end, motion and interaction work in React and Next.js.",
    url: "/playground",
    images: [ogImage],
  },
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
