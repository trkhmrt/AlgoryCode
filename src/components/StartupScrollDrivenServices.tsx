"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Step = {
  num: string;
  kicker: string;
  title: string;
  body: string;
  icon: string;
  accent: string;
  bullets: readonly string[];
};

const STEPS: readonly Step[] = [
  {
    num: "01",
    kicker: "Akıllı geliştirme",
    title: "Yapay zeka destekli ürün hattı",
    body:
      "Talepten ilk koda kadar yapay zeka destekli akışlarla mühendislik hızını ikiye katlıyor; bağlam ve standartlar her zaman elinizde.",
    icon: "✶",
    accent: "#4f8cff",
    bullets: [
      "Bağlam farkındalıklı kod üretimi",
      "Otomatik test ve inceleme",
      "Tasarım → kod doğrudan akış",
    ],
  },
  {
    num: "02",
    kicker: "Uçtan uca teslimat",
    title: "Keşiften canlıya tek ekiple",
    body:
      "Ürün, mühendislik ve tasarım aynı çizgide; net kilometre taşları, şeffaf raporlama ve sürüm hattı.",
    icon: "◈",
    accent: "#22d3ee",
    bullets: [
      "Çevik teslimat döngüleri",
      "Sürüm ve gözlem hattı",
      "Doğrudan iş paydaşı iletişimi",
    ],
  },
  {
    num: "03",
    kicker: "Ölçek ve güvenlik",
    title: "Büyümeye dayanıklı mimari",
    body:
      "Modern stack, gözlemlenebilirlik ve güvenlik öncelikli pratiklerle ürününüz yarın da güvende kalır.",
    icon: "◉",
    accent: "#a855f7",
    bullets: [
      "Yatay ölçek odaklı altyapı",
      "Güvenlik denetimleri",
      "SLA uyumlu yayın süreçleri",
    ],
  },
];

export default function StartupScrollDrivenServices() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const innerRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let killed = false;
    let revertCtx: (() => void) | undefined;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panels = panelsRef.current.filter(Boolean) as HTMLElement[];
      const inners = innerRefs.current.filter(Boolean) as HTMLElement[];
      if (panels.length !== STEPS.length || inners.length !== STEPS.length) return;

      const ctx = gsap.context(() => {
        if (reduce) {
          gsap.set(inners, { y: 0, opacity: 1 });
        } else {
          gsap.set(inners, { y: 56, opacity: 0.12 });
          inners.forEach((inner, i) => {
            gsap.to(inner, {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panels[i],
                start: "top bottom",
                end: "top 58%",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            });
          });
        }

        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 52%",
            end: "bottom 48%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });
        });
      }, section);

      revertCtx = () => ctx.revert();
      ScrollTrigger.refresh();
    })();

    return () => {
      killed = true;
      if (revertCtx) revertCtx();
    };
  }, []);

  const goTo = (i: number) => {
    const el = panelsRef.current[i];
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };

  return (
    <section
      ref={sectionRef}
      className="ac-section ac-stick-section"
      id="hizmetler-scroll"
      aria-labelledby="ac-rise-title"
    >
      <div className="ac-rise-wrap">
        <div className="ac-stick-shell">
          <div className="ac-rise-split">
            <aside className="ac-rise-aside">
              <div className="ac-rise-aside-card">
                <h2 id="ac-rise-title">Kaydırırken sağda adımlar belirir</h2>
                <p className="ac-rise-aside-lead">
                  Sol sütun ekranda kalır; her blok aşağıdan yukarı doğru yumuşak biçimde sahneye çıkar.
                </p>

                <div className="ac-stick-progress" role="tablist" aria-label="Adımlar">
                  {STEPS.map((step, i) => (
                    <button
                      key={step.num}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`ac-stick-dot${
                        i === active ? " is-active" : i < active ? " is-done" : ""
                      }`}
                      onClick={() => goTo(i)}
                    >
                      <span className="ac-stick-dot-label">
                        <strong>{step.num}</strong>
                        {step.kicker}
                      </span>
                      <span className="ac-stick-dot-indicator" aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="ac-rise-stack">
              {STEPS.map((step, i) => (
                <article
                  key={step.num}
                  id={`rise-step-${step.num}`}
                  ref={(el) => {
                    panelsRef.current[i] = el;
                  }}
                  className="ac-rise-panel"
                  style={{ "--accent": step.accent } as CSSProperties}
                  aria-labelledby={`rise-h-${step.num}`}
                >
                  <div
                    className="ac-rise-inner"
                    ref={(el) => {
                      innerRefs.current[i] = el;
                    }}
                  >
                    <div className="ac-rise-panel-grid">
                      <div className="ac-rise-visual" aria-hidden>
                        <div className="ac-stick-orb" />
                        <div className="ac-stick-ring ac-stick-ring--a" />
                        <div className="ac-stick-ring ac-stick-ring--b" />
                        <div className="ac-stick-glyph">{step.icon}</div>
                        <div className="ac-stick-tag">
                          <span>{step.num}</span>
                          <strong>{step.kicker}</strong>
                        </div>
                      </div>
                      <div className="ac-rise-copy">
                        <p className="ac-rise-kicker">{step.kicker}</p>
                        <h3 id={`rise-h-${step.num}`}>{step.title}</h3>
                        <p className="ac-rise-body">{step.body}</p>
                        <ul className="ac-stick-bullets">
                          {step.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <Link href="/iletisim" className="ac-stick-cta">
                          <span>Bu adım için iletişim</span>
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
