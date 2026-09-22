import type { Metadata } from "next";

// `openGraph.images` is typed as a single image OR an array of them, so
// `NonNullable<...>["images"][number]` does not compile — there is no numeric
// index on a union. The helper distributes over that union and pulls the element
// type out of the array branch, which keeps the real check below instead of
// dropping it and letting a typo like `widht` pass silently at the use site.
type ElementOf<T> = T extends readonly (infer U)[] ? U : T;
type OGImage = ElementOf<
  NonNullable<NonNullable<Metadata["openGraph"]>["images"]>
>;

// The social card, defined once and spread into every route that sets its own
// `openGraph`.
//
// Metadata from nested segments merges *shallowly*: a route that defines
// `openGraph` replaces the parent's entire openGraph object — image included,
// not only the keys it names. Without a shared constant, each route below the
// root would have to repeat this by hand or silently ship a card with no image.
export const ogImage = {
  url: "https://shifat.pro.bd/og.jpg",
  width: 1200,
  height: 630,
  alt: "Muhammad Shifat — AI Automation & Digital Marketing",
} satisfies OGImage;
