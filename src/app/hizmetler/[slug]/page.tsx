import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const isRedBlue = service.color === "red-blue";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
          <Link
            href="/#hizmetler"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            ← Hizmetlere dön
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
              {service.icon}
            </div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-[#0f0f0f] sm:text-3xl">
              {service.title}
            </h1>
            <p className="mb-8 leading-relaxed text-[#555]">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Bu hizmet için iletişime geçin →
              </Link>
              <Link
                href="/#hizmetler"
                className="inline-flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-white px-6 py-3 text-sm font-medium text-[#333] transition hover:bg-[#f8f8f8]"
              >
                Diğer hizmetler
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
