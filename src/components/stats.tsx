import { useTranslations } from "next-intl";
import { CountUp } from "@/components/count-up";
import { yearsOfExperience } from "@/lib/content";

/** Node 571:513 — the left column of `section-intro-experience`, 250px wide. */
export function Stats() {
  const t = useTranslations("stats");

  return (
    <div className="w-full max-w-[250px] shrink-0" data-reveal>
      <p className="text-[36px] font-medium leading-[48px] text-white sm:text-[40px]">
        {/* A tag placeholder rather than "{count} years": it keeps the number
            and the words in whatever order each language wants. */}
        {t.rich("years", { n: () => <CountUp value={yearsOfExperience} /> })}
        <br />
        <span className="text-accent">{t("badge")}</span>
      </p>
      <p className="mt-[20px] text-[16px] font-light leading-[1.5] text-ink-200" data-reveal data-delay="1">
        {t("caption")}
      </p>
    </div>
  );
}
