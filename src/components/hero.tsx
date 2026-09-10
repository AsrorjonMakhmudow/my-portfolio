import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { brand, portrait } from "@/lib/assets";
import { hero } from "@/lib/content";

/**
 * Node 609:29 for the copy and CTAs; the portrait fills the slot 570:317
 * gives the logo mark.
 *
 * In Figma everything is absolutely positioned inside a fixed 1920×3550 frame.
 * That does not survive contact with a real viewport, so the two columns are
 * rebuilt as flex: copy left, mark right, collapsing to a single column below
 * the `lg` breakpoint to match the 393px mobile frame (595:2).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow behind the mark. Decorative, so hidden from a11y tree. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[120px] right-[-160px] h-[576px] w-[613px] opacity-70 blur-[2px]"
        style={{
          backgroundImage: `url(${brand.logoGlow})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto flex max-w-[1568px] flex-col items-start gap-16 px-6 pt-[120px] pb-[160px] lg:flex-row lg:items-center lg:justify-between lg:pt-[170px]">
        <div className="max-w-[662px]">
          <h1 className="text-[40px] font-medium leading-tight text-white sm:text-[56px] lg:text-[75px]">
            {hero.heading}
          </h1>

          <p className="mt-[30px] text-[18px] font-light leading-[1.9] text-ink-200 sm:text-[24px] sm:leading-[48px]">
            <strong className="font-bold text-white">{hero.intro.lead}</strong> as{" "}
            <strong className="font-bold text-white">{hero.intro.role}</strong>,{" "}
            {hero.intro.body}
          </p>

          <div className="mt-[40px] flex flex-col gap-[16px] sm:flex-row sm:items-center sm:gap-[31px]">
            <ButtonLink href={hero.ctaPrimary.href} variant="solid">
              {hero.ctaPrimary.label}
            </ButtonLink>
            <ButtonLink href={hero.ctaSecondary.href} variant="ghost">
              {hero.ctaSecondary.label}
            </ButtonLink>
          </div>
        </div>

        {/*
          The slot is 390x380 — square — and the source is 3:4, so it is
          cropped with object-cover. The focal point is nudged to 45% rather
          than dead centre, which puts the eyes near the upper third and keeps
          the shoulders in frame; centring exactly leaves too much headroom.

          The 1px gradient ring picks up both accent tokens, echoing the
          rounded-square mark the design puts here.
        */}
        <div className="w-full max-w-[240px] shrink-0 self-center lg:max-w-[390px]">
          <div className="rounded-[36px] bg-gradient-to-br from-accent/70 via-accent/20 to-accent-alt/70 p-px lg:rounded-[60px]">
            <div className="relative aspect-square overflow-hidden rounded-[35px] bg-ink-900 lg:rounded-[59px]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 1023px) 240px, 390px"
                className="object-cover object-[center_45%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
