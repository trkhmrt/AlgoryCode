import type { ContactSubmission, ContactType, Education } from "@prisma/client";

export type ContactListItem = ContactSubmission & {
  education: Pick<Education, "title" | "slug"> | null;
};

export type ContactDetailRecord = ContactListItem;

export type ContactFilters = {
  type: ContactType | "ALL";
  q: string;
};

export const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
  EDUCATION: "Eğitim",
  JOB_REQUEST: "İş Talebi",
};

export function parseContactFilters(
  searchParams: Record<string, string | string[] | undefined>,
): ContactFilters {
  const rawType = typeof searchParams.type === "string" ? searchParams.type : "";
  const type =
    rawType === "EDUCATION" || rawType === "JOB_REQUEST" ? rawType : "ALL";

  const q = typeof searchParams.q === "string" ? searchParams.q.trim() : "";

  return { type, q };
}

export function buildContactWhere(filters: ContactFilters) {
  const where: {
    type?: ContactType;
    OR?: Array<{
      firstName?: { contains: string; mode: "insensitive" };
      lastName?: { contains: string; mode: "insensitive" };
      phone?: { contains: string; mode: "insensitive" };
    }>;
  } = {};

  if (filters.type !== "ALL") {
    where.type = filters.type;
  }

  if (filters.q) {
    where.OR = [
      { firstName: { contains: filters.q, mode: "insensitive" } },
      { lastName: { contains: filters.q, mode: "insensitive" } },
      { phone: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export function formatContactDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatContactName(
  firstName: string,
  lastName: string,
): string {
  return `${firstName} ${lastName}`.trim();
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, "").trim();
}

export function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return /^\+?[0-9]{10,15}$/.test(normalized);
}
