"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import HeroBeamCanvas from "./HeroBeamCanvas";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className="hero-beam-section relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden py-16 md:min-h-0 md:py-32"
      data-theme={theme}
    >
      {/* Grid + beam canvas: görünen alanın tamamını kaplar */}
      <div className="absolute inset-0 z-[1]">
        <HeroBeamCanvas theme={theme} />
      </div>
      <div
        className="hero-beam-vignette absolute inset-0 z-[2] pointer-events-none"
        aria-hidden
      />

      {/* Ortada sütun: içerik */}
      <div className="hero-beam-inner relative z-[3] mx-auto flex min-h-full w-full max-w-5xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 md:min-h-0 md:flex-initial md:px-8 md:py-20 lg:px-10">
        {/* İçerik – başlık, açıklama, butonlar */}
        <div className="hero-beam-content relative flex flex-col items-center justify-center text-center min-w-0 w-full">
          <h1 className="hero-beam-title hero-beam-title-colorchange mb-4 w-full min-w-0 break-words text-[2rem] font-extrabold leading-tight tracking-tight sm:mb-5 sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl xl:text-8xl">
            AlgoryCode
          </h1>
          <p className="hero-beam-sub mx-auto mb-7 max-w-full px-1 text-sm leading-relaxed sm:mb-9 sm:max-w-[420px] sm:px-0 sm:text-base">
            Modern araçlar, güçlü altyapı ve kusursuz geliştirici deneyimi ile
            projelerinizi bir üst seviyeye taşıyın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              href="#hizmetler"
              className="hero-beam-btn-primary rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 hover:opacity-95 sm:px-7 sm:py-3 sm:text-sm touch-manipulation"
            >
              Hemen Başla →
            </Link>
            <Link
              href="/iletisim"
              className="faq-contact-btn faq-contact-btn-pill hero-beam-btn-mobile-sm touch-manipulation"
            >
              Bize Ulaşın
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
