"use client";

import { useEffect, useRef } from "react";

export type NPoint = { nx: number; ny: number };

export type SmoothBeamPath2DPath = {
  id?: string;
  points: NPoint[];
  colorCore?: string;
  colorGlow?: string;
  delaySec?: number;
  opacity?: number;
};

export type SmoothBeamPath2DProps = {
  className?: string;
  minHeight?: number;
  paths: SmoothBeamPath2DPath[];
  durationSec?: number;
  trackColor?: string;
  trackWidthPx?: number;
  trackOpacity?: number;
  cornerTimeFactor?: number;
  straightTimeFactor?: number;
  pathEdgeFade?: number;
  pulseLengthFrac?: number;
};

function dist(a: NPoint, b: NPoint) {
  const dx = b.nx - a.nx;
  const dy = b.ny - a.ny;
  return Math.hypot(dx, dy) || 1e-6;
}

function isTurnVertex(pts: NPoint[], j: number) {
  if (j <= 0 || j >= pts.length - 1) return false;
  const ax = pts[j]!.nx - pts[j - 1]!.nx;
  const ay = pts[j]!.ny - pts[j - 1]!.ny;
  const bx = pts[j + 1]!.nx - pts[j]!.nx;
  const by = pts[j + 1]!.ny - pts[j]!.ny;
  const al = Math.hypot(ax, ay) || 1e-6;
  const bl = Math.hypot(bx, by) || 1e-6;
  const dot = (ax * bx + ay * by) / (al * bl);
  return Math.abs(dot) < 0.985;
}

function buildSegmentData(pts: NPoint[], cornerT: number, straightT: number) {
  const n = pts.length;
  if (n < 2) return null;
  const segLen: number[] = [];
  const segTime: number[] = [];
  let geomTotal = 0;
  for (let i = 0; i < n - 1; i++) {
    const L = dist(pts[i]!, pts[i + 1]!);
    segLen[i] = L;
    geomTotal += L;
  }
  for (let i = 0; i < n - 1; i++) {
    const atA = i > 0 && isTurnVertex(pts, i);
    const atB = i < n - 2 && isTurnVertex(pts, i + 1);
    const nearCorner = atA || atB;
    const L = segLen[i]!;
    const t = L * (nearCorner ? cornerT : straightT);
    segTime[i] = t;
  }
  let timeTotal = 0;
  for (let i = 0; i < n - 1; i++) timeTotal += segTime[i]!;
  if (timeTotal < 1e-9) return null;
  return { segLen, segTime, geomTotal, timeTotal, pts, n };
}

function distanceAtTimeUnit(
  u: number,
  data: NonNullable<ReturnType<typeof buildSegmentData>>,
) {
  const { segLen, segTime, timeTotal, n } = data;
  const target = (u - Math.floor(u)) * timeTotal;
  let accT = 0;
  let accD = 0;
  for (let i = 0; i < n - 1; i++) {
    const st = segTime[i]!;
    const sL = segLen[i]!;
    if (accT + st >= target) {
      const over = (target - accT) / st;
      return accD + over * sL;
    }
    accT += st;
    accD += sL;
  }
  return accD;
}

function pointAtDistance(d: NPoint[], targetDist: number) {
  if (d.length < 2) return { x: d[0]!.nx, y: d[0]!.ny, headAngle: 0 };
  let acc = 0;
  for (let i = 0; i < d.length - 1; i++) {
    const L = dist(d[i]!, d[i + 1]!);
    if (acc + L >= targetDist) {
      const t = (targetDist - acc) / L;
      const p0 = d[i]!;
      const p1 = d[i + 1]!;
      const x = p0.nx + (p1.nx - p0.nx) * t;
      const y = p0.ny + (p1.ny - p0.ny) * t;
      const headAngle = Math.atan2(p1.ny - p0.ny, p1.nx - p0.nx);
      return { x, y, headAngle };
    }
    acc += L;
  }
  const a = d[d.length - 2]!;
  const b = d[d.length - 1]!;
  return { x: b.nx, y: b.ny, headAngle: Math.atan2(b.ny - a.ny, b.nx - a.nx) };
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function samplePulsePolyline(
  d: NPoint[],
  s0: number,
  s1: number,
  geomTotal: number,
  edgeFade: number,
  out: { x: number; y: number; a: number }[],
) {
  out.length = 0;
  const fi = Math.max(1e-4, edgeFade) * geomTotal;
  const fo = Math.max(1e-4, edgeFade) * geomTotal;
  const steps = Math.min(64, 12 + Math.ceil((s1 - s0) * 400));
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    const s = s0 + (s1 - s0) * t;
    const p = pointAtDistance(d, s);
    const e1 = smoothstep(Math.min(1, s / fi));
    const e2 = 1 - smoothstep(Math.max(0, (geomTotal - s) / fo - 0.001));
    const a = e1 * e2 * (0.15 + 0.85 * Math.pow(t, 0.85));
    out.push({ x: p.x, y: p.y, a });
  }
}

export default function SmoothBeamPath2D({
  className,
  minHeight = 120,
  paths,
  durationSec = 2.6,
  trackColor = "#3a3f4e",
  trackWidthPx = 1.25,
  trackOpacity = 0.4,
  cornerTimeFactor = 2.75,
  straightTimeFactor = 0.38,
  pathEdgeFade = 0.12,
  pulseLengthFrac = 0.14,
}: SmoothBeamPath2DProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufRef = useRef<{ x: number; y: number; a: number }[]>([]);
  const hPad = minHeight > 0 ? minHeight : 120;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !paths.length) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prepped = paths
      .map((p) => {
        const data = buildSegmentData(p.points, cornerTimeFactor, straightTimeFactor);
        return data
          ? { data, colorCore: p.colorCore ?? "#ffffff", colorGlow: p.colorGlow ?? p.colorCore ?? "#e879f9", delay: p.delaySec ?? 0, pathOpacity: p.opacity ?? 1 }
          : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    if (!prepped.length) return;

    const drawTrack = (w: number, h: number) => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const pr of prepped) {
        const { pts, geomTotal } = pr.data;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const x = pts[i]!.nx * w;
          const y = pts[i]!.ny * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = trackColor;
        ctx.globalAlpha = trackOpacity * pr.pathOpacity;
        ctx.lineWidth = trackWidthPx;
        ctx.stroke();
      }
      ctx.restore();
    };

    const buf = bufRef.current;
    let raf = 0;
    let t0 = performance.now() / 1000;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const t = now / 1000;
      const el = t - t0;
      const w = wrap.clientWidth;
      const h = Math.max(hPad, wrap.clientHeight) || 120;
      if (h < 8) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawTrack(w, h);
      const dur = Math.max(0.4, durationSec);
      for (const pr of prepped) {
        const { data, colorCore, colorGlow, pathOpacity, delay } = pr;
        const { geomTotal, pts: d } = data;
        if (geomTotal < 1e-6) continue;
        const u = (el + delay) / dur;
        const head = distanceAtTimeUnit(u, data);
        const pLen = Math.max(geomTotal * 0.04, Math.min(geomTotal * 0.28, geomTotal * pulseLengthFrac));
        const s0 = Math.max(0, head - pLen);
        const s1 = Math.min(geomTotal, head);
        samplePulsePolyline(d, s0, s1, geomTotal, pathEdgeFade, buf);
        if (buf.length < 2) continue;
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let j = 0; j < buf.length - 1; j++) {
          const a = pathOpacity * Math.min(buf[j]!.a, buf[j + 1]!.a);
          if (a < 0.02) continue;
          const x0 = buf[j]!.x * w;
          const y0 = buf[j]!.y * h;
          const x1 = buf[j + 1]!.x * w;
          const y1 = buf[j + 1]!.y * h;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.lineWidth = 7.2;
          ctx.strokeStyle = colorGlow;
          ctx.shadowColor = colorGlow;
          ctx.shadowBlur = 16;
          ctx.globalAlpha = a * 0.42;
          ctx.stroke();
          ctx.lineWidth = 1.9;
          ctx.shadowBlur = 0;
          ctx.strokeStyle = colorCore;
          ctx.globalAlpha = a;
          ctx.stroke();
        }
        ctx.restore();
      }
    };
    t0 = performance.now() / 1000;
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [
    paths,
    hPad,
    durationSec,
    trackColor,
    trackWidthPx,
    trackOpacity,
    cornerTimeFactor,
    straightTimeFactor,
    pathEdgeFade,
    pulseLengthFrac,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ minHeight: hPad, width: "100%", position: "relative" }}
    >
      <canvas ref={canvasRef} className="block w-full" style={{ display: "block" }} aria-hidden />
    </div>
  );
}

export const SMOOTH_BEAM_L_PATH = (a: NPoint, b: NPoint, mx?: number): NPoint[] => {
  const m = mx ?? Math.min(0.82, Math.max(0.18, (a.nx + b.nx) * 0.5));
  return [a, { nx: m, ny: a.ny }, { nx: m, ny: b.ny }, b];
};
