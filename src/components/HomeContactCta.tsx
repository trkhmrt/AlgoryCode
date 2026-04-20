"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomeContactCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`site-cta-band${visible ? " site-cta-band--visible" : ""}`}
      aria-labelledby="site-cta-heading"
    >
      <div className="site-cta-inner">
        <div className="site-cta-text">
          <h2 id="site-cta-heading">İletişime geçmek için</h2>
          <p>
            Fikrinizi veya ihtiyacınızı paylaşın; keşif görüşmesi veya teklif için
            en kısa sürede dönüş yapalım.
          </p>
        </div>
        <div className="site-cta-actions">
          <Link href="/iletisim" className="site-btn-sweep">
            <span>İletişim sayfası</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
