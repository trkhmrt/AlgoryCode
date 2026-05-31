import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  BLOG_STATUS_LABELS,
  formatBlogDate,
  formatReadingTime,
  getBlogPublishedDate,
} from "@/lib/blog";
import { prisma } from "@/lib/prisma";
import { DeleteBlogButton } from "./DeleteBlogButton";

export const metadata: Metadata = {
  title: "Blog — Admin",
  description: "Blog yazılarını yönet",
};

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ status: "asc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading text-3xl font-semibold">Blog</h1>
          <p className="mt-2 text-[#888]">
            Blog yazılarını ekleyin, düzenleyin veya arşivleyin.
          </p>
        </div>
        <Button href="/admin/blog/new">Yeni Yazı</Button>
      </div>

      <Card className="overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#888]">Henüz blog yazısı eklenmemiş.</p>
            <div className="mt-4">
              <Button href="/admin/blog/new" variant="secondary">
                İlk Yazıyı Oluştur
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Yazı</th>
                  <th className="px-4 py-3 font-medium">Yazar</th>
                  <th className="px-4 py-3 font-medium">Yayın</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <p className="font-medium text-[#ededed]">{post.title}</p>
                        <p className="line-clamp-2 text-xs text-[#888]">
                          {post.excerpt}
                        </p>
                        <p className="text-xs text-[#666]">
                          {formatReadingTime(post.readingMinutes)}
                          {post.tags.length > 0
                            ? ` · ${post.tags.slice(0, 3).join(", ")}`
                            : ""}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {post.authorName}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {post.status === "PUBLISHED"
                        ? formatBlogDate(getBlogPublishedDate(post))
                        : "—"}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="rounded-full border border-[#333] px-2.5 py-1 text-xs">
                        {BLOG_STATUS_LABELS[post.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-sm text-[#ededed] transition-colors hover:text-white"
                        >
                          Düzenle
                        </Link>
                        {post.status === "PUBLISHED" ? (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
                          >
                            Görüntüle
                          </Link>
                        ) : null}
                        <DeleteBlogButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
