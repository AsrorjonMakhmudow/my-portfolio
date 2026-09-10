# asrormakhmudov

Personal portfolio for Asrorjon Makhmudov, Front-End Software Engineer.
Next.js 15 (App Router) + Tailwind v4, localised in English, Russian and
Uzbek, built from the `vigads.com.br` Figma community file.

```bash
npm install
npm run dev
```

## Structure

```
messages/          en.json · ru.json · uz.json — all prose, 61 keys each
public/
  assets/          portrait
  brand/           glow + monogram (monogram now unreferenced)
scripts/
  build-icons.mjs  regenerates the bundled icon data
src/
  app/[locale]/    routes: / · /experience · /education
  components/
  i18n/            routing · navigation · request config
  lib/             content · site · format · icon-data
  middleware.ts    locale detection
```

## How a few things work

**Content vs. copy.** `src/lib/content.ts` holds only what is identical in
every language — company names, URLs, ISO dates, icon names, technology
names — each keyed by an id. All prose lives in `messages/`. Dates are
stored ISO and formatted per locale, so month names are never translated
by hand.

**Icons** are inlined in `src/lib/icon-data.ts` and registered locally, so
the page makes no runtime request to Iconify's CDN. 27 icons, regenerated
with `node scripts/build-icons.mjs` (needs the `@iconify-json/*` packages
installed).

**Motion.** One IntersectionObserver drives every reveal; elements opt in
with a `data-reveal` attribute. The hidden state is scoped to
`html[data-motion]`, which `MotionProvider` sets on mount — so if the
script never runs, nothing is hidden and the page renders fully visible.
`prefers-reduced-motion` is handled by never setting the attribute.

**The animated border** is a conic gradient rotated by a registered
`@property` angle and masked to a 1px ring. It takes a `--glow` colour,
defaulting to the accent pair; carousel cards override it with their
technology's brand colour, which also derives the card's tinted fill.

## Deliberate departures from the Figma file

- Body copy moved from `ink-500` to `ink-200`. `ink-500` measures 2.97:1
  on the raised cards and 3.89:1 on the page, both under the WCAG AA
  floor of 4.5:1.
- The header pill sizes to its content rather than Figma's fixed 622px,
  which was set for a shorter brand name and one fewer icon.
- Container widths carry their padding on top (1520 + 48, etc.), because
  Figma's frame widths are content widths.
- Carousel prev/next buttons, drag-to-scrub and the language switcher are
  additions; the design has none of them.
- `/experience` and `/education` carry an `h1` — the design gives them no
  heading at all.

## Known unfinished

- **The Uzbek translation is a first draft** and wants a native review —
  `messages/uz.json`.
- **Colours matched by eye, not read from the file.** The Figma MCP quota
  is exhausted, so `--color-violet`, `--color-violet-muted` and the
  carousel card tints were matched by rendering candidates beside the real
  canvas. They are close; they are not the file's values.
- **The logo mark and favicon** are placeholders — Figma nodes `570:317`
  and `712:23` still need exporting.
- The degree start year in `content.ts` is assumed, not sourced.

## Deploying

`src/middleware.ts` and `next/image` both need a Node or Edge runtime, so
this does **not** run on a static-only host such as GitHub Pages. Vercel,
Cloudflare Pages and Netlify all work on their free tiers.

To go fully static instead: set `localePrefix: "always"` in
`src/i18n/routing.ts`, delete the middleware, and set
`images.unoptimized` in `next.config.ts`. That costs automatic locale
detection and image optimisation.
