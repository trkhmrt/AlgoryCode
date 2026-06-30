"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PARTNER_COMPANIES } from "@/data/partners";

function PartnerMark({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 px-8 text-[17px] font-semibold tracking-tight text-[#ededed] opacity-50 transition-opacity duration-300 hover:opacity-100"
    >
      <span
        className="inline-block h-2 w-2 rounded-full bg-[#ededed]"
        aria-hidden
      />
      {name}
    </Link>
  );
}

type LogoBarProps = {
  embedded?: boolean;
};

export function LogoBar({ embedded = false }: LogoBarProps) {
  const marqueeItems = [...PARTNER_COMPANIES, ...PARTNER_COMPANIES];

  const content = (
    <>
      <motion.p
        id="logobar-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={
          embedded
            ? "mb-8 text-center text-[11px] uppercase tracking-[0.2em] text-white/40"
            : "mb-10 text-center text-[12px] uppercase tracking-[0.18em] text-[#666]"
        }
      >
        Birlikte çalıştığımız firmalar
      </motion.p>

      <div className="mx-auto w-full max-w-[560px] md:max-w-[640px]">
        <div className="marquee-viewport relative overflow-hidden">
          <div className="marquee-track flex w-max">
            {marqueeItems.map((partner, index) => (
              <PartnerMark
                key={`${partner.name}-${index}`}
                name={partner.name}
                href={partner.href}
              />
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black via-black/95 to-transparent sm:w-28 md:w-36"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black via-black/95 to-transparent sm:w-28 md:w-36"
            aria-hidden
          />
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        className="mt-auto w-full border-t border-white/10 pt-10"
        aria-labelledby="logobar-title"
      >
        {content}
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden border-b border-[#1a1a1a] py-16"
      aria-labelledby="logobar-title"
    >
      {content}
    </section>
  );
}
