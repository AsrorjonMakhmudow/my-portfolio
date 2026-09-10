import type { Role } from "@/lib/content";

/**
 * Node 571:990 — a 1520×606 card. The left rail (384px wide, inset 84px)
 * carries role, contract type, period and location; the right column (817px)
 * carries the company name and the body paragraphs.
 *
 * Figma repeats this card three times against Lorem Ipsum. Here it renders
 * once per entry in `content.ts`.
 */
export function TimelineCard({ role }: { role: Role }) {
  return (
    <article className="rounded-[20px] bg-ink-800 p-[40px] lg:p-[84px]">
      <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[148px]">
        <header className="lg:w-[384px] lg:shrink-0">
          <h2 className="text-[24px] font-medium leading-[33px] text-white">
            {role.title}
          </h2>
          <p className="mt-[12px] text-[18px] font-light text-accent">{role.type}</p>

          <p className="mt-[16px] flex items-center gap-[30px] text-[16px] font-light text-ink-200">
            <time>{role.start}</time>
            <span aria-hidden className="text-ink-200">
              —
            </span>
            <time>{role.end}</time>
          </p>
          <p className="mt-[8px] text-[14px] font-light text-ink-200">{role.location}</p>
        </header>

        <div className="lg:max-w-[817px]">
          <h3 className="text-[18px] font-medium text-white">
            {role.companyUrl ? (
              <a
                href={role.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-accent"
              >
                {role.company}
              </a>
            ) : (
              role.company
            )}
          </h3>

          <div className="mt-[36px] flex flex-col gap-[24px]">
            {role.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[16px] font-light leading-[1.9] text-ink-200 sm:text-[18px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
