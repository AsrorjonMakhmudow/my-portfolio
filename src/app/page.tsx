import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { IntroExperience } from "@/components/intro-experience";
import { WordStack } from "@/components/word-stack";
import { TechStack } from "@/components/tech-stack";

export default function HomePage() {
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
