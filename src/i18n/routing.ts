import { defineRouting } from "next-intl/routing";

/**
 * English sits at the bare root (`/about`), the other two are prefixed
 * (`/ru/about`, `/uz/about`). `as-needed` keeps every URL that existed
 * before this change working untouched.
 */
export const routing = defineRouting({
  locales: ["en", "ru", "uz"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Shown in the switcher. Endonyms — each language named in itself. */
export const localeNames: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ru: { short: "RU", full: "Русский" },
  uz: { short: "UZ", full: "O‘zbekcha" },
};
