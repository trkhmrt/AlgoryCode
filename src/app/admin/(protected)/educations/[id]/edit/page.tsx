import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminQueryToasts } from "../../../AdminQueryToasts";
import { EducationForm } from "../../EducationForm";

type EditEducationPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export async function generateMetadata({
  params,
}: EditEducationPageProps): Promise<Metadata> {
  const { id } = await params;
  const education = await prisma.education.findUnique({
    where: { id },
    select: { title: true },
  });

  return {
    title: education ? `${education.title} — Admin` : "Eğitim Düzenle — Admin",
    description: "Eğitimi düzenle",
  };
}

export default async function EditEducationPage({
  params,
  searchParams,
}: EditEducationPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const education = await prisma.education.findUnique({ where: { id } });

  if (!education) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminQueryToasts created={query.created === "1"} />
      <div>
        <h1 className="heading text-3xl font-semibold">Eğitimi Düzenle</h1>
        <p className="mt-2 text-[#888]">{education.title}</p>
      </div>
      <EducationForm education={education} />
    </div>
  );
}
