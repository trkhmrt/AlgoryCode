"use client";

import { useState } from "react";
import Link from "next/link";

const servicesData = [
  {
    name: "Web Tasarım & Geliştirme",
    tag: "Dijital Deneyim",
    icon: "🌐",
    iconBg: "bg-neutral-100",
    badgeText: "En Popüler",
    badgeClass: "services-list-badge",
    title: "Web Tasarım & Geliştirme",
    desc: "Markanızı yansıtan, kullanıcı odaklı ve modern web siteleri tasarlıyorum. Hız, estetik ve işlevselliği bir arada sunarak rakiplerinizden öne çıkmanızı sağlıyorum.",
    features: [
      "Özel UI/UX Tasarımı",
      "Responsive & Mobil Uyumlu",
      "SEO Dostu Altyapı",
      "Yüksek Performans",
    ],
    href: "/iletisim",
  },
  {
    name: "Mobil Uygulama Geliştirme",
    tag: "iOS & Android",
    icon: "📱",
    iconBg: "bg-neutral-100",
    badgeText: "Popüler",
    badgeClass: "services-list-badge",
    title: "Mobil Uygulama Geliştirme",
    desc: "iOS ve Android platformları için ölçeklenebilir, kullanıcı dostu mobil uygulamalar geliştiriyorum. Fikrinizden App Store'a kadar uçtan uca hizmet sunuyorum.",
    features: [
      "Cross-Platform Geliştirme",
      "App Store Yayınlama",
      "Push Notification",
      "Performans Optimizasyonu",
    ],
    href: "/iletisim",
  },
  {
    name: "Marka Kimliği & Logo",
    tag: "Görsel Kimlik",
    icon: "✨",
    iconBg: "bg-neutral-100",
    badgeText: "Yaratıcı",
    badgeClass: "services-list-badge",
    title: "Marka Kimliği & Logo Tasarımı",
    desc: "İşletmenizin değerlerini yansıtan, akılda kalıcı ve güçlü bir marka kimliği oluşturuyorum. Logo'dan renk paletine kadar tutarlı bir dil inşa ediyorum.",
    features: [
      "Logo & Varyant Tasarımı",
      "Renk Paleti & Tipografi",
      "Marka Rehberi",
      "Sosyal Medya Kiti",
    ],
    href: "/iletisim",
  },
  {
    name: "SEO & Dijital Pazarlama",
    tag: "Büyüme",
    icon: "📈",
    iconBg: "bg-neutral-100",
    badgeText: "Büyüme Odaklı",
    badgeClass: "services-list-badge",
    title: "SEO & Dijital Pazarlama",
    desc: "Arama motorlarında üst sıralara çıkmanızı ve dijital kanallardan nitelikli müşteri kazanmanızı sağlıyorum. Veri odaklı stratejilerle ölçülebilir büyüme.",
    features: [
      "Teknik SEO Analizi",
      "İçerik Stratejisi",
      "Google Ads Yönetimi",
      "Performans Raporlama",
    ],
    href: "/iletisim",
  },
  {
    name: "E-Ticaret Çözümleri",
    tag: "Online Satış",
    icon: "🛍️",
    iconBg: "bg-neutral-100",
    badgeText: "Satış Odaklı",
    badgeClass: "services-list-badge",
    title: "E-Ticaret Çözümleri",
    desc: "Ürünlerinizi online satmak için uçtan uca e-ticaret platformları kuruyorum. Güvenli ödeme, stok yönetimi ve dönüşüm odaklı tasarımla satışlarınızı artırıyorum.",
    features: [
      "Shopify / WooCommerce",
      "Güvenli Ödeme Sistemi",
      "Stok & Sipariş Yönetimi",
      "Dönüşüm Optimizasyonu",
    ],
    href: "/iletisim",
  },
];

export default function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const s = servicesData[activeIndex];

  function selectService(index: number) {
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(index);
      requestAnimationFrame(() => setVisible(true));
    }, 180);
  }

  return (
    <section className="services-list-section relative py-16 sm:py-20 md:py-24">
      <div className="services-list-blob" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1140px] px-4 sm:px-6">
        <header className="mb-10 sm:mb-14">
          <div className="services-list-eyebrow">
            <span className="services-list-eyebrow-dot" />
            Neler sunuyorum?
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-syne),var(--font-outfit)] text-3xl font-bold leading-tight tracking-tight text-[#27272a] sm:text-4xl md:text-5xl">
            Sunduğum <span className="services-list-title-accent">Hizmetler</span>
          </h2>
          <p className="mt-3.5 max-w-[480px] text-base text-neutral-500">
            Dijital dönüşümünüzü hızlandıracak modern çözümler sunuyorum.
          </p>
        </header>

        <div className="services-list-layout grid gap-5 lg:grid-cols-[360px_1fr]">
          <ul className="flex flex-col gap-1" role="list">
            {servicesData.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => selectService(i)}
                  className={`services-list-item ${i === activeIndex ? "active" : ""}`}
                >
                  <span className="flex flex-1 items-center gap-3.5">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${item.iconBg}`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-medium text-[#27272a]">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                        {item.tag}
                      </span>
                    </span>
                  </span>
                  <span className="services-list-chevron">
                    <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5">
                      <path
                        d="M3 5H7M5 3L7 5L5 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="services-list-panel overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm">
            <div className="h-1 w-full bg-neutral-100" />
            <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-4 py-3 sm:px-5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="flex-1 text-center text-xs font-medium text-neutral-400">
                {s.name}
              </span>
            </div>
            <div className="relative px-6 py-8 sm:px-10 sm:py-10">
              <div
                className={`services-list-detail-content transition-all duration-300 ease-out ${
                  visible ? "visible" : "invisible -translate-y-4 opacity-0"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${s.badgeClass}`}
                >
                  {s.badgeText}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-syne),var(--font-outfit)] text-xl font-bold leading-snug text-[#27272a] sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-relaxed text-[#52525b]">
                  {s.desc}
                </p>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/80 px-3.5 py-3"
                    >
                      <span className="services-list-feature-check">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className="text-white"
                        >
                          <path
                            d="M2 5L4 7L8 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[13px] font-medium text-[#27272a]">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0f0f0f] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Detaylı Bilgi Al
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="M1 7H13M7 1L13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/iletisim"
                    className="text-sm font-medium text-neutral-400 transition hover:text-[#27272a]"
                  >
                    Teklif Al →
                  </Link>
                </div>
              </div>
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-gradient-to-tl from-neutral-50 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
