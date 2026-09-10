import { words } from "@/lib/content";

/**
 * Node 571:54 — the oversized stack, its own band at y=1559–2037, centred on
 * the page: the three words have centres at x=975 / 967 / 966 against a page
 * centre of 960. Each block is 106px tall on a 186px pitch, and measuring the
 * Figma widths (430 / 246 / 277px) against Raleway's own metrics puts the type
 * at ~88px, line-height ~1.2.
 *
 * Two fills, not one: the first word is `violet-muted`, the rest `violet` —
 * see globals.css for how both were matched and why they remain unconfirmed.
 */
export function WordStack() {
  return (
    <section className="px-6 py-[120px] lg:py-[180px]">
      <ul aria-hidden className="flex flex-col items-center gap-[24px] lg:gap-[80px]">
        {words.map((word, index) => (
          <li
            key={word.label}
            data-reveal
            data-delay={String(index + 1)}
            className={`text-[44px] font-bold leading-[1.2] sm:text-[64px] lg:text-[88px] ${
              word.tone === "muted" ? "text-violet-muted" : "text-violet"
            }`}
          >
            {word.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
