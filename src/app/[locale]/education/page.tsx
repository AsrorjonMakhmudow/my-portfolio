import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudyCard } from "@/components/study-card";
import { education, languageIds } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.education" });
  return { title: t("title"), description: t("description") };
}

function EducationContent() {
  const t = useTranslations("education");

  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro>{t("intro")}</PageIntro>

        <div className="mx-auto flex max-w-[1568px] flex-col gap-[40px] px-6">
          {education.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>

        <section className="mx-auto max-w-[1568px] px-6 py-[120px]">
          <h2 className="text-[24px] font-medium text-white">{t("languagesHeading")}</h2>
          <ul className="mt-[32px] flex flex-col gap-[16px] sm:flex-row sm:gap-[64px]">
            {languageIds.map((id) => (
              <li key={id}>
                <p className="text-[18px] font-medium text-white">
                  {t(`languages.${id}.name`)}
                </p>
                <p className="mt-[4px] text-[16px] font-light text-ink-200">
                  {t(`languages.${id}.level`)}
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

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EducationContent />;
}
