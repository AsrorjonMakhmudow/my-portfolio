import { stats } from "@/lib/content";

/**
 * Two separate bands in the design, not one row.
 *
 * Node 571:513 — "N years of / XP" sits at the left gutter (x=200, y=982).
 * Node 571:54  — the Javascript / React / Coffee stack is its own band far
 *                below it (y=1559–2037), centred on the page: the three words
 *                have centres at x=975 / 967 / 966 against a page centre of
 *                960. Each block is 106px tall on a 186px pitch, and measuring
 *                the widths (430 / 246 / 277px) against Raleway's own metrics
 *                puts the type at ~88px, line-height ~1.2.
 */
export function Stats() {
  return (
    <>
      <section className="mx-auto max-w-[1520px] px-6 py-[80px]">
        <div className="max-w-[250px]">
          <p className="text-[36px] font-medium leading-[48px] text-white sm:text-[40px]">
            {stats.years}
            <br />
            <span className="text-accent">{stats.badge}</span>
          </p>
          <p className="mt-[20px] text-[16px] font-light leading-[1.5] text-ink-200">
            {stats.caption}
          </p>
        </div>
      </section>

      {/* 571:54 — decorative; the substance is the section above. */}
      <section className="px-6 py-[120px] lg:py-[180px]">
        <ul aria-hidden className="flex flex-col items-center gap-[24px] lg:gap-[80px]">
          {stats.words.map((word) => (
            <li
              key={word}
              className="text-[44px] font-bold leading-[1.2] text-ink-800 sm:text-[64px] lg:text-[88px]"
            >
              {word}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
