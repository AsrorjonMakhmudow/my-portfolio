import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stats } from "@/components/stats";
import { TechCarousel } from "@/components/tech-carousel";
import { TechStack } from "@/components/tech-stack";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <TechCarousel />
        <TechStack />
      </main>
      <SiteFooter />
    </>
  );
}
