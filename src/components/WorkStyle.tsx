"use client";

import Link from "next/link";

const cells = [
  {
    step: 1,
    title: "Keşif & Planlama",
    desc: "İhtiyaçlarınızı derinlemesine anlıyoruz. Hedefler, kullanıcılar ve rekabet analizi ile sağlam bir yol haritası çıkarıyoruz.",
    mock: "discovery",
  },
  {
    step: 2,
    title: "UI/UX Tasarım",
    desc: "Markanıza özel renk paleti, tipografi ve bileşen sistemi ile etkileyici, kullanıcı dostu arayüzler tasarlıyoruz.",
    mock: "design",
  },
  {
    step: 3,
    title: "Geliştirme",
    desc: "Temiz, hızlı ve ölçeklenebilir kod. React, Next.js ve modern teknoloji yığınıyla hayata geçiriyoruz.",
    mock: "code",
  },
  {
    step: 4,
    title: "Lansman & Büyüme",
    desc: "Canlıya geçişten sonra durmuyoruz. SEO, analitik ve sürekli optimizasyonla büyümenizi hızlandırıyoruz.",
    mock: "metrics",
  },
];

export default function WorkStyle() {
  return (
    <section id="work-style" className="work-style-section relative">
      <div className="work-style-blob-before" aria-hidden />
      <div className="work-style-blob-after" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <header className="work-style-header">
          <div className="work-style-eyebrow">
            <span className="work-style-eyebrow-dot" />
            Süreçlerimiz
          </div>
          <h2 className="work-style-title">
            Nasıl <span className="work-style-title-gradient">Çalışıyoruz?</span>
          </h2>
          <p className="work-style-sub">
            Fikrinizden lansmana kadar şeffaf, hızlı ve sonuç odaklı bir süreç.
          </p>
        </header>

        <div className="work-style-bento">
          {/* Cell 1: Keşif & Planlama */}
          <div className="work-style-cell">
            <div
              className={`work-style-step-badge work-style-step-1`}
              aria-hidden
            >
              01
            </div>
            <div className="work-style-mock">
              <div className="work-style-flow">
                <div className="work-style-flow-step">
                  <div className="work-style-flow-icon work-style-flow-icon-1">
                    📋
                  </div>
                  Proje hedefleri belirlendi
                  <div className="work-style-flow-check work-style-flow-check-done">
                    ✓
                  </div>
                </div>
                <div className="work-style-flow-step">
                  <div className="work-style-flow-icon work-style-flow-icon-2">
                    🎯
                  </div>
                  Hedef kitle analizi yapıldı
                  <div className="work-style-flow-check work-style-flow-check-done">
                    ✓
                  </div>
                </div>
                <div className="work-style-flow-step">
                  <div className="work-style-flow-icon work-style-flow-icon-3">
                    🗺️
                  </div>
                  Yol haritası oluşturuldu
                  <div className="work-style-flow-check work-style-flow-check-next">
                    →
                  </div>
                </div>
              </div>
            </div>
            <h3 className="work-style-cell-title">{cells[0].title}</h3>
            <p className="work-style-cell-desc">{cells[0].desc}</p>
          </div>

          {/* Cell 2: UI/UX Tasarım */}
          <div className="work-style-cell">
            <div
              className={`work-style-step-badge work-style-step-2`}
              aria-hidden
            >
              02
            </div>
            <div className="work-style-mock">
              <div className="work-style-design-preview">
                <div className="work-style-palette-row">
                  <div
                    className="work-style-swatch"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-pink), var(--brand-pink-soft))",
                    }}
                  />
                  <div
                    className="work-style-swatch"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-violet), var(--brand-violet-soft))",
                    }}
                  />
                  <div
                    className="work-style-swatch"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-turquoise), var(--brand-turquoise-soft))",
                    }}
                  />
                  <div className="work-style-swatch" style={{ background: "#18181b" }} />
                  <div
                    className="work-style-swatch"
                    style={{
                      background: "#f9f9fb",
                      border: "1px solid #e4e4e7",
                    }}
                  />
                </div>
                <div className="work-style-design-cards">
                  <div className="work-style-dcard">
                    <div className="work-style-dcard-top">
                      <div
                        className="work-style-dcard-dot"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-pink), var(--brand-violet))",
                        }}
                      />
                      <div className="work-style-dcard-line" />
                    </div>
                    <div className="work-style-dcard-line2" />
                  </div>
                  <div className="work-style-dcard">
                    <div className="work-style-dcard-top">
                      <div
                        className="work-style-dcard-dot"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-violet), var(--brand-turquoise))",
                        }}
                      />
                      <div className="work-style-dcard-line" />
                    </div>
                    <div className="work-style-dcard-line2" style={{ width: "55%" }} />
                  </div>
                  <div
                    className="work-style-dcard"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <div className="flex gap-1.5 items-center">
                      <div
                        className="h-6 flex-1 rounded-md opacity-70"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--brand-pink), var(--brand-violet), var(--brand-turquoise))",
                        }}
                      />
                      <div className="h-6 w-14 rounded-md bg-[#f0f0f0]" />
                    </div>
                  </div>
                </div>
                <div className="work-style-design-bars">
                  <div className="work-style-dbar work-style-dbar-full" />
                  <div className="work-style-dbar work-style-dbar-w75" />
                  <div className="work-style-dbar work-style-dbar-w55" />
                </div>
              </div>
            </div>
            <h3 className="work-style-cell-title">{cells[1].title}</h3>
            <p className="work-style-cell-desc">{cells[1].desc}</p>
          </div>

          {/* Cell 3: Geliştirme */}
          <div className="work-style-cell">
            <div
              className={`work-style-step-badge work-style-step-3`}
              aria-hidden
            >
              03
            </div>
            <div className="work-style-mock work-style-code-editor">
              <div className="work-style-editor-chrome">
                <span className="work-style-e-dot bg-[#ff5f57]" />
                <span className="work-style-e-dot bg-[#febc2e]" />
                <span className="work-style-e-dot bg-[#28c840]" />
                <span className="text-[11px] text-[#546e7a] ml-2">
                  index.tsx
                </span>
              </div>
              <div className="work-style-editor-body">
                <div className="work-style-code-line">
                  <span className="work-style-code-kw">import</span>{" "}
                  <span className="work-style-code-fn">React</span>{" "}
                  <span className="work-style-code-kw">from</span>{" "}
                  <span className="work-style-code-str">&apos;react&apos;</span>
                </div>
                <div className="work-style-code-line">
                  <span className="work-style-code-cm">// Hizmet bileşeni</span>
                </div>
                <div className="work-style-code-line">
                  <span className="work-style-code-kw">const</span>{" "}
                  <span className="work-style-code-fn">HeroSection</span>{" "}
                  <span className="work-style-code-op">=</span> (){" "}
                  <span className="work-style-code-op">=&gt;</span> {"{"}
                </div>
                <div className="work-style-code-line pl-4">
                  <span className="work-style-code-kw">const</span> [
                  <span className="work-style-code-nm">active</span>,{" "}
                  <span className="work-style-code-fn">setActive</span>] ={" "}
                  <span className="work-style-code-fn">useState</span>(
                  <span className="work-style-code-nm">0</span>)
                </div>
                <div className="work-style-code-line pl-4">
                  <span className="work-style-code-kw">return</span>{" "}
                  <span className="work-style-code-op">&lt;</span>
                  <span className="work-style-code-fn">div</span>{" "}
                  <span className="work-style-code-nm">className</span>
                  <span className="work-style-code-op">=</span>
                  <span className="work-style-code-str">&quot;hero&quot;</span>
                  <span className="work-style-code-op">&gt;</span>
                </div>
                <div className="work-style-code-line pl-8">
                  <span className="work-style-code-op">&lt;</span>
                  <span className="work-style-code-fn">h1</span>
                  <span className="work-style-code-op">&gt;</span>
                  <span className="work-style-code-str">Merhaba Dünya</span>
                  <span className="work-style-code-op">&lt;/</span>
                  <span className="work-style-code-fn">h1</span>
                  <span className="work-style-code-op">&gt;</span>
                </div>
                <div className="work-style-code-line pl-4">
                  <span className="work-style-code-op">&lt;/</span>
                  <span className="work-style-code-fn">div</span>
                  <span className="work-style-code-op">&gt;</span>
                </div>
                <div className="work-style-code-line">{"}"}</div>
                <div className="work-style-code-line mt-1">
                  <span className="work-style-code-kw">export default</span>{" "}
                  <span className="work-style-code-fn">HeroSection</span>
                </div>
              </div>
            </div>
            <h3 className="work-style-cell-title">{cells[2].title}</h3>
            <p className="work-style-cell-desc">{cells[2].desc}</p>
          </div>

          {/* Cell 4: Lansman & Büyüme */}
          <div className="work-style-cell">
            <div
              className={`work-style-step-badge work-style-step-4`}
              aria-hidden
            >
              04
            </div>
            <div className="work-style-mock">
              <div className="work-style-metrics-grid">
                <div className="work-style-metric-card">
                  <div className="work-style-metric-val work-style-metric-gradient">
                    +247%
                  </div>
                  <div className="work-style-metric-label">Organik Trafik</div>
                  <div className="work-style-metric-trend">Bu ay</div>
                  <div className="work-style-mini-bar">
                    <div
                      className="work-style-mini-fill"
                      style={{
                        width: "82%",
                        background:
                          "linear-gradient(90deg, var(--brand-pink), var(--brand-violet))",
                      }}
                    />
                  </div>
                </div>
                <div className="work-style-metric-card">
                  <div className="work-style-metric-val work-style-metric-gradient-2">
                    3.2×
                  </div>
                  <div className="work-style-metric-label">Dönüşüm Artışı</div>
                  <div className="work-style-metric-trend">Lansman</div>
                  <div className="work-style-mini-bar">
                    <div
                      className="work-style-mini-fill"
                      style={{
                        width: "68%",
                        background:
                          "linear-gradient(90deg, var(--brand-violet), var(--brand-turquoise))",
                      }}
                    />
                  </div>
                </div>
                <div className="work-style-metric-card">
                  <div className="work-style-metric-val work-style-metric-gradient-3">
                    99
                  </div>
                  <div className="work-style-metric-label">Lighthouse Skoru</div>
                  <div className="work-style-metric-trend">Mükemmel</div>
                  <div className="work-style-mini-bar">
                    <div
                      className="work-style-mini-fill"
                      style={{
                        width: "99%",
                        background:
                          "linear-gradient(90deg, var(--brand-turquoise), var(--brand-pink))",
                      }}
                    />
                  </div>
                </div>
                <div className="work-style-metric-card">
                  <div className="work-style-metric-val work-style-metric-gradient">
                    48+
                  </div>
                  <div className="work-style-metric-label">Mutlu Müşteri</div>
                  <div className="work-style-metric-trend">Büyüyor</div>
                  <div className="work-style-mini-bar">
                    <div
                      className="work-style-mini-fill"
                      style={{
                        width: "92%",
                        background:
                          "linear-gradient(90deg, var(--brand-pink), var(--brand-turquoise))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="work-style-cell-title">{cells[3].title}</h3>
            <p className="work-style-cell-desc">{cells[3].desc}</p>
          </div>
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Projenizi konuşalım
            <span className="text-neutral-400">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
