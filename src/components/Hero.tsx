"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import HeroBeamCanvas from "./HeroBeamCanvas";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className="hero-beam-section relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-28"
      data-theme={theme}
    >
      {/* Ortada sütun: çizgiler ve tüm içerik sağdan soldan boşlukla */}
      <div className="hero-beam-inner relative w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-10 py-12 md:py-16">
        <HeroBeamCanvas theme={theme} />

        {/* Vignette: grid merkezde hafif kaybolur */}
        <div
          className="hero-beam-vignette absolute inset-0 z-[2] pointer-events-none"
          aria-hidden
        />

        {/* İçerik – başlık, açıklama, butonlar */}
        <div className="hero-beam-content relative z-[5] flex flex-col items-center justify-center text-center">
          <h1 className="hero-beam-title hero-beam-title-colorchange mb-5 text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            AlgoryCode
          </h1>
          <p className="hero-beam-sub mx-auto mb-9 max-w-[420px] text-sm leading-relaxed sm:text-base">
            Modern araçlar, güçlü altyapı ve kusursuz geliştirici deneyimi ile
            projelerinizi bir üst seviyeye taşıyın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#hizmetler"
              className="hero-beam-btn-primary rounded-full px-7 py-3 text-sm font-bold transition-all duration-200 hover:opacity-95"
            >
              Hemen Başla →
            </Link>
            <Link
              href="#iletisim"
              className="faq-contact-btn faq-contact-btn-pill"
            >
              Bize Ulaşın
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-beam-scroll relative mt-10 z-[6] flex flex-col items-center gap-2">
          <span className="text-[9px] font-medium uppercase tracking-widest opacity-70">
            Kaydır
          </span>
          <div className="hero-beam-scroll-line h-9 w-px" />
        </div>
      </div>
    </section>
  );
}
