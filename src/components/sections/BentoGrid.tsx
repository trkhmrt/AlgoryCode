import Link from "next/link";
import { ArrowUpRight, GraduationCap, Quote, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Python",
  "AWS",
  "Terraform",
];

const HIGHLIGHTS = [
  {
    title: "Daha hızlı yayına çık",
    text: "Hazır ürün omurgamız ve tasarım sistemimizle ilk sürüm haftalar içinde canlıda.",
    img: "/images/feature-build.png",
    alt: "Cam panellerden oluşan 3B kod editörü illüstrasyonu",
  },
  {
    title: "Ölçeğe hazır altyapı",
    text: "Bulut mimarisi, otomatik dağıtım ve gözlemlenebilirlik ilk günden kurulu gelir.",
    img: "/images/feature-cloud.png",
    alt: "Yeşil sunucu katmanları ve bulut simgeleri 3B illüstrasyon",
  },
  {
    title: "Ekibinizle birlikte",
    text: "Güvenlik denetimi, dokümantasyon ve akademi eğitimleriyle bilgi sizde kalır.",
    img: "/images/feature-academy.png",
    alt: "Cam küp içinde kalkan ve mezuniyet kepi 3B illüstrasyon",
  },
];

const PROCESS = [
  { step: "01", title: "Keşif", text: "İki haftalık atölye, kapsam ve risklerin netleşmesi." },
  { step: "02", title: "Prototip", text: "Tıklanabilir akış ve teknik omurga kurulumu." },
  { step: "03", title: "Üretim", text: "İki haftalık sprintler, her sprint sonunda canlı sürüm." },
  { step: "04", title: "Devir", text: "Ekip eğitimi, dokümantasyon ve bakım planı." },
];

const STACK = [
  { label: "Ürün katmanı", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { label: "Servis katmanı", items: ["Node.js", "Java", "Python", "PostgreSQL"] },
  { label: "Altyapı", items: ["Docker", "Kubernetes", "AWS", "Terraform"] },
];

const METRICS = [
  { value: "%42", label: "operasyon maliyetinde düşüş" },
  { value: "3x", label: "yayına çıkma hızı" },
  { value: "0", label: "kritik güvenlik bulgusu" },
];

const ACADEMY_STATS = [
  { value: "1.400+", label: "eğitim mezunu" },
  { value: "8–16", label: "kişilik gruplar" },
  { value: "%98", label: "müşteri devamlılığı" },
];

export function BentoGrid() {
  return (
    <>
      {/* ── Marquee ── */}
      <Reveal className="border-y border-border py-6">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track flex shrink-0 gap-12 pr-12">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
              <span
                key={`${m}-${i}`}
                className="shrink-0 whitespace-nowrap text-lg font-bold text-muted-foreground"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Highlights ── */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={i * 110} as="article">
              <div className="group flex h-full flex-col rounded-3xl border border-border bg-background p-8 transition-colors hover:border-foreground/15">
                <h3 className="text-2xl font-extrabold leading-[1.1] sm:text-3xl">
                  {h.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{h.text}</p>
                <div className="mt-10 grid flex-1 place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.img}
                    alt={h.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-56 max-w-full transition-transform duration-700 ease-out group-hover:-translate-y-1.5 sm:w-64"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Process ── */}
      <Section
        className="pt-0"
        title="Nasıl çalışıyoruz"
        description="Sürprizsiz, ölçülebilir dört adım."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 90}>
              <div className="surface-card h-full p-7">
                <span className="text-4xl font-extrabold text-muted-foreground/40">
                  {p.step}
                </span>
                <h3 className="mt-8 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Tech stack ── */}
      <Section
        className="pt-0"
        title="Kullandığımız teknolojiler"
        description="Modaya değil, ömre göre seçiyoruz."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {STACK.map(({ label, items }, i) => (
            <Reveal key={label} delay={i * 90}>
              <div className="surface-card h-full p-7">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-background px-3.5 py-1.5 text-sm font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Quote + metrics ── */}
      <Section className="pt-0">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <figure className="panel flex h-full flex-col justify-between p-8 sm:p-12">
              <Quote className="size-8" style={{ color: "var(--accent)" }} />
              <blockquote className="mt-8 text-2xl font-extrabold leading-[1.2] sm:text-4xl">
                "Altı ayda bitmeyeceğini düşündüğümüz platformu on bir haftada
                canlıya aldılar, ekibimiz de bu sürecin içinde büyüdü."
              </blockquote>
              <figcaption className="mt-10 text-muted-foreground">
                Selin Arat — Ürün Direktörü
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120} className="grid gap-3">
            {METRICS.map(({ value, label }) => (
              <div
                key={label}
                className="surface-card flex items-baseline justify-between p-7"
              >
                <span className="text-4xl font-extrabold">{value}</span>
                <span className="max-w-[9rem] text-right text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ── Academy promo ── */}
      <Section className="pt-0">
        <div className="panel grid gap-10 p-8 sm:p-14 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-sm font-medium">
              <GraduationCap className="size-4" /> AlgoryCode Akademi
            </span>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1] sm:text-5xl">
              Bilgi projede değil,
              <br />
              ekibinizde kalsın
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Gerçek kod tabanı üzerinde ilerleyen, kuruma özel canlı programlar.
            </p>
            <Link
              href="/education"
              className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Programları gör
            </Link>
          </div>
          <div className="grid gap-2">
            {ACADEMY_STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-baseline justify-between rounded-2xl bg-background px-6 py-5"
              >
                <span className="text-3xl font-extrabold">{value}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA banner ── */}
      <Section className="pt-0">
        <Reveal>
          <div className="surface-card flex flex-col items-start justify-between gap-8 p-8 sm:p-14 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles
                  className="size-4"
                  style={{ color: "var(--accent)" }}
                />{" "}
                Yeni proje kontenjanı: 3
              </span>
              <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1] sm:text-5xl">
                Bir sonraki sürümü birlikte çıkaralım
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              İletişime geç{" "}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
