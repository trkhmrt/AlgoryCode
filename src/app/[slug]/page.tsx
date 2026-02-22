import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PRODUCT_SLUGS = ["commerce", "mobil-app", "chatbot", "voice-assistant", "egitim"] as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export default async function UrunPage({ params }: Props) {
  const { slug } = await params;
  const product = getServiceBySlug(slug);
  if (!product) notFound();

  const isEgitim = product.slug === "egitim";
  const isRedBlue = product.color === "red-blue";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
          <Link
            href="/#hizmetler"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            ← Ürünlere dön
          </Link>
          <article
            className={
              isRedBlue
                ? "service-detail-card service-detail-red-blue rounded-2xl border border-[#e8e8ec] bg-white p-8 shadow-sm sm:p-10"
                : "service-detail-card rounded-2xl border border-[#e8e8ec] bg-white p-8 shadow-sm sm:p-10"
            }
          >
            <div
              className={
                isRedBlue
                  ? "service-detail-icon service-detail-icon-red-blue mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                  : "mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#ebebef] bg-[#f5f5f8] text-2xl"
              }
            >
              {product.icon}
            </div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-[#0f0f0f] sm:text-3xl">
              {product.title}
            </h1>
            <p className="mb-8 leading-relaxed text-[#555]">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {isEgitim ? (
                <>
                  <Link
                    href="/egitim"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Eğitim programlarına git →
                  </Link>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-6 py-3 text-sm font-medium text-[#333] transition hover:bg-[#f8f8f8]"
                  >
                    İletişime geç
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Bu ürün için iletişime geçin →
                  </Link>
                  <Link
                    href="/#hizmetler"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-6 py-3 text-sm font-medium text-[#333] transition hover:bg-[#f8f8f8]"
                  >
                    Diğer ürünler
                  </Link>
                </>
              )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
