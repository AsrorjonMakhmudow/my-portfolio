"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { navLinks, site, socials } from "@/lib/site";

/**
 * Node 570:461 — a floating glass pill, centred, 70px tall.
 * Fill is rgba(33,31,35,0.35) over a 17.5px backdrop blur.
 *
 * Figma fixes the pill at 622px, which fits "lucasviga" and three icons. This
 * brand name is half again as long and there are four icons, so the pill sizes
 * to its content rather than clipping at a width that no longer matches it.
 *
 * On mobile the design swaps to the `navbar` component (595:1491), which is
 * the same pill minus the wider icons — handled here with the `compact` flag
 * rather than a second component.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-[30px] z-50 flex justify-center px-6">
      <nav
        aria-label="Main"
        className="flex h-[56px] w-auto max-w-full items-center justify-center gap-[10px] rounded-full bg-[rgba(33,31,35,0.35)] px-4 backdrop-blur-[17.5px] sm:h-[70px] sm:gap-[28px] sm:px-8"
      >
        <Link href="/" className="shrink-0 text-[13px] font-medium text-white sm:text-[20px]">
          <span className="sm:hidden">{site.shortName}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-[13px] font-medium text-accent transition-colors hover:text-white sm:text-[20px]"
          >
            {link.label}
          </Link>
        ))}

        <ul className="flex shrink-0 items-center gap-[10px] sm:gap-[16px]">
          {socials.map((social) => (
            <li key={social.label} className={social.compact ? "" : "hidden sm:block"}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="block text-white opacity-90 transition-opacity hover:opacity-100"
              >
                <Icon icon={social.icon} size={18} className="sm:size-[24px]" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
