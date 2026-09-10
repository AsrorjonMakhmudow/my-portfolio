"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Drives every scroll reveal on the site from a single observer.
 *
 * Elements opt in with `data-reveal` — a plain attribute, so the markup stays
 * in server components and nothing needs a client boundary of its own.
 *
 * The hidden state lives behind `html[data-motion]`, which is set here. That
 * ordering is deliberate: if this script never runs, the attribute is absent,
 * the reveal rules never match, and the page renders fully visible. Hiding
 * content first and revealing it from JS is how a portfolio ends up blank on
 * a flaky connection.
 *
 * Reduced motion is handled by simply not setting the attribute.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.dataset.motion = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          // One-shot: elements do not re-hide when scrolled back past.
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const el of document.querySelectorAll("[data-reveal]:not([data-revealed])")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
    // Re-scan after a route change, since the layout persists across them.
  }, [pathname]);

  return null;
}
