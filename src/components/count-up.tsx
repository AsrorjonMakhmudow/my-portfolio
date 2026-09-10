"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts to `value` when it first scrolls into view.
 *
 * The final value is what renders on the server, so the number is correct
 * before any JS runs and correct if none ever does. Counters that start their
 * markup at zero read as a genuine zero whenever the animation fails —
 * a headline metric showing "0%" is worse than one that simply does not move.
 */
export function CountUp({ value, duration = 1100 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let startedAt = 0;

    // Zero it up front if it is still off-screen. Without this the server's
    // value is briefly painted before the count resets to 0 — a visible
    // "6 -> 0 -> 6" flicker as the block scrolls in. If it is already on
    // screen at mount, leave the real value alone and animate from here.
    const box = el.getBoundingClientRect();
    if (box.top > window.innerHeight || box.bottom < 0) setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tick = (now: number) => {
          if (!startedAt) startedAt = now;
          const progress = Math.min(1, (now - startedAt) / duration);
          // Ease-out cubic: quick off the mark, settles gently on the value.
          setDisplay(Math.round((1 - Math.pow(1 - progress, 3)) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
