import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { normalizeCurriculumLessons } from "@/lib/curriculum";
import { prisma } from "@/lib/prisma";
import { AdminQueryToasts } from "../../../AdminQueryToasts";
import { CurriculumForm } from "../../CurriculumForm";

type EditCurriculumPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export async function generateMetadata({
  params,
}: EditCurriculumPageProps): Promise<Metadata> {
  const { id } = await params;
  const curriculum = await prisma.curriculum.findUnique({
    where: { id },
    select: { title: true },
  });

  return {
    title: curriculum
      ? `${curriculum.title} — Admin`
      : "Müfredat Düzenle — Admin",
    description: "Müfredatı düzenle",
  };
}

export default async function EditCurriculumPage({
  params,
  searchParams,
}: EditCurriculumPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const curriculum = await prisma.curriculum.findUnique({
    where: { id },
    include: {
      details: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!curriculum) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminQueryToasts created={query.created === "1"} entityLabel="Müfredat" />
      <div>
        <h1 className="heading text-3xl font-semibold">Müfredatı Düzenle</h1>
        <p className="mt-2 text-[#888]">{curriculum.title}</p>
      </div>
      <CurriculumForm
        curriculum={{
          id: curriculum.id,
          title: curriculum.title,
          description: curriculum.description,
          details: curriculum.details.map((detail) => ({
            id: detail.id,
            title: detail.title,
            sortOrder: detail.sortOrder,
            totalDuration: detail.totalDuration,
            lessons: normalizeCurriculumLessons(detail.lessons),
          })),
        }}
      />
    </div>
  );
}
