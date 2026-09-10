import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { IntroExperience } from "@/components/intro-experience";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechStack } from "@/components/tech-stack";
import { WordStack } from "@/components/word-stack";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IntroExperience />
        <WordStack />
        <TechStack />
      </main>
      <SiteFooter />
    </>
  );
}
