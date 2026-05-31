import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock3,
  Globe,
  GraduationCap,
  MapPin,
  User,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  formatDateTR,
  formatEducationDuration,
  formatPrice,
} from "@/lib/education";
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
  const education = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
  });

  if (!education) {
    notFound();
  }

  const duration = formatEducationDuration(
    education.durationWeeks,
    education.durationHours,
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="section border-b border-[#1a1a1a]">
          <div className="container-x">
            <Link
              href="/education"
              className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
            >
              ← Tüm Eğitimler
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{EDUCATION_LEVEL_LABELS[education.level]}</Badge>
                  <Badge>{EDUCATION_FORMAT_LABELS[education.format]}</Badge>
                  <Badge>
                    {formatPrice(
                      education.isFree,
                      education.price,
                      education.currency,
                    )}
                  </Badge>
                </div>

                <h1 className="heading mt-5 text-4xl font-semibold md:text-5xl">
                  {education.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#888]">
                  {education.shortDescription}
                </p>
              </div>

              <Card className="h-fit p-6">
                <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
                  Eğitim Özeti
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="mt-0.5 text-[#888]" />
                    <div>
                      <dt className="text-[#888]">Başlangıç</dt>
                      <dd>{formatDateTR(new Date(education.startDate))}</dd>
                    </div>
                  </div>
                  {education.endDate ? (
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Bitiş</dt>
                        <dd>{formatDateTR(new Date(education.endDate))}</dd>
                      </div>
                    </div>
                  ) : null}
                  {duration ? (
                    <div className="flex items-start gap-3">
                      <Clock3 size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Süre</dt>
                        <dd>{duration}</dd>
                      </div>
                    </div>
                  ) : null}
                  {education.schedule ? (
                    <div className="flex items-start gap-3">
                      <Clock3 size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Program</dt>
                        <dd>{education.schedule}</dd>
                      </div>
                    </div>
                  ) : null}
                  {education.location ? (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Konum</dt>
                        <dd>{education.location}</dd>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-start gap-3">
                    <Globe size={16} className="mt-0.5 text-[#888]" />
                    <div>
                      <dt className="text-[#888]">Dil</dt>
                      <dd>{education.language.toUpperCase()}</dd>
                    </div>
                  </div>
                  {education.maxStudents ? (
                    <div className="flex items-start gap-3">
                      <GraduationCap size={16} className="mt-0.5 text-[#888]" />
                      <div>
                        <dt className="text-[#888]">Kontenjan</dt>
                        <dd>{education.maxStudents} kişi</dd>
                      </div>
                    </div>
                  ) : null}
                </dl>
                <Button href={`/education/${slug}/checkout`} className="mt-6 w-full">
                  {education.isFree ? "Kayıt Ol" : "Satın Al"}
                </Button>
              </Card>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-x grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold">Eğitim Hakkında</h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#888]">
                  {education.fullDescription}
                </div>
              </Card>

              {education.learningOutcomes.length > 0 ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold">Kazanımlar</h2>
                  <ul className="mt-4 space-y-3 text-sm text-[#888]">
                    {education.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ededed]" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              {education.syllabus ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold">Müfredat</h2>
                  <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#888]">
                    {education.syllabus}
                  </div>
                </Card>
              ) : null}

              {education.prerequisites ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold">Ön Koşullar</h2>
                  <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#888]">
                    {education.prerequisites}
                  </div>
                </Card>
              ) : null}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold">Eğitmen</h2>
                <div className="mt-5 flex items-start gap-4">
                  {education.instructorAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={education.instructorAvatarUrl}
                      alt={education.instructorName}
                      className="h-16 w-16 rounded-full border border-[#1a1a1a] object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#1a1a1a] bg-[#080808]">
                      <User size={24} className="text-[#888]" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{education.instructorName}</p>
                    {education.instructorTitle ? (
                      <p className="mt-1 text-sm text-[#888]">
                        {education.instructorTitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                {education.instructorBio ? (
                  <p className="mt-4 text-sm leading-7 text-[#888]">
                    {education.instructorBio}
                  </p>
                ) : null}
              </Card>

              {education.coverImageUrl ? (
                <Card className="overflow-hidden">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
