"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BlogPostStatus } from "@prisma/client";
import { parseBlogTags } from "@/lib/blog";
import { slugify } from "@/lib/education";
import { prisma } from "@/lib/prisma";

export type BlogFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

type ParsedBlogPost = {
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorTitle: string | null;
  authorAvatarUrl: string | null;
  coverImageUrl: string | null;
  tags: string[];
  readingMinutes: number;
  status: BlogPostStatus;
};

function parseOptionalInt(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBlogForm(formData: FormData): {
  data: ParsedBlogPost | null;
  fieldErrors: Record<string, string>;
} {
  const fieldErrors: Record<string, string> = {};
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "").trim();
  const readingMinutes = parseOptionalInt(formData.get("readingMinutes"));

  if (!title) fieldErrors.title = "Başlık zorunludur.";
  if (!excerpt) fieldErrors.excerpt = "Özet zorunludur.";
  if (!content) fieldErrors.content = "İçerik zorunludur.";
  if (!authorName) fieldErrors.authorName = "Yazar adı zorunludur.";

  if (readingMinutes !== null && readingMinutes < 1) {
    fieldErrors.readingMinutes = "Okuma süresi en az 1 dakika olmalı.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { data: null, fieldErrors };
  }

  return {
    data: {
      title,
      excerpt,
      content,
      authorName,
      authorTitle: String(formData.get("authorTitle") ?? "").trim() || null,
      authorAvatarUrl:
        String(formData.get("authorAvatarUrl") ?? "").trim() || null,
      coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
      tags: parseBlogTags(formData.get("tags")),
      readingMinutes: readingMinutes ?? 5,
      status: String(formData.get("status") ?? "DRAFT") as BlogPostStatus,
    },
    fieldErrors,
  };
}

async function createUniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title);
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.blogPost.findFirst({
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

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPost(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const { data, fieldErrors } = parseBlogForm(formData);

  if (!data) {
    return { fieldErrors };
  }

  const slug = await createUniqueSlug(data.title);
  const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug,
      publishedAt,
    },
  });

  revalidateBlogPaths(post.slug);
  redirect(`/admin/blog/${post.id}/edit?created=1`);
}

export async function updateBlogPost(
  id: string,
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const existing = await prisma.blogPost.findUnique({ where: { id } });

  if (!existing) {
    return { error: "Blog yazısı bulunamadı." };
  }

  const { data, fieldErrors } = parseBlogForm(formData);

  if (!data) {
    return { fieldErrors };
  }

  try {
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

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
      },
    });

    revalidateBlogPaths(post.slug);
    if (existing.slug !== post.slug) {
      revalidatePath(`/blog/${existing.slug}`);
    }

    return { success: "Blog yazısı başarıyla güncellendi." };
  } catch {
    return {
      error: "Blog yazısı kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }
}

export async function deleteBlogPost(id: string) {
  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existing) {
    return;
  }

  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPaths(existing.slug);
  redirect("/admin/blog");
}
