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
  title: `${content.name} | ${content.headline}`,
  description: content.subtext,
  icons: {
    icon: [
      { url: "/favicon-light.png" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
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
      </body>
    </html>
  );
}
