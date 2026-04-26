"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Docs", href: "/#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      <header className="ac-nav" role="banner">
        <div className="ac-nav-shell">
          <Link href="/" className="ac-nav-brand" onClick={closeMenu}>
            <span className="ac-nav-brand-mark" aria-hidden />
            <span>AlgoryCode</span>
          </Link>

          <nav className="ac-nav-links" aria-label="Primary menu">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="ac-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ac-nav-actions">
            <button
              type="button"
              className="ac-theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button
              type="button"
              className={`ac-nav-burger ${menuOpen ? "is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="ac-nav-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
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
        className={`ac-nav-overlay ${menuOpen ? "is-visible" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <aside
        id="ac-nav-drawer"
        className={`ac-nav-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="ac-nav-drawer-inner" aria-label="Mobile menu">
          <button
            type="button"
            className="ac-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ac-nav-drawer-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="ac-nav-drawer-foot">
            <Link href="/iletisim" className="ac-btn ac-btn-primary" onClick={closeMenu}>
              Get Started
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
