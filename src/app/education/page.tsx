import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock3, GraduationCap, MapPin, User } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
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

export const metadata: Metadata = {
  title: "Eğitimler — AlgoryCode",
  description: "AlgoryCode tarafından yayınlanan eğitim programları.",
};

export default async function EducationPage() {
  const educations = await prisma.education.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startDate: "asc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="section border-b border-[#1a1a1a]">
          <div className="container-x">
            <div className="max-w-2xl">
              <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
                AlgoryCode Education
              </p>
              <h1 className="heading mt-4 text-4xl font-semibold md:text-5xl">
                Eğitimler
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#888]">
                Uzman eğitmenlerimizle hazırlanan programları keşfedin. Canlı,
                online ve kayıtlı eğitim formatlarında güncel içerikler.
              </p>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-x">
            {educations.length === 0 ? (
              <Card className="p-10 text-center">
                <GraduationCap className="mx-auto text-[#444]" size={32} />
                <p className="mt-4 text-lg font-medium">Henüz yayınlanmış eğitim yok</p>
                <p className="mt-2 text-sm text-[#888]">
                  Yeni eğitimler eklendiğinde burada listelenecek.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {educations.map((education) => {
                  const duration = formatEducationDuration(
                    education.durationWeeks,
                    education.durationHours,
                  );

                  return (
                    <Card key={education.id} className="overflow-hidden">
                      {education.coverImageUrl ? (
                        <div className="aspect-[16/9] overflow-hidden border-b border-[#1a1a1a]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={education.coverImageUrl}
                            alt={education.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null}

                      <div className="space-y-5 p-6">
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

                        <div>
                          <h2 className="heading text-2xl font-semibold">
                            <Link
                              href={`/education/${education.slug}`}
                              className="transition-colors hover:text-white"
                            >
                              {education.title}
                            </Link>
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-[#888]">
                            {education.shortDescription}
                          </p>
                        </div>

                        <div className="grid gap-3 text-sm text-[#888] sm:grid-cols-2">
                          <p className="inline-flex items-center gap-2">
                            <User size={15} />
                            {education.instructorName}
                          </p>
                          <p className="inline-flex items-center gap-2">
                            <Calendar size={15} />
                            {formatDateTR(new Date(education.startDate))}
                          </p>
                          {duration ? (
                            <p className="inline-flex items-center gap-2">
                              <Clock3 size={15} />
                              {duration}
                            </p>
                          ) : null}
                          {education.location ? (
                            <p className="inline-flex items-center gap-2">
                              <MapPin size={15} />
                              {education.location}
                            </p>
                          ) : null}
                        </div>

                        <Link
                          href={`/education/${education.slug}`}
                          className="inline-flex text-sm font-medium text-[#ededed] transition-colors hover:text-white"
                        >
                          Detayları Gör →
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
