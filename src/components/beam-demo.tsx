"use client";

import {
  Bot,
  Code2,
  Database,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { createRef, useRef } from "react";
import AnimatedBeam from "@/components/ui/animated-beam";

type IconBoxProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  innerRef?: React.RefObject<HTMLDivElement | null>;
};

function IconBox({ label, icon: Icon, innerRef }: IconBoxProps) {
  return (
    <div
      ref={innerRef}
      className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white shadow-[0_0_24px_rgba(124,58,237,0.18)]"
      title={label}
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
}

const LEFT_ICONS = [Bot, Code2, Database, ShieldCheck, Layers3, Workflow];

export default function BeamDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef(Array.from({ length: 6 }, () => createRef<HTMLDivElement>()));

  const leftDurations = [3, 3.8, 4.6, 5.4, 6.2, 7];
  const delays = [0, 0.3, 0.7, 1.1, 1.5, 1.9];

  return (
    <section className="ac-beam relative isolate overflow-hidden bg-[#06040f] py-10" aria-label="Beam flow">
      <div
        ref={containerRef}
        className="ac-beam-demo-grid relative mx-auto grid min-h-[560px] w-[min(1109px,92vw)] grid-cols-[auto_minmax(180px,1fr)] items-center gap-6 rounded-2xl border border-white/10 bg-black/35 p-6 md:gap-12 md:p-10"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div className="absolute -inset-x-20 -inset-y-28 bg-[radial-gradient(ellipse_at_50%_48%,rgba(37,99,235,0.32),rgba(45,212,191,0.16)_34%,rgba(4,6,20,0.85)_68%,transparent_86%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:54px_54px] opacity-45 [mask-image:radial-gradient(ellipse_88%_76%_at_50%_50%,black_34%,transparent_86%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_42%),linear-gradient(to_bottom,rgba(2,6,23,0.1),rgba(2,6,23,0.62))]" />
        </div>

        {LEFT_ICONS.map((Icon, i) => (
          <AnimatedBeam
            key={`left-center-${i}`}
            containerRef={containerRef as React.RefObject<HTMLElement>}
            fromRef={leftRefs.current[i] as React.RefObject<HTMLElement>}
            toRef={hubRef as React.RefObject<HTMLElement>}
            curvature={i % 2 === 0 ? -22 : 22}
            duration={leftDurations[i]}
            delay={delays[i]}
            pathWidth={4.2}
            pathOpacity={0.58}
            anchorMargin={18}
            gradientStartColor="#2563eb"
            gradientStopColor="#2dd4bf"
            trackColor="#94a3b8"
          />
        ))}

        <div className="relative z-10 flex flex-col gap-4">
          {LEFT_ICONS.map((Icon, i) => (
            <IconBox
              key={`left-${i}`}
              label={`Left icon ${i + 1}`}
              icon={Icon}
              innerRef={leftRefs.current[i]}
            />
          ))}
        </div>

        <div className="relative z-10 flex justify-center">
          <div
            ref={hubRef}
            className="flex min-h-20 min-w-[220px] items-center justify-center rounded-2xl border border-fuchsia-300/50 bg-fuchsia-500/20 px-6 py-5 text-center text-lg font-semibold tracking-tight text-white shadow-[0_0_36px_rgba(168,85,247,0.45)]"
            aria-label="Center hub"
          >
            AlgoryCode
          </div>
        </div>
      </div>
    </section>
  );
}
