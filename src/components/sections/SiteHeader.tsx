"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/#features",
    label: "Hizmetler",
  },
  {
    href: "/education",
    label: "Eğitim",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "İletişim",
  },
] as const;

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const headerSolid = mobileOpen || (transparent ? scrolled : true);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 px-6 py-3.5 transition-[background-color,border-color,backdrop-filter] duration-300 md:px-10 lg:px-14",
          headerSolid
            ? "border-b border-black/10 bg-white/95 backdrop-blur-xl"
            : "border-none bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 lg:justify-start">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="brand-logo-pixel shrink-0 text-[22px] text-[#121212] [text-shadow:none] sm:text-[24px] md:text-[28px]"
          >
            ALGORYCODE
          </Link>

          <nav className="hidden items-center gap-1 lg:ml-auto lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-[14px] font-medium text-[#121212] transition hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:ml-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-full border-black/10 bg-white text-black shadow-sm hover:bg-white hover:text-black lg:hidden"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Menüyü kapat"
              className="absolute inset-0 bg-[#121212]/25 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 flex h-[100dvh] flex-col bg-[#faf9f6] pt-[65px]"
            >
              <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-2 md:px-10">
                {NAV_LINKS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 + index * 0.04,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-black/8"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-14 items-center text-[20px] font-medium tracking-tight text-[#121212] transition-colors active:text-black"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
