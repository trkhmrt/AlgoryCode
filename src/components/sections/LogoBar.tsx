"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "Volthane",
  "Lumencore",
  "Halyx",
  "Caret",
  "Sintel",
  "Quanta",
  "Brokk",
  "Nordix",
];

function LogoMark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-6 text-[18px] font-semibold tracking-tight text-[#ededed] opacity-40 hover:opacity-100 transition-opacity duration-300">
      <span
        className="inline-block h-2 w-2 rounded-full bg-[#ededed]"
        aria-hidden
      />
      {name}
    </span>
  );
}

export function LogoBar() {
  return (
    <section
      className="relative border-b border-[#1a1a1a] py-16 overflow-hidden"
      aria-labelledby="logobar-title"
    >
      <motion.p
        id="logobar-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center text-[12px] uppercase tracking-[0.18em] text-[#666] mb-10"
      >
        Farklı sektörlerden 500+ işletme tarafından tercih edildi
      </motion.p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" aria-hidden />
        <div className="marquee-track flex">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <LogoMark key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
