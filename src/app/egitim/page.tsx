import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { educations } from "@/lib/educations";

export const metadata = {
  title: "Eğitim Programları | AlgroyCode",
  description:
    "Yazılım, yapay zeka ve dijital dönüşüm alanında kurumsal ve bireysel eğitim programları.",
};

export default function EgitimPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="page-content flex-1 flex flex-col w-full">
        {/* Başlık */}
        <section className="egitim-header px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 md:px-8 md:pt-24 md:pb-16">
          <Link
            href="/"
            className="egitim-back-link mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            ← Ana sayfaya dön
          </Link>
          <h1 className="egitim-title text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl md:text-5xl">
            Eğitim Programları
          </h1>
          <p className="egitim-sub mt-3 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Yazılım, yapay zeka ve dijital dönüşüm alanında sertifikalı eğitimler.
            Kurumsal ve bireysel katılıma uygun programlar.
          </p>
        </section>

        <div className="content-divider" aria-hidden />

        {/* Eğitim kartları grid */}
        <section className="egitim-cards-section w-full">
          <div className="egitim-cards-grid">
            {educations.map((item) => (
              <Link
                key={item.slug}
                href={`/egitim/${item.slug}`}
                className="egitim-card group block"
              >
                <div className="egitim-card-icon">{item.icon}</div>
                <div className="egitim-card-meta">
                  <span className="egitim-card-duration">{item.duration}</span>
                  <span className="egitim-card-sep">·</span>
                  <span className="egitim-card-level">{item.level}</span>
                </div>
                <h2 className="egitim-card-title">
                  {item.title}
                  <span className="egitim-card-arrow">↗</span>
                </h2>
                <p className="egitim-card-desc">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
