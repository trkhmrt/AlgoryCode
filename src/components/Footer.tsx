"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const productLinks = [
  { label: "Feature set", href: "/#features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#reviews" },
];

const resourceLinks = [
  { label: "Documentation", href: "/#faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/iletisim" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
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
            <p>
              AI-native development platform for fast-moving startup SaaS teams.
            </p>
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
              <h3>Product</h3>
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
              <h3>Resources</h3>
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
          </nav>
        </div>

        <div className="ac-footer-bottom">
          <div className="ac-footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/license">License</Link>
          </div>
          <div className="ac-footer-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="ac-theme-btn"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <p>© {new Date().getFullYear()} AlgoryCode</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
