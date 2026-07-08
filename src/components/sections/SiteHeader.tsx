"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "/#features", label: "Hizmetler", highlight: true },
  { href: "#", label: "Hakkımızda", highlight: false },
  { href: "/education", label: "Eğitim", highlight: false },
  { href: "/blog", label: "Blog", highlight: false },
  { href: "/contact", label: "İletişim", highlight: false },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[color:var(--theme-header-border)] bg-[color:var(--theme-header-bg)] px-6 py-4 backdrop-blur-xl md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <Link
            href="/"
            className="brand-logo-pixel shrink-0 text-[9px] sm:text-[10px] md:text-[11px]"
          >
            AlgoryCode
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.highlight
                    ? "inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-[14px] font-medium text-text dark:border-white/25 dark:bg-white/5 dark:text-white"
                    : "text-[14px] font-medium text-muted transition hover:text-text dark:text-white/85 dark:hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden shrink-0 rounded-full bg-gradient-to-b from-white to-neutral-400 px-5 py-2.5 text-[13px] font-semibold text-neutral-900 shadow-sm transition hover:bg-[#ededed] md:inline-flex"
            >
              Ücretsiz Başla
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition hover:border-border-bright lg:hidden dark:border-white/15 dark:text-white dark:hover:border-white/30"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-[73px] z-40 border-b border-border bg-bg/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-black/95"
          >
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4 md:px-10">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-surface dark:hover:bg-white/5 ${
                    item.highlight ? "text-text dark:text-white" : "text-muted dark:text-white/85"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-full bg-gradient-to-b from-white to-neutral-400 px-5 py-3 text-center text-[13px] font-semibold text-neutral-900 shadow-sm"
              >
                Ücretsiz Başla
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const SITE_HEADER_OFFSET_CLASS = "pt-[73px]";
