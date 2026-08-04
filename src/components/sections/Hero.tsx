"use client";

import { SiteHeader } from "@/components/sections/SiteHeader";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf9f6]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-[28%_55%] bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.png)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#faf9f6]/80 via-transparent to-[#faf9f6]/30"
      />

      <SiteHeader transparent />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-14 pt-28 md:px-10 lg:px-14">
        <motion.div
          className="mx-auto flex max-w-[980px] flex-1 flex-col items-center justify-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={fadeUp}
            className="heading max-w-[900px] !text-[#121212] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
          >
            İşinizi
            <br />
            Teknolojiyle Büyütün
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="section-desc mt-5 max-w-[520px] md:mt-6"
          >
            E-ticaretten yapay zekaya — modern, ölçeklenebilir dijital
            çözümlerle büyümenize odaklanın.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              href="/contact"
              size="lg"
              className="rounded-full border-0 bg-[#121212] px-8 text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] hover:bg-[#2a2a2a]"
            >
              Ücretsiz Görüşme Ayarla
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="rounded-full border-0 bg-white px-8 text-[#121212] shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:bg-white hover:text-[#121212]"
            >
              İletişime Geç
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
