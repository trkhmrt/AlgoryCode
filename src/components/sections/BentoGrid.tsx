import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

const PRODUCTS = [
  {
    name: "AlgoryQR",
    href: "https://qr.algorycode.com",
    description: "QR menü ve dijital işletme platformu",
  },
  {
    name: "Supervizyon",
    href: "https://www.supervizyonagi.com",
    description: "Yapay zeka destekli süpervizyon platformu",
  },
] as const;

const HIGHLIGHTS = [
  {
    title: "Küçük başlayın",
    text: "Her şeyi bir anda kurmaya çalışmayız. Önce işe yarayan çekirdeği çıkarır, geri kalanını birlikte ekleriz.",
    img: "/images/feature-build.png",
    alt: "Cam panellerden oluşan 3B kod editörü illüstrasyonu",
  },
  {
    title: "Temiz teslim",
    text: "Proje bittiğinde okunabilir bir kod tabanı ve kısa dokümantasyon bırakırız. Devamını siz veya biz üstlenebiliriz.",
    img: "/images/feature-cloud.png",
    alt: "Yeşil sunucu katmanları ve bulut simgeleri 3B illüstrasyon",
  },
  {
    title: "Açık iletişim",
    text: "Ne yaptığımızı gizlemeyiz. İlerlemeyi düzenli paylaşır, takılınca birlikte karar veririz.",
    img: "/images/feature-academy.png",
    alt: "Cam küp içinde kalkan ve mezuniyet kepi 3B illüstrasyon",
  },
];

const PROCESS = [
  { step: "01", title: "Keşif", text: "İki haftalık atölye, kapsam ve risklerin netleşmesi." },
  { step: "02", title: "Prototip", text: "Tıklanabilir akış ve teknik omurga kurulumu." },
  { step: "03", title: "Üretim", text: "İki haftalık sprintler, her sprint sonunda canlı sürüm." },
  { step: "04", title: "Devir", text: "Dokümantasyon, devralma ve bakım planı." },
];

const NOTES = [
  "Projeye yalnızca gerçekten ihtiyaç duyulan modüllerle başlandı.",
  "Canlıya almadan önce birlikte test edildi.",
  "Teslimde kod ve kısa bir kullanım notu paylaşıldı.",
];

export function BentoGrid() {
  return (
    <>
      {/* ── Products ── */}
      <Reveal className="border-y border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5">
          {PRODUCTS.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-background px-5 py-3 transition-colors hover:border-foreground/20"
            >
              <span className="font-semibold">{product.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground group-hover:text-foreground/80">
                {product.description}
              </span>
            </a>
          ))}
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

      {/* ── Quote + metrics ── */}
      <Section className="pt-0">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <figure className="panel flex h-full flex-col justify-between p-8 sm:p-12">
              <Quote className="size-8" style={{ color: "var(--accent)" }} />
              <blockquote className="mt-8 text-2xl font-extrabold leading-[1.2] sm:text-4xl">
                &ldquo;İlk toplantıda neye ihtiyacımız olduğunu netleştirdik. Geliştirme
                süreci de bu plana göre ilerledi; sonunda kullandığımız bir ürün
                ortaya çıktı.&rdquo;
              </blockquote>
              <figcaption className="mt-10 text-muted-foreground">
                Abdullatif Ramazan Çelik — Kurucu Ortağı, Supervizyon
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120} className="grid gap-3">
            {NOTES.map((note) => (
              <div key={note} className="surface-card p-7">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ── CTA banner ── */}
      <Section className="pt-0">
        <Reveal>
          <div className="surface-card flex flex-col items-start justify-between gap-8 p-8 sm:p-14 lg:flex-row lg:items-center">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Proje talepleri
              </span>
              <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1] sm:text-5xl">
                Bir projeniz mi var? Bizimle iletişime geçin
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
