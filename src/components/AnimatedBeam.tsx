"use client";

import { useAnimationFrame, useMotionValue, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type BeamPoint = { x: number; y: number };

type AnimatedBeamProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  color?: string;
  curvature?: number;
  reverse?: boolean;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  className?: string;
  headFade?: boolean;
  headRadius?: number;
};

const FALLBACK_POINT: BeamPoint = { x: 0, y: 0 };

function getCenterPoint(
  element: HTMLElement | null,
  containerRect: DOMRect | null
): BeamPoint {
  if (!element || !containerRect) return FALLBACK_POINT;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
  };
}

function buildCurvedPath(from: BeamPoint, to: BeamPoint, curvature: number): string {
  const dx = to.x - from.x;
  const c1x = from.x + dx * 0.33;
  const c2x = from.x + dx * 0.66;
  const c1y = from.y - curvature;
  const c2y = to.y - curvature;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 2.5,
  delay = 0,
  color = "#7c3aed",
  curvature = 70,
  reverse = false,
  pathWidth = 2,
  pathOpacity = 0.24,
  gradientStartColor = "#ffffff",
  gradientStopColor = "rgba(124, 58, 237, 0)",
  className,
  headFade = false,
  headRadius,
}: AnimatedBeamProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const radialId = useId().replace(/:/g, "");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  const headOpacity = useMotionValue(1);

  const frameOffset = useMemo(() => delay * 1000, [delay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePath = () => {
      const nextContainer = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!nextContainer || !fromEl || !toEl) return;

      const containerRect = nextContainer.getBoundingClientRect();
      const fromCenter = getCenterPoint(fromEl, containerRect);
      const toCenter = getCenterPoint(toEl, containerRect);
      setSvgSize({
        width: containerRect.width,
        height: containerRect.height,
      });
      setPathD(buildCurvedPath(fromCenter, toCenter, curvature));
    };

    let rafId = 0;
    const queueUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePath);
    };

    const observer = new ResizeObserver(queueUpdate);
    observer.observe(container);
    if (fromRef.current) observer.observe(fromRef.current);
    if (toRef.current) observer.observe(toRef.current);

    window.addEventListener("scroll", queueUpdate, true);
    window.addEventListener("resize", queueUpdate);
    queueUpdate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", queueUpdate, true);
      window.removeEventListener("resize", queueUpdate);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    if (!pathRef.current || !pathD) {
      setPathLength(0);
      return;
    }
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
    const start = reverse ? pathRef.current.getPointAtLength(len) : pathRef.current.getPointAtLength(0);
    headX.set(start.x);
    headY.set(start.y);
  }, [pathD, reverse, headX, headY]);

  useAnimationFrame((time) => {
    if (!pathRef.current || !pathD || pathLength <= 0 || duration <= 0) return;
    const elapsed = Math.max(0, time - frameOffset);
    const loop = (elapsed / (duration * 1000)) % 1;
    const progress = reverse ? 1 - loop : loop;
    let point: DOMPoint;
    try {
      point = pathRef.current.getPointAtLength(pathLength * progress);
    } catch {
      return;
    }
    headX.set(point.x);
    headY.set(point.y);
    if (headFade) {
      const envelope = Math.sin(Math.PI * progress);
      headOpacity.set(0.08 + envelope * 0.92);
    } else {
      headOpacity.set(1);
    }
  });

  return (
    <svg
      className={["pointer-events-none absolute inset-0 overflow-visible", className]
        .filter(Boolean)
        .join(" ")}
      width={svgSize.width}
      height={svgSize.height}
      viewBox={`0 0 ${Math.max(svgSize.width, 1)} ${Math.max(svgSize.height, 1)}`}
      aria-hidden
    >
      <defs>
        <radialGradient id={`beam-head-${radialId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="55%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />

      <motion.circle
        cx={headX}
        cy={headY}
        r={headRadius ?? pathWidth * 4}
        fill={`url(#beam-head-${radialId})`}
        style={{ opacity: headOpacity }}
      />
    </svg>
  );
}
