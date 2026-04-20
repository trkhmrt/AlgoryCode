"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Hizmetler", href: "#services" },
  { label: "Yorumlar", href: "#musteri-yorumlari" },
  { label: "SSS", href: "#sikca-sorulan-sorular" },
  { label: "Eğitim", href: "/egitim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevPad = document.body.style.paddingRight;
    const prevOverflow = document.body.style.overflow;
    document.body.style.paddingRight = `${gap}px`;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.paddingRight = prevPad;
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-nav" role="banner">
        <div className="site-nav-shell">
          <Link href="/" className="site-nav-brand" onClick={closeMenu}>
            <span className="site-nav-mark" aria-hidden />
            <span>AlgroyCode</span>
          </Link>

          <nav className="site-nav-links" aria-label="Ana menü">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-nav-actions">
            <button
              type="button"
              className={`site-nav-burger ${menuOpen ? "is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="site-nav-drawer"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`site-nav-overlay ${menuOpen ? "is-visible" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <aside
        id="site-nav-drawer"
        className={`site-nav-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="site-nav-drawer-inner" aria-label="Mobil menü">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-drawer-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="site-nav-drawer-foot">
            <Link href="/iletisim" className="site-btn-sweep" onClick={closeMenu}>
              <span>İletişim</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
