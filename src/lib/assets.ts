/**
 * Local assets.
 *
 * The portrait fills the slot the Figma design gives the logo mark
 * (node 570:317). `logoGlow` is still the placeholder ambient blob for
 * node 570:293 and wants replacing with the real export.
 *
 * `public/brand/monogram.svg` is no longer referenced — it was the stand-in
 * for the logo mark before the photo replaced it.
 *
 * Icons are not here: every icon layer in the design is named after an
 * Iconify set, so they are referenced by name from `content.ts` and `site.ts`
 * and rendered through the bundled data in `icon-data.ts`.
 */
export const brand = {
  /** Ambient glow behind the portrait — placeholder for node 570:293 */
  logoGlow: "/brand/glow.svg",
} as const;

/**
 * 2790x3720 (3:4). Cropped square to the design's slot, with the focal point
 * set so the eyes land near the upper third — see `hero.tsx`.
 */
export const portrait = {
  src: "/assets/portrait_gradient_background.png",
  alt: "Asrorjon Makhmudov",
  width: 2790,
  height: 3720,
} as const;
