"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Menu,
  MessageSquare,
  PenLine,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/#features",
    label: "Hizmetler",
    description: "Çözümlerimizi keşfedin",
    icon: BookOpen,
    highlight: true,
  },
  {
    href: "/education",
    label: "Eğitim",
    description: "Programları inceleyin",
    icon: GraduationCap,
    highlight: false,
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Yazılar ve güncellemeler",
    icon: PenLine,
    highlight: false,
  },
  {
    href: "/contact",
    label: "İletişim",
    description: "Bizimle konuşun",
    icon: MessageSquare,
    highlight: false,
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

  const headerSolid =
    mobileOpen ||
    (transparent ? scrolled : true);

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
            className="brand-logo-pixel shrink-0 text-[22px] sm:text-[24px] md:text-[28px]"
          >
            ALGORYCODE
          </Link>

          <nav className="hidden items-center gap-1 lg:ml-auto lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.highlight
                    ? "inline-flex items-center rounded-full border border-border bg-secondary/80 px-4 py-2 text-[14px] font-medium text-foreground"
                    : "rounded-md px-3 py-2 text-[14px] font-medium text-muted-foreground transition hover:text-foreground"
                }
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
              className="rounded-full border-black/10 bg-white text-black shadow-sm hover:bg-white hover:text-black lg:hidden"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
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
              <div className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-2 md:px-10">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  Menü
                </p>

                <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
                  {NAV_LINKS.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 + index * 0.05,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="group flex items-center gap-4 rounded-2xl border border-transparent bg-white/70 px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-colors hover:border-black/8 hover:bg-white"
                        >
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-white">
                            <Icon size={18} strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[17px] font-semibold tracking-tight text-[#121212]">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-[13px] text-[#888]">
                              {item.description}
                            </span>
                          </span>
                          <ArrowRight
                            size={16}
                            className="shrink-0 text-[#bbb] transition-transform group-hover:translate-x-0.5 group-hover:text-[#121212]"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className="mt-6 space-y-4 border-t border-black/8 pt-6"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#121212] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2a]"
                  >
                    Ücretsiz Görüşme Ayarla
                    <ArrowRight size={16} />
                  </Link>
                  <p className="text-center text-[13px] text-[#888]">
                    48 saat içinde dönüş yapıyoruz.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
