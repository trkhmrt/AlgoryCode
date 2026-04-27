"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const productLinks = [
  { label: "Ürünler", href: "/#urunler" },
  { label: "Algory ürünleri", href: "/#algory-urunler" },
  { label: "Demo", href: "/#cta" },
];

const resourceLinks = [
  { label: "İletişim", href: "/iletisim" },
  { label: "Gizlilik", href: "/privacy" },
  { label: "Şartlar", href: "/terms" },
  { label: "Lisans", href: "/license" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const problemFocus = [
  "Finans & fintech",
  "E-ticaret & perakende",
  "SaaS & kurumsal yazılım",
  "Operasyon & otomasyon",
  "Müşteri deneyimi",
  "Eğitim & içerik",
];

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="ac-footer">
      <div className="ac-footer-inner">
        <div className="ac-footer-top">
          <div className="ac-footer-brand">
            <Link href="/" className="ac-footer-logo">
              AlgoryCode
            </Link>
            <p>Yazılım, yapay zeka ve e-ticaret çözümleriyle işinizi büyütmenize yardımcı oluyoruz.</p>
            <div className="ac-footer-social">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="ac-footer-social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="ac-footer-columns" aria-label="Footer links">
            <div className="ac-footer-col">
              <h3>Sayfa</h3>
              <ul>
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ac-footer-col">
              <h3>Kaynaklar</h3>
              <ul>
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ac-footer-col ac-footer-col--focus">
              <h3>Çözdüğümüz problemler</h3>
              <ul>
                {problemFocus.map((item) => (
                  <li key={item}>
                    <span className="ac-footer-focus-pill">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="ac-footer-bottom">
          <div className="ac-footer-legal">
            <Link href="/privacy">Gizlilik</Link>
            <Link href="/terms">Şartlar</Link>
            <Link href="/license">Lisans</Link>
          </div>
          <div className="ac-footer-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="ac-theme-btn"
              suppressHydrationWarning
              aria-label={theme === "light" ? "Gece moduna geç" : "Gündüz moduna geç"}
            >
              <span suppressHydrationWarning>{theme === "light" ? "Gece" : "Gündüz"}</span>
            </button>
            <p>© {new Date().getFullYear()} AlgoryCode</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
