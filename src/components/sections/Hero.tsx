import Link from "next/link";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Reveal } from "@/components/site/Reveal";

const stats = [
  { label: "Tamamlanan proje", value: "80+" },
  { label: "Ortalama teslim", value: "10 hafta" },
  { label: "Uptime", value: "%99,9" },
  { label: "Eğitim mezunu", value: "1.400+" },
];

const progress = [
  { name: "E-Ticaret Platformu", pct: 100 },
  { name: "Mobil Uygulama", pct: 74 },
  { name: "AI Entegrasyonu", pct: 41 },
];

const tags = ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"];

export function Hero() {
  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
          {/* Left: text */}
          <Reveal className="flex flex-col justify-center py-6 lg:py-16">
            <span className="eyebrow">
              <span
                className="size-2 rounded-full"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              2020'den beri
            </span>
            <h1 className="mt-8 text-6xl leading-[0.92] font-extrabold sm:text-7xl">
              Yazılım{" "}
              <span style={{ color: "var(--accent)" }}>ve</span>
              <br />
              eğitim
              <br />
              işi
            </h1>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Ürününüzü kuran ekip, ekibinize öğreten ekiple aynı. Sade
              teknoloji, şeffaf ilerleme.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Projenizi konuşalım
              </Link>
              <Link
                href="/education"
                className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Eğitim kataloğu
              </Link>
            </div>
          </Reveal>

          {/* Right: stats panel */}
          <Reveal delay={120} className="min-h-[420px] sm:min-h-[560px]">
            <div className="panel relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden p-6 sm:min-h-[560px] sm:p-8">
              <div className="absolute inset-0 dotted-grid opacity-40" />

              {/* Stat boxes */}
              <div className="relative grid gap-2 sm:grid-cols-2">
                {stats.map(({ label, value }) => (
                  <div key={label} className="rounded-2xl bg-background p-5">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-extrabold">{value}</p>
                  </div>
                ))}
              </div>

              {/* Progress panel */}
              <div className="relative my-6 rounded-2xl bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Aktif sprint
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "oklch(0.78 0.2 152 / 0.18)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    canlıda
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {progress.map(({ name, pct }) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm">
                        <span>{name}</span>
                        <span className="text-muted-foreground">%{pct}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: "var(--primary)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech tags */}
              <div className="relative flex flex-wrap gap-2">
                {tags.map((t) => (
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
        </div>
      </section>
    </>
  );
}
