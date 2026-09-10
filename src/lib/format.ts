/**
 * Dates are stored ISO in `content.ts` and formatted per locale here, so
 * month names are never translated by hand: "2026-05" renders as
 * "May 2026" / "май 2026 г." / "2026 may" depending on the active locale.
 */
export function formatMonthYear(iso: string, locale: string): string {
  const [year, month] = iso.split("-");
  if (!month) return year;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
    new Date(Number(year), Number(month) - 1, 1),
  );
}
