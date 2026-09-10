"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { carousel } from "@/lib/content";

const GAP = 40;

/**
 * Nodes 571:49 / 571:46 / 571:459 — the right column of
 * `section-intro-experience`.
 *
 * The strip (571:459) is 1756px of 409×277 cards on a 449px pitch, clipped by
 * a 1082px viewport (571:46). That clipping is the whole mechanism: about two
 * and a half cards show, and the rest is scrolled to.
 *
 * Pills (571:47, 571:48, 571:517, 571:518) are 13px tall on a 26.5px pitch —
 * 66px wide for the active one, 20px for the rest — sitting 22px below the
 * strip, inset from the viewport's left edge rather than centred.
 *
 * Card content is left-aligned, inset 50px from the left and 90px from the
 * top, icon above label — consistent across all four cards in the design.
 *
 * TODO: each card in Figma carries its own tinted background keyed to the
 * technology (pale olive for JavaScript, steel blue for React, light grey for
 * Next.JS) with dark label text, not the single ink-800 used here. The exact
 * fills still need reading off the file.
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
    <div className="w-full min-w-0 lg:max-w-[1082px]" aria-label="Core technologies" role="group">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-[40px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {carousel.map((tech) => (
          <li
            key={tech.label}
            className="flex h-[277px] w-[300px] shrink-0 snap-start flex-col items-start rounded-[20px] bg-ink-800 pt-[90px] pl-[50px] sm:w-[409px]"
          >
            <Icon icon={tech.icon} size={52} />
            <span className="mt-[11px] text-[24px] font-medium text-white">{tech.label}</span>
          </li>
        ))}
      </ul>

      {scrollable ? (
        <div className="mt-[22px] flex gap-[6px] lg:pl-[83px]">
          {carousel.map((tech, index) => (
            <button
              key={tech.label}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${tech.label}`}
              aria-current={index === active}
              className={`h-[13px] rounded-full transition-all duration-300 ${
                index === active ? "w-[66px] bg-accent" : "w-[20px] bg-ink-800"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
