export const EDUCATION_LEVEL_LABELS = {
  BEGINNER: "Başlangıç",
  INTERMEDIATE: "Orta",
  ADVANCED: "İleri",
  ALL_LEVELS: "Tüm Seviyeler",
} as const;

export type EducationLevel = keyof typeof EDUCATION_LEVEL_LABELS;

export const EDUCATION_FORMAT_LABELS = {
  ONLINE: "Online",
  IN_PERSON: "Yüz Yüze",
  HYBRID: "Hibrit",
  LIVE: "Canlı",
  RECORDED: "Kayıtlı",
} as const;

export type EducationFormat = keyof typeof EDUCATION_FORMAT_LABELS;

export const EDUCATION_STATUS_LABELS = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  ARCHIVED: "Arşiv",
} as const;

export type EducationStatus = keyof typeof EDUCATION_STATUS_LABELS;

export type EducationFormValues = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructorName: string;
  instructorTitle: string | null;
  instructorBio: string | null;
  instructorAvatarUrl: string | null;
  startDate: Date;
  endDate: Date | null;
  durationWeeks: number | null;
  durationHours: number | null;
  schedule: string | null;
  level: EducationLevel;
  format: EducationFormat;
  language: string;
  price: { toString(): string } | null;
  currency: string;
  isFree: boolean;
  maxStudents: number | null;
  location: string | null;
  prerequisites: string | null;
  learningOutcomes: string[];
  syllabus: string | null;
  coverImageUrl: string | null;
  status: EducationStatus;
};

export type EducationListItem = Pick<
  EducationFormValues,
  | "id"
  | "title"
  | "format"
  | "level"
  | "isFree"
  | "price"
  | "currency"
  | "durationWeeks"
  | "durationHours"
  | "instructorName"
  | "startDate"
  | "status"
> & {
  slug: string;
};

export type EducationDashboardItem = Pick<
  EducationFormValues,
  "id" | "title" | "instructorName" | "startDate" | "status"
>;

export type EducationPublicListItem = Pick<
  EducationFormValues,
  | "id"
  | "title"
  | "shortDescription"
  | "level"
  | "format"
  | "isFree"
  | "price"
  | "currency"
  | "instructorName"
  | "startDate"
  | "durationWeeks"
  | "durationHours"
  | "location"
  | "coverImageUrl"
> & {
  slug: string;
};

export type EducationRecord = EducationFormValues & {
  slug: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EducationCheckoutRecord = {
  id: string;
  slug: string;
  title: string;
  isFree: boolean;
  price: DecimalLike | null;
  currency: string;
};

type DecimalLike = { toString(): string };

const TR_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function slugify(value: string): string {
  const normalized = value
    .split("")
    .map((char) => TR_CHAR_MAP[char] ?? char)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "egitim";
}

export function parseLearningOutcomes(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatEducationDuration(
  durationWeeks?: number | null,
  durationHours?: number | null,
): string | null {
  const parts: string[] = [];

  if (durationWeeks) {
    parts.push(`${durationWeeks} hafta`);
  }

  if (durationHours) {
    parts.push(`${durationHours} saat`);
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

export function formatPrice(
  isFree: boolean,
  price?: { toString(): string } | null,
  currency = "TRY",
): string {
  if (isFree) {
    return "Ücretsiz";
  }

  if (!price) {
    return "Fiyat belirtilmedi";
  }

  const amount = Number(price.toString());

  if (Number.isNaN(amount)) {
    return "Fiyat belirtilmedi";
  }

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTR(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateTimeLocal(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
