import { useTranslations } from "next-intl";
import { TechPill } from "@/components/tech-pill";
import { techCards } from "@/lib/content";

/**
 * Nodes 571:55 (heading) and 571:530 (the card row).
 *
 * Figma lays five 305px cards on a 369px pitch — 64px gutters — all top
 * aligned at y=2646 with heights that vary by content (180–423px). That is a
 * five-column grid with `items-start`, which is what this is; below `xl` it
 * steps down to three and then one column.
 *
 * Card titles are translated; the technology names inside them are not.
 *
 * These five carry the animated conic border. It is deliberately not on the
 * carousel or timeline cards — a sweep on every surface stops reading as an
 * accent and just becomes noise, and fifteen elements repainting forever is a
 * real cost. Restraint is the point.
 */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <section className="mx-auto max-w-[1829px] px-6 pb-[120px]">
      <h2
        className="max-w-[794px] text-[32px] font-medium leading-[1.35] text-white sm:text-[48px]"
        data-reveal
      >
        {t("heading")}
      </h2>

      <ul className="mt-[80px] grid grid-cols-1 items-start gap-[64px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {techCards.map((card, index) => (
          <li
            key={card.id}
            className="glow-border rounded-[20px] bg-ink-800 px-[34px] py-[28px]"
            data-reveal
            data-delay={String(Math.min(index + 1, 5))}
          >
            <h3 className="text-[16px] font-bold text-white">{t(`cards.${card.id}`)}</h3>
            <ul className="mt-[34px] flex flex-col gap-[14px]">
              {card.items.map((item) => (
                <TechPill key={item.label} item={item} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
