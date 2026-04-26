"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/** Fade in (in0→in1), tam (in1→out0), fade out (out0→out1). */
function crossfade(p: number, in0: number, in1: number, out0: number, out1: number): number {
  if (p <= in0) return 0;
  if (p < in1) return (p - in0) / (in1 - in0);
  if (p < out0) return 1;
  if (p < out1) return 1 - (p - out0) / (out1 - out0);
  return 0;
}

function smoothstep01(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export default function HomeScrollDrivenValues() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const applyScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    if (reduceMotion) {
      el.style.setProperty("--sv-op-hiz", "0");
      el.style.setProperty("--sv-op-guven", "0");
      el.style.setProperty("--sv-op-seffaflik", "0");
      el.style.setProperty("--sv-op-trust", "1");
      el.style.setProperty("--sv-op-beam", "0.55");
      el.style.setProperty("--sv-op-cta", "1");
      el.style.setProperty("--sv-cta-rise", "1");
      el.dataset.ctaInteractive = "1";
      return;
    }

    const rect = el.getBoundingClientRect();
    const h = el.offsetHeight;
    const denom = Math.max(1, h - window.innerHeight);
    const p = Math.min(1, Math.max(0, -rect.top / denom));

    const hiz = crossfade(p, 0, 0.05, 0.16, 0.24);
    const guvenlik = crossfade(p, 0.18, 0.26, 0.38, 0.46);
    const seffaflik = crossfade(p, 0.4, 0.48, 0.54, 0.62);
    /** Son bölümde tüm “final” katmanlar (trust + CTA + ışık) aynı solmayla çıkar. */
    const exitFade = 1 - smoothstep01((p - 0.83) / 0.13);
    const trustRaw = crossfade(p, 0.58, 0.66, 1, 1);
    const trust = trustRaw * exitFade;
    const beamRaw = smoothstep01((p - 0.58) / 0.36);
    const beam = beamRaw * exitFade;
    const ctaEnter = smoothstep01((p - 0.64) / 0.22);
    const cta = ctaEnter * exitFade;
    const ctaRise = smoothstep01((p - 0.62) / 0.24);

    el.style.setProperty("--sv-op-hiz", hiz.toFixed(4));
    el.style.setProperty("--sv-op-guven", guvenlik.toFixed(4));
    el.style.setProperty("--sv-op-seffaflik", seffaflik.toFixed(4));
    el.style.setProperty("--sv-op-trust", trust.toFixed(4));
    el.style.setProperty("--sv-op-beam", beam.toFixed(4));
    el.style.setProperty("--sv-op-cta", cta.toFixed(4));
    el.style.setProperty("--sv-cta-rise", ctaRise.toFixed(4));
    el.dataset.ctaInteractive = ctaEnter > 0.32 && exitFade > 0.22 ? "1" : "0";
  }, [reduceMotion]);

  useEffect(() => {
    applyScroll();
  }, [reduceMotion, applyScroll]);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        applyScroll();
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    applyScroll();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [applyScroll]);

  return (
    <section className="site-scroll-values" aria-labelledby="site-scroll-values-heading">
      <h2 id="site-scroll-values-heading" className="site-sr-only">
        Hız, güvenlik, şeffaflık, yüzde yüz Hizmet Kalitesi ve iletişim çağrısı
      </h2>
      <div
        ref={trackRef}
        data-cta-interactive="0"
        className={`site-scroll-values-track${reduceMotion ? " site-scroll-values-track--reduced" : ""}`}
      >
        <div className="site-scroll-values-sticky">
          <div className="site-scroll-values-beam" aria-hidden />
          <div className="site-scroll-values-stage">
            <p className="site-scroll-values-word site-scroll-values-word--hiz">Hız</p>
            <p className="site-scroll-values-word site-scroll-values-word--guvenlik">Güvenlik</p>
            <p className="site-scroll-values-word site-scroll-values-word--seffaflik">Şeffaflık</p>
            <p className="site-scroll-values-word site-scroll-values-word--trust">100% Hizmet Kalitesi</p>
          </div>
          <div className="site-scroll-values-cta" role="region" aria-label="İletişim çağrısı">
            <p className="site-scroll-values-cta-text">
              Bu ayrıcalıklı yazılım hizmetlerinden faydalanmak istiyorsan, <strong>hemen bize ulaş</strong>.
            </p>
            <Link href="/iletisim" className="site-scroll-values-cta-btn touch-manipulation">
              <span className="site-scroll-values-cta-btn-label">İletişime geç</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
