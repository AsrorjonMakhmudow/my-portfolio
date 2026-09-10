import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";
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
 *
 * The second paragraph sits behind a native <details>, so the page stays
 * scannable — four roles at two paragraphs each is a lot to wade through.
 * The disclosure wraps only that paragraph, not the whole card: putting the
 * company link inside a <summary> would make clicking it collapse the card,
 * since the browser treats any click in the summary as a toggle.
 *
 * <details> over a useState toggle means it works with no JS, is keyboard
 * operable for free, and is found by the browser's own in-page search.
 */
export function TimelineCard({ role, index = 0 }: { role: Role; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("experience");
  const tCommon = useTranslations("common");
  const r = `roles.${role.id}` as const;

  return (
    <article
      className="card-hover rounded-[20px] bg-ink-800 p-[40px] lg:p-[84px]"
      data-reveal
      data-delay={String(Math.min(index + 1, 5))}
    >
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

            <details className="group">
              <summary className="inline-flex cursor-pointer list-none items-center gap-[6px] rounded-full text-[16px] font-medium text-accent transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">{t("viewMore")}</span>
                <span className="hidden group-open:inline">{t("viewLess")}</span>
                <Icon
                  icon="mdi:chevron-down"
                  size={18}
                  className="transition-transform duration-300 group-open:rotate-180"
                />
              </summary>

              <p className="mt-[24px] text-[16px] font-light leading-[1.9] text-ink-200 sm:text-[18px]">
                {t(`${r}.p2`)}
              </p>
            </details>
          </div>
        </div>
      </div>
    </article>
  );
}
