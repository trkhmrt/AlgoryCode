"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";

type BeamPoint = { x: number; y: number };

export type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement>;
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  trackColor?: string;
  anchorOutside?: boolean;
  anchorMargin?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  dashed?: boolean;
  className?: string;
};

const FALLBACK_POINT: BeamPoint = { x: 0, y: 0 };

function getCenterPoint(
  element: HTMLElement | null,
  containerRect: DOMRect | null,
  xOffset = 0,
  yOffset = 0
): BeamPoint {
  if (!element || !containerRect) return FALLBACK_POINT;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - containerRect.left + rect.width / 2 + xOffset,
    y: rect.top - containerRect.top + rect.height / 2 + yOffset,
  };
}

function buildCurvedPath(from: BeamPoint, to: BeamPoint, curvature: number): string {
  const dx = to.x - from.x;
  const c1x = from.x + dx * 0.35;
  const c2x = from.x + dx * 0.65;
  const c1y = from.y - curvature;
  const c2y = to.y - curvature;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function getAnchoredEndpoints(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  containerRect: DOMRect,
  margin: number,
  startXOffset: number,
  startYOffset: number,
  endXOffset: number,
  endYOffset: number
): { from: BeamPoint; to: BeamPoint } {
  const fromR = fromEl.getBoundingClientRect();
  const toR = toEl.getBoundingClientRect();
  const cFrom: BeamPoint = {
    x: fromR.left - containerRect.left + fromR.width / 2,
    y: fromR.top - containerRect.top + fromR.height / 2,
  };
  const cTo: BeamPoint = {
    x: toR.left - containerRect.left + toR.width / 2,
    y: toR.top - containerRect.top + toR.height / 2,
  };
  const vx = cTo.x - cFrom.x;
  const vy = cTo.y - cFrom.y;
  const dist = Math.hypot(vx, vy);
  if (dist < 0.5) {
    return {
      from: { x: cFrom.x + startXOffset, y: cFrom.y + startYOffset },
      to: { x: cTo.x + endXOffset, y: cTo.y + endYOffset },
    };
  }
  const ux = vx / dist;
  const uy = vy / dist;
  const halfFrom = Math.max(fromR.width, fromR.height) / 2 + margin;
  const halfTo = Math.max(toR.width, toR.height) / 2 + margin;
  return {
    from: {
      x: cFrom.x - ux * halfFrom + startXOffset,
      y: cFrom.y - uy * halfFrom + startYOffset,
    },
    to: {
      x: cTo.x - ux * halfTo + endXOffset,
      y: cTo.y - uy * halfTo + endYOffset,
    },
  };
}

export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathWidth = 3.5,
  pathOpacity = 0.52,
  gradientStartColor = "#3b82f6",
  gradientStopColor = "#22d3ee",
  trackColor = "#94a3b8",
  anchorOutside = true,
  anchorMargin = 14,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dashed = false,
  className,
}: AnimatedBeamProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const radialId = useId().replace(/:/g, "");
  const blurId = useId().replace(/:/g, "");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
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
      const { from: fromPoint, to: toPoint } = anchorOutside
        ? getAnchoredEndpoints(
            fromEl,
            toEl,
            containerRect,
            anchorMargin,
            startXOffset,
            startYOffset,
            endXOffset,
            endYOffset
          )
        : {
            from: getCenterPoint(fromEl, containerRect, startXOffset, startYOffset),
            to: getCenterPoint(toEl, containerRect, endXOffset, endYOffset),
          };

      setSvgSize({
        width: containerRect.width,
        height: containerRect.height,
      });
      setPathD(buildCurvedPath(fromPoint, toPoint, curvature));
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

    window.addEventListener("resize", queueUpdate);
    window.addEventListener("scroll", queueUpdate, true);
    queueUpdate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", queueUpdate);
      window.removeEventListener("scroll", queueUpdate, true);
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
    anchorOutside,
    anchorMargin,
  ]);

  useEffect(() => {
    if (!pathRef.current || !pathD) {
      setPathLength(0);
      return;
    }
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
    const startPoint = reverse
      ? pathRef.current.getPointAtLength(len)
      : pathRef.current.getPointAtLength(0);
    headX.set(startPoint.x);
    headY.set(startPoint.y);
  }, [pathD, reverse, headX, headY]);

  useAnimationFrame((time) => {
    if (!pathRef.current || !pathD || pathLength <= 0 || duration <= 0) return;
    const elapsed = Math.max(0, time - frameOffset);
    const loop = (elapsed / (duration * 1000)) % 1;
    const progress = reverse ? 1 - loop : loop;
    try {
      const point = pathRef.current.getPointAtLength(pathLength * progress);
      headX.set(point.x);
      headY.set(point.y);
    } catch {
      return;
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
        <filter id={`beam-blur-${blurId}`} x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation={5} />
        </filter>
        <filter id={`beam-line-glow-${blurId}`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={3.2} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`beam-head-${radialId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="45%" stopColor={gradientStartColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke={trackColor}
        strokeWidth={pathWidth * 2.85}
        strokeOpacity={Math.min(0.5, pathOpacity * 0.5)}
        strokeLinecap="round"
        strokeDasharray={dashed ? "8 10" : undefined}
        filter={`url(#beam-line-glow-${blurId})`}
      />
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={trackColor}
        strokeWidth={pathWidth * 1.15}
        strokeOpacity={Math.min(0.95, pathOpacity + 0.22)}
        strokeLinecap="round"
        strokeDasharray={dashed ? "8 10" : undefined}
      />

      <motion.circle
        cx={headX}
        cy={headY}
        r={pathWidth * 5.5}
        fill={`url(#beam-head-${radialId})`}
        filter={`url(#beam-blur-${blurId})`}
      />
    </svg>
  );
}
