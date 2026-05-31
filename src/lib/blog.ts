export const BLOG_STATUS_LABELS = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  ARCHIVED: "Arşiv",
} as const;

export type BlogPostStatus = keyof typeof BLOG_STATUS_LABELS;

export type BlogPostFormValues = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingMinutes: number;
  status: BlogPostStatus;
  authorName: string;
  authorTitle: string | null;
  authorAvatarUrl: string | null;
  coverImageUrl: string | null;
};

export type BlogPostListItem = Pick<
  BlogPostFormValues,
  | "id"
  | "title"
  | "excerpt"
  | "readingMinutes"
  | "tags"
  | "authorName"
  | "status"
  | "coverImageUrl"
> & {
  slug: string;
  publishedAt: Date | null;
  createdAt: Date;
};

export type BlogPostRecord = BlogPostFormValues & {
  slug: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogPostRelatedItem = Pick<
  BlogPostListItem,
  "slug" | "title" | "excerpt" | "readingMinutes" | "publishedAt" | "createdAt"
>;

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

export function getBlogPublishedDate(post: {
  publishedAt: Date | null;
  createdAt: Date;
}): Date {
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
