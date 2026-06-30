"use client";

import Link from "next/link";
import { VideoPlayer } from "@/components/synapse/VideoPlayer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { LogoBar } from "@/components/sections/LogoBar";
import { motion } from "framer-motion";
import { Boxes, Cable, Workflow } from "lucide-react";

const HERO_BADGES = [
  { icon: Boxes, label: "Modular Stack" },
  { icon: Cable, label: "Secure Integrations" },
  { icon: Workflow, label: "Automated Pipelines" },
] as const;

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
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 bottom-[35vh] z-0 h-[80vh] w-full overflow-hidden">
        <VideoPlayer />
      </div>

      <SiteHeader />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-14 pt-28 md:px-10 lg:px-14">
        <motion.div
          className="mx-auto flex max-w-[980px] flex-1 flex-col items-center justify-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {HERO_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white/90"
              >
                <Icon size={16} className="text-white/80" aria-hidden />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[980px] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white xl:text-[80px]"
          >
            Where Innovation Meets Execution
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-white/75 md:text-[16px]"
          >
            Ship confidently with automated tests that mirror production. Deploy on every merge with
            pipelines built for speed without sacrificing stability.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="rounded-full border border-white bg-black px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-white/5"
            >
              Get Started for Free
            </Link>
            <Link
              href="/contact"
              className="liquid-glass rounded-full px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-white/[0.06]"
            >
              Let&apos;s Get Connected
            </Link>
          </motion.div>
        </motion.div>

        <LogoBar embedded />
      </div>
    </section>
  );
}
