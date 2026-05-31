import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, User } from "lucide-react";
import { SiteHeader, SITE_HEADER_OFFSET_CLASS } from "@/components/sections/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  formatBlogDate,
  formatReadingTime,
  getBlogPublishedDate,
  splitBlogContent,
  type BlogPostRecord,
  type BlogPostRelatedItem,
} from "@/lib/blog";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return { title: "Yazı Bulunamadı" };
  }

  return {
    title: `${post.title} — AlgoryCode Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post: BlogPostRecord | null = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });

  if (!post) {
    notFound();
  }

  const [relatedPosts, paragraphs]: [BlogPostRelatedItem[], string[]] =
    await Promise.all([
      prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
        slug: { not: post.slug },
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        readingMinutes: true,
        publishedAt: true,
        createdAt: true,
      },
      }),
      Promise.resolve(splitBlogContent(post.content)),
    ]);

  const publishedDate = getBlogPublishedDate(post);

  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <section className="border-b border-[#1a1a1a]">
          <div className="relative overflow-hidden">
            {post.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(237,237,237,0.08),transparent_45%),linear-gradient(180deg,#121212_0%,#050505_100%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

            <div className="container-x relative py-16 md:py-24">
              <Link
                href="/blog"
                className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
              >
                ← Tüm Yazılar
              </Link>

              <div className="mt-8 max-w-4xl">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h1 className="heading mt-6 text-4xl font-semibold md:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#bdbdbd] md:text-lg">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[#888]">
                  <span className="inline-flex items-center gap-2">
                    <User size={15} />
                    {post.authorName}
                  </span>
                  <span>{formatBlogDate(publishedDate)}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} />
                    {formatReadingTime(post.readingMinutes)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article>
              <Card className="p-6 md:p-10">
                <div className="mx-auto max-w-3xl space-y-6">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[15px] leading-8 text-[#bdbdbd]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1a1a1a] pt-8">
                <div>
                  <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
                    Yazar
                  </p>
                  <p className="mt-2 font-medium">{post.authorName}</p>
                  {post.authorTitle ? (
                    <p className="mt-1 text-sm text-[#888]">{post.authorTitle}</p>
                  ) : null}
                </div>
                <Button href="/blog" variant="secondary">
                  Diğer Yazılar
                </Button>
              </div>
            </article>

            <aside className="space-y-6">
              <Card className="p-6">
                <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
                  Bu Yazı Hakkında
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-[#888]">Yayın Tarihi</dt>
                    <dd className="mt-1">{formatBlogDate(publishedDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-[#888]">Okuma Süresi</dt>
                    <dd className="mt-1">{formatReadingTime(post.readingMinutes)}</dd>
                  </div>
                  <div>
                    <dt className="text-[#888]">Etiketler</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  {post.authorAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.authorAvatarUrl}
                      alt={post.authorName}
                      className="h-14 w-14 rounded-full border border-[#1a1a1a] object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1a1a1a] bg-[#080808]">
                      <User size={22} className="text-[#888]" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{post.authorName}</p>
                    {post.authorTitle ? (
                      <p className="mt-1 text-sm text-[#888]">{post.authorTitle}</p>
                    ) : null}
                  </div>
                </div>
              </Card>

              {relatedPosts.length > 0 ? (
                <Card className="p-6">
                  <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
                    İlgili Yazılar
                  </p>
                  <ul className="mt-5 space-y-5">
                    {relatedPosts.map((related) => (
                      <li key={related.slug} className="border-b border-[#1a1a1a] pb-5 last:border-b-0 last:pb-0">
                        <Link
                          href={`/blog/${related.slug}`}
                          className="group block"
                        >
                          <p className="font-medium transition-colors group-hover:text-white">
                            {related.title}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#888]">
                            {related.excerpt}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#888]">
                            {formatReadingTime(related.readingMinutes)}
                            <ArrowUpRight
                              size={12}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              <Card className="p-6">
                <p className="text-lg font-semibold">Eğitimleri keşfedin</p>
                <p className="mt-2 text-sm leading-relaxed text-[#888]">
                  Blog yazılarımızın ötesinde, uygulamalı eğitim programlarımıza
                  göz atın.
                </p>
                <Button href="/education" className="mt-5 w-full">
                  Eğitimlere Git
                </Button>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
