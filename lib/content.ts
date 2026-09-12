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
  // Every GitHub handle whose contributions feed the single activity graph.
  // Only `username` (above) is linked publicly — the rest are side accounts
  // and orgs I contribute to, merged into the count only, no separate graph.
  contributionAccounts: [
    "muhammadshifat99",
    "cocthree494-sudo",
    "tuktakteckshop",
    "NPCAutomators",
    "barishalreadersforum",
  ],
  headline: "Tech Enthusiast",
  headlineFull: "Full-Stack Technology Enthusiast",
  subtext: "I build for the web and automate with AI.",
  email: "muhammadshifat@yahoo.com",
  domain: "shifat.pro.bd",
  // Full social presence. The hero pills surface the three primary ones
  // (X, GitHub, LinkedIn) by label; the footer renders the whole set as a
  // bookend. Consumers look up by label, so order/length here is flexible.
  socials: [
    { label: "GitHub", url: "https://github.com/muhammadshifat99" },
    { label: "X", url: "https://x.com/ShifatNPC" },
    { label: "LinkedIn", url: "https://linkedin.com/in/muhammadshifat99" },
    { label: "Instagram", url: "https://instagram.com/muhammadshifat99" },
    { label: "Facebook", url: "https://facebook.com/ShifatAlHindi" },
    { label: "Discord", url: "https://discord.gg/muhammadshifat99" },
  ],
  experience: [
    {
      company: "NPC Automators",
      icon: "pen",
      url: "https://www.npcautomators.com",
      logo: "",
      logoInvert: false,
      location: "Bangladesh",
      locationNote: null,
      role: "Chief Marketing Officer (CMO)",
      type: "Full Time",
      start: "2026",
      end: null,
      duration: null,
      highlights: [
        "Lead marketing for an AI automation startup built around the positioning “Engineering Invisible Employees.”",
        "Own brand, content, and demand generation across LinkedIn, Facebook, Instagram, X, Reddit, and Pinterest.",
        "Built the customer acquisition engine — organic content marketing, cold outreach, newsletters, and referral programs.",
        "Work alongside the CEO and CTO to take the agency from Bangladesh into international markets.",
      ],
      tags: ["Marketing", "Brand Strategy", "Content", "AI Automation", "Growth"],
    },
    {
      company: "Freelance",
      icon: "code",
      url: "https://shifat.pro.bd",
      logo: "",
      logoInvert: false,
      location: "Bangladesh",
      locationNote: "(Remote)",
      role: "Web Developer",
      type: "Freelance",
      start: "2020",
      end: null,
      duration: null,
      highlights: [
        "Build and ship websites and web apps for clients, from landing pages to full product frontends.",
        "Work across the stack with HTML, CSS, JavaScript, TypeScript, React, and Next.js.",
        "Handle projects end to end — scoping, implementation, and deployment to Vercel and GitHub Pages.",
      ],
      tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
    },
  ] as ExperienceEntry[],
  projects: [
    {
      name: "NPC Automators",
      description: "AI automation & software startup.\n— Engineering Invisible Employees",
      image: "/projects/npcautomators-placeholder.png",
      url: "https://www.npcautomators.com",
      note: null,
    },
    {
      name: "Poro Webzine",
      description: "Bengali literary webzine.\n— সুরভিত ঐতিহ্যের সন্ধানে",
      image: "/projects/poro-placeholder.png",
      url: "https://porowebzine.vercel.app",
      note: null,
    },
  ],
  skills: [
    {
      index: "01",
      name: "Languages",
      items: [
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Python", icon: "python" },
        { name: "PHP", icon: "php" },
        { name: "Rust", icon: "rust" },
      ],
    },
    {
      index: "02",
      name: "Frontend",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Vue.js", icon: "vue" },
        { name: "Nuxt", icon: "nuxt" },
        { name: "Vite", icon: "vite" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "DaisyUI", icon: "daisyui" },
        { name: "Radix UI", icon: "radix" },
        { name: "Base UI", icon: "baseui" },
        { name: "Motion", icon: "motion" },
        { name: "jQuery", icon: "jquery" },
        { name: "React Router", icon: "reactrouter" },
        { name: "React Query", icon: "reactquery" },
        { name: "React Hook Form", icon: "reacthookform" },
      ],
    },
    {
      index: "03",
      name: "Mobile & Desktop",
      items: [
        { name: "React Native", icon: "reactnative" },
        { name: "Flutter", icon: "flutter" },
        { name: "Expo", icon: "expo" },
        { name: "Tauri", icon: "tauri" },
      ],
    },
    {
      index: "04",
      name: "Backend",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "NestJS", icon: "nestjs" },
        { name: "Django", icon: "django" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Strapi", icon: "strapi" },
        { name: "WordPress", icon: "wordpress" },
        { name: "JWT", icon: "jwt" },
      ],
    },
    {
      index: "05",
      name: "Database",
      items: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
        { name: "MariaDB", icon: "mariadb" },
        { name: "SQLite", icon: "sqlite" },
        { name: "Redis", icon: "redis" },
        { name: "Supabase", icon: "supabase" },
        { name: "SQL Server", icon: "sqlserver" },
      ],
    },
    {
      index: "06",
      name: "Cloud & Hosting",
      items: [
        { name: "Vercel", icon: "vercel" },
        { name: "AWS", icon: "aws" },
        { name: "Google Cloud", icon: "googlecloud" },
        { name: "Cloudflare", icon: "cloudflare" },
        { name: "Firebase", icon: "firebase" },
        { name: "Netlify", icon: "netlify" },
        { name: "Render", icon: "render" },
      ],
    },
    {
      index: "07",
      name: "DevOps & Tools",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Docker", icon: "docker" },
        { name: "npm", icon: "npm" },
        { name: "Postman", icon: "postman" },
        { name: "Puppeteer", icon: "puppeteer" },
        { name: "VS Code", icon: "vscode" },
        { name: "Cursor", icon: "cursor" },
      ],
    },
    {
      index: "08",
      name: "AI",
      items: [
        { name: "Claude", icon: "claude" },
        { name: "ChatGPT", icon: "chatgpt" },
        { name: "Gemini", icon: "gemini" },
      ],
    },
    {
      index: "09",
      name: "Design",
      items: [
        { name: "Figma", icon: "figma" },
        { name: "Photoshop", icon: "photoshop" },
        { name: "Illustrator", icon: "illustrator" },
        { name: "Canva", icon: "canva" },
      ],
    },
  ],
  archive: [
    {
      year: "2026",
      name: "This Website",
      description: "shifat.pro.bd — Next.js static site.",
      url: "https://github.com/muhammadshifat99/shifat.pro.bd",
    },
    {
      year: "2026",
      name: "Certificate Generator",
      description: "Certificate generator web app.",
      url: "https://github.com/muhammadshifat99/certificate-generator",
    },
    {
      year: "2026",
      name: "Audio Library",
      description: "Audio library web app.",
      url: "https://github.com/muhammadshifat99/audio-library",
    },
    {
      year: "2026",
      name: "HBL Beta",
      description: "Health Beauty Line, built with React & TypeScript.",
      url: "https://github.com/muhammadshifat99/HBL-Beta",
    },
    {
      year: "2026",
      name: "Tuktak",
      description: "Tech shop storefront.",
      url: "https://github.com/muhammadshifat99/tuktak",
    },
  ],
} as const;
