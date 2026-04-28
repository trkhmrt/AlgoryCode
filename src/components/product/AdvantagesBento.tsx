"use client";

import { motion, useInView } from "framer-motion";
import { Lock, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import type { Product } from "@/data/products";

const ACCENTS = {
  speed: "#00ff88",
  security: "#3b82f6",
  scale: "#a855f7",
  warn: "#f59e0b",
};

function CountUp({
  to,
  suffix = "",
  duration = 1500,
  inView,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, inView]);
  return (
    <span className="tabular">
      {Number.isInteger(to) ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)}
      {suffix}
    </span>
  );
}

function PrimaryCell({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const numeric = parseFloat(product.primaryMetric.value.replace(/[^\d.]/g, "")) || 0;
  const suffix = product.primaryMetric.value.replace(/[\d.]/g, "");

  return (
    <div
      ref={ref}
      className="pb-primary bento-cell p-10 flex flex-col justify-between relative"
      style={{ background: "#0d0d0d" }}
    >
      <div className="absolute inset-0 grid-lines opacity-20" aria-hidden />
      <div className="relative">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Temel Avantaj
        </p>
        <p className="mt-6 heading text-[80px] md:text-[112px] font-extrabold leading-none">
          <CountUp to={numeric} suffix={suffix} inView={inView} />
        </p>
        <p className="mt-3 text-[15px] text-[#888]">{product.primaryMetric.label}</p>
      </div>
      <div className="relative">
        <p className="text-[13px] text-[#666] max-w-[420px]">
          {product.primaryMetric.description}
        </p>
        <div className="mt-4 h-[2px] w-full bg-[#1a1a1a] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "92%" } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="h-full bg-[#ededed]"
          />
        </div>
      </div>
    </div>
  );
}

function SpeedCell() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const r = 38;
  const c = 2 * Math.PI * r;

  return (
    <div
      ref={ref}
      className="pb-speed bento-cell p-7 flex flex-col items-center justify-center"
      style={{ background: "#000" }}
    >
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#1a1a1a" strokeWidth="4" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={ACCENTS.speed}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c * 0.05 } : {}}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[16px] font-semibold tabular">95%</span>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-[#888]">cache hit oranı</p>
      <span className="relative inline-flex h-2 w-2 mt-3">
        <span
          className="absolute inset-0 rounded-full ping-dot"
          style={{ background: ACCENTS.speed }}
        />
        <span
          className="relative inline-block h-2 w-2 rounded-full"
          style={{ background: ACCENTS.speed }}
        />
      </span>
    </div>
  );
}

function SecurityCell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });

  return (
    <div
      ref={containerRef}
      className="pb-security bento-cell p-7 relative flex flex-col items-center justify-between"
      style={{ background: "#080808" }}
    >
      <p className="self-start text-[12px] uppercase tracking-[0.18em]" style={{ color: ACCENTS.security }}>
        Güvenlik
      </p>

      <div
        ref={topRef}
        className="h-12 w-12 rounded-md grid place-items-center bg-black"
        style={{ border: `1px solid ${ACCENTS.security}55` }}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: ACCENTS.security }}
        />
      </div>

      <div className="my-3" />

      <div
        ref={bottomRef}
        className="h-14 w-14 rounded-md grid place-items-center bg-black relative"
        style={{ border: `1px solid ${ACCENTS.security}` }}
      >
        <Lock size={20} style={{ color: ACCENTS.security }} />
        <span
          aria-hidden
          className="absolute inset-0 rounded-md ping-dot"
          style={{
            background: `radial-gradient(circle, ${ACCENTS.security}33 0%, transparent 70%)`,
          }}
        />
      </div>

      <p className="text-[13px] text-[#888] text-center">uçtan uca şifreli</p>

      {inView ? (
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={topRef}
          toRef={bottomRef}
          curvature={0}
          duration={2.5}
          gradientStart={ACCENTS.security}
          gradientEnd={ACCENTS.security}
        />
      ) : null}
    </div>
  );
}

function ScaleCell() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const dots = Array.from({ length: 36 });

  return (
    <div
      ref={ref}
      className="pb-scale bento-cell p-7 flex flex-col"
      style={{ background: "#000" }}
    >
      <p className="text-[12px] uppercase tracking-[0.18em]" style={{ color: ACCENTS.scale }}>
        Ölçek
      </p>
      <div className="mt-6 grid grid-cols-6 gap-2 max-w-[170px]">
        {dots.map((_, i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: ACCENTS.scale }}
            initial={{ opacity: 0.08 }}
            animate={inView ? { opacity: 0.85 } : {}}
            transition={{ duration: 0.3, delay: i * 0.025 }}
          />
        ))}
      </div>
      <p className="mt-auto text-[13px] text-[#888]">milyon eşzamanlı bağlantı</p>
    </div>
  );
}

function UptimeCell() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const r = 32;
  const c = 2 * Math.PI * r;

  return (
    <div
      ref={ref}
      className="pb-uptime bento-cell p-7 flex flex-col items-center justify-center"
      style={{ background: "#080808" }}
    >
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r={r} fill="none" stroke="#1a1a1a" strokeWidth="4" />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={ACCENTS.warn}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c * 0.0001 } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-[13px] font-semibold tabular">
          99.99%
        </div>
      </div>
      <p className="mt-4 text-[13px] text-[#888] text-center">SLA garantili uptime</p>
    </div>
  );
}

function DiffCell({ product }: { product: Product }) {
  const lines = [
    "$ stack ship --product " + product.slug,
    "→ optimizing for " + product.primaryMetric.label,
    "→ activating " + product.steps.length + " modules",
    "✓ live in 28s — " + product.primaryMetric.value,
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (lines.length + 3));
    }, 1000);
    return () => clearInterval(id);
  }, [lines.length]);

  const visible = Math.min(step, lines.length);

  return (
    <div className="pb-diff bento-cell p-10 flex flex-col" style={{ background: "#000" }}>
      <div className="flex items-center gap-2">
        <Terminal size={14} className="text-[#666]" />
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#666]">
          Farkımız
        </p>
      </div>
      <div className="mt-6">
        {lines.slice(0, visible).map((l) => (
          <div key={l} className="terminal-line">
            {l}
          </div>
        ))}
        {visible < lines.length ? (
          <span
            aria-hidden
            className="terminal-line inline-block w-2 h-4 bg-[#00ff88] blink-cursor align-text-bottom"
          />
        ) : null}
      </div>
    </div>
  );
}

export function AdvantagesBento({ product }: { product: Product }) {
  return (
    <section className="section border-b border-[#1a1a1a]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Avantajlar
          </p>
          <h2 className="heading text-[36px] md:text-[52px] font-extrabold">
            Detayda fark, üretim hızında.
          </h2>
        </motion.div>

        <div className="product-bento">
          <PrimaryCell product={product} />
          <SpeedCell />
          <SecurityCell />
          <ScaleCell />
          <UptimeCell />
          <DiffCell product={product} />
        </div>
      </div>
    </section>
  );
}
