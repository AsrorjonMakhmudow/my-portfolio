import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

/*
 * The Assets page documents Raleway as the type system, and it carries every
 * heading and body string. The buttons are the one exception — they are set in
 * Nunito in the design (nodes 571:522, 571:527), so both families are loaded.
 * Weights are limited to the ones actually used: Light 300, Medium 500, Bold 700.
 *
 * Cyrillic is included for the Russian locale; Uzbek uses Latin.
 */
const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "500", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-nunito",
  display: "swap",
});

/** Prerender all three locales rather than rendering them on demand. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    // Tells search engines these three pages are the same content in
    // different languages, rather than duplicates competing with each other.
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${raleway.variable} ${nunito.variable}`}>
      <body>
        <NextIntlClientProvider>
          <MotionProvider />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
