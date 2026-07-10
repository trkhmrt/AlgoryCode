"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  EducationFormat,
  EducationLevel,
  EducationStatus,
  EducationTrack,
} from "@/lib/education";
import {
  EDUCATION_TRACK_LABELS,
  normalizeContentSections,
  parseContentSections,
  parseLearningOutcomes,
  slugify,
} from "@/lib/education";
import { prisma } from "@/lib/prisma";

export type EducationFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

type ParsedEducation = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructorName: string;
  instructorTitle: string | null;
  instructorBio: string | null;
  instructorAvatarUrl: string | null;
  instructorGithubUrl: string | null;
  instructorLinkedinUrl: string | null;
  startDate: Date;
  endDate: Date | null;
  durationWeeks: number | null;
  durationHours: number | null;
  schedule: string | null;
  level: EducationLevel;
  format: EducationFormat;
  language: string;
  track: EducationTrack | null;
  techLanguage: string | null;
  price: string | null;
  currency: string;
  isFree: boolean;
  maxStudents: number | null;
  location: string | null;
  prerequisites: string | null;
  learningOutcomes: string[];
  contentSections: ReturnType<typeof parseContentSections>;
  syllabus: string | null;
  coverImageUrl: string | null;
  status: EducationStatus;
  curriculumId: string | null;
};

function parseOptionalInt(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseEducationForm(formData: FormData): {
  data: ParsedEducation | null;
  fieldErrors: Record<string, string>;
} {
  const fieldErrors: Record<string, string> = {};
  const title = String(formData.get("title") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const fullDescription = String(formData.get("fullDescription") ?? "").trim();
  const instructorName = String(formData.get("instructorName") ?? "").trim();
  const startDateRaw = String(formData.get("startDate") ?? "").trim();
  const endDateRaw = String(formData.get("endDate") ?? "").trim();
  const isFree = formData.get("isFree") === "on";
  const priceRaw = String(formData.get("price") ?? "").trim();
  const curriculumIdRaw = String(formData.get("curriculumId") ?? "").trim();
  const curriculumId = curriculumIdRaw || null;
  const trackRaw = String(formData.get("track") ?? "").trim();
  const techLanguageRaw = String(formData.get("techLanguage") ?? "").trim();
  const track =
    trackRaw && trackRaw in EDUCATION_TRACK_LABELS
      ? (trackRaw as EducationTrack)
      : null;
  const techLanguage = techLanguageRaw || null;

  if (!title) fieldErrors.title = "Başlık zorunludur.";
  if (!shortDescription) fieldErrors.shortDescription = "Kısa açıklama zorunludur.";
  if (!fullDescription) fieldErrors.fullDescription = "Detaylı açıklama zorunludur.";
  if (!instructorName) fieldErrors.instructorName = "Eğitmen adı zorunludur.";
  if (!startDateRaw) fieldErrors.startDate = "Başlangıç tarihi zorunludur.";

  const startDate = startDateRaw ? new Date(startDateRaw) : null;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;

  if (startDateRaw && Number.isNaN(startDate?.getTime())) {
    fieldErrors.startDate = "Geçerli bir başlangıç tarihi girin.";
  }

  if (endDateRaw && Number.isNaN(endDate?.getTime())) {
    fieldErrors.endDate = "Geçerli bir bitiş tarihi girin.";
  }

  if (startDate && endDate && endDate < startDate) {
    fieldErrors.endDate = "Bitiş tarihi başlangıçtan önce olamaz.";
  }

  if (!isFree && priceRaw && Number.isNaN(Number(priceRaw))) {
    fieldErrors.price = "Geçerli bir fiyat girin.";
  }

  if (Object.keys(fieldErrors).length > 0 || !startDate) {
    return { data: null, fieldErrors };
  }

  return {
    data: {
      title,
      shortDescription,
      fullDescription,
      instructorName,
      instructorTitle: String(formData.get("instructorTitle") ?? "").trim() || null,
      instructorBio: String(formData.get("instructorBio") ?? "").trim() || null,
      instructorAvatarUrl:
        String(formData.get("instructorAvatarUrl") ?? "").trim() || null,
      instructorGithubUrl:
        String(formData.get("instructorGithubUrl") ?? "").trim() || null,
      instructorLinkedinUrl:
        String(formData.get("instructorLinkedinUrl") ?? "").trim() || null,
      startDate,
      endDate,
      durationWeeks: parseOptionalInt(formData.get("durationWeeks")),
      durationHours: parseOptionalInt(formData.get("durationHours")),
      schedule: String(formData.get("schedule") ?? "").trim() || null,
      level: String(formData.get("level") ?? "ALL_LEVELS") as EducationLevel,
      format: String(formData.get("format") ?? "ONLINE") as EducationFormat,
      language: String(formData.get("language") ?? "tr").trim() || "tr",
      track,
      techLanguage,
      price: isFree || !priceRaw ? null : priceRaw,
      currency: String(formData.get("currency") ?? "TRY").trim() || "TRY",
      isFree,
      maxStudents: parseOptionalInt(formData.get("maxStudents")),
      location: String(formData.get("location") ?? "").trim() || null,
      prerequisites: String(formData.get("prerequisites") ?? "").trim() || null,
      learningOutcomes: parseLearningOutcomes(formData.get("learningOutcomes")),
      contentSections: parseContentSections(formData.get("contentSections")),
      syllabus: String(formData.get("syllabus") ?? "").trim() || null,
      coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
      status: String(formData.get("status") ?? "DRAFT") as EducationStatus,
      curriculumId,
    },
    fieldErrors,
  };
}

async function createUniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title);
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.education.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${base}-${counter}`;
    counter += 1;
  }
}

function revalidateEducationPaths(slug?: string) {
  revalidatePath("/education");
  revalidatePath("/admin");
  revalidatePath("/admin/educations");

  if (slug) {
    revalidatePath(`/education/${slug}`);
  }
}

export async function createEducation(
  _prevState: EducationFormState,
  formData: FormData,
): Promise<EducationFormState> {
  const { data, fieldErrors } = parseEducationForm(formData);

  if (!data) {
    return { fieldErrors };
  }

  const slug = await createUniqueSlug(data.title);
  const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

  if (data.curriculumId) {
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: data.curriculumId },
      select: { id: true },
    });

    if (!curriculum) {
      return { fieldErrors: { curriculumId: "Seçilen müfredat bulunamadı." } };
    }
  }

  const education = await prisma.education.create({
    data: {
      ...data,
      slug,
      publishedAt,
    },
  });

  revalidateEducationPaths(education.slug);
  redirect(`/admin/educations/${education.id}/edit?created=1`);
}

export async function updateEducation(
  id: string,
  _prevState: EducationFormState,
  formData: FormData,
): Promise<EducationFormState> {
  const existing = await prisma.education.findUnique({ where: { id } });

  if (!existing) {
    return { error: "Eğitim bulunamadı." };
  }

  const { data, fieldErrors } = parseEducationForm(formData);

  if (!data) {
    return { fieldErrors };
  }

  try {
    if (data.curriculumId) {
      const curriculum = await prisma.curriculum.findUnique({
        where: { id: data.curriculumId },
        select: { id: true },
      });

      if (!curriculum) {
        return { fieldErrors: { curriculumId: "Seçilen müfredat bulunamadı." } };
      }
    }

    const slug =
      data.title !== existing.title
        ? await createUniqueSlug(data.title, id)
        : existing.slug;

    let publishedAt = existing.publishedAt;

    if (data.status === "PUBLISHED" && !publishedAt) {
      publishedAt = new Date();
    }

    if (data.status !== "PUBLISHED") {
      publishedAt = null;
    }

    const education = await prisma.education.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
      },
    });

    revalidateEducationPaths(education.slug);
    if (existing.slug !== education.slug) {
      revalidatePath(`/education/${existing.slug}`);
    }

    return { success: "Eğitim başarıyla güncellendi." };
  } catch {
    return { error: "Eğitim kaydedilirken bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

export async function deleteEducation(id: string) {
  const existing = await prisma.education.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existing) {
    return;
  }

  await prisma.education.delete({ where: { id } });
  revalidateEducationPaths(existing.slug);
  redirect("/admin/educations");
}

export async function duplicateEducation(id: string) {
  const existing = await prisma.education.findUnique({ where: { id } });

  if (!existing) {
    redirect("/admin/educations");
  }

  const copyTitle = `${existing.title} (Kopya)`;
  const slug = await createUniqueSlug(copyTitle);
  const contentSections = normalizeContentSections(existing.contentSections);

  const education = await prisma.education.create({
    data: {
      slug,
      title: copyTitle,
      shortDescription: existing.shortDescription,
      fullDescription: existing.fullDescription,
      instructorName: existing.instructorName,
      instructorTitle: existing.instructorTitle,
      instructorBio: existing.instructorBio,
      instructorAvatarUrl: existing.instructorAvatarUrl,
      instructorGithubUrl: existing.instructorGithubUrl,
      instructorLinkedinUrl: existing.instructorLinkedinUrl,
      startDate: existing.startDate,
      endDate: existing.endDate,
      durationWeeks: existing.durationWeeks,
      durationHours: existing.durationHours,
      schedule: existing.schedule,
      level: existing.level,
      format: existing.format,
      language: existing.language,
      track: existing.track,
      techLanguage: existing.techLanguage,
      price: existing.price,
      currency: existing.currency,
      isFree: existing.isFree,
      maxStudents: existing.maxStudents,
      location: existing.location,
      prerequisites: existing.prerequisites,
      learningOutcomes: existing.learningOutcomes,
      contentSections,
      syllabus: existing.syllabus,
      coverImageUrl: existing.coverImageUrl,
      curriculumId: existing.curriculumId,
      status: "DRAFT",
      publishedAt: null,
    },
  });

  revalidateEducationPaths(education.slug);
  redirect(`/admin/educations/${education.id}/edit?duplicated=1`);
}
