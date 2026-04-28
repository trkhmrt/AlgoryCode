"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import type { Product, ProductStep } from "@/data/products";

export function DualStickyScroll({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = product.steps.length;
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, total]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    return stepProgress.on("change", (v) => {
      const i = Math.min(total - 1, Math.max(0, Math.floor(v)));
      setActive(i);
    });
  }, [stepProgress, total]);

  return (
    <section
      ref={ref}
      className="relative border-b border-[#1a1a1a]"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-x h-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-20">
          <LeftPanel
            product={product}
            active={active}
            progress={scrollYProgress}
          />
          <RightPanel product={product} active={active} />
        </div>
      </div>
    </section>
  );
}

function LeftPanel({
  product,
  active,
  progress,
}: {
  product: Product;
  active: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const current = product.steps[active];
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="lg:col-span-5">
      <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-6">
        Ürün Detayı
      </p>

      <ul className="space-y-2">
        {product.steps.map((s, i) => (
          <li
            key={s.id}
            className={`flex items-center gap-3 transition-opacity duration-300 ${
              i === active ? "opacity-100" : "opacity-40"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-[#ededed] scale-110" : "bg-[#444]"
              }`}
            />
            <span className="text-[13px] text-[#888]">{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="heading text-[28px] md:text-[36px] font-extrabold">
              {current.title}
            </h3>
            <p className="mt-4 text-[14px] text-[#888] max-w-[440px] leading-relaxed">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 h-[2px] w-full bg-[#1a1a1a] rounded-full overflow-hidden">
        <motion.div className="h-full bg-[#ededed]" style={{ width: barWidth }} />
      </div>
    </div>
  );
}

function RightPanel({
  product,
  active,
}: {
  product: Product;
  active: number;
}) {
  const current = product.steps[active];

  return (
    <div className="lg:col-span-7 h-[60vh] lg:h-[78vh]">
      <div className="relative h-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-6 md:p-10"
          >
            <StepVisual step={current} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepVisual({ step }: { step: ProductStep }) {
  if (step.visual === "terminal") return <TerminalVisual />;
  if (step.visual === "config") return <ConfigVisual />;
  if (step.visual === "integration") return <IntegrationVisual />;
  if (step.visual === "monitoring") return <MonitoringVisual />;
  return <ResultVisual />;
}

function TerminalVisual() {
  const lines = useMemo(
    () => [
      { p: "$", t: " npm install -g @stack/cli", c: "#ededed" },
      { p: "✓", t: " installed in 2.1s", c: "#00ff88" },
      { p: "$", t: " stack init", c: "#ededed" },
      { p: "✓", t: " project linked", c: "#00ff88" },
      { p: "$", t: " stack deploy", c: "#ededed" },
      { p: "✓", t: " live at preview.stack.dev", c: "#00ff88" },
    ],
    []
  );
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(lines.length, v + 1)), 600);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="h-full flex flex-col bg-black border border-[#1a1a1a] rounded-md">
      <div className="flex items-center gap-1.5 border-b border-[#1a1a1a] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#222]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#222]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#222]" />
        <span className="ml-4 text-[12px] text-[#666] font-mono">~ stack-cli</span>
      </div>
      <div className="flex-1 p-6 font-mono text-[13px] leading-7">
        {lines.slice(0, n).map((line, i) => (
          <div key={i}>
            <span style={{ color: line.c }}>{line.p}</span>
            <span className="text-[#ededed]">{line.t}</span>
          </div>
        ))}
        {n < lines.length ? (
          <span
            aria-hidden
            className="inline-block w-2 h-4 bg-[#ededed] blink-cursor align-text-bottom"
          />
        ) : null}
      </div>
    </div>
  );
}

function ConfigVisual() {
  const fields = useMemo(
    () => [
      { k: "framework", v: "next", c: "#00ff88" },
      { k: "runtime", v: "edge", c: "#00ff88" },
      { k: "regions", v: '"all"', c: "#3b82f6" },
      { k: "cache", v: "60", c: "#a855f7" },
      { k: "domain", v: '"app.stack.dev"', c: "#3b82f6" },
      { k: "env", v: "production", c: "#00ff88" },
    ],
    []
  );
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(fields.length, v + 1)), 500);
    return () => clearInterval(id);
  }, [fields.length]);

  return (
    <div className="h-full flex flex-col bg-black border border-[#1a1a1a] rounded-md">
      <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-3">
        <span className="text-[12px] text-[#666] font-mono">stack.config.yaml</span>
        <span className="text-[11px] text-[#666]">YAML</span>
      </div>
      <div className="flex-1 p-6 font-mono text-[13px] leading-8">
        {fields.slice(0, n).map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="flex"
          >
            <span className="text-[#888]">{f.k}</span>
            <span className="text-[#444]">: </span>
            <span style={{ color: f.c }}>{f.v}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IntegrationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);
  const d = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-full">
      <div className="absolute inset-0 grid place-items-center">
        <div
          ref={hub}
          className="h-16 w-16 rounded-md border border-[#3a3a3a] bg-black grid place-items-center"
        >
          <span className="inline-block h-5 w-5 bg-white" aria-hidden />
        </div>
      </div>

      <div className="absolute top-[12%] left-[12%]">
        <div ref={a} className="h-12 w-12 rounded-md border border-[#1a1a1a] bg-black grid place-items-center">
          <span className="text-[10px] tracking-widest text-[#888]">DB</span>
        </div>
      </div>
      <div className="absolute top-[12%] right-[12%]">
        <div ref={b} className="h-12 w-12 rounded-md border border-[#1a1a1a] bg-black grid place-items-center">
          <span className="text-[10px] tracking-widest text-[#888]">MQ</span>
        </div>
      </div>
      <div className="absolute bottom-[12%] left-[12%]">
        <div ref={c} className="h-12 w-12 rounded-md border border-[#1a1a1a] bg-black grid place-items-center">
          <span className="text-[10px] tracking-widest text-[#888]">PAY</span>
        </div>
      </div>
      <div className="absolute bottom-[12%] right-[12%]">
        <div ref={d} className="h-12 w-12 rounded-md border border-[#1a1a1a] bg-black grid place-items-center">
          <span className="text-[10px] tracking-widest text-[#888]">MAIL</span>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={a} toRef={hub} duration={3} delay={0} />
      <AnimatedBeam containerRef={containerRef} fromRef={b} toRef={hub} duration={3} delay={0.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={c} toRef={hub} duration={3} delay={1.0} />
      <AnimatedBeam containerRef={containerRef} fromRef={d} toRef={hub} duration={3} delay={1.5} />
    </div>
  );
}

function MonitoringVisual() {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: 16 }, () => 30 + Math.random() * 60)
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => [...d.slice(1), 30 + Math.random() * 60]);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const path = useMemo(() => {
    const w = 320;
    const h = 120;
    const step = w / (data.length - 1);
    return data
      .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${h - (v / 100) * h}`)
      .join(" ");
  }, [data]);

  return (
    <div className="h-full flex flex-col bg-black border border-[#1a1a1a] rounded-md">
      <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-3">
        <span className="text-[12px] text-[#666]">Live Monitoring</span>
        <span className="inline-flex items-center gap-2 text-[12px]">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full ping-dot bg-[#00ff88]" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-[#00ff88]" />
          </span>
          <span className="text-[#888]">canlı</span>
        </span>
      </div>
      <div className="flex-1 p-6 grid place-items-center">
        <svg viewBox="0 0 320 120" className="w-full h-32" fill="none" aria-hidden>
          <motion.path
            d={path}
            stroke="#ededed"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={false}
            animate={{ d: path }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {data.map((v, i) => {
            const x = (320 / (data.length - 1)) * i;
            const y = 120 - (v / 100) * 120;
            return <circle key={i} cx={x} cy={y} r="1.5" fill="#00ff88" />;
          })}
        </svg>
      </div>
    </div>
  );
}

function ResultVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRun(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 h-full gap-2">
      <div className="bg-black border border-[#1a1a1a] rounded-md p-6 opacity-50">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#444] mb-4">Önce</p>
        <p className="text-[44px] font-extrabold heading-tight tabular text-[#444]">
          12s
        </p>
        <p className="text-[12px] text-[#444] mt-2">deploy süresi</p>
        <ul className="mt-6 space-y-2 text-[13px] text-[#444]">
          <li className="line-through decoration-[#333]">manuel rollback</li>
          <li className="line-through decoration-[#333]">tek bölge dağıtım</li>
        </ul>
      </div>

      <div className="bg-black border border-[#2a2a2a] rounded-md p-6">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#888] mb-4">Sonra</p>
        <p className="text-[44px] font-extrabold heading-tight tabular text-[#ededed]">
          28s
        </p>
        <p className="text-[12px] text-[#888] mt-2">deploy süresi</p>
        <ul className="mt-6 space-y-2 text-[13px] text-[#ededed]">
          {["atomic rollback (2s)", "global edge dağıtım", "anlık önizleme"].map(
            (item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={run ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
                className="flex items-center gap-2"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
                {item}
              </motion.li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
