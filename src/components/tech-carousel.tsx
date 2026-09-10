"use client";

import { useTranslations } from "next-intl";
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
 * Interaction. The base is a scroll-snap strip, so native touch momentum,
 * trackpad scrolling and keyboard arrows all come free and it still works if
 * the JS never runs. On top of that:
 *
 *   - prev/next buttons step one card at a time and disable at the ends
 *   - the pills jump to a card
 *   - press-and-drag scrubs the strip
 *
 * Drag is wired through Pointer Events, but only claims the gesture for a
 * mouse: touch already has native panning that feels better than anything
 * re-implemented here, and hijacking it would break momentum and vertical
 * page scrolling. The result is the same set of affordances on both — drag,
 * arrows and pills everywhere — each driven by whichever mechanism suits the
 * input device.
 *
 * The arrows are an addition, not from the design, which shows only pills.
 */
export function TechCarousel() {
  const t = useTranslations("tech");
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  const drag = useRef({ pointerId: -1, startX: 0, startLeft: 0, moved: false });

  const pitch = () => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP : 0;
  };

  const sync = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;

    const max = track.scrollWidth - track.clientWidth;
    setScrollable(max > 8);
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(max - track.scrollLeft <= 1);

    // At the end, scrollLeft is clamped short of the last card's pitch even
    // though that card is fully visible — special-case it or the last pill
    // never lights up.
    if (max - track.scrollLeft < 1) {
      setActive(carousel.length - 1);
      return;
    }
    setActive(
      Math.min(carousel.length - 1, Math.round(track.scrollLeft / (card.offsetWidth + GAP))),
    );
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
    const p = pitch();
    if (!track || !p) return;
    const clamped = Math.max(0, Math.min(carousel.length - 1, index));
    track.scrollTo({ left: clamped * p, behavior: "smooth" });
  };

  const step = (delta: number) => goTo(active + delta);

  /* ---- press and drag ------------------------------------------------- */

  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    // Touch and pen keep their native panning; only the mouse needs this.
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: track.scrollLeft,
      moved: false,
    };
    track.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || drag.current.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    track.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || drag.current.pointerId !== event.pointerId) return;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    drag.current.pointerId = -1;
    setDragging(false);

    // Restoring snap lets the browser settle on the nearest card by itself.
    if (drag.current.moved) goTo(Math.round(track.scrollLeft / (pitch() || 1)));
  };

  return (
    <div className="w-full min-w-0 lg:max-w-[1082px]">
      <ul
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={t("ariaCarousel")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // Snapping fights a drag in progress, so it is suspended mid-gesture
        // and restored on release, which settles the strip on a card.
        style={{ scrollSnapType: dragging ? "none" : undefined }}
        className={`flex snap-x snap-mandatory gap-[40px] overflow-x-auto rounded-[20px] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
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
        <div className="mt-[22px] flex items-center justify-between gap-[24px]">
          <div className="flex gap-[6px] lg:pl-[83px]">
            {carousel.map((tech, index) => (
              <button
                key={tech.label}
                type="button"
                onClick={() => goTo(index)}
                aria-label={t("show", { name: tech.label })}
                aria-current={index === active}
                className={`h-[13px] rounded-full transition-all duration-300 ${
                  index === active ? "w-[66px] bg-accent" : "w-[20px] bg-ink-800"
                }`}
              />
            ))}
          </div>

          <div className="flex shrink-0 gap-[12px]">
            <CarouselButton
              label={t("previous")}
              icon="mdi:chevron-left"
              disabled={atStart}
              onClick={() => step(-1)}
            />
            <CarouselButton
              label={t("next")}
              icon="mdi:chevron-right"
              disabled={atEnd}
              onClick={() => step(1)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CarouselButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      // 44px keeps it above the minimum comfortable touch target.
      className="flex size-[44px] items-center justify-center rounded-full bg-ink-800 text-ink-200 transition-colors hover:bg-ink-900 hover:text-white disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon icon={icon} size={24} />
    </button>
  );
}
