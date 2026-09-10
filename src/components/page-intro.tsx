import Link from "next/link";

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
  return (
    <section className="mx-auto max-w-[1520px] px-6 pt-[120px] pb-[80px]">
      <Link
        href="/"
        className="text-[16px] font-light text-ink-200 transition-colors hover:text-accent"
      >
        &larr; back
      </Link>

      <p className="mt-[32px] max-w-[1100px] text-[24px] font-light leading-[1.6] text-ink-200 sm:text-[32px]">
        {children}
      </p>

      {action ? <div className="mt-[40px]">{action}</div> : null}
    </section>
  );
}
