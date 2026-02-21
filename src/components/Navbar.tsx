"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Neden Biz?", href: "#neden-biz" },
  { label: "Sıkça Sorulan Sorular", href: "#sikca-sorulan-sorular" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Eğitim", href: "#egitim" },
];

const SCROLL_THRESHOLD = 40;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevPadding = document.body.style.paddingRight;
    const prevOverflow = document.body.style.overflow;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.paddingRight = prevPadding;
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <div
        className={`nav-scroll-wrap ${scrolled ? "scrolled" : ""}`}
        style={{ pointerEvents: "none" }}
      >
        <header className="nav-scroll-inner" style={{ pointerEvents: "all" }}>
          <Link href="/" className="nav-scroll-logo" onClick={closeMobile}>
            <div className="nav-scroll-logo-mark">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 1L14 13H2L8 1Z" />
              </svg>
            </div>
            <span className="nav-scroll-logo-name">AlgroyCode</span>
          </Link>

          {/* Desktop: orta linkler */}
          <div className="nav-scroll-links">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="nav-scroll-link">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop: sağ butonlar */}
          <div className="nav-scroll-actions">
            <Link href="#iletisim" className="faq-contact-btn faq-contact-btn-pill faq-contact-btn-nav">
              Bize Ulaşın
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>

          {/* Mobil: hamburger */}
          <div className="nav-mobile-trigger">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="nav-hamburger"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              <span className={mobileOpen ? "open" : ""} />
              <span className={mobileOpen ? "open" : ""} />
              <span className={mobileOpen ? "open" : ""} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobil menü overlay */}
      <div
        className={`nav-mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
        aria-hidden
      />
      <div className={`nav-mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <nav className="nav-mobile-content">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-mobile-link"
              onClick={closeMobile}
            >
              {item.label}
            </Link>
          ))}
          <div className="nav-mobile-footer">
            <Link href="#iletisim" className="nav-mobile-cta" onClick={closeMobile}>
              Bize Ulaşın
            </Link>
          </div>
        </nav>
      </div>

      <div className="nav-scroll-border" aria-hidden />
    </>
  );
}
