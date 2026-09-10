/**
 * Local brand assets.
 *
 * PLACEHOLDERS — the real logo mark (Figma node 570:317) and favicon
 * (node 712:23) still need exporting from the Figma file. These stand in so
 * nothing renders broken; swap the two SVGs in `public/brand/` and this file
 * needs no change.
 *
 * Icons are not here: every icon layer in the design is named after an
 * Iconify set, so they are referenced by name from `content.ts` and `site.ts`
 * and rendered through `@iconify/react`. No export step, nothing to expire.
 */
export const brand = {
  /** Logo mark — placeholder for node 570:317 */
  logoMark: "/brand/monogram.svg",
  /** Ambient glow behind the mark — placeholder for node 570:293 */
  logoGlow: "/brand/glow.svg",
} as const;
