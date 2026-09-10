import type { Study } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

/** Node 571:1055 — same shell as the experience card, fewer fields. */
export function StudyCard({ study }: { study: Study }) {
  return (
    <article className="flex flex-col justify-between gap-[32px] rounded-[20px] bg-ink-800 p-[40px] lg:flex-row lg:items-center lg:p-[84px]">
      <div>
        <h2 className="text-[24px] font-medium leading-[33px] text-white">
          {study.institution}
        </h2>
        <p className="mt-[12px] text-[18px] font-light text-accent">
          {study.qualification}
        </p>
        <p className="mt-[16px] flex items-center gap-[30px] text-[16px] font-light text-ink-200">
          <time>{study.start}</time>
          <span aria-hidden className="text-ink-500">
            —
          </span>
          <time>{study.end}</time>
        </p>
      </div>

      {study.certificateUrl ? (
        <ButtonLink href={study.certificateUrl} variant="ghost">
          View certificate
        </ButtonLink>
      ) : null}
    </article>
  );
}
