"use client";

import { useEffect, useRef } from "react";

export default function FuseParticleScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let r = 0;
    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.65,
      s: 0.4 + Math.random() * 1.6,
      a: 0.1 + Math.random() * 0.6,
      p: Math.random() * Math.PI * 2,
      v: 0.18 + Math.random() * 0.45,
    }));

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
      cx = w * 0.5;
      cy = h * 0.96;
      r = Math.max(w * 0.56, h * 0.82);
    };

    const draw = () => {
      raf = window.requestAnimationFrame(draw);
      t += 0.008;

      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#000506");
      bg.addColorStop(1, "#010203");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r * 0.88);
      glow.addColorStop(0, "rgba(58, 228, 210, 0.56)");
      glow.addColorStop(0.36, "rgba(28, 168, 164, 0.36)");
      glow.addColorStop(0.58, "rgba(14, 89, 102, 0.2)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const px = p.x * w + Math.sin(t * p.v + p.p) * 3;
        const py = p.y * h + Math.cos(t * p.v * 0.8 + p.p) * 1.8;
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3.4 + p.p));
        ctx.beginPath();
        ctx.arc(px, py, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 255, 240, ${p.a * twinkle})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();
      const arcLift = Math.sin(t * 1.1) * 4;
      ctx.ellipse(cx, cy + arcLift, r, h * 0.34, 0, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      const rim = ctx.createRadialGradient(cx, cy - h * 0.01, r * 0.86, cx, cy - h * 0.03, r);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(0.88, "rgba(74, 245, 224, 0.18)");
      rim.addColorStop(1, "rgba(117, 255, 236, 0.45)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h);

      const grainAlpha = 0.065;
      const dots = Math.floor((w * h) / 900);
      ctx.fillStyle = `rgba(208, 255, 245, ${grainAlpha})`;
      for (let i = 0; i < dots; i += 1) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
