"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useEffect, useId, useState } from "react";

export type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  gradientStart?: string;
  gradientEnd?: string;
  duration?: number;
  delay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  pathColor = "#ffffff",
  pathOpacity = 0.15,
  pathWidth = 1,
  gradientStart = "#ffffff",
  gradientEnd = "#ffffff",
  duration = 4,
  delay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [path, setPath] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!c || !a || !b) return;
      const cb = c.getBoundingClientRect();
      const ab = a.getBoundingClientRect();
      const bb = b.getBoundingClientRect();

      const w = cb.width;
      const h = cb.height;
      const x1 = ab.left - cb.left + ab.width / 2 + startXOffset;
      const y1 = ab.top - cb.top + ab.height / 2 + startYOffset;
      const x2 = bb.left - cb.left + bb.width / 2 + endXOffset;
      const y2 = bb.top - cb.top + bb.height / 2 + endYOffset;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const mx = (x1 + x2) / 2 + nx * curvature;
      const my = (y1 + y2) / 2 + ny * curvature;

      setBox({ width: w, height: h });
      setPath(`M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`);
    };

    compute();

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    if (fromRef.current) ro.observe(fromRef.current);
    if (toRef.current) ro.observe(toRef.current);

    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  const gradId = `beam-grad-${id}`;
  const filterId = `beam-glow-${id}`;

  return (
    <svg
      fill="none"
      width={box.width}
      height={box.height}
      viewBox={`0 0 ${box.width} ${box.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <motion.linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: reverse ? "100%" : "0%",
            x2: reverse ? "100%" : "0%",
            y1: reverse ? "100%" : "0%",
            y2: reverse ? "100%" : "0%",
          }}
          animate={{
            x1: reverse ? ["100%", "0%"] : ["0%", "100%"],
            x2: reverse ? ["100%", "0%"] : ["0%", "100%"],
            y1: reverse ? ["100%", "0%"] : ["0%", "100%"],
            y2: reverse ? ["100%", "0%"] : ["0%", "100%"],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStart} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStart} />
          <stop offset="50%" stopColor={gradientEnd} />
          <stop offset="80%" stopColor={gradientEnd} />
          <stop offset="100%" stopColor={gradientEnd} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
      {path ? (
        <>
          <path
            d={path}
            stroke={pathColor}
            strokeOpacity={pathOpacity}
            strokeWidth={pathWidth}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={path}
            stroke={`url(#${gradId})`}
            strokeOpacity="1"
            strokeWidth={pathWidth + 1}
            strokeLinecap="round"
            fill="none"
            filter={`url(#${filterId})`}
          />
        </>
      ) : null}
    </svg>
  );
}
