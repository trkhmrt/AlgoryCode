import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "../../BlogForm";
import { BlogQueryToasts } from "../../BlogQueryToasts";

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export async function generateMetadata({
  params,
}: EditBlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: { title: true },
  });

  return {
    title: post ? `${post.title} — Admin` : "Blog Düzenle — Admin",
    description: "Blog yazısını düzenle",
  };
}

export default async function EditBlogPage({
  params,
  searchParams,
}: EditBlogPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <BlogQueryToasts created={query.created === "1"} />
      <div>
        <h1 className="heading text-3xl font-semibold">Blog Yazısını Düzenle</h1>
        <p className="mt-2 text-[#888]">{post.title}</p>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
