import { stats } from "@/lib/content";

/**
 * Node 571:513 — "6 years of / XP" stacked, with the caption beneath, plus the
 * oversized Javascript / React / Coffee stack at 571:54.
 */
export function Stats() {
  return (
    <section className="mx-auto max-w-[1520px] px-6 py-[80px]">
      <div className="flex flex-col gap-[80px] lg:flex-row lg:items-center lg:justify-between">
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

        {/* 571:51–53. Decorative; the real content is the section above. */}
        <ul aria-hidden className="flex flex-col gap-[24px] lg:items-end">
          {["JavaScript", "React", "Coffee"].map((word, i) => (
            <li
              key={word}
              className={`text-[48px] font-bold leading-none sm:text-[72px] lg:text-[88px] ${
                i === 1 ? "text-accent" : "text-ink-800"
              }`}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
