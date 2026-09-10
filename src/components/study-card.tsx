import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import type { Study } from "@/lib/content";

/** Node 571:1055 — same shell as the experience card, fewer fields. */
export function StudyCard({ study }: { study: Study }) {
  const t = useTranslations("education");
  const s = `studies.${study.id}` as const;

  return (
    <article className="flex flex-col justify-between gap-[32px] rounded-[20px] bg-ink-800 p-[40px] lg:flex-row lg:items-center lg:p-[84px]">
      <div>
        <h2 className="text-[24px] font-medium leading-[33px] text-white">
          {t(`${s}.institution`)}
        </h2>
        <p className="mt-[12px] text-[18px] font-light text-accent">
          {t(`${s}.qualification`)}
        </p>
        <p className="mt-[16px] flex items-center gap-[30px] text-[16px] font-light text-ink-200">
          <time dateTime={study.start}>{study.start}</time>
          <span aria-hidden className="text-ink-200">
            —
          </span>
          <time dateTime={study.end}>{study.end}</time>
        </p>
      </div>

      {study.certificateUrl ? (
        <ButtonLink href={study.certificateUrl} variant="ghost">
          {t("viewCertificate")}
        </ButtonLink>
      ) : null}
    </article>
  );
}
