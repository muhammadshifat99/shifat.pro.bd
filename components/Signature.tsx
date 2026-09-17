// Signature wordmark — shared between the hero and the welcome loader. Two
// transparent WebPs swapped by theme: black ink for light mode, white for dark.
// Rendered as SVG <image> so the existing <svg viewBox="0 0 1920 1080">
// wrappers (and their motion/spring animations) stay unchanged. The 2:1 art is
// centered within the 16:9 viewBox via preserveAspectRatio.
//
// The rasters are 512px wide: the largest on-screen use is the welcome loader
// at 8rem tall (~227px wide), so 512 covers 2x DPR with room to spare.
export function SignatureGlyph() {
  return (
    <>
      <image
        href="/hero-signeture-black.webp"
        width="1920"
        height="1080"
        preserveAspectRatio="xMidYMid meet"
        className="dark:hidden"
      />
      <image
        href="/hero-signeture-white.webp"
        width="1920"
        height="1080"
        preserveAspectRatio="xMidYMid meet"
        className="hidden dark:block"
      />
    </>
  );
}
