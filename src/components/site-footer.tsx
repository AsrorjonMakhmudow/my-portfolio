"use client";

import { Icon } from "@/components/ui/icon";
import { footerHeading, site, socials } from "@/lib/site";

/**
 * Node 571:414 — a 1552×90 pill with "Follow me" at the left and the icon row
 * at the right (32px, 50px pitch), and the copyright line 28px beneath it.
 */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1600px] px-6 pb-[60px]">
      <div className="flex flex-col items-center gap-[20px] rounded-[20px] bg-ink-800 px-[24px] py-[28px] sm:h-[90px] sm:flex-row sm:justify-between sm:px-[70px] sm:py-0">
        <p className="text-[20px] font-medium text-white sm:text-[24px]">{footerHeading}</p>

        <ul className="flex items-center gap-[18px]">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="block text-ink-200 transition-colors hover:text-accent"
              >
                <Icon icon={social.icon} size={32} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-[28px] text-center text-[16px] font-light text-ink-200 sm:pl-[70px] sm:text-left">
        {site.copyright}
      </p>
    </footer>
  );
}
