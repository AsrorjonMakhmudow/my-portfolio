"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { carousel } from "@/lib/content";

const GAP = 40;

/**
 * Node 571:459 — four 409×277 cards on a 449px pitch (40px gutters), with the
 * four pagination pills at 571:47–571:518 below.
 *
 * The strip is 1756px wide, so at 1920 the Figma frame shows all four cards at
 * once and there is nothing to page through; the pills only mean something once
 * the viewport is narrow enough for the strip to overflow. So the track is
 * capped at the strip's own width — letting it run full-bleed lets a wide
 * viewport absorb the overflow, leaving the pills inert — and the pills hide
 * themselves when everything already fits.
 *
 * Scroll-snap rather than a JS carousel: native touch momentum and keyboard
 * scrolling come free, and it still works if the JS never runs.
 */
export function TechCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;

    const max = track.scrollWidth - track.clientWidth;
    setScrollable(max > 8);

    // At the end, scrollLeft is clamped short of the last card's pitch even
    // though that card is fully visible — special-case it or the last pill
    // never lights up.
    if (max - track.scrollLeft < 1) {
      setActive(carousel.length - 1);
      return;
    }

    const pitch = card.offsetWidth + GAP;
    setActive(Math.min(carousel.length - 1, Math.round(track.scrollLeft / pitch)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    track.addEventListener("scroll", sync, { passive: true });

    // Whether the strip overflows is a function of viewport width, so the
    // pills have to be re-evaluated on resize, not just on scroll.
    const observer = new ResizeObserver(sync);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollTo({ left: index * (card.offsetWidth + GAP), behavior: "smooth" });
  };

  return (
    <section className="py-[120px]" aria-label="Core technologies">
      {/* 1756px of cards + 2×24px padding — fits exactly at 1920, scrolls below. */}
      <div className="mx-auto w-full max-w-[1804px] px-6">
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-[40px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {carousel.map((tech) => (
            <li
              key={tech.label}
              className="flex h-[277px] w-[300px] shrink-0 snap-start flex-col items-center justify-center gap-[24px] rounded-[20px] bg-ink-800 sm:w-[409px]"
            >
              <Icon icon={tech.icon} size={56} />
              <span className="text-[24px] font-medium text-white">{tech.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {scrollable ? (
        <div className="mt-[40px] flex justify-center gap-[12px]">
          {carousel.map((tech, index) => (
            <button
              key={tech.label}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${tech.label}`}
              aria-current={index === active}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                index === active ? "w-[32px] bg-accent" : "w-[8px] bg-ink-500"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
