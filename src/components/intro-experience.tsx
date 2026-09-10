import { Stats } from "@/components/stats";
import { TechCarousel } from "@/components/tech-carousel";

/**
 * Node 571:50 "section-intro-experience" — x=200, y=927, 1520×312.
 *
 * Two columns, not two stacked sections: the stats block (571:513) sits at
 * the left gutter and the carousel group (571:49) to its right, starting at
 * x=638 with a width of 1082. That gives 250 + 188 gap + 1082 = 1520.
 *
 * The 1082px column is what makes the carousel a carousel — the 1756px strip
 * is clipped to it, so roughly two and a half cards show at a time.
 */
export function IntroExperience() {
  return (
    <section className="mx-auto max-w-[1568px] px-6 py-[80px]">
      <div className="flex flex-col gap-[60px] lg:flex-row lg:items-start lg:gap-[188px]">
        {/* Figma drops the stats 55px below the section top so it sits against
            the cards rather than their top edge. */}
        <div className="lg:pt-[55px]">
          <Stats />
        </div>
        <TechCarousel />
      </div>
    </section>
  );
}
