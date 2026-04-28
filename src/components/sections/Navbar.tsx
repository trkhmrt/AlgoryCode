"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Cpu,
  GraduationCap,
  Menu,
  Monitor,
  ShoppingCart,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type DropdownItem = {
  href: string;
  label: string;
  desc?: string;
  icon?: LucideIcon;
};

const PRODUCTS: DropdownItem[] = [
  {
    href: "/products/deploy-engine",
    label: "Deploy Engine",
    desc: "Tek satırla, tek tıkla, dünya çapına dağıtım",
  },
  {
    href: "/products/edge-network",
    label: "Edge Network",
    desc: "280+ noktada barınan global yürütme katmanı",
  },
  {
    href: "/products/observe-stack",
    label: "Observe Stack",
    desc: "Logs, metrics ve traces tek motorda",
  },
];

const SOLUTIONS: DropdownItem[] = [
  {
    href: "/#features",
    label: "E-Ticaret",
    desc: "Dönüşüm odaklı online satış altyapısı",
    icon: ShoppingCart,
  },
  {
    href: "/#features",
    label: "Mobil App",
    desc: "iOS ve Android için native deneyimler",
    icon: Smartphone,
  },
  {
    href: "/#features",
    label: "AI Destekli Uygulamalar",
    desc: "LLM, otomasyon ve akıllı öneri sistemleri",
    icon: Cpu,
  },
  {
    href: "/#features",
    label: "Web App",
    desc: "Kurumsal SaaS paneller ve B2B araçları",
    icon: Monitor,
  },
  {
    href: "/#features",
    label: "Eğitim Platformları",
    desc: "LMS, kurs yönetimi ve sertifika sistemleri",
    icon: GraduationCap,
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "solutions" | null>(
    null
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] nav-blur">
      <nav className="container-x h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span className="inline-block w-5 h-5 bg-white" aria-hidden />
          <span>Stack</span>
        </Link>

        <ul
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownTrigger
            label="Ürünler"
            isOpen={openMenu === "products"}
            onOpen={() => setOpenMenu("products")}
            items={PRODUCTS}
            width={360}
          />
          <DropdownTrigger
            label="Çözümler"
            isOpen={openMenu === "solutions"}
            onOpen={() => setOpenMenu("solutions")}
            items={SOLUTIONS}
            width={420}
          />
          <li>
            <Link
              href="/#pricing"
              onMouseEnter={() => setOpenMenu(null)}
              className="px-3 py-2 text-[14px] text-[#888] hover:text-[#ededed] focus:text-[#ededed] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
            >
              Fiyatlandırma
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onMouseEnter={() => setOpenMenu(null)}
              className="px-3 py-2 text-[14px] text-[#888] hover:text-[#ededed] focus:text-[#ededed] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
            >
              Blog
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Button href="/" variant="secondary" size="sm">
            Giriş Yap
          </Button>
          <Button href="/#cta" variant="primary" size="sm">
            Demo Talep Et →
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-[#1a1a1a] text-[#ededed] hover:border-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden border-t border-[#1a1a1a] bg-black"
          >
            <div className="container-x py-4 flex flex-col gap-4">
              <MobileGroup label="Ürünler" items={PRODUCTS} onNavigate={() => setMobileOpen(false)} />
              <MobileGroup label="Çözümler" items={SOLUTIONS} onNavigate={() => setMobileOpen(false)} />

              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/#pricing"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-[15px] text-[#ededed] hover:bg-[#0a0a0a] rounded-md"
                  >
                    Fiyatlandırma
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-[15px] text-[#ededed] hover:bg-[#0a0a0a] rounded-md"
                  >
                    Blog
                  </Link>
                </li>
              </ul>

              <div className="flex gap-2 pt-2">
                <Button href="/" variant="secondary" size="md" className="flex-1">
                  Giriş Yap
                </Button>
                <Button href="/#cta" variant="primary" size="md" className="flex-1">
                  Demo Talep Et →
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function DropdownTrigger({
  label,
  isOpen,
  onOpen,
  items,
  width,
}: {
  label: string;
  isOpen: boolean;
  onOpen: () => void;
  items: DropdownItem[];
  width: number;
}) {
  return (
    <li className="relative">
      <button
        type="button"
        onMouseEnter={onOpen}
        onFocus={onOpen}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="px-3 py-2 inline-flex items-center gap-1.5 text-[14px] text-[#888] hover:text-[#ededed] focus:text-[#ededed] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
      >
        {label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="menu"
            className="absolute left-0 top-full pt-2"
            style={{ width }}
          >
            <ul className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-2">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      role="menuitem"
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-[#0d0d0d] focus-visible:bg-[#0d0d0d] focus-visible:outline-none"
                    >
                      {Icon ? (
                        <span className="h-9 w-9 inline-flex items-center justify-center border border-[#1a1a1a] rounded-md text-[#ededed] flex-shrink-0">
                          <Icon size={16} />
                        </span>
                      ) : null}
                      <span className="flex flex-col">
                        <span className="text-[14px] font-medium text-[#ededed]">
                          {item.label}
                        </span>
                        {item.desc ? (
                          <span className="text-[12px] text-[#888] mt-0.5">
                            {item.desc}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="px-3 pb-2 text-[11px] uppercase tracking-[0.18em] text-[#666]">
        {label}
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#ededed] hover:bg-[#0a0a0a] rounded-md"
              >
                {Icon ? (
                  <Icon size={16} className="text-[#888]" />
                ) : null}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
