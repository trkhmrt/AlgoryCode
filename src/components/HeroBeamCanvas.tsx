"use client";

import { useRef, useEffect } from "react";
import type { Theme } from "@/contexts/ThemeContext";

const CELL = 24;
const GRID_ALPHA_LIGHT = 0.06;
const GRID_ALPHA_DARK = 0.06;
const TAIL = 110;
const SPEED = 300;
const MAX_BEAMS = 18;
const SPAWN_EVERY = 0.28;
const SEGS = 30;

const COLORS = [
  [0x00, 0xf0, 0xff], // cyan
  [0xbf, 0x00, 0xff], // purple
  [0x00, 0xff, 0x88], // green
  [0xff, 0x00, 0x77], // pink
  [0xff, 0xe0, 0x00], // yellow
  [0xff, 0x62, 0x00], // orange
];

function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Seg = { ax: number; ay: number; bx: number; by: number; len: number; cumStart: number };

function generatePath(W: number, H: number) {
  const COLS = Math.ceil(W / CELL);
  const ROWS = Math.ceil(H / CELL);
  const edge = ri(0, 3);
  let x: number, y: number, dx: number, dy: number;

  if (edge === 0) {
    x = ri(0, COLS) * CELL;
    y = 0;
    dx = 0;
    dy = 1;
  } else if (edge === 1) {
    x = W;
    y = ri(0, ROWS) * CELL;
    dx = -1;
    dy = 0;
  } else if (edge === 2) {
    x = ri(0, COLS) * CELL;
    y = H;
    dx = 0;
    dy = -1;
  } else {
    x = 0;
    y = ri(0, ROWS) * CELL;
    dx = 1;
    dy = 0;
  }

  const pts: { x: number; y: number }[] = [{ x, y }];
  const turns = ri(1, 4);

  for (let t = 0; t < turns; t++) {
    const steps = ri(3, 11);
    let nx = x + dx * steps * CELL;
    let ny = y + dy * steps * CELL;
    nx = Math.max(0, Math.min(W, nx));
    ny = Math.max(0, Math.min(H, ny));
    pts.push({ x: nx, y: ny });
    x = nx;
    y = ny;
    if (x <= 0 || x >= W || y <= 0 || y >= H) break;
    if (Math.random() < 0.5) {
      [dx, dy] = [-dy, dx];
    } else {
      [dx, dy] = [dy, -dx];
    }
  }

  if (x > 0 && x < W && y > 0 && y < H) {
    const d = [y, W - x, H - y, x];
    const m = Math.min(...d);
    const ei = d.indexOf(m);
    if (ei === 0) pts.push({ x, y: 0 });
    else if (ei === 1) pts.push({ x: W, y });
    else if (ei === 2) pts.push({ x, y: H });
    else pts.push({ x: 0, y });
  }

  const segs: Seg[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < 1) continue;
    segs.push({
      ax: a.x,
      ay: a.y,
      bx: b.x,
      by: b.y,
      len,
      cumStart: total,
    });
    total += len;
  }
  return { segs, totalLen: total };
}

function pathPt(segs: Seg[], dist: number): { x: number; y: number } {
  let rem = Math.max(0, dist);
  for (const s of segs) {
    if (rem <= s.len) {
      const t = rem / s.len;
      return {
        x: s.ax + t * (s.bx - s.ax),
        y: s.ay + t * (s.by - s.ay),
      };
    }
    rem -= s.len;
  }
  const l = segs[segs.length - 1];
  return { x: l.bx, y: l.by };
}

type Beam = {
  segs: Seg[];
  totalLen: number;
  col: number[];
  head: number;
  dead: boolean;
};

export default function HeroBeamCanvas({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const spawnTimerRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const heroEl = canvas.parentElement;
    if (!heroEl) return;

    let W = heroEl.clientWidth;
    let H = heroEl.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const gridAlpha = theme === "light" ? GRID_ALPHA_LIGHT : GRID_ALPHA_DARK;
    const gridColor = theme === "light" ? "0,0,0" : "255,255,255";

    function drawGrid() {
      if (!ctx) return;
      ctx.strokeStyle = `rgba(${gridColor},${gridAlpha})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    }

    function spawnBeam() {
      if (beamsRef.current.length >= MAX_BEAMS) return;
      const { segs, totalLen } = generatePath(W, H);
      if (totalLen < CELL * 3) return;
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      beamsRef.current.push({ segs, totalLen, col, head: 0, dead: false });
    }

    let last = performance.now() / 1000;
    function tick(now: number) {
      if (!ctx) return;
      const t = now / 1000;
      const dt = t - last;
      last = t;

      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= SPAWN_EVERY) {
        spawnTimerRef.current = 0;
        spawnBeam();
      }

      ctx.clearRect(0, 0, W, H);
      drawGrid();

      for (let i = beamsRef.current.length - 1; i >= 0; i--) {
        const b = beamsRef.current[i];
        if (b.dead) {
          beamsRef.current.splice(i, 1);
          continue;
        }
        b.head += SPEED * dt;
        const headD = Math.min(b.head, b.totalLen + TAIL);
        const tailD = Math.max(headD - TAIL, 0);
        if (tailD >= b.totalLen) {
          b.dead = true;
          continue;
        }

        const colStr = `rgb(${b.col[0]},${b.col[1]},${b.col[2]})`;
        for (let s = 0; s < SEGS; s++) {
          const t0 = s / SEGS;
          const t1 = (s + 1) / SEGS;
          const d0 = tailD + t0 * (headD - tailD);
          const d1 = tailD + t1 * (headD - tailD);
          if (d1 <= 0 || d0 >= b.totalLen) continue;
          const d0c = Math.min(Math.max(d0, 0), b.totalLen);
          const d1c = Math.min(Math.max(d1, 0), b.totalLen);
          if (Math.abs(d1c - d0c) < 0.5) continue;
          const p0 = pathPt(b.segs, d0c);
          const p1 = pathPt(b.segs, d1c);
          const sa = t1;

          ctx.lineCap = "butt";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);

          ctx.strokeStyle = colStr;
          ctx.globalAlpha = sa * 0.1;
          ctx.lineWidth = 7;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = colStr;
          ctx.globalAlpha = sa * 0.52;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = colStr;
          ctx.globalAlpha = sa * 0.95;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = "rgb(255,255,255)";
          ctx.globalAlpha = sa * 0.8;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(tick);
    }

    for (let i = 0; i < 6; i++) {
      setTimeout(spawnBeam, i * 120);
    }
    animRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      W = heroEl.clientWidth;
      H = heroEl.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beamsRef.current = [];
    });
    ro.observe(heroEl);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] h-full w-full"
      style={{ display: "block" }}
      aria-hidden
    />
  );
}
