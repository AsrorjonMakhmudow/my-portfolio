import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Nodes 571:537 (experience) and its education twin — the code-comment styled
 * lede, with the `back` link at 571:969 and the CV button beside it.
 */
export function PageIntro({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const t = useTranslations("common");

  return (
    <section className="mx-auto max-w-[1568px] px-6 pt-[120px] pb-[80px]">
      <Link
        href="/"
        className="text-[16px] font-light text-ink-200 transition-colors hover:text-accent"
      >
        &larr; {t("back")}
      </Link>

      {/* The lede is the only heading-level content on these pages, so it is
          the h1 — without it /experience and /education had no h1 at all. */}
      <h1 data-reveal className="mt-[32px] max-w-[1100px] text-[24px] font-light leading-[1.6] text-ink-200 sm:text-[32px]">
        {children}
      </h1>

      {action ? (
        <div className="mt-[40px]" data-reveal data-delay="1">
          {action}
        </div>
      ) : null}
    </section>
  );
}
