"use client";

import { VideoPlayer } from "@/components/synapse/VideoPlayer";
import { motion } from "framer-motion";
import { Boxes, Cable, Workflow } from "lucide-react";
import Link from "next/link";

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

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6">
          <Link href="/" className="text-lg font-medium tracking-tight text-white">
            Synapse
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <span className="rounded-full bg-gradient-to-r from-white/40 via-white/20 to-white/40 p-[1px]">
              <span className="block rounded-full bg-black px-4 py-2 text-[14px] font-medium text-white">
                Features
              </span>
            </span>
            <a href="#" className="text-[14px] font-medium text-white/85 transition hover:text-white">
              Insights
            </a>
            <a href="#" className="text-[14px] font-medium text-white/85 transition hover:text-white">
              About
            </a>
            <Link
              href="/education"
              className="text-[14px] font-medium text-white/85 transition hover:text-white"
            >
              Education
            </Link>
            <a href="#" className="text-[14px] font-medium text-white/85 transition hover:text-white">
              Contact
            </a>
          </nav>

          <button
            type="button"
            className="hidden shrink-0 rounded-full bg-gradient-to-b from-white to-neutral-400 px-5 py-2.5 text-[13px] font-semibold text-neutral-900 shadow-sm md:inline-flex"
          >
            Get Started for Free
          </button>
        </div>
      </header>

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
