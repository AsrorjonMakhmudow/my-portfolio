import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TimelineCard } from "@/components/timeline-card";
import { ButtonLink } from "@/components/ui/button";
import { experience, heroLinks } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.experience" });
  return { title: t("title"), description: t("description") };
}

function ExperienceContent() {
  const t = useTranslations("experience");
  const tHero = useTranslations("hero");

  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro
          action={
            <ButtonLink href={heroLinks.cv} variant="solid">
              {tHero("ctaPrimary")}
            </ButtonLink>
          }
        >
          {t("intro")}
        </PageIntro>

        <div className="mx-auto flex max-w-[1568px] flex-col gap-[40px] px-6 pb-[120px]">
          {experience.map((role, index) => (
            <TimelineCard key={role.id} role={role} index={index} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ExperienceContent />;
}
