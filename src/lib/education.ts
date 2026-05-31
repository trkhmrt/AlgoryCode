import type {
  EducationFormat,
  EducationLevel,
  EducationStatus,
} from "@prisma/client";

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  BEGINNER: "Başlangıç",
  INTERMEDIATE: "Orta",
  ADVANCED: "İleri",
  ALL_LEVELS: "Tüm Seviyeler",
};

export const EDUCATION_FORMAT_LABELS: Record<EducationFormat, string> = {
  ONLINE: "Online",
  IN_PERSON: "Yüz Yüze",
  HYBRID: "Hibrit",
  LIVE: "Canlı",
  RECORDED: "Kayıtlı",
};

export const EDUCATION_STATUS_LABELS: Record<EducationStatus, string> = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  ARCHIVED: "Arşiv",
};

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
