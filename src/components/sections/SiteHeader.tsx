"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#features", label: "Hizmetler" },
  { href: "/education", label: "Eğitimler" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
] as const;

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-3 pt-3">
      <header
        className={cn(
          "mx-auto max-w-6xl rounded-3xl border border-border backdrop-blur-xl transition-colors duration-300",
          open ? "bg-background" : "bg-background/85",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/algorycode-icon.png"
              alt="AlgoryCode"
              width={28}
              height={28}
              className="size-7 rounded-full object-cover"
            />
            <span className="brand-logo-pixel text-[14px] [text-shadow:none]">
              algorycode
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/education"
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Eğitimler
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              İletişim
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="grid size-9 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-0.5">
              {[...nav, { href: "/contact", label: "İletişim" } as const].map(
                (item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
