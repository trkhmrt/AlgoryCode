"use client";

import { useEffect, useRef } from "react";

export default function MouseTextCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = () => {
      targetX = 0.5;
      targetY = 0.5;
    };

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      pointerX += (targetX - pointerX) * 0.07;
      pointerY += (targetY - pointerY) * 0.07;
      time += 0.012;

      const waves = 44;
      const centerY = height * (0.42 + (pointerY - 0.5) * 0.2);
      const influenceX = (pointerX - 0.5) * 1.8;

      for (let band = 0; band < waves; band += 1) {
        const offset = (band / (waves - 1) - 0.5) * 240;
        const alpha = 0.12 + (1 - Math.abs(offset) / 170) * 0.24;
        const hue = 190 + band * 1.8 + pointerX * 40;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const nx = x / Math.max(width, 1);
          const waveA = Math.sin(nx * 8 + time * 2.3 + band * 0.16);
          const waveB = Math.cos(nx * 16 - time * 1.3 + band * 0.09);
          const curve = waveA * 22 + waveB * 9 + influenceX * (nx - 0.5) * 60;
          const y = centerY + offset + curve;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue}, 90%, 68%, ${Math.max(0.02, alpha)})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${hue}, 95%, 62%, 0.3)`;
        ctx.stroke();
      }

      const glowX = width * pointerX;
      const glowY = height * pointerY;
      const radial = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 220);
      radial.addColorStop(0, "rgba(79, 140, 255, 0.18)");
      radial.addColorStop(0.5, "rgba(34, 211, 238, 0.08)");
      radial.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      raf = window.requestAnimationFrame(render);
    };

    resize();
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="ac-mouse-text-wrap" ref={containerRef} aria-hidden>
      <canvas className="ac-mouse-text-canvas" ref={canvasRef} />
    </div>
  );
}
