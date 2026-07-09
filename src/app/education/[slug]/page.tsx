import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock3,
  GraduationCap,
  User,
} from "lucide-react";
import { SiteHeader, SITE_HEADER_OFFSET_CLASS } from "@/components/sections/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EducationAboutAccordion } from "@/components/education/EducationAboutAccordion";
import { EducationAskInstructorCard } from "@/components/education/EducationAskInstructorCard";
import { EducationHeroBackground } from "@/components/education/EducationHeroBackground";
import { InstructorSocialLinks } from "@/components/education/InstructorSocialLinks";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  formatDateTR,
  formatEducationDuration,
  formatPrice,
  normalizeContentSections,
  type EducationRecord,
} from "@/lib/education";
import {
  normalizeCurriculumLessons,
  toCourseModuleViews,
} from "@/lib/curriculum";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EducationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EducationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const education = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, shortDescription: true },
  });

  if (!education) {
    return { title: "Eğitim Bulunamadı" };
  }

  return {
    title: `${education.title} — AlgoryCode`,
    description: education.shortDescription,
  };
}

export default async function EducationDetailPage({
  params,
}: EducationDetailPageProps) {
  const { slug } = await params;
  const educationRow = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      curriculum: {
        include: {
          details: {
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
  });

  if (!educationRow) {
    notFound();
  }

  const { curriculum, ...educationFields } = educationRow;

  const education: EducationRecord = {
    ...educationFields,
    contentSections: normalizeContentSections(educationFields.contentSections),
  };

  const duration = formatEducationDuration(
    education.durationWeeks,
    education.durationHours,
  );

  const curriculumModules = toCourseModuleViews(
    (curriculum?.details ?? []).map((detail) => ({
      id: detail.id,
      title: detail.title,
      sortOrder: detail.sortOrder,
      totalDuration: detail.totalDuration,
      lessons: normalizeCurriculumLessons(detail.lessons),
    })),
  );

  return (
    <>
      <SiteHeader />
      <main className={`${SITE_HEADER_OFFSET_CLASS} bg-[#f3efe9]`}>
        <section className="section border-b border-border">
          <div className="container-x">
            <Link
              href="/education"
              className="text-sm text-[#888] transition-colors hover:text-foreground"
            >
              ← Tüm Eğitimler
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
              <div>
                <Card className="relative overflow-hidden border-0 bg-transparent p-6 md:p-8">
                  <EducationHeroBackground title={education.title} />

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-white/20 bg-white/10 text-white">
                        {EDUCATION_LEVEL_LABELS[education.level]}
                      </Badge>
                      <Badge className="border-white/20 bg-white/10 text-white">
                        {EDUCATION_FORMAT_LABELS[education.format]}
                      </Badge>
                      <Badge className="border-white/20 bg-white/10 text-white">
                        {formatPrice(
                          education.isFree,
                          education.price,
                          education.currency,
                        )}
                      </Badge>
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                      {education.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80">
                      {education.shortDescription}
                    </p>
                  </div>
                </Card>

                <div className="mt-12 max-w-3xl">
                  <h2 className="heading text-xl font-semibold">Eğitim Hakkında</h2>
                  <EducationAboutAccordion
                    description={education.fullDescription}
                    modules={curriculumModules}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Card className="h-fit bg-white/80 p-6">
                  <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
                    Eğitim Özeti
                  </p>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Başlangıç</dt>
                        <dd className="text-foreground">
                          {formatDateTR(new Date(education.startDate))}
                        </dd>
                      </div>
                    </div>
                    {education.endDate ? (
                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="mt-0.5 text-[#888]" />
                        <div>
                          <dt className="text-[#888]">Bitiş</dt>
                          <dd className="text-foreground">
                            {formatDateTR(new Date(education.endDate))}
                          </dd>
                        </div>
                      </div>
                    ) : null}
                    {duration ? (
                      <div className="flex items-start gap-3">
                        <Clock3 size={16} className="mt-0.5 text-[#888]" />
                        <div>
                          <dt className="text-[#888]">Süre</dt>
                          <dd className="text-foreground">{duration}</dd>
                        </div>
                      </div>
                    ) : null}
                    {education.schedule ? (
                      <div className="flex items-start gap-3">
                        <Clock3 size={16} className="mt-0.5 text-[#888]" />
                        <div>
                          <dt className="text-[#888]">Program</dt>
                          <dd className="text-foreground">{education.schedule}</dd>
                        </div>
                      </div>
                    ) : null}
                    {education.maxStudents ? (
                      <div className="flex items-start gap-3">
                        <GraduationCap size={16} className="mt-0.5 text-[#888]" />
                        <div>
                          <dt className="text-[#888]">Kontenjan</dt>
                          <dd className="text-foreground">
                            {education.maxStudents} kişi
                          </dd>
                        </div>
                      </div>
                    ) : null}
                  </dl>
                  <Button
                    href={`/education/${slug}/checkout`}
                    className="mt-6 w-full rounded-full border-0 bg-[#121212] text-white hover:bg-[#2a2a2a]"
                  >
                    {education.isFree ? "Kayıt Ol" : "Satın Al"}
                  </Button>
                </Card>

                <Card className="bg-white/80 p-6">
                  <h2 className="heading text-xl font-semibold">Eğitmen</h2>
                  <div className="mt-5 flex items-start gap-4">
                    {education.instructorAvatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={education.instructorAvatarUrl}
                        alt={education.instructorName}
                        className="h-16 w-16 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
                        <User size={24} className="text-[#888]" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        {education.instructorName}
                      </p>
                      {education.instructorTitle ? (
                        <p className="mt-1 text-sm text-[#888]">
                          {education.instructorTitle}
                        </p>
                      ) : null}
                      <InstructorSocialLinks
                        githubUrl={education.instructorGithubUrl}
                        linkedinUrl={education.instructorLinkedinUrl}
                      />
                    </div>
                  </div>
                  {education.instructorBio ? (
                    <p className="mt-4 text-sm leading-7 text-[#888]">
                      {education.instructorBio}
                    </p>
                  ) : null}
                </Card>

                {education.coverImageUrl ? (
                  <Card className="overflow-hidden bg-white/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={education.coverImageUrl}
                      alt={education.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </Card>
                ) : null}
              </div>
            </div>

            <div className="mt-12">
              <EducationAskInstructorCard
                educationId={education.id}
                educationSlug={education.slug}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
