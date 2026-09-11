# Changelog

All notable changes to [shifat.pro.bd](https://shifat.pro.bd/) — Muhammad Shifat's personal portfolio.

## 2026-09-10

### Rebrand
- Title changed to **Tech Enthusiast** (full form **Full-Stack Technology Enthusiast**)
- Replaced all placeholder content with real profile data from [github.com/muhammadshifat99](https://github.com/muhammadshifat99)
- Name, headline, email, socials, skills, projects, and archive now live in `lib/content.ts`; nothing personal is hardcoded in components
- Handwritten signature SVG replaced with a **text wordmark** in the loader and hero
- Avatar, project images, and favicons swapped to new assets; removed outdated badges, photos, resume, and dead components
- README and browser tab title rewritten for this project

### Deployment
- Added `public/.nojekyll` so the underscore-prefixed `_next` directory is served
- Deploy job now skips `pull_request` events

## 2026-08-26

### Site chrome & navigation
- Header and dock are permanent chrome on every page — only the page content changes; the header also sticks to the top while scrolling
- Dock renamed: Playground → **Craft**, Skills → **Stack** (routes unchanged)

### Work page
- **Experience** section: vertical timeline with logo tile, rail with bottom curl, and a pulsing dot on the current role

### Hero
- GitHub activity graph shows **real contribution data** (live from GitHub): hover any cell for that day's count, weeks aligned Sunday–Saturday, month labels, clip-and-swipe on mobile
- Graph cells enlarged to 10px — the latest 41 weeks fill the content margin

### Pill hover cards (X / GitHub / LinkedIn)
- All three cards share **one morphing frame** that glides between buttons and smoothly tweens its height instead of jumping

### Site-wide
- **Dark mode is now the default** for all visitors
- Themed favicon: dark icon in dark mode, light icon in light mode

## 2026-08-25

### Signature
- Welcome handoff eased with the shared ease-out curve: fast launch, brake, smooth settle
- Magnetic ink: the resting wordmark leans toward a nearby cursor (≤3px drift + ≤1.2° tilt, soft spring) and settles back on leave

## 2026-08-21

### Welcome loader
- Multilingual greeting loader (Hello → Bonjour → স্বাগতম → 你好 → こんにちは) that plays on every page load and hands off to the hero wordmark

### Hover cards & hero polish
- X and LinkedIn hover cards with avatars and Follow pills
- Bottom tooltips for the theme toggle and reactions
- Hero first-load choreography (staggered fade-ups), pill button copy/glide refinements, header reveal

## 2026-08-20

### Hero buildout
- Hero section with wordmark, Overused Grotesk greeting, and magnetic motion buttons
- Pill buttons (email, X, GitHub, LinkedIn) with copy-to-clipboard
- GitHub contributions hover card (theme-aware icon)
- Avatar hover card on the top-left logo that follows the cursor, plus a live session timer
- X/Y coordinate tracker in the header
- Theme toggle with View Transition animations

### Infrastructure
- Configured static export and GitHub Pages deployment with custom domain (`CNAME`)
