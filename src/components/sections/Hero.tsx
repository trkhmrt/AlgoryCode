"use client";

import { VideoPlayer } from "@/components/synapse/VideoPlayer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { motion } from "framer-motion";
import { Boxes, Cable, Workflow } from "lucide-react";

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

function PlaceholderLogo({ label }: { label: string }) {
  return (
    <div className="flex h-8 items-center gap-2 opacity-40 grayscale">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="text-white">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="currentColor" opacity="0.35" />
        <circle cx="14" cy="14" r="5" fill="currentColor" opacity="0.55" />
      </svg>
      <span className="text-[13px] font-medium tracking-tight text-white">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 bottom-[35vh] z-0 h-[80vh] w-full overflow-hidden">
        <VideoPlayer />
      </div>

      <SiteHeader />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-28 pt-28 md:px-10 lg:px-14">
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
            {[
              { icon: Boxes, label: "Integrated with" },
              { icon: Cable, label: "Integrated with" },
              { icon: Workflow, label: "Integrated with" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={`badge-${i}`}
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
            <button
              type="button"
              className="rounded-full border border-white bg-black px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-white/5"
            >
              Get Started for Free
            </button>
            <button
              type="button"
              className="liquid-glass rounded-full px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-white/[0.06]"
            >
              Let&apos;s Get Connected
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-auto flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/10 pt-10"
        >
          <PlaceholderLogo label="Northwind" />
          <PlaceholderLogo label="Vertex" />
          <PlaceholderLogo label="Railtone" />
          <PlaceholderLogo label="Orbital" />
          <PlaceholderLogo label="Stacklane" />
        </motion.div>
      </div>
    </section>
  );
}
