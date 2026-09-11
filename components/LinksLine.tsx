import { content } from "@/lib/content";

// pill matching the site's own button style (motion/button pill variant:
// #e5e5e5 on light / #2a2a2a on dark), no drop shadow.
function LinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-auto shrink-0 items-center justify-center rounded-full bg-[#e5e5e5] px-[10px] py-[3px] text-[13px] leading-[18px] text-[#171717] transition-colors duration-300 hover:bg-[#d9d9d9] dark:bg-[#2a2a2a] dark:text-zinc-100 dark:hover:bg-[#333]"
    >
      {label}
    </a>
  );
}

export function LinksLine() {
  const pills: { label: string; url: string }[] = [
    { label: "GitHub", url: "https://github.com/muhammadshifat99" },
    { label: "X", url: "https://x.com/ShifatNPC" },
    { label: "LinkedIn", url: "https://linkedin.com/in/muhammadshifat99" },
    { label: "Instagram", url: "https://instagram.com/muhammadshifat99" },
    { label: "Facebook", url: "https://facebook.com/ShifatAlHindi" },
    { label: "Discord", url: "https://discord.gg/muhammadshifat99" },
    { label: "Email", url: `mailto:${content.email}` },
  ];
  return (
    <section className="w-full">
      <p className="text-[14px] leading-5 text-neutral-500 dark:text-neutral-400">
        You can check these{" "}
        <span className="font-medium text-foreground">links</span> if you wish to.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {pills.map((s) => (
          <LinkPill key={s.label} href={s.url} label={s.label} />
        ))}
      </div>
    </section>
  );
}
