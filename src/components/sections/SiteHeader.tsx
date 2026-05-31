"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#features", label: "Features", highlight: true },
  { href: "#", label: "Insights" },
  { href: "#", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Blog" },
  { href: "#", label: "Contact" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <Link href="/" className="text-lg font-medium tracking-tight text-white">
            Synapse
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((item) =>
              item.highlight ? (
                <Link key={item.label} href={item.href}>
                  <span className="rounded-full bg-gradient-to-r from-white/40 via-white/20 to-white/40 p-[1px]">
                    <span className="block rounded-full bg-black px-4 py-2 text-[14px] font-medium text-white">
                      {item.label}
                    </span>
                  </span>
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[14px] font-medium text-white/85 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden shrink-0 rounded-full bg-gradient-to-b from-white to-neutral-400 px-5 py-2.5 text-[13px] font-semibold text-neutral-900 shadow-sm md:inline-flex"
            >
              Get Started for Free
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 lg:hidden"
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
            className="fixed inset-x-0 top-[73px] z-40 border-b border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4 md:px-10">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-white/5 ${
                    item.highlight ? "text-white" : "text-white/85"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="mt-2 rounded-full bg-gradient-to-b from-white to-neutral-400 px-5 py-3 text-[13px] font-semibold text-neutral-900 shadow-sm"
              >
                Get Started for Free
              </button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const SITE_HEADER_OFFSET_CLASS = "pt-[73px]";
