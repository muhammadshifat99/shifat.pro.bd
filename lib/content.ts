// All personal content lives here — sourced from the GitHub profile
// github.com/muhammadshifat99. Nothing personal is hardcoded in components.

export type ExperienceEntry = {
  company: string;
  icon: "code" | "pen";
  url: string;
  logo: string;
  logoInvert: boolean;
  location: string;
  locationNote: string | null;
  role: string;
  type: string;
  start: string;
  end: string | null;
  duration: string | null;
  highlights: string[];
  tags: string[];
};

export const content = {
  name: "Muhammad Shifat",
  username: "muhammadshifat99",
  headline: "Web Developer",
  subtext: "I build for the web and automate with AI.",
  email: "muhammadshifat@yahoo.com",
  domain: "shifat.pro.bd",
  socials: [
    { label: "GitHub", url: "https://github.com/muhammadshifat99" },
    { label: "X", url: "https://x.com/ShifatNPC" },
    { label: "LinkedIn", url: "https://linkedin.com/in/muhammadshifat99" },
  ],
  experience: [] as ExperienceEntry[],
  projects: [
    {
      name: "Tuktak",
      description: "Business site for Tuktak Tech.\n— HTML & CSS",
      image: "/projects/placeholder.png",
      url: "https://tuktakteck.vercel.app",
      note: null,
    },
    {
      name: "Calculator",
      description: "A simple calculator using\nHTML, CSS and JavaScript.",
      image: "/projects/placeholder.png",
      url: "https://html-css-js-calulator.vercel.app",
      note: null,
    },
  ],
  skills: [
    {
      index: "01",
      name: "Language",
      items: [
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
      ],
    },
    {
      index: "02",
      name: "Frontend",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Radix UI", icon: "radix" },
        { name: "Base UI", icon: "baseui" },
        { name: "Motion", icon: "motion" },
        { name: "Expo", icon: "expo" },
      ],
    },
    {
      index: "03",
      name: "Workflow & AI",
      items: [
        { name: "Claude", icon: "claude" },
        { name: "Cursor", icon: "cursor" },
        { name: "Gemini", icon: "gemini" },
        { name: "ChatGPT", icon: "chatgpt" },
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "VS Code", icon: "vscode" },
        { name: "Docker", icon: "docker" },
        { name: "Vercel", icon: "vercel" },
      ],
    },
    {
      index: "04",
      name: "Design",
      items: [
        { name: "Figma", icon: "figma" },
        { name: "Photoshop", icon: "photoshop" },
      ],
    },
  ],
  archive: [
    {
      year: "2026",
      name: "HBL Beta",
      description: "TypeScript project.",
      url: "https://github.com/muhammadshifat99/HBL-Beta",
    },
    {
      year: "2025",
      name: "Onek Din Por",
      description: "HTML project.",
      url: "https://github.com/muhammadshifat99/onek-din-por",
    },
    {
      year: "2025",
      name: "Tanjir's Site",
      description: "HTML site build.",
      url: "https://github.com/muhammadshifat99/tanjirs-site",
    },
    {
      year: "2024",
      name: "3D Globe",
      description: "Interactive 3D globe in JavaScript.",
      url: "https://github.com/muhammadshifat99/3D-GLOBE",
    },
    {
      year: "2024",
      name: "Good Nap",
      description: "HTML project.",
      url: "https://github.com/muhammadshifat99/Good-Nap",
    },
  ],
} as const;
