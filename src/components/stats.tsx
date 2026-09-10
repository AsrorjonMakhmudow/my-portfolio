import { stats } from "@/lib/content";

/** Node 571:513 — the left column of `section-intro-experience`, 250px wide. */
export function Stats() {
  return (
    <div className="w-full max-w-[250px] shrink-0">
      <p className="text-[36px] font-medium leading-[48px] text-white sm:text-[40px]">
        {stats.years}
        <br />
        <span className="text-accent">{stats.badge}</span>
      </p>
      <p className="mt-[20px] text-[16px] font-light leading-[1.5] text-ink-200">
        {stats.caption}
      </p>
    </div>
  );
}
