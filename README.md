# vigads.com.br

Next.js 15 (App Router) + Tailwind v4 implementation of the `vigads.com.br` Figma file.

```bash
npm install
npm run dev
```

## What's built

The foundation plus the first vertical slice of the home page:

- **Design tokens** — every colour from the Figma Assets page (node `597:1939`) lives in `src/app/globals.css` as Tailwind v4 `@theme` variables. Nothing else in the codebase hardcodes a hex.
- **Type stack** — Raleway (Light/Medium/Bold) and Nunito (Medium/Bold), loaded through `next/font/google`. Nunito is buttons only; that's what the design does.
- **`SiteHeader`** — the floating glass pill from node `570:461`.
- **`Hero`** — copy, CTAs and logo mark from nodes `609:29` and `570:317`.
- **`Button`** — the two variants that appear throughout the file.

## Token map

| Token | Hex | Used for |
| --- | --- | --- |
| `ink-950` | `#0C0C0D` | page background |
| `ink-900` | `#111111` | — |
| `ink-850` | `#131313` | — |
| `ink-800` | `#272727` | raised cards |
| `ink-500` | `#6F6F6F` | body copy |
| `ink-200` | `#C8C8C8` | secondary text |
| `accent` | `#B292FF` | links, nav, ghost buttons |
| `accent-alt` | `#5FB9B0` | secondary accent |

## Two things to fix before this ships

**1. The icons and logo are pointed at expiring URLs.**
`src/lib/assets.ts` references Figma MCP export URLs that die roughly 7 days after export. My sandbox couldn't reach Figma's CDN to commit the real bytes, so this is the one deliberate shortcut in here. Download them into `public/brand/` and swap the constants — the file is structured so that's a single-file change.

Better still for the icons: every icon layer in the design is named after an Iconify set (`mdi:github`, `logos:figma`, `simple-icons:nextdotjs`, `logos:docker-icon`, …). Install `@iconify/react` and reference them by those exact names. You get real SVGs, no export step, and a 1:1 mapping back to the design.

**2. Layout was rebuilt, not transcribed.**
Figma positions everything absolutely inside a fixed 1920px frame. That's reproduced here as flex/grid with real breakpoints, using the 393px mobile frames as the small-screen target. Visual spacing at exactly 1920px matches; in between it's my judgement, and worth a designer's eye.

## Not built yet

Roughly in the order I'd take them:

1. Tech carousel (`571:459`) — a horizontally scrolling strip of four cards. Wants an embla/scroll-snap treatment plus the four pagination pills at `571:47`–`571:518`.
2. Tech stack grid (`571:530`) — a masonry-ish set of six cards at varying heights.
3. Footer (`571:414`).
4. `/experience` and `/education` routes (`571:531`, `571:1030`) — both are the same card repeated three times against Lorem Ipsum, so they want a real content model. I'd put the entries in typed data and render one `TimelineCard`, not three copies.

The `experience` and `education` pages are still placeholder copy in Figma, so someone needs to supply the actual roles and dates before those are worth building.
