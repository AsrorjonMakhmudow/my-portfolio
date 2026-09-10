"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";

/**
 * A dropdown rather than three inline labels: the nav pill measures 286px on
 * a 393px screen, and `UZ RU EN` spelled out costs roughly 90px against the
 * ~44px this takes. Three labels pushed the header back into clipping.
 *
 * Switching keeps the current route — /experience stays /ru/experience — so
 * changing language never bounces the reader back to the home page.
 */
export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    // @ts-expect-error — params carries the dynamic segments for this route
    router.replace({ pathname, params }, { locale: next });
  };

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("ariaLanguage")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-[1px] rounded-full px-[2px] py-[4px] text-[13px] font-medium text-ink-200 transition-colors hover:text-white sm:text-[16px]"
      >
        {localeNames[locale].short}
        <Icon icon="mdi:chevron-down" size={16} />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("ariaLanguage")}
          className="absolute top-[calc(100%+10px)] right-0 z-50 min-w-[140px] overflow-hidden rounded-[16px] bg-ink-800 py-[6px] shadow-lg shadow-black/40"
        >
          {routing.locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => select(code)}
                className={`flex w-full items-center justify-between gap-[12px] px-[14px] py-[8px] text-left text-[15px] transition-colors hover:bg-ink-900 ${
                  code === locale ? "text-accent" : "text-ink-200"
                }`}
              >
                {localeNames[code].full}
                <span className="text-[12px] opacity-60">{localeNames[code].short}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
