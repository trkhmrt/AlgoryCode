"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  parseCurriculumDetailsFromForm,
  type CurriculumDetailInput,
} from "@/lib/curriculum";
import { prisma } from "@/lib/prisma";

export type CurriculumFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

async function replaceCurriculumDetails(
  curriculumId: string,
  details: CurriculumDetailInput[],
) {
  await prisma.curriculumDetail.deleteMany({ where: { curriculumId } });

  if (details.length === 0) {
    return;
  }

  await prisma.curriculumDetail.createMany({
    data: details.map((detail, index) => ({
      curriculumId,
      title: detail.title,
      sortOrder: index,
      totalDuration: detail.totalDuration,
      lessons: detail.lessons as Prisma.InputJsonValue,
    })),
  });
}

function revalidateCurriculumPaths(educationSlugs: string[] = []) {
  revalidatePath("/admin/curriculums");
  revalidatePath("/admin/educations");
  revalidatePath("/education");

  for (const slug of educationSlugs) {
    revalidatePath(`/education/${slug}`);
  }
}

export async function createCurriculum(
  _prevState: CurriculumFormState,
  formData: FormData,
): Promise<CurriculumFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const details = parseCurriculumDetailsFromForm(formData);
  const fieldErrors: Record<string, string> = {};

  if (!title) {
    fieldErrors.title = "Müfredat başlığı zorunludur.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const curriculum = await prisma.curriculum.create({
    data: {
      title,
      description,
    },
  });

  await replaceCurriculumDetails(curriculum.id, details);
  revalidateCurriculumPaths();
  redirect(`/admin/curriculums/${curriculum.id}/edit?created=1`);
}

export async function updateCurriculum(
  id: string,
  _prevState: CurriculumFormState,
  formData: FormData,
): Promise<CurriculumFormState> {
  const existing = await prisma.curriculum.findUnique({
    where: { id },
    include: {
      educations: { select: { slug: true } },
    },
  });

  if (!existing) {
    return { error: "Müfredat bulunamadı." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const details = parseCurriculumDetailsFromForm(formData);
  const fieldErrors: Record<string, string> = {};

  if (!title) {
    fieldErrors.title = "Müfredat başlığı zorunludur.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    await prisma.curriculum.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    await replaceCurriculumDetails(id, details);
    revalidateCurriculumPaths(existing.educations.map((e) => e.slug));
    return { success: "Müfredat başarıyla güncellendi." };
  } catch {
    return { error: "Müfredat kaydedilirken bir hata oluştu." };
  }
}

export async function deleteCurriculum(id: string) {
  const existing = await prisma.curriculum.findUnique({
    where: { id },
    include: {
      educations: { select: { slug: true } },
    },
  });

  if (!existing) {
    return;
  }

  await prisma.curriculum.delete({ where: { id } });
  revalidateCurriculumPaths(existing.educations.map((e) => e.slug));
  redirect("/admin/curriculums");
}
