export type CurriculumLesson = {
  title: string;
  duration: string;
  previewUrl?: string;
};

export type CurriculumDetailInput = {
  title: string;
  totalDuration?: string | null;
  lessons: CurriculumLesson[];
};

export type CurriculumDetailRecord = {
  id: string;
  title: string;
  sortOrder: number;
  totalDuration: string | null;
  lessons: CurriculumLesson[];
};

export type CurriculumListItem = {
  id: string;
  title: string;
  description: string | null;
  detailCount: number;
  educationCount: number;
  updatedAt: Date;
};

export type CurriculumWithDetails = {
  id: string;
  title: string;
  description: string | null;
  details: CurriculumDetailRecord[];
};

export type CourseModuleView = {
  id: string;
  title: string;
  lessonCount: number;
  totalDuration: string;
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
    previewUrl?: string;
  }>;
};

export function normalizeCurriculumLessons(value: unknown): CurriculumLesson[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const title = String((item as CurriculumLesson).title ?? "").trim();
      const duration = String((item as CurriculumLesson).duration ?? "").trim();
      const previewUrl = String((item as CurriculumLesson).previewUrl ?? "").trim();

      if (!title) {
        return null;
      }

      return {
        title,
        duration: duration || "—",
        ...(previewUrl ? { previewUrl } : {}),
      };
    })
    .filter((item): item is CurriculumLesson => item !== null);
}

export function parseCurriculumLessons(
  value: FormDataEntryValue | null,
): CurriculumLesson[] {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return [];
  }

  try {
    return normalizeCurriculumLessons(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function parseCurriculumDetailsFromForm(
  formData: FormData,
): CurriculumDetailInput[] {
  const titles = formData.getAll("detailTitle").map((v) => String(v).trim());
  const durations = formData
    .getAll("detailDuration")
    .map((v) => String(v).trim());
  const lessonsRaw = formData.getAll("detailLessons").map((v) => String(v));

  return titles
    .map((title, index) => {
      if (!title) {
        return null;
      }

      return {
        title,
        totalDuration: durations[index] || null,
        lessons: parseCurriculumLessons(lessonsRaw[index] ?? "[]"),
      };
    })
    .filter((item): item is CurriculumDetailInput => item !== null);
}

export function toCourseModuleViews(
  details: CurriculumDetailRecord[],
): CourseModuleView[] {
  return details.map((detail) => {
    const lessons = detail.lessons.map((lesson, index) => ({
      id: `${detail.id}-${index}`,
      title: lesson.title,
      duration: lesson.duration,
      ...(lesson.previewUrl ? { previewUrl: lesson.previewUrl } : {}),
    }));

    return {
      id: detail.id,
      title: detail.title,
      lessonCount: lessons.length,
      totalDuration: detail.totalDuration?.trim() || `${lessons.length} ders`,
      lessons,
    };
  });
}
