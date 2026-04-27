import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function UrunPage({ params }: Props) {
  const { slug } = await params;
  const product = getServiceBySlug(slug);
  if (!product) notFound();

  const isEgitim = product.slug === "egitim";
  const isRedBlue = product.color === "red-blue";

  const surfaceCard =
    "rounded-2xl border border-[color-mix(in_srgb,var(--ac-line)_100%,transparent)] bg-[color-mix(in_srgb,var(--ac-surface)_94%,transparent)] p-6 sm:p-8";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--ac-bg)] text-[var(--ac-fg)]">
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden border-b border-[var(--ac-line)] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-16 text-zinc-50 sm:px-6 sm:py-20 md:px-8 md:py-24"
          aria-labelledby="product-hero-title"
        >
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#urunler"
              className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              ← Ürünlere dön
            </Link>
            <div className="mb-5 text-4xl" aria-hidden>
              {product.icon}
            </div>
            <h1
              id="product-hero-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {product.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              {product.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-14 px-4 py-14 sm:px-6 md:space-y-16 md:py-20 md:px-8">
          <section id="ozellikler" aria-labelledby="product-features-title">
            <h2 id="product-features-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Özellikler
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li
                  key={f}
                  className={`flex gap-3 rounded-xl border border-[var(--ac-line)] bg-[color-mix(in_srgb,var(--ac-surface-2)_88%,transparent)] px-4 py-3 text-sm leading-snug text-[var(--ac-muted)]`}
                >
                  <span className="mt-0.5 shrink-0 text-emerald-500" aria-hidden>
                    ✓
                  </span>
                  <span className="text-[var(--ac-fg)]">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="nasil-calisir" aria-labelledby="product-how-title">
            <h2 id="product-how-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Nasıl çalışır?
            </h2>
            <ol className="mt-6 space-y-4">
              {product.howItWorks.map((step, i) => (
                <li
                  key={step.title}
                  className={`${surfaceCard} ${isRedBlue ? "service-detail-red-blue" : ""}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ac-brand)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--ac-fg)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ac-muted)]">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="demo" aria-labelledby="product-demo-title">
            <h2 id="product-demo-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Ekran görüntüleri / demo
            </h2>
            <p className="mt-2 text-sm text-[var(--ac-muted)]">
              Canlı demo ve ürün ekran görüntüleri talep üzerine paylaşılır; aşağıdaki alanlar yer
              tutucudur.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex aspect-[4/3] items-end rounded-xl border border-dashed border-[var(--ac-line)] bg-[color-mix(in_srgb,var(--ac-surface-2)_70%,transparent)] p-3"
                >
                  <span className="text-xs font-medium text-[var(--ac-muted)]">Önizleme {n}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="fiyatlandirma" aria-labelledby="product-price-title">
            <h2 id="product-price-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Fiyatlandırma
            </h2>
            {product.pricing ? (
              <div className={`mt-5 ${surfaceCard} ${isRedBlue ? "service-detail-red-blue" : ""}`}>
                <h3 className="text-lg font-semibold text-[var(--ac-fg)]">{product.pricing.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--ac-muted)]">
                  {product.pricing.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-[var(--ac-brand)]" aria-hidden>
                        •
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[var(--ac-muted)]">
                  Kesin fiyat; katılımcı sayısı, süre ve materyal kapsamına göre tekliflenir.
                </p>
              </div>
            ) : (
              <div className={`mt-5 ${surfaceCard}`}>
                <p className="text-sm leading-relaxed text-[var(--ac-muted)]">
                  Bu ürün için fiyatlandırma kullanım kapsamınıza göre belirlenir. Kısa bir keşif
                  görüşmesinden sonra net bir teklif sunarız.
                </p>
              </div>
            )}
          </section>
        </div>

        <section
          className="ac-section"
          id="demo-talep"
          aria-labelledby="product-demo-cta-heading"
        >
          <div className="ac-mouse-panel">
            <div className="ac-publish-stage">
              <div className="ac-publish-copy ac-publish-copy--wide">
                <h2 id="product-demo-cta-heading">{product.title} için bir sonraki adım</h2>
                <p>
                  Demo talep edin veya doğrudan iletişime geçin; kısa sürede dönüş yapalım. İsterseniz
                  bu ürüne özel canlı veya kayıtlı gösterim planlayalım.
                </p>
                <Link href="/iletisim" className="ac-publish-learn-btn">
                  İletişime geç
                </Link>
                {isEgitim ? (
                  <p className="mt-6 text-center text-sm opacity-90">
                    <Link
                      href="/egitim"
                      className="font-medium underline underline-offset-4 decoration-current/40 hover:decoration-current"
                    >
                      Eğitim programları sayfasına git →
                    </Link>
                  </p>
                ) : null}
              </div>
              <div className="ac-publish-focus">
                <div className="ac-publish-glow" aria-hidden />
                <Link href="/iletisim" className="ac-publish-button ac-publish-button--link">
                  Demo talep et
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
