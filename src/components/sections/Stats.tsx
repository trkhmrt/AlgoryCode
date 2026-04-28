"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  display: (n: number) => string;
  label: string;
};

const STATS: Stat[] = [
  {
    value: 500,
    display: (n) => `${Math.round(n)}+`,
    label: "Proje",
  },
  {
    value: 5,
    display: (n) => `${Math.round(n)}`,
    label: "Uzmanlık Alanı",
  },
  {
    value: 99.9,
    display: (n) => `${n.toFixed(1)}%`,
    label: "Uptime",
  },
  {
    value: 48,
    display: (n) => `${Math.round(n)} saat`,
    label: "Kurulum",
  },
];

function CountStat({ stat, inView }: { stat: Stat; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(stat.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);
  return <span className="tabular">{stat.display(v)}</span>;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      className="section border-b border-[#1a1a1a]"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Platform istatistikleri
      </h2>
      <div ref={ref} className="container-x">
        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1a1a1a] border border-[#1a1a1a] rounded-[8px] overflow-hidden">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="p-8 lg:p-10 bg-[#0a0a0a]"
            >
              <p className="text-[44px] md:text-[56px] font-extrabold heading-tight">
                <CountStat stat={s} inView={inView} />
              </p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-[#666]">
                {s.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
