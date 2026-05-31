import type { BlogPost } from "@prisma/client";

export const BLOG_STATUS_LABELS = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  ARCHIVED: "Arşiv",
} as const;

export function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} dk okuma`;
}

export function getBlogPublishedDate(post: BlogPost): Date {
  return post.publishedAt ?? post.createdAt;
}

export function splitBlogContent(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function parseBlogTags(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatBlogTags(tags: string[]): string {
  return tags.join(", ");
}

export function formatBlogDateTimeLocal(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
