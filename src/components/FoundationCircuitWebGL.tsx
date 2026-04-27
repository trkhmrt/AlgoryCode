"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const HEADING = "Built on a foundation of fast,\nproduction-grade tooling";

const CARD_BEAM_END_GAP_PX = 22;
const HUB_TO_CARD_ROW_GAP = "2.5rem";
const BEAM_TUBE_R = 0.72;
const FOUNDATION_MIN_HEIGHT = "clamp(360px, 62vw, 520px)";

export type FoundationCardItem = {
  title: string;
  body: string;
  accent: string;
  beamA: string;
  beamB: string;
};

const DEFAULT_CARDS: FoundationCardItem[] = [
  {
    title: "Güven",
    body: "Güvenilir altyapı, kontrollü dağıtım ve sürdürülebilir kalite standardı.",
    accent: "#38bdf8",
    beamA: "#22d3ee",
    beamB: "#f0fdff",
  },
  {
    title: "Hız",
    body: "Akıcı geliştirme döngüsü, optimize süreçler ve düşük gecikmeli teslimat akışı.",
    accent: "#f472b6",
    beamA: "#e879f9",
    beamB: "#fff0ff",
  },
  {
    title: "Tecrübe",
    body: "Üretim tecrübesiyle şekillenen kararlar, doğru mimari ve tutarlı sonuçlar.",
    accent: "#fbbf24",
    beamA: "#fb923c",
    beamB: "#fff7ed",
  },
];

function domToWorld(domX: number, domY: number, halfW: number, halfH: number) {
  return new THREE.Vector3(domX - halfW, halfH - domY, 0);
}

function createBeamShader(a: string, b: string) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uFlow: { value: 0 },
      uTime: { value: 0 },
      uActive: { value: 0 },
      uColorA: { value: new THREE.Color(a) },
      uColorB: { value: new THREE.Color(b) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uFlow;
      uniform float uTime;
      uniform float uActive;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      void main() {
        float px = vUv.x;
        float f = fract(uFlow);
        float w = smoothstep(f - 0.1, f - 0.012, px) * (1.0 - smoothstep(f + 0.02, f + 0.14, px));
        w *= smoothstep(0.02, 0.06, px);
        float n = 0.97 + 0.03 * sin(px * 100.0 + uTime * 22.0);
        vec3 col = mix(uColorA * 0.25, uColorB, pow(w, 0.55) * n);
        float a = clamp(0.06 + w * 1.15, 0.0, 1.0) * uActive;
        gl_FragColor = vec4(col * (0.5 + 0.5 * w), a);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    toneMapped: true,
    side: THREE.DoubleSide,
  });
}

type BeamEntry = {
  curve: THREE.CurvePath<THREE.Vector3>;
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  speed: number;
  cardIndex: number;
  route: "left" | "right";
};
type TraceEntry = { line: THREE.Line; dot?: THREE.Mesh };

function addThinBeam(
  scene: THREE.Scene,
  list: BeamEntry[],
  curve: THREE.CurvePath<THREE.Vector3>,
  mat: THREE.ShaderMaterial,
  speed = 1,
  cardIndex = -1,
  route: "left" | "right" = "left",
) {
  const len = curve.getLength();
  const segs = Math.max(32, Math.min(180, Math.floor(len / 2.8)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, BEAM_TUBE_R, 5, false), mat);
  mesh.renderOrder = 3;
  scene.add(mesh);
  list.push({ curve, mesh, mat, speed, cardIndex, route });
}

export type FoundationCircuitWebGLProps = {
  items?: FoundationCardItem[];
};

export default function FoundationCircuitWebGL({ items = DEFAULT_CARDS }: FoundationCircuitWebGLProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const n = items.length;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.98;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000);
    camera.position.set(0, 0, 800);
    camera.lookAt(0, 0, 0);

    const hemi = new THREE.HemisphereLight(0x8899bb, 0x000000, 0.2);
    const amb = new THREE.AmbientLight(0xffffff, 0.16);
    const key = new THREE.DirectionalLight(0xffffff, 0.32);
    key.position.set(200, 400, 500);
    scene.add(hemi, amb, key);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.65, 0.42, 0.1);
    bloom.threshold = 0.32;
    bloom.strength = 0.72;
    bloom.radius = 0.5;
    composer.addPass(bloom);

    const beams: BeamEntry[] = [];
    const traces: TraceEntry[] = [];

    const clearBuild = () => {
      beams.forEach((b) => {
        scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        b.mat.dispose();
      });
      beams.length = 0;
      traces.forEach((t) => {
        scene.remove(t.line);
        t.line.geometry.dispose();
        const m = t.line.material;
        if (m instanceof THREE.Material) m.dispose();
        if (t.dot) {
          scene.remove(t.dot);
          t.dot.geometry.dispose();
          const dm = t.dot.material;
          if (dm instanceof THREE.Material) dm.dispose();
        }
      });
      traces.length = 0;
    };

    const layout = () => {
      const cr = wrap.getBoundingClientRect();
      const hub = hubRef.current;
      if (!cr.width || !cr.height || !hub) return;
      for (let i = 0; i < n; i++) {
        if (!cardEls.current[i]) return;
      }

      const w = cr.width;
      const h = cr.height;
      const halfW = w * 0.5;
      const halfH = h * 0.5;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);

      clearBuild();

      const hr = hub.getBoundingClientRect();
      const hubW = hr.width;
      const hubH = hr.height;
      const hubLeft = hr.left - cr.left;
      const hubTop = hr.top - cr.top;
      const isMobile = w < 768;
      const isCompact = w < 520;

      const traceColor = new THREE.Color(0x2a303b);
      const addTracePolyline = (pts: Array<[number, number]>, showDot = false) => {
        const world = pts.map(([x, y]) => domToWorld(x, y, halfW, halfH));
        const geo = new THREE.BufferGeometry().setFromPoints(world);
        const mat = new THREE.LineBasicMaterial({
          color: traceColor,
          transparent: true,
          opacity: isMobile ? 0.22 : 0.3,
          depthWrite: false,
        });
        const line = new THREE.Line(geo, mat);
        line.renderOrder = 0;
        scene.add(line);
        let dot: THREE.Mesh | undefined;
        if (showDot && world.length) {
          dot = new THREE.Mesh(
            new THREE.CircleGeometry(2.8, 10),
            new THREE.MeshBasicMaterial({
              color: 0x0f1318,
              transparent: true,
              opacity: 0.95,
              depthWrite: false,
            }),
          );
          dot.position.copy(world[0]!);
          dot.renderOrder = 0;
          scene.add(dot);
        }
        traces.push({ line, dot });
      };

      const leftTraceEndX = Math.max(20, hubLeft - w * 0.42);
      const rightTraceEndX = Math.min(w - 20, hubLeft + hubW + w * 0.42);
      const topBusY = Math.max(14, hubTop - (isMobile ? 26 : 40));
      const midBusY = hubTop + hubH * 0.68;
      const lowerBusY = Math.min(h - 22, hubTop + hubH + (isMobile ? 34 : 48));

      addTracePolyline(
        [
          [leftTraceEndX, topBusY],
          [hubLeft - 14, topBusY],
          [hubLeft - 14, hubTop + 12],
          [hubLeft + 6, hubTop + 12],
        ],
        true,
      );
      addTracePolyline(
        [
          [rightTraceEndX, topBusY],
          [hubLeft + hubW + 16, topBusY],
          [hubLeft + hubW + 16, hubTop + 12],
          [hubLeft + hubW - 8, hubTop + 12],
        ],
        false,
      );
      addTracePolyline(
        [
          [leftTraceEndX + 18, midBusY],
          [hubLeft - 26, midBusY],
          [hubLeft - 26, hubTop + hubH * 0.46],
          [hubLeft - 6, hubTop + hubH * 0.46],
        ],
        true,
      );
      addTracePolyline(
        [
          [rightTraceEndX - 20, midBusY],
          [hubLeft + hubW + 28, midBusY],
          [hubLeft + hubW + 28, hubTop + hubH * 0.46],
          [hubLeft + hubW + 8, hubTop + hubH * 0.46],
        ],
        true,
      );
      addTracePolyline(
        [
          [hubLeft + hubW * 0.5, topBusY - 8],
          [hubLeft + hubW * 0.5, hubTop - 4],
        ],
        true,
      );
      addTracePolyline(
        [
          [hubLeft + hubW * 0.28, hubTop + hubH],
          [hubLeft + hubW * 0.28, lowerBusY],
          [hubLeft - 14, lowerBusY],
        ],
        false,
      );
      addTracePolyline(
        [
          [hubLeft + hubW * 0.72, hubTop + hubH],
          [hubLeft + hubW * 0.72, lowerBusY],
          [hubLeft + hubW + 24, lowerBusY],
        ],
        false,
      );

      items.forEach((data, i) => {
        const r = cardEls.current[i]!.getBoundingClientRect();
        const cardLeftTopX = r.left - cr.left + r.width * 0.36;
        const cardRightTopX = r.left - cr.left + r.width * 0.64;
        const cardTopY = r.top - cr.top;

        const leftSlotT = (i + 1) / (n + 1);
        const leftEntryYDom = hubTop + hubH * (0.2 + 0.6 * leftSlotT);
        const leftEntryOuterXDom = hubLeft - (isMobile ? 10 : 14);
        const leftEntryInnerXDom = hubLeft + 6;
        const leftLaneXDom = Math.max(
          12,
          hubLeft - (isCompact ? 26 : 40) - i * (isCompact ? 5 : 8),
        );
        const leftLiftBase = Math.max(12, hubTop - (isCompact ? 18 : 28));
        const leftLiftStep = isCompact ? 9 : 13;
        const leftLiftYDom = Math.max(8, leftLiftBase - i * leftLiftStep);

        const leftStart = domToWorld(cardLeftTopX, cardTopY, halfW, halfH);
        const leftLift = domToWorld(cardLeftTopX, leftLiftYDom, halfW, halfH);
        const leftRun = domToWorld(leftLaneXDom, leftLiftYDom, halfW, halfH);
        const leftDrop = domToWorld(leftLaneXDom, leftEntryYDom, halfW, halfH);
        const leftOuter = domToWorld(leftEntryOuterXDom, leftEntryYDom, halfW, halfH);
        const leftInner = domToWorld(leftEntryInnerXDom, leftEntryYDom, halfW, halfH);

        const leftCurve = new THREE.CurvePath<THREE.Vector3>();
        leftCurve.add(new THREE.LineCurve3(leftStart, leftLift));
        leftCurve.add(new THREE.LineCurve3(leftLift, leftRun));
        leftCurve.add(new THREE.LineCurve3(leftRun, leftDrop));
        leftCurve.add(new THREE.LineCurve3(leftDrop, leftOuter));
        leftCurve.add(new THREE.LineCurve3(leftOuter, leftInner));
        addThinBeam(
          scene,
          beams,
          leftCurve,
          createBeamShader(data.beamA, data.beamB),
          0.94 + i * 0.03,
          i,
          "left",
        );

        const rightSlotT = (i + 0.8) / (n + 1.3);
        const bottomEntryXDom = hubLeft + hubW * (0.24 + 0.34 * rightSlotT);
        const bottomEntryYDom = hubTop + hubH - 2;
        const rightLaneXDom = Math.min(
          w - 12,
          hubLeft + hubW + (isCompact ? 26 : 42) + i * (isCompact ? 5 : 8),
        );
        const rightLiftBase = Math.max(10, hubTop - (isCompact ? 20 : 30));
        const rightLiftStep = isCompact ? 9 : 13;
        const rightLiftYDom = Math.max(8, rightLiftBase + i * rightLiftStep);
        const lowerBusYDom = Math.min(h - 14, hubTop + hubH + (isMobile ? 22 : 30) + i * 4);

        const rightStart = domToWorld(cardRightTopX, cardTopY, halfW, halfH);
        const rightLift = domToWorld(cardRightTopX, rightLiftYDom, halfW, halfH);
        const rightRun = domToWorld(rightLaneXDom, rightLiftYDom, halfW, halfH);
        const rightDrop = domToWorld(rightLaneXDom, lowerBusYDom, halfW, halfH);
        const bottomRun = domToWorld(bottomEntryXDom, lowerBusYDom, halfW, halfH);
        const bottomUp = domToWorld(bottomEntryXDom, bottomEntryYDom, halfW, halfH);

        const rightCurve = new THREE.CurvePath<THREE.Vector3>();
        rightCurve.add(new THREE.LineCurve3(rightStart, rightLift));
        rightCurve.add(new THREE.LineCurve3(rightLift, rightRun));
        rightCurve.add(new THREE.LineCurve3(rightRun, rightDrop));
        rightCurve.add(new THREE.LineCurve3(rightDrop, bottomRun));
        rightCurve.add(new THREE.LineCurve3(bottomRun, bottomUp));
        addThinBeam(
          scene,
          beams,
          rightCurve,
          createBeamShader(data.beamA, data.beamB),
          1.02 + i * 0.03,
          i,
          "right",
        );
      });
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(layout);
    });
    ro.observe(wrap);
    const bindObservers = () => {
      if (hubRef.current) ro.observe(hubRef.current);
      wrap.querySelectorAll(".ac-foundation-card").forEach((el) => ro.observe(el));
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bindObservers();
        layout();
      });
    });
    let nudge = 0;
    const nudgeId = window.setInterval(() => {
      layout();
      if (++nudge >= 16) window.clearInterval(nudgeId);
    }, 100);
    layout();

    const clock = new THREE.Clock();
    let raf = 0;
    let alive = true;
    const pairDur = 1.45;
    let activePair: BeamEntry[] = [];
    let pairStartedAt = 0;
    let prevPairKey = "";

    const pickRandomPair = () => {
      if (!beams.length) return [];
      const pickOne = beams[Math.floor(Math.random() * beams.length)]!;
      const pool = beams.filter((b) => b.cardIndex !== pickOne.cardIndex);
      const pickTwo = (pool.length ? pool : beams)[Math.floor(Math.random() * (pool.length || beams.length))]!;
      return [pickOne, pickTwo];
    };

    const refreshPair = (t: number) => {
      if (!activePair.length) {
        activePair = pickRandomPair();
        pairStartedAt = t;
        prevPairKey = activePair
          .map((b) => `${b.cardIndex}:${b.route}`)
          .sort()
          .join("|");
        return;
      }
      if (t - pairStartedAt < pairDur) return;
      let next = pickRandomPair();
      let guard = 0;
      while (
        guard < 8 &&
        next
          .map((b) => `${b.cardIndex}:${b.route}`)
          .sort()
          .join("|") === prevPairKey
      ) {
        next = pickRandomPair();
        guard++;
      }
      activePair = next;
      pairStartedAt = t;
      prevPairKey = activePair
        .map((b) => `${b.cardIndex}:${b.route}`)
        .sort()
        .join("|");
    };

    const tick = () => {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      refreshPair(t);
      const progress = ((t - pairStartedAt) % pairDur) / pairDur;
      beams.forEach((b, i) => {
        const isActive = activePair.includes(b);
        const stagger = (i % 2) * 0.06;
        const u = (progress + stagger) % 1;
        b.mat.uniforms.uFlow.value = u;
        b.mat.uniforms.uTime.value = t;
        b.mat.uniforms.uActive.value = isActive ? 1 : 0;
      });
      composer.render();
    };
    tick();

    return () => {
      alive = false;
      window.clearInterval(nudgeId);
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearBuild();
      scene.remove(hemi, amb, key);
      composer.dispose();
      renderer.dispose();
    };
  }, [items, n]);

  return (
    <div
      ref={wrapRef}
      className="ac-foundation-webgl-root relative mx-auto w-full overflow-hidden bg-black"
      style={{ minHeight: FOUNDATION_MIN_HEIGHT }}
    >
      <div
        className="pointer-events-auto relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-3 py-7 sm:px-4 sm:py-10 md:py-12"
        style={{ minHeight: FOUNDATION_MIN_HEIGHT, gap: "2rem", rowGap: "2.25rem" }}
      >
        <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
          {HEADING.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="relative z-[4] flex items-center justify-center" style={{ marginBottom: 0 }}>
          <div
            ref={hubRef}
            className="flex min-h-[74px] min-w-[140px] flex-col items-center justify-center rounded-lg border border-white/10 px-4 sm:px-6"
            style={{ background: "#1a1d24" }}
            aria-hidden
          >
            <span className="text-center text-sm font-semibold text-zinc-100 sm:text-base">
              AlgoryCode
            </span>
          </div>
        </div>

        <div
          className="ac-foundation-card-grid w-full max-w-5xl gap-4 md:gap-5"
          style={{
            display: "grid",
            marginTop: "clamp(1rem, 5vw, 2.5rem)",
            rowGap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          }}
        >
          {items.map((it, i) => (
            <div
              key={`${it.title}-${i}`}
              ref={(el) => {
                cardEls.current[i] = el;
              }}
              className="ac-foundation-card flex min-h-[168px] flex-col gap-2 rounded-2xl border border-white/10 p-4 transition-colors hover:border-white/20 md:p-5"
              style={{ background: "#141418" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-lg sm:h-11 sm:w-11"
                  style={{ background: it.accent, opacity: 0.9 }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm font-bold text-zinc-50 sm:text-base">{it.title}</h3>
                    <ExternalLink
                      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">{it.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
        style={{ minHeight: FOUNDATION_MIN_HEIGHT }}
        aria-hidden
      />
    </div>
  );
}
