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
 */
export function TechStack() {
  const t = useTranslations("tech");

  return (
    <section className="mx-auto max-w-[1829px] px-6 pb-[120px]">
      <h2 className="max-w-[794px] text-[32px] font-medium leading-[1.35] text-white sm:text-[48px]">
        {t("heading")}
      </h2>

      <ul className="mt-[80px] grid grid-cols-1 items-start gap-[64px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {techCards.map((card) => (
          <li key={card.id} className="rounded-[20px] bg-ink-800 px-[34px] py-[28px]">
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
