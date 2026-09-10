"use client";

import { Icon } from "@/components/ui/icon";
import type { TechItem } from "@/lib/content";

/**
 * Node 571:62 — a 34px circle holding a 20px icon, with the label 48px in.
 * Row height is 35px; the design stacks them on a ~49px pitch.
 */
export function TechPill({ item }: { item: TechItem }) {
  return (
    <li className="flex h-[35px] items-center gap-[14px]">
      <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-ink-900">
        <Icon icon={item.icon} size={20} />
      </span>
      <span className="text-[16px] font-light text-ink-200">{item.label}</span>
    </li>
  );
}
