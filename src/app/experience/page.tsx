import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TimelineCard } from "@/components/timeline-card";
import { ButtonLink } from "@/components/ui/button";
import { experience, experienceIntro, hero } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience — Asrorjon Makhmudov",
  description:
    "Six years of front-end engineering across banking and fintech: Linear Technology Solutions, Anorbank, Sector Soft and Simplex ITC.",
};

export default function ExperiencePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro
          action={
            <ButtonLink href={hero.ctaPrimary.href} variant="solid">
              {hero.ctaPrimary.label}
            </ButtonLink>
          }
        >
          {experienceIntro}
        </PageIntro>

        <div className="mx-auto flex max-w-[1568px] flex-col gap-[40px] px-6 pb-[120px]">
          {experience.map((role) => (
            <TimelineCard key={`${role.company}-${role.start}`} role={role} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
