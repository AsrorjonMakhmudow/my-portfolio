"use client";

import { Icon as IconifyIcon, addIcon } from "@iconify/react";
import { icons } from "@/lib/icon-data";

/**
 * Every icon the site uses is inlined in `icon-data.ts` and registered here,
 * so `@iconify/react` resolves them locally and never calls its CDN. That
 * removes a third-party runtime dependency and the icon-shaped hole that
 * appears while a remote fetch is in flight.
 *
 * Icon names match the icon layer names in the Figma file.
 */
for (const [name, data] of Object.entries(icons)) {
  addIcon(name, data);
}

export function Icon({
  icon,
  size = 24,
  className,
}: {
  icon: string;
  size?: number;
  className?: string;
}) {
  return (
    <IconifyIcon icon={icon} width={size} height={size} className={className} aria-hidden />
  );
}
