"use client";

import { motion, useInView } from "framer-motion";
import { Terminal, Workflow } from "lucide-react";
import {
  useEffect,
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

function StatCell() {
  return (
    <MouseGlowCell area="stat" bg="#000000">
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
      <div className="relative h-full p-10 flex flex-col justify-between">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Teslim edilen proje
        </p>
        <div>
          <p className="tabular text-[80px] md:text-[96px] font-extrabold heading-tight leading-none">
            500+
          </p>
          <p className="mt-2 text-[14px] text-[#888]">
            E-ticaretten AI&apos;ya beş alanda
          </p>
        </div>
      </div>
    </MouseGlowCell>
  );
}

function BeamCell() {
  return (
    <MouseGlowCell area="beam" bg="#080808">
      <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden">
        <p className="relative z-20 shrink-0 px-8 pt-8 text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Akıllı pipeline mimarisi
        </p>

        <div className="relative mx-8 mb-8 mt-4 min-h-[260px] flex-1 overflow-hidden rounded-lg border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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
    <MouseGlowCell area="marq" bg="#0d0d0d">
      <div className="relative h-full flex flex-col">
        <div className="px-6 pt-6">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
            Teknoloji yelpazesi
          </p>
        </div>
        <div className="relative flex-1 flex items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10" />
          <div className="marquee-fast flex gap-2 px-6">
            {[...STACK_CHIPS, ...STACK_CHIPS].map((chip, i) => (
              <span
                key={`${chip}-${i}`}
                className="rounded-full border border-[#1a1a1a] px-3 py-1.5 text-[12px] text-[#888] bg-black whitespace-nowrap"
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

const TERMINAL_LINES = [
  "$ init project --domain=e-commerce",
  "✓ Payment gateway connected",
  "$ integrate ai --model=gpt-4",
  "✓ Recommendation engine ready",
  "$ deploy --target=production",
  "✓ Live in 48h",
];

function TerminalCell() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (TERMINAL_LINES.length + 4));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const visible = Math.min(step, TERMINAL_LINES.length);

  return (
    <MouseGlowCell area="term" bg="#000000">
      <div className="relative h-full p-6 flex flex-col">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#666]" />
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
            48 saatte canlı
          </p>
        </div>
        <div className="mt-4 flex-1 overflow-hidden">
          {TERMINAL_LINES.slice(0, visible).map((line) => (
            <div key={line} className="terminal-line">
              {line}
            </div>
          ))}
          {visible < TERMINAL_LINES.length ? (
            <span
              aria-hidden
              className="terminal-line inline-block w-2 h-4 bg-[#00ff88] blink-cursor align-text-bottom"
            />
          ) : null}
        </div>
      </div>
    </MouseGlowCell>
  );
}

function ChartCell() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const bars = [38, 52, 41, 67, 58, 78, 72, 88];

  return (
    <MouseGlowCell area="chart" bg="#080808">
      <div ref={ref} className="relative h-full p-6 flex flex-col">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Ortalama kurulum süresi
        </p>
        <div className="mt-3">
          <p className="tabular text-[56px] md:text-[64px] font-extrabold heading-tight leading-none">
            48s
          </p>
          <p className="mt-1 text-[13px] text-[#888]">Saat değil, gün</p>
        </div>
        <div className="flex-1 mt-4 flex items-end gap-1.5">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-[#ededed] origin-bottom"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: b / 100 } : { scaleY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.05 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ height: "100%" }}
            />
          ))}
        </div>
      </div>
    </MouseGlowCell>
  );
}

function OrbitCell() {
  return (
    <MouseGlowCell area="orbit" bg="#0d0d0d">
      <div className="relative h-full grid place-items-center">
        <p className="absolute top-6 left-6 text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Ağ
        </p>
        <div className="relative w-[180px] h-[180px]">
          <div
            className="absolute inset-0 rounded-full border border-[#1a1a1a] ring-rotate-slow"
            aria-hidden
          />
          <div
            className="absolute inset-6 rounded-full border border-[#222] ring-rotate-mid"
            aria-hidden
          />
          <div
            className="absolute inset-12 rounded-full border border-[#2a2a2a] ring-rotate-fast"
            aria-hidden
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-10 w-10 grid place-items-center bg-black border border-[#2a2a2a] rounded-md">
              <Workflow size={16} className="text-[#ededed]" />
            </div>
          </div>
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#ededed]"
            aria-hidden
          />
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#888]"
            aria-hidden
          />
          <div
            className="absolute -bottom-1 left-1/3 h-1.5 w-1.5 rounded-full bg-[#666]"
            aria-hidden
          />
        </div>
      </div>
    </MouseGlowCell>
  );
}

function TextCell() {
  return (
    <MouseGlowCell area="text" bg="#000000">
      <div className="relative h-full p-8 flex flex-col justify-end gap-3">
        <p
          className="heading-tight text-[28px] md:text-[34px] font-extrabold leading-tight max-w-full"
          style={
            {
              backgroundImage:
                "linear-gradient(180deg, #ededed 0%, #6a6a6a 100%)",
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

function WideCell() {
  return (
    <MouseGlowCell area="wide" bg="#080808" className="border-t border-[#1a1a1a]">
      <div className="relative h-full p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ededed]/30 to-transparent" />
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-3">
            Beş uzmanlık alanı
          </p>
          <p className="heading text-[28px] md:text-[40px] font-extrabold">
            Tek ekip. Tek süreç. Tek sözleşme.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "E-Ticaret",
            "Mobil",
            "AI",
            "Web",
            "Eğitim",
          ].map((label) => (
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

export function BentoGrid() {
  return (
    <section
      id="bento"
      className="section border-b border-[#1a1a1a]"
      aria-labelledby="bento-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Rakamlarla Biz
          </p>
          <h2
            id="bento-heading"
            className="heading text-[36px] md:text-[52px] font-extrabold"
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
          <StatCell />
          <BeamCell />
          <MarqueeCell />
          <TerminalCell />
          <ChartCell />
          <OrbitCell />
          <TextCell />
          <WideCell />
        </motion.div>
      </div>
    </section>
  );
}
