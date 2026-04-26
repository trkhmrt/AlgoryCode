"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const HeroChromeArt = dynamic(() => import("./HeroChromeArt"), { ssr: false });

const ROTATING_WORDS = [
  "ölçeklenebilir yazılım",
  "güvenilir teslimat",
  "ürün odaklı ekip",
  "uçtan uca mimari",
  "sürdürülebilir operasyon",
];

const ROTATE_MS = 2800;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 42 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = ROTATING_WORDS[index];

  return (
    <section
      className="site-hero"
      aria-label="Giriş"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({
          x: Math.min(100, Math.max(0, x)),
          y: Math.min(100, Math.max(0, y)),
        });
      }}
      style={
        {
          "--hero-pointer-x": `${pointer.x}%`,
          "--hero-pointer-y": `${pointer.y}%`,
        } as CSSProperties
      }
    >
      <div className="site-hero-noise" aria-hidden />
      <div className="site-hero-shell">
        <div className="site-hero-inner">
          <h1 className="site-hero-title">
            <span className="site-hero-kicker">Stratejiden üretime</span>
            <span className="site-hero-rotate-wrap">
              <span className="site-hero-rotate" key={current} aria-live="polite">
                {current}
              </span>
            </span>
          </h1>
          <p className="site-hero-lead">
            Web, mobil ve API katmanlarında kritik iş yüklerinizi taşırız; mimari netliği,
            güvenlik ve sürdürülebilir operasyonu önceleriz.
          </p>
          <div className="site-hero-actions">
            <Link href="#services" className="site-btn-sweep touch-manipulation">
              <span>Hizmetler</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/iletisim" className="site-btn-sweep-v touch-manipulation">
              <span>İletişim</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="site-hero-visual" aria-hidden="true">
          <HeroChromeArt />
        </div>
      </div>
    </section>
  );
}
