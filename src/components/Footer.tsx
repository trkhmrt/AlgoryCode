"use client";

import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const productLinks = [
  { label: "Satın Al", href: "#satin-al" },
  { label: "Demo", href: "#demo" },
  { label: "Fiyatlandırma", href: "#fiyatlandirma" },
  { label: "Özellikler", href: "#ozellikler" },
];

const resourceLinks = [
  { label: "Blog", href: "#blog" },
  { label: "Referanslar", href: "#referanslar" },
  { label: "Değişiklik Günlüğü", href: "#changelog" },
  { label: "Dokümantasyon", href: "#dokumantasyon" },
  { label: "İş Ortağı Olun", href: "#is-ortagi" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "X (Twitter)", href: "https://x.com", icon: "x" },
  { label: "Web", href: "/", icon: "globe" },
  { label: "E-posta", href: "mailto:info@algorycode.com", icon: "email" },
];

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="footer-scroll-top"
      aria-label="Yukarı çık"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="footer site-footer-v3">
      <div className="footer-gradient-edge" aria-hidden />
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-logo-mark" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                  <rect x="2" y="16" width="3" height="4" rx="1" />
                  <rect x="7" y="12" width="3" height="8" rx="1" />
                  <rect x="12" y="8" width="3" height="12" rx="1" />
                  <rect x="17" y="4" width="3" height="16" rx="1" />
                </svg>
              </span>
              <span className="footer-logo-name">AlgroyCode</span>
            </Link>
            <p className="footer-tagline">
              Web sitesi, mobil uygulama ve sesli asistan ile kârlı dijital ürünler inşa edin.
            </p>
            <div className="footer-social" role="list">
              {socialLinks.map((item) => (
                <a
                  key={item.icon}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="footer-social-btn"
                  aria-label={item.label}
                  role="listitem"
                >
                  {item.icon === "github" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {item.icon === "x" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {item.icon === "globe" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {item.icon === "email" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-nav-cols" aria-label="Alt bilgi bağlantıları">
            <div className="footer-col">
              <h3 className="footer-col-title">Ürün</h3>
              <ul className="footer-links">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-col-title">Kaynaklar</h3>
              <ul className="footer-links">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">
              Gizlilik Politikası
            </Link>
            <span className="footer-legal-sep" aria-hidden>
              ·
            </span>
            <Link href="/terms" className="footer-legal-link">
              Kullanım Koşulları
            </Link>
            <span className="footer-legal-sep" aria-hidden>
              ·
            </span>
            <Link href="/license" className="footer-legal-link">
              Lisans Politikası
            </Link>
          </div>
          <div className="footer-bottom-right">
            <button
              type="button"
              onClick={toggleTheme}
              className="footer-theme-btn"
              aria-label={theme === "light" ? "Gece moduna geç" : "Gündüz moduna geç"}
              title={theme === "light" ? "Gece modu" : "Gündüz modu"}
            >
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              )}
            </button>
            <p className="footer-copy">© {new Date().getFullYear()} AlgroyCode. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}
