import { useLocale, useTranslations } from "next-intl";
import { formatMonthYear } from "@/lib/format";
import type { Role } from "@/lib/content";

/**
 * Node 571:990 — a 1520×606 card. The left rail (384px wide, inset 84px)
 * carries role, contract type, period and location; the right column (817px)
 * carries the company name and the body paragraphs.
 *
 * Figma repeats this card three times against Lorem Ipsum. Here it renders
 * once per entry in `content.ts`, with the prose pulled per locale and the
 * dates formatted rather than translated.
 */
export function TimelineCard({ role }: { role: Role }) {
  const locale = useLocale();
  const t = useTranslations("experience");
  const tCommon = useTranslations("common");
  const r = `roles.${role.id}` as const;

  return (
    <article className="rounded-[20px] bg-ink-800 p-[40px] lg:p-[84px]">
      <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[148px]">
        <header className="lg:w-[384px] lg:shrink-0">
          <h2 className="text-[24px] font-medium leading-[33px] text-white">
            {t(`${r}.title`)}
          </h2>
          <p className="mt-[12px] text-[18px] font-light text-accent">
            {t(`type.${role.type}`)}
          </p>

          <p className="mt-[16px] flex items-center gap-[30px] text-[16px] font-light text-ink-200">
            <time dateTime={role.start}>{formatMonthYear(role.start, locale)}</time>
            <span aria-hidden className="text-ink-200">
              —
            </span>
            {role.end ? (
              <time dateTime={role.end}>{formatMonthYear(role.end, locale)}</time>
            ) : (
              <span>{tCommon("present")}</span>
            )}
          </p>
          <p className="mt-[8px] text-[14px] font-light text-ink-200">{t(`${r}.location`)}</p>
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
            <p className="text-[16px] font-light leading-[1.9] text-ink-200 sm:text-[18px]">
              {t(`${r}.p1`)}
            </p>
            <p className="text-[16px] font-light leading-[1.9] text-ink-200 sm:text-[18px]">
              {t(`${r}.p2`)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
