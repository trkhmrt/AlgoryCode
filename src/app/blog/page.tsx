import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock3, PenLine, User } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  formatBlogDate,
  formatReadingTime,
  getBlogPublishedDate,
} from "@/lib/blog";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — AlgoryCode",
  description: "Ürün geliştirme, platform mimarisi ve büyüme üzerine yazılar.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main>
        <section className="section border-b border-[#1a1a1a]">
          <div className="container-x">
            <div className="max-w-2xl">
              <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
                AlgoryCode Blog
              </p>
              <h1 className="heading mt-4 text-4xl font-semibold md:text-5xl">
                Fikirler, rehberler ve saha notları
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#888]">
                Ürün geliştirme, ödeme altyapısı, analytics ve eğitim platformları
                hakkında ekip içi deneyimlerimizi paylaşıyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-x space-y-10">
            {posts.length === 0 ? (
              <Card className="p-10 text-center">
                <PenLine className="mx-auto text-[#444]" size={32} />
                <p className="mt-4 text-lg font-medium">Henüz yayınlanmış yazı yok</p>
                <p className="mt-2 text-sm text-[#888]">
                  Yeni blog yazıları eklendiğinde burada listelenecek.
                </p>
              </Card>
            ) : (
              <>
                {featured ? (
                  <Card className="overflow-hidden">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="relative min-h-[280px] border-b border-[#1a1a1a] bg-[#080808] lg:min-h-[420px] lg:border-b-0 lg:border-r">
                        {featured.coverImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={featured.coverImageUrl}
                            alt={featured.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(237,237,237,0.08),transparent_55%),linear-gradient(180deg,#101010_0%,#050505_100%)]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute left-6 top-6">
                          <Badge>Öne Çıkan</Badge>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center p-8 lg:p-10">
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                        <h2 className="heading mt-5 text-3xl font-semibold md:text-4xl">
                          <Link
                            href={`/blog/${featured.slug}`}
                            className="transition-colors hover:text-white"
                          >
                            {featured.title}
                          </Link>
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-[#888]">
                          {featured.excerpt}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#888]">
                          <span className="inline-flex items-center gap-2">
                            <User size={15} />
                            {featured.authorName}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Clock3 size={15} />
                            {formatReadingTime(featured.readingMinutes)}
                          </span>
                          <span>{formatBlogDate(getBlogPublishedDate(featured))}</span>
                        </div>
                        <Link
                          href={`/blog/${featured.slug}`}
                          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#ededed] transition-colors hover:text-white"
                        >
                          Yazıyı Oku
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ) : null}

                {rest.length > 0 ? (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {rest.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="relative aspect-[16/9] border-b border-[#1a1a1a] bg-[#080808]">
                          {post.coverImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.coverImageUrl}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(237,237,237,0.06),transparent_60%),linear-gradient(180deg,#0d0d0d_0%,#050505_100%)]" />
                          )}
                        </div>
                        <div className="space-y-5 p-6">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag}>{tag}</Badge>
                            ))}
                          </div>
                          <div>
                            <h3 className="heading text-2xl font-semibold">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="transition-colors hover:text-white"
                              >
                                {post.title}
                              </Link>
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-[#888]">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-[#888]">
                            <span>{post.authorName}</span>
                            <span>{formatReadingTime(post.readingMinutes)}</span>
                            <span>{formatBlogDate(getBlogPublishedDate(post))}</span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#ededed] transition-colors hover:text-white"
                          >
                            Devamını Oku
                            <ArrowUpRight size={15} />
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
