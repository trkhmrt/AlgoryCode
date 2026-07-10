import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { GraduationCap } from "lucide-react";
import { EducationCard } from "@/components/education/EducationCard";
import { EducationFilters } from "@/components/education/EducationFilters";
import {
  EDUCATION_LIST_ANCHOR_ID,
  EducationScrollManager,
} from "@/components/education/EducationScrollManager";
import { EducationTechStream } from "@/components/education/EducationTechStream";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_TRACK_LABELS,
  type EducationPublicListItem,
  type EducationTrack,
} from "@/lib/education";
import { getPublishedEducationsCached } from "@/lib/education-cache";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eğitimler — AlgoryCode",
  description: "AlgoryCode tarafından yayınlanan eğitim programları.",
};

type EducationPageProps = {
  searchParams: Promise<{ track?: string; tech?: string }>;
};

function isEducationTrack(value: string): value is EducationTrack {
  return value in EDUCATION_TRACK_LABELS;
}

export default async function EducationPage({ searchParams }: EducationPageProps) {
  const params = await searchParams;
  const trackFilter =
    params.track && isEducationTrack(params.track) ? params.track : undefined;
  const techFilter = params.tech?.trim() || undefined;

  const educations: EducationPublicListItem[] =
    await getPublishedEducationsCached({
      track: trackFilter,
      tech: techFilter,
    });

  const hasActiveFilter = Boolean(trackFilter || techFilter);

  return (
    <>
      <SiteHeader />
      <main className={`${SITE_HEADER_OFFSET_CLASS} bg-[#f3efe9]`}>
        <section className="section border-b border-border pb-10 md:pb-14">
          <div className="container-x">
            <div
              className="relative isolate flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat px-8 py-16 text-center md:min-h-[340px] md:px-16 md:py-20"
              style={{ backgroundImage: "url(/images/education-hero-bg.png)" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/15"
                aria-hidden
              />

              <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center">
                <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-white/75">
                  AlgoryCode Education
                </p>
                <h1 className="text-[32px] font-semibold leading-[1.1] tracking-tight text-white md:text-[48px]">
                  Öğrenmeye bugün başla.
                  <br />
                  <span className="font-normal text-white/90">
                    Kariyerini bir adım öne taşı.
                  </span>
                </h1>
                <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-white/80 md:text-base">
                  Uzman eğitmenlerle hazırlanan programlarla pratik beceriler
                  kazan. Canlı, online ve kayıtlı formatlarda seni bekleyen
                  eğitimleri keşfet.
                </p>
              </div>
            </div>

            <EducationTechStream />
          </div>
        </section>

        <section
          id={EDUCATION_LIST_ANCHOR_ID}
          className="section scroll-mt-[80px] pt-0"
        >
          <div className="container-x">
            <Suspense fallback={null}>
              <EducationScrollManager />
              <EducationFilters />
            </Suspense>

            {educations.length === 0 ? (
              <Card className="bg-white/80 p-10 text-center">
                <GraduationCap className="mx-auto text-[#888]" size={32} />
                <p className="mt-4 text-lg font-medium text-foreground">
                  {hasActiveFilter
                    ? "Bu filtrelere uygun eğitim bulunamadı"
                    : "Henüz yayınlanmış eğitim yok"}
                </p>
                <p className="mt-2 text-sm text-[#888]">
                  {hasActiveFilter
                    ? "Filtreleri temizleyip tekrar deneyin."
                    : "Yeni eğitimler eklendiğinde burada listelenecek."}
                </p>
                {hasActiveFilter ? (
                  <Link
                    href={`/education#${EDUCATION_LIST_ANCHOR_ID}`}
                    scroll={false}
                    className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    Tüm eğitimleri göster
                  </Link>
                ) : null}
              </Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {educations.map((education) => (
                  <EducationCard key={education.id} education={education} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
