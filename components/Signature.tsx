import { content } from "@/lib/content";

// Text wordmark — shared between the hero and the colophon. Fills with
// currentColor, so each usage themes via its text color.
export function SignatureGlyph() {
  return (
    <text
      x="960"
      y="540"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="currentColor"
      fontSize="230"
      fontWeight="500"
      letterSpacing="-6"
      style={{ fontFamily: "var(--font-overused-grotesk)" }}
    >
      {content.name}
    </text>
  );
}
