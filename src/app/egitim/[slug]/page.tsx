import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getEducationBySlug, educations } from "@/lib/educations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return educations.map((e) => ({ slug: e.slug }));
}

export default async function EgitimDetayPage({ params }: Props) {
  const { slug } = await params;
  const education = getEducationBySlug(slug);
  if (!education) notFound();

  const hasImage = education.image && education.image.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="page-content flex-1 flex flex-col w-full">
        {/* Üst: geri linki */}
        <div className="egitim-detail-top px-4 pt-16 pb-6 sm:px-6 md:px-8">
          <Link
            href="/egitim"
            className="egitim-back-link inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            ← Eğitim programlarına dön
          </Link>
        </div>

        {/* İki sütun: sol sidebar (sabit), sağ içerik (scroll) */}
        <div className="egitim-detail-layout">
          {/* Sol: sidebar – görsel + detay bilgileri, sabit */}
          <aside className="egitim-detail-sidebar">
            <div className="egitim-detail-sidebar-inner">
              {/* Görsel alanı */}
              <div className="egitim-detail-visual">
                {hasImage ? (
                  <Image
                    src={education.image!}
                    alt={education.title}
                    width={400}
                    height={240}
                    className="egitim-detail-image"
                  />
                ) : (
                  <div className="egitim-detail-visual-placeholder">
                    <span className="egitim-detail-visual-icon" aria-hidden>
                      {education.icon}
                    </span>
                  </div>
                )}
              </div>
              <div className="egitim-detail-meta">
                <span>{education.duration}</span>
                <span className="egitim-detail-meta-sep">·</span>
                <span>{education.level}</span>
              </div>
              <h1 className="egitim-detail-title">{education.title}</h1>
              <p className="egitim-detail-desc">{education.description}</p>
              <div className="egitim-detail-actions">
                <Link
                  href="/iletisim"
                  className="egitim-detail-cta-primary"
                >
                  Bu eğitim için kayıt ol →
                </Link>
                <Link
                  href="/egitim"
                  className="egitim-detail-cta-secondary"
                >
                  Tüm programlar
                </Link>
              </div>
            </div>
          </aside>

          {/* Sağ: scroll yapılabilir içerik */}
          <div className="egitim-detail-content">
            <div className="egitim-detail-content-inner">
              {education.content && education.content.length > 0 ? (
                education.content.map((section, i) => (
                  <section key={i} className="egitim-detail-section">
                    <h2 className="egitim-detail-section-title">
                      {section.title}
                    </h2>
                    <p className="egitim-detail-section-body">{section.body}</p>
                  </section>
                ))
              ) : (
                <section className="egitim-detail-section">
                  <p className="egitim-detail-section-body">
                    {education.description}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
