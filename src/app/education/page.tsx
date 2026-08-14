import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Users, Layers, GraduationCap, Quote } from "lucide-react";
import { EducationCard } from "@/components/education/EducationCard";
import {
  EDUCATION_LIST_ANCHOR_ID,
  EducationScrollManager,
} from "@/components/education/EducationScrollManager";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import { Footer } from "@/components/sections/Footer";
import { PageHero, Section, Eyebrow } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import {
  EDUCATION_TRACK_LABELS,
  type EducationPublicListItem,
  type EducationTrack,
} from "@/lib/education";
import { getPublishedEducationsCached } from "@/lib/education-cache";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eğitimler",
  description:
    "Uzman eğitmenlerle hazırlanan yazılım ve dijital beceri eğitimleri. Canlı, online ve kayıtlı programları keşfedin.",
  alternates: {
    canonical: "/education",
  },
};

type EducationPageProps = {
  searchParams: Promise<{ track?: string; tech?: string }>;
};

const TRACKS = [
  { id: "", label: "Tümü" },
  { id: "FRONTEND", label: "Frontend" },
  { id: "BACKEND", label: "Backend" },
  { id: "FULLSTACK", label: "Full Stack" },
  { id: "DEVOPS", label: "DevOps" },
  { id: "AI", label: "Yapay Zekâ" },
  { id: "MOBILE", label: "Mobil" },
  { id: "DATABASE", label: "Veritabanı" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Eğitim sonrası ekibimiz teknolojiyi çok daha verimli kullanmaya başladı. Pratik odaklı yaklaşım gerçekten fark yarattı.",
    name: "Ahmet Yıldız",
    role: "Teknik Direktör",
    initials: "AY",
  },
  {
    quote:
      "Kayıtlı format sayesinde kendi hızımda ilerleyebildim. Konular gerçek projeler üzerinden anlatıldığı için çok daha kalıcı oldu.",
    name: "Zeynep Arslan",
    role: "Frontend Geliştirici",
    initials: "ZA",
  },
  {
    quote:
      "Canlı oturumlar çok interaktifti, sorularımıza anında yanıt aldık. Eğitmenin deneyimi her derse yansıdı.",
    name: "Murat Kaya",
    role: "Backend Mühendisi",
    initials: "MK",
  },
  {
    quote:
      "Sertifika programını tamamladıktan sonra yeni bir iş teklifim oldu. Kariyerime ciddi bir ivme kattı.",
    name: "Selin Öztürk",
    role: "Full Stack Geliştirici",
    initials: "SÖ",
  },
];

function isEducationTrack(value: string): value is EducationTrack {
  return value in EDUCATION_TRACK_LABELS;
}

export default async function EducationPage({ searchParams }: EducationPageProps) {
  const params = await searchParams;
  const trackFilter =
    params.track && isEducationTrack(params.track) ? params.track : undefined;
  const techFilter = params.tech?.trim() || undefined;

  const educations: EducationPublicListItem[] =
    await getPublishedEducationsCached({ track: trackFilter, tech: techFilter });

  const hasActiveFilter = Boolean(trackFilter || techFilter);
  const activeTrackId = trackFilter ?? "";

  return (
    <>
      <SiteHeader />
      <main
        className={SITE_HEADER_OFFSET_CLASS}
        style={{ background: "var(--sr-surface)" }}
      >
        {/* ── Hero ── */}
        <PageHero
          eyebrow="AlgoryCode Akademi"
          title="Ekibinizin seviyesini kalıcı olarak yükseltin."
          description="Slayt değil kod. Her program gerçek projeler üzerinde ilerler ve kariyerinizi bir adım öne taşır."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Users, label: "Küçük gruplar, yüksek verim" },
              { icon: Layers, label: "Seviyene uygun içerik" },
              { icon: Clock, label: "Esnek format seçenekleri" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 rounded-full px-4 py-3 text-sm font-medium"
                style={{
                  background: "var(--sr-surface-2)",
                  color: "var(--sr-foreground)",
                  fontFamily: "var(--font-manrope)",
                }}
              >
                <item.icon
                  size={16}
                  style={{ color: "var(--sr-accent)", flexShrink: 0 }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </PageHero>

        {/* ── Stats strip ── */}
        <div
          className="border-y"
          style={{ borderColor: "var(--sr-border)" }}
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {[
                { value: "1.400+", label: "Mezun öğrenci" },
                { value: "%98", label: "Memnuniyet oranı" },
                { value: "4", label: "Farklı format" },
                { value: "7", label: "Uzman alan" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="px-6 py-8 text-center"
                  style={{
                    borderLeft: i > 0 ? `1px solid var(--sr-border)` : undefined,
                  }}
                >
                  <p
                    className="text-3xl font-extrabold"
                    style={{
                      fontFamily: "var(--font-manrope)",
                      color: "var(--sr-foreground)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Course catalogue ── */}
        <section
          id={EDUCATION_LIST_ANCHOR_ID}
          className="mx-auto max-w-6xl scroll-mt-[80px] px-5 py-14 sm:py-20"
        >
          <Reveal className="mb-10 max-w-2xl">
            <h2
              className="sr-heading text-3xl leading-[1.05] sm:text-5xl"
            >
              Program kataloğu
            </h2>
            <p
              className="mt-4 text-base sm:text-lg"
              style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
            >
              Track'leri birleştirerek de program oluşturabilirsiniz.
            </p>
          </Reveal>

          {/* Track filter tabs */}
          <Reveal delay={60} className="mb-8">
            <Suspense fallback={null}>
              <EducationScrollManager />
            </Suspense>
            <div className="sr-tab-list flex-wrap">
              {TRACKS.map((t) => (
                <Link
                  key={t.id}
                  href={
                    t.id
                      ? `/education?track=${t.id}#${EDUCATION_LIST_ANCHOR_ID}`
                      : `/education#${EDUCATION_LIST_ANCHOR_ID}`
                  }
                  scroll={false}
                  className={`sr-tab ${activeTrackId === t.id ? "sr-tab-active" : ""}`}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Grid or empty state */}
          {educations.length === 0 ? (
            <Reveal>
              <div
                className="rounded-3xl p-12 text-center"
                style={{ background: "var(--sr-surface-2)" }}
              >
                <GraduationCap
                  size={36}
                  className="mx-auto"
                  style={{ color: "var(--sr-muted)" }}
                />
                <p
                  className="mt-4 text-lg font-semibold"
                  style={{
                    color: "var(--sr-foreground)",
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  {hasActiveFilter
                    ? "Bu filtreye uygun eğitim bulunamadı"
                    : "Henüz yayınlanmış eğitim yok"}
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
                >
                  {hasActiveFilter
                    ? "Filtreleri temizleyip tüm programlara bakın."
                    : "Yeni eğitimler eklendiğinde burada görünecek."}
                </p>
                {hasActiveFilter ? (
                  <Link
                    href={`/education#${EDUCATION_LIST_ANCHOR_ID}`}
                    scroll={false}
                    className="mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
                    style={{
                      background: "var(--sr-primary)",
                      color: "var(--sr-primary-fg)",
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Tüm eğitimleri göster
                  </Link>
                ) : null}
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {educations.map((education, i) => (
                <Reveal key={education.id} delay={i * 70}>
                  <EducationCard education={education} />
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* ── Testimonials ── */}
        <Section title="Öğrenciler ne diyor" description="Slayt değil kod; sonuçlarını onlar anlatıyor.">
          <div className="grid gap-3 lg:grid-cols-3">
            {/* Featured */}
            <Reveal className="lg:col-span-1 lg:row-span-2">
              <figure
                className="panel-sr flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <Quote
                  size={32}
                  style={{ color: "var(--sr-accent)" }}
                />
                <blockquote
                  className="mt-8 text-2xl font-extrabold leading-[1.18] sm:text-3xl"
                  style={{
                    color: "var(--sr-foreground)",
                    fontFamily: "var(--font-manrope)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  "{TESTIMONIALS[0].quote}"
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-3">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold"
                    style={{
                      background: "var(--sr-surface)",
                      color: "var(--sr-foreground)",
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    {TESTIMONIALS[0].initials}
                  </span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-manrope)" }}>
                    <span
                      className="block font-semibold"
                      style={{ color: "var(--sr-foreground)" }}
                    >
                      {TESTIMONIALS[0].name}
                    </span>
                    <span style={{ color: "var(--sr-muted)" }}>
                      {TESTIMONIALS[0].role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            {TESTIMONIALS.slice(1).map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure
                  className="surface-card-sr flex h-full flex-col justify-between p-7"
                >
                  <blockquote
                    className="text-base font-medium leading-relaxed"
                    style={{
                      color: "var(--sr-foreground)",
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold"
                      style={{
                        background: "var(--sr-surface)",
                        color: "var(--sr-foreground)",
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      {t.initials}
                    </span>
                    <span className="text-sm" style={{ fontFamily: "var(--font-manrope)" }}>
                      <span
                        className="block font-semibold"
                        style={{ color: "var(--sr-foreground)" }}
                      >
                        {t.name}
                      </span>
                      <span style={{ color: "var(--sr-muted)" }}>{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── CTA banner ── */}
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <Reveal>
            <div
              className="surface-card-sr flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-14"
            >
              <div>
                <Eyebrow>Kuruma özel program</Eyebrow>
                <h2
                  className="sr-heading mt-5 text-3xl leading-[1.05] sm:text-4xl"
                >
                  Kuruma özel program mı gerekiyor?
                </h2>
                <p
                  className="mt-3 max-w-md text-base"
                  style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
                >
                  Mevcut teknoloji yığınınızı inceleyip müfredatı birlikte
                  tasarlıyoruz. İlk görüşme ücretsiz.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "var(--sr-primary)",
                  color: "var(--sr-primary-fg)",
                  fontFamily: "var(--font-manrope)",
                }}
              >
                Eğitim talebi oluştur
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
