"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    id: 1,
    title: "Connect your repository",
    desc: "Link a Git provider once. We watch every push and branch automatically.",
  },
  {
    id: 2,
    title: "Configure with zero YAML",
    desc: "Smart defaults detect your framework. Override only what you need.",
  },
  {
    id: 3,
    title: "Preview every commit",
    desc: "Each pull request gets an isolated environment with its own data.",
  },
  {
    id: 4,
    title: "Monitor in production",
    desc: "Real user metrics, traces, and logs unified in a single timeline.",
  },
  {
    id: 5,
    title: "Roll back in two seconds",
    desc: "Atomic deploys mean every version stays addressable, forever.",
  },
];

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const activeProgress = useTransform(scrollYProgress, [0, 1], [0, STEPS.length]);

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative border-b border-[#1a1a1a]"
      aria-labelledby="showcase-heading"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-x h-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-20">
          <div className="lg:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
              Workflow
            </p>
            <h2
              id="showcase-heading"
              className="heading text-[34px] md:text-[44px] font-extrabold mb-8"
            >
              From commit to production in one motion.
            </h2>

            <ul className="space-y-1">
              {STEPS.map((s, i) => (
                <ShowcaseStepLabel
                  key={s.id}
                  step={s}
                  index={i}
                  progress={activeProgress}
                />
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 h-[60vh] lg:h-[78vh]">
            <div className="relative h-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] overflow-hidden">
              {STEPS.map((s, i) => (
                <ShowcasePanel
                  key={s.id}
                  index={i}
                  total={STEPS.length}
                  progress={activeProgress}
                  step={s}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseStepLabel({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(p - index - 0.5);
    return d < 0.5 ? 1 : 0.35;
  });
  const dotScale = useTransform(progress, (p) =>
    Math.abs(p - index - 0.5) < 0.5 ? 1 : 0.6
  );

  return (
    <motion.li
      style={{ opacity }}
      className="flex gap-4 py-3 border-t border-[#1a1a1a] first:border-t-0"
    >
      <motion.span
        style={{ scale: dotScale }}
        className="mt-1.5 inline-block h-2 w-2 rounded-full bg-[#ededed] flex-shrink-0"
      />
      <div>
        <p className="text-[15px] font-semibold tracking-tight text-[#ededed]">
          {step.title}
        </p>
        <p className="text-[13px] text-[#888] mt-1 max-w-[420px]">{step.desc}</p>
      </div>
    </motion.li>
  );
}

function ShowcasePanel({
  index,
  progress,
  step,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform<number, number>>;
  step: (typeof STEPS)[number];
}) {
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(p - index - 0.5);
    return d < 0.5 ? 1 : 0;
  });

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 p-8 md:p-12 flex flex-col"
    >
      <div className="flex items-center gap-2 text-[12px] text-[#666]">
        <span className="tabular">0{step.id}</span>
        <span>/</span>
        <span className="tabular">0{STEPS.length}</span>
      </div>
      <div className="mt-6 flex-1 grid grid-rows-[auto_1fr] gap-6">
        <p className="heading-tight text-[22px] md:text-[28px] font-semibold max-w-[520px]">
          {step.title}
        </p>
        <div className="bg-black border border-[#1a1a1a] rounded-md p-6 grid place-items-center">
          <ShowcaseVisual index={index} />
        </div>
      </div>
    </motion.div>
  );
}

function ShowcaseVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <pre className="font-mono text-[12px] text-[#888] leading-7">
        <span className="text-[#ededed]">$</span> stack link github.com/team/app
        {"\n"}
        <span className="text-[#00ff88]">✓</span> repository linked
        {"\n"}
        <span className="text-[#00ff88]">✓</span> watching: main, dev, prod
      </pre>
    );
  }
  if (index === 1) {
    return (
      <pre className="font-mono text-[12px] leading-7">
        <span className="text-[#888]">framework</span>:{" "}
        <span className="text-[#00ff88]">next</span>
        {"\n"}
        <span className="text-[#888]">runtime</span>:{" "}
        <span className="text-[#00ff88]">edge</span>
        {"\n"}
        <span className="text-[#888]">regions</span>:{" "}
        <span className="text-[#3b82f6]">all</span>
      </pre>
    );
  }
  if (index === 2) {
    return (
      <div className="flex flex-col gap-2">
        {["pr-128 / login-flow", "pr-129 / billing-v2", "pr-130 / search"].map(
          (b) => (
            <div
              key={b}
              className="flex items-center justify-between gap-6 px-4 py-3 border border-[#1a1a1a] rounded-md text-[13px]"
            >
              <span className="text-[#ededed]">{b}</span>
              <span className="text-[#00ff88]">live</span>
            </div>
          )
        )}
      </div>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-32" fill="none" aria-hidden>
        <path
          d="M0 100 L40 80 L80 90 L120 60 L160 70 L200 40 L240 50 L280 25 L320 35"
          stroke="#ededed"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={[80, 90, 60, 70, 40, 50, 25][i]}
            r="2"
            fill="#00ff88"
          />
        ))}
      </svg>
    );
  }
  return (
    <div className="flex flex-col gap-3 text-[13px] tabular">
      {["v2.4.1 — current", "v2.4.0 — 2 hours ago", "v2.3.9 — yesterday"].map(
        (v, i) => (
          <div
            key={v}
            className="flex items-center justify-between gap-6 px-4 py-3 border border-[#1a1a1a] rounded-md"
          >
            <span className={i === 0 ? "text-[#ededed]" : "text-[#666]"}>{v}</span>
            <button className="text-[#888] hover:text-[#ededed]">
              {i === 0 ? "active" : "rollback"}
            </button>
          </div>
        )
      )}
    </div>
  );
}
