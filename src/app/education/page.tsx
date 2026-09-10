import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudyCard } from "@/components/study-card";
import { education, languages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Education — Asrorjon Makhmudov",
  description:
    "Bachelor in Information Technology and Cyber Security, National University of Uzbekistan.",
};

export default function EducationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro>
          &lt; Where I studied, and the languages I work in day to day. /&gt;
        </PageIntro>

        <div className="mx-auto flex max-w-[1568px] flex-col gap-[40px] px-6">
          {education.map((study) => (
            <StudyCard key={study.institution} study={study} />
          ))}
        </div>

        <section className="mx-auto max-w-[1568px] px-6 py-[120px]">
          <h2 className="text-[24px] font-medium text-white">Languages</h2>
          <ul className="mt-[32px] flex flex-col gap-[16px] sm:flex-row sm:gap-[64px]">
            {languages.map((language) => (
              <li key={language.name}>
                <p className="text-[18px] font-medium text-white">{language.name}</p>
                <p className="mt-[4px] text-[16px] font-light text-ink-200">
                  {language.level}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
