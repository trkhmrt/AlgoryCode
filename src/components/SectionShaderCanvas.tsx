"use client";

import { useEffect, useRef } from "react";

type Variant = "flow" | "grid" | "noise" | "pulse";

type SectionShaderCanvasProps = {
  variant: Variant;
  className?: string;
  interactive?: boolean;
};

export default function SectionShaderCanvas({
  variant,
  className,
  interactive = false,
}: SectionShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let mx = 0.5;
    let my = 0.5;
    let tx = 0.5;
    let ty = 0.5;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      tx = (event.clientX - rect.left) / rect.width;
      ty = (event.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = () => {
      tx = 0.5;
      ty = 0.5;
    };

    const drawFlow = (w: number, h: number) => {
      const gx = w * (0.35 + mx * 0.3);
      const gy = h * (0.2 + my * 0.2);
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.8);
      g.addColorStop(0, "rgba(60, 120, 255, 0.26)");
      g.addColorStop(0.5, "rgba(45, 212, 191, 0.12)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 34; i += 1) {
        const alpha = 0.08 + i * 0.005;
        const hue = 185 + i * 2.8;
        const oy = (i / 33 - 0.5) * 190;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 5) {
          const nx = x / Math.max(1, w);
          const y =
            h * (0.5 + (my - 0.5) * 0.12) +
            oy +
            Math.sin(nx * 8.2 + t * 1.8 + i * 0.2) * 18 +
            Math.cos(nx * 15 - t * 1.25 + i * 0.09) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue}, 95%, 68%, ${alpha})`;
        ctx.lineWidth = 1.35;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsla(${hue}, 95%, 60%, 0.32)`;
        ctx.stroke();
      }
    };

    const drawGrid = (w: number, h: number) => {
      const step = 24;
      ctx.strokeStyle = "rgba(134, 162, 232, 0.16)";
      ctx.lineWidth = 1.05;
      for (let x = 0; x <= w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      const gx = w * mx;
      const gy = h * my;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 280);
      g.addColorStop(0, "rgba(80, 130, 255, 0.34)");
      g.addColorStop(0.35, "rgba(88, 216, 255, 0.16)");
      g.addColorStop(1, "rgba(80, 130, 255, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 10; i += 1) {
        const y = ((i + t * 8) % 10) * (h / 10);
        ctx.strokeStyle = "rgba(109, 180, 255, 0.14)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + Math.sin(t * 2 + i) * 12);
        ctx.stroke();
      }
    };

    const drawNoise = (w: number, h: number) => {
      const hueShift = 200 + mx * 45;
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "rgba(43, 77, 157, 0.16)");
      bg.addColorStop(1, "rgba(47, 207, 255, 0.08)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const dots = Math.floor((w * h) / 1050);
      for (let i = 0; i < dots; i += 1) {
        const x = (Math.sin(i * 61.3 + t * 0.8) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 37.7 + t * 0.6) * 0.5 + 0.5) * h;
        const a = 0.06 + (Math.sin(i * 0.7 + t * 2.2) * 0.5 + 0.5) * 0.12;
        ctx.fillStyle = `hsla(${hueShift + (i % 15)}, 90%, 74%, ${a})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      for (let i = 0; i < 7; i += 1) {
        const y = (i / 6) * h + Math.sin(t * 1.7 + i) * 20;
        const grad = ctx.createLinearGradient(0, y - 18, 0, y + 18);
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(0.5, "rgba(100, 170, 255, 0.1)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, y - 18, w, 36);
      }
    };

    const drawPulse = (w: number, h: number) => {
      const cx = w * mx;
      const cy = h * my;
      const burst = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      burst.addColorStop(0, "rgba(136, 170, 255, 0.24)");
      burst.addColorStop(0.45, "rgba(84, 214, 255, 0.12)");
      burst.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = burst;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 5; i += 1) {
        const r = 90 + i * 62 + Math.sin(t * 1.45 + i) * 12;
        const alpha = 0.2 - i * 0.03;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(110, 182, 255, ${Math.max(alpha, 0.04)})`;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(110, 182, 255, 0.38)";
        ctx.stroke();
      }
    };

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      t += 0.011;

      if (variant === "flow") drawFlow(w, h);
      if (variant === "grid") drawGrid(w, h);
      if (variant === "noise") drawNoise(w, h);
      if (variant === "pulse") drawPulse(w, h);
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactive) {
      wrap.addEventListener("pointermove", onPointerMove, { passive: true });
      wrap.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [interactive, variant]);

  return (
    <div className={`ac-section-canvas ${className || ""}`} ref={wrapRef} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
