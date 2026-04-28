"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ACCENTS = {
  speed: "#00ff88",
  ai: "#a855f7",
  mobile: "#3b82f6",
  uptime: "#00ff88",
  ecommerce: "#f59e0b",
};

function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1500,
  inView,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
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
      setV(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, inView]);
  return (
    <span className="tabular">
      {prefix}
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

function SpeedCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300 overflow-hidden"
    >
      <p className="text-[12px] uppercase tracking-[0.18em]" style={{ color: ACCENTS.speed }}>
        Hız
      </p>
      <p className="mt-6 text-[44px] font-extrabold heading-tight">
        <CountUp to={48} suffix=" Saat" inView={inView} />
      </p>
      <p className="mt-1 text-[13px] text-[#888]">
        İlk canlı yayın süresi · keşif → production
      </p>

      <div className="mt-6 h-[3px] w-full bg-[#1a1a1a] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "98%" } : {}}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full"
          style={{ background: ACCENTS.speed }}
        />
      </div>

      <svg
        viewBox="0 0 220 50"
        className="mt-6 w-full h-12"
        aria-hidden
        fill="none"
      >
        <motion.path
          d="M0 36 L24 30 L48 34 L72 22 L96 28 L120 16 L144 22 L168 12 L192 18 L220 6"
          stroke={ACCENTS.speed}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function SecurityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300 overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(168,85,247,0.04) 0 1px, transparent 1px 6px)",
      }}
    >
      <p
        className="text-[12px] uppercase tracking-[0.18em]"
        style={{ color: ACCENTS.ai }}
      >
        AI Uzmanlığı
      </p>

      <div className="mt-6 relative w-20 h-20">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 dash-ring"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={ACCENTS.ai}
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </svg>
        <div className="absolute inset-2 grid place-items-center">
          <svg viewBox="0 0 60 60" width="44" height="44" aria-hidden fill="none">
            <motion.path
              d="M22 28 V20 a8 8 0 0 1 16 0 V28"
              stroke={ACCENTS.ai}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.rect
              x="18"
              y="28"
              width="24"
              height="20"
              rx="2"
              fill={ACCENTS.ai}
              fillOpacity="0.1"
              stroke={ACCENTS.ai}
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
            <Lock size={0} />
          </svg>
        </div>
      </div>

      <p className="mt-6 text-[18px] font-semibold tracking-tight">
        GPT-4 · Gemini · Claude
      </p>
      <p className="mt-1 text-[13px] text-[#888]">
        Desteklenen AI modelleri · LLM, RAG, agent
      </p>
    </div>
  );
}

function ScaleCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const dots = Array.from({ length: 64 }, (_, i) => i);

  return (
    <div
      ref={ref}
      className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300 overflow-hidden"
    >
      <p
        className="text-[12px] uppercase tracking-[0.18em]"
        style={{ color: ACCENTS.ecommerce }}
      >
        E-Ticaret
      </p>
      <p className="mt-4 text-[44px] font-extrabold heading-tight">
        %<CountUp to={34} inView={inView} />
      </p>
      <p className="mt-1 text-[13px] text-[#888]">
        Ortalama dönüşüm artışı · ilk 30 gün
      </p>

      <div className="mt-6 grid grid-cols-8 gap-1.5 max-w-[180px]">
        {dots.map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full"
            style={{ background: ACCENTS.ecommerce }}
            initial={{ opacity: 0.08 }}
            animate={inView ? { opacity: 0.85 } : {}}
            transition={{
              duration: 0.3,
              delay: i * 0.018,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ReliabilityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const incidents = [
    "$ audit performance --site=client-shop",
    "✓ Core Web Vitals: 98/100",
    "✓ Mobile score: 96/100",
    "✓ Conversion rate: +34%",
  ];

  return (
    <div
      ref={ref}
      className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300 overflow-hidden"
    >
      <p
        className="text-[12px] uppercase tracking-[0.18em]"
        style={{ color: ACCENTS.uptime }}
      >
        Uptime
      </p>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden>
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={ACCENTS.uptime}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
              animate={
                inView
                  ? { strokeDashoffset: 2 * Math.PI * 44 * (1 - 0.999) }
                  : {}
              }
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[14px] font-semibold tabular">
            99.9%
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="absolute inset-0 rounded-full ping-dot"
                style={{ background: ACCENTS.uptime }}
              />
              <span
                className="relative inline-block h-2 w-2 rounded-full"
                style={{ background: ACCENTS.uptime }}
              />
            </span>
            <span className="text-[13px] text-[#ededed]">tüm sistemler aktif</span>
          </div>
          <p className="mt-1 text-[12px] text-[#666]">Platform uptime SLA</p>
        </div>
      </div>

      <ul className="mt-5 space-y-1">
        {incidents.map((line, i) => (
          <motion.li
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
            className="text-[12px] font-mono text-[#666]"
          >
            {line}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Advantages() {
  return (
    <section
      className="section border-b border-[#1a1a1a]"
      aria-labelledby="advantages-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-16"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Avantajlar
          </p>
          <h2
            id="advantages-heading"
            className="heading text-[36px] md:text-[52px] font-extrabold"
          >
            Neden{" "}
            <span className="font-light text-[#888]">
              rakiplerimizden farklıyız?
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <SpeedCard />
          <SecurityCard />
          <ScaleCard />
          <ReliabilityCard />
        </div>

        <div className="mt-10 inline-flex items-center gap-2 text-[13px] text-[#666]">
          <CheckCircle2 size={14} />
          Her metrik gerçek müşteri projelerinde ölçüldü.
        </div>
      </div>
    </section>
  );
}
