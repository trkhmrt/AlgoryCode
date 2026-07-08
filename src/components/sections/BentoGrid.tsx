"use client";

import { motion } from "framer-motion";
import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

import { HlsVideo } from "@/components/hero/HlsVideo";

const BEAM_MUX_HLS =
  "https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8";

function MouseGlowCell({
  area,
  bg,
  children,
  className = "",
}: {
  area: string;
  bg: string;
  children: ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
      style={{ gridArea: area, background: bg }}
      className={`bento-cell relative ${className}`}
    >
      {pos ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  );
}

const STACK_CHIPS = [
  "React Native",
  "Next.js",
  "OpenAI",
  "Stripe",
  "Flutter",
  "LangChain",
  "Shopify",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "Vercel",
  "Supabase",
];

function MarqueeCell() {
  return (
    <MouseGlowCell area="marq" bg="#0a0a0a">
      <div className="relative flex h-full flex-col justify-center gap-4 px-6 py-5">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Teknoloji yelpazesi
        </p>
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent"
            aria-hidden
          />
          <div className="marquee-fast flex gap-2">
            {[...STACK_CHIPS, ...STACK_CHIPS].map((chip, i) => (
              <span
                key={`${chip}-${i}`}
                className="whitespace-nowrap rounded-full border border-[#1a1a1a] bg-black px-3 py-1.5 text-[12px] text-[#888]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MouseGlowCell>
  );
}

function GlobeCell() {
  return (
    <MouseGlowCell area="globe" bg="#080808">
      <div className="relative flex h-full flex-col overflow-hidden">
        <p className="relative z-20 shrink-0 px-6 pt-5 text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Akıllı pipeline mimarisi
        </p>

        <div className="relative mx-6 mb-5 mt-3 min-h-0 flex-1 overflow-hidden rounded-lg border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <HlsVideo
              src={BEAM_MUX_HLS}
              className="h-full w-full scale-[1.02] object-cover object-center"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[62%]"
            style={{
              background:
                "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.97) 12%, rgba(0,0,0,0.78) 32%, rgba(0,0,0,0.4) 58%, transparent 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </MouseGlowCell>
  );
}

function WideCell() {
  return (
    <MouseGlowCell area="wide" bg="#080808">
      <div className="relative flex h-full flex-col justify-center gap-6 p-8 lg:p-10">
        <div>
          <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-[#666]">
            Beş uzmanlık alanı
          </p>
          <p className="heading text-[24px] font-extrabold md:text-[32px] lg:text-[36px]">
            Tek ekip. Tek süreç. Tek sözleşme.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["E-Ticaret", "Mobil", "AI", "Web", "Eğitim"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-md border border-[#1a1a1a] bg-black px-3 py-2 text-[13px] text-[#ededed]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ededed]" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    </MouseGlowCell>
  );
}

function TextCell() {
  return (
    <MouseGlowCell area="text" bg="#000000">
      <div className="relative flex h-full flex-col justify-center gap-3 p-8 lg:p-10">
        <p
          className="heading-tight max-w-full text-[24px] font-extrabold leading-tight md:text-[30px] lg:text-[34px]"
          style={
            {
              backgroundImage: "linear-gradient(180deg, #ededed 0%, #6a6a6a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } as CSSProperties
          }
        >
          Beş alanda uzman. Bir ekip.
        </p>
        <p className="text-[14px] text-[#888]">Dağıtık değil, entegre.</p>
      </div>
    </MouseGlowCell>
  );
}

export function BentoGrid() {
  return (
    <section
      id="bento"
      className="dark section border-b border-border bg-bg text-text"
      aria-labelledby="bento-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-[640px]"
        >
          <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-[#666]">
            Rakamlarla Biz
          </p>
          <h2
            id="bento-heading"
            className="heading text-[36px] font-extrabold md:text-[52px]"
          >
            Sonuçlar konuşur.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bento-grid"
        >
          <MarqueeCell />
          <WideCell />
          <GlobeCell />
          <TextCell />
        </motion.div>
      </div>
    </section>
  );
}
