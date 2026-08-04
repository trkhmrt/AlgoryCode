import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock3,
  GraduationCap,
  User,
} from "lucide-react";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { EducationApplicationCard } from "@/components/education/EducationApplicationCard";
import { EducationAboutAccordion } from "@/components/education/EducationAboutAccordion";
import { EducationAskInstructorCard } from "@/components/education/EducationAskInstructorCard";
import { EducationBackToListLink } from "@/components/education/EducationBackToListLink";
import { EducationFaqSection } from "@/components/education/EducationFaqSection";
import { EducationHeroBackground } from "@/components/education/EducationHeroBackground";
import { InstructorSocialLinks } from "@/components/education/InstructorSocialLinks";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  formatDateTR,
  formatEducationDuration,
  type EducationRecord,
} from "@/lib/education";
import {
  getPublishedEducationBySlugCached,
  getPublishedEducationMetaCached,
} from "@/lib/education-cache";
import {
  normalizeCurriculumLessons,
  toCourseModuleViews,
} from "@/lib/curriculum";

export const revalidate = 60;

type EducationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EducationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const education = await getPublishedEducationMetaCached(slug);

  if (!education) {
    return { title: "Eğitim Bulunamadı" };
  }

  return {
    title: education.title,
    description: education.shortDescription,
    alternates: {
      canonical: `/education/${slug}`,
    },
  };
}

export default async function EducationDetailPage({
  params,
}: EducationDetailPageProps) {
  const { slug } = await params;
  const educationRow = await getPublishedEducationBySlugCached(slug);

  if (!educationRow) {
    notFound();
  }

  const { curriculum, ...educationFields } = educationRow;

  const education = educationFields as EducationRecord;

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
            <EducationBackToListLink />

            <div className="mt-8">
              <EducationHeroBackground
                title={education.title}
                coverImageUrl={education.coverImageUrl}
              />

              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {EDUCATION_LEVEL_LABELS[education.level]}
                  </Badge>
                  <Badge variant="outline">
                    {EDUCATION_FORMAT_LABELS[education.format]}
                  </Badge>
                  <Badge variant="outline">Başvuru ile</Badge>
                </div>

                <h1 className="heading mt-5 text-[28px] font-semibold tracking-tight text-foreground md:text-[36px]">
                  {education.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#888]">
                  {education.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:items-start">
              <div className="min-w-0">
                <h2 className="heading text-xl font-semibold">Eğitim Hakkında</h2>
                <EducationAboutAccordion
                  description={education.fullDescription}
                  prerequisites={education.prerequisites}
                  modules={curriculumModules}
                />
              </div>

              <div className="min-w-0 space-y-6 lg:sticky lg:top-24">
                <EducationApplicationCard
                  educationId={education.id}
                  educationTitle={education.title}
                />

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
                </Card>

                {/* TODO: show instructor later */}
                {false ? (
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
                ) : null}
              </div>
            </div>

            <EducationFaqSection />

            {/* TODO: show instructor later */}
            {false ? (
              <div className="mt-12">
                <EducationAskInstructorCard
                  educationId={education.id}
                  educationSlug={education.slug}
                />
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
