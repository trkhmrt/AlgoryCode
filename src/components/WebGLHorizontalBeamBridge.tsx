"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type BeamPoint = {
  nx: number;
  ny: number;
};

export type WebGLHorizontalBeamBridgeProps = {
  className?: string;
  minHeight?: number;
  beamStart?: BeamPoint;
  beamEnd?: BeamPoint;
  pathWaypoints?: BeamPoint[];
  duration?: number;
  reverse?: boolean;
  lineColor?: THREE.ColorRepresentation;
  lineOpacity?: number;
  glowColor?: THREE.ColorRepresentation;
  glowMidColor?: THREE.ColorRepresentation;
  glowCoreColor?: THREE.ColorRepresentation;
  glowIntensity?: number;
  glowLength?: number;
  glowSpread?: number;
  spillRadius?: number;
  spillIntensity?: number;
  pulseLengthFrac?: number;
};

const DEF_START: BeamPoint = { nx: 0.08, ny: 0.69 };
const DEF_END: BeamPoint = { nx: 0.92, ny: 0.31 };

function disposeObject3D(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
      child.geometry.dispose();
      const m = child.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m.dispose();
    }
  });
}

function normToWorld(nx: number, ny: number, halfW: number, halfH: number) {
  return new THREE.Vector3(-halfW + nx * 2 * halfW, -halfH + ny * 2 * halfH, 0);
}

function defaultOrthogonalPath(a: BeamPoint, b: BeamPoint): BeamPoint[] {
  const mx = THREE.MathUtils.clamp((a.nx + b.nx) * 0.5, 0.18, 0.82);
  return [a, { nx: mx, ny: a.ny }, { nx: mx, ny: b.ny }, b];
}

export default function WebGLHorizontalBeamBridge({
  className,
  minHeight = 168,
  beamStart = DEF_START,
  beamEnd = DEF_END,
  pathWaypoints: pathWaypointsProp,
  duration = 2.75,
  reverse = false,
  lineColor = 0x4a4e5c,
  lineOpacity = 0.52,
  glowColor = 0x6b21a8,
  glowMidColor = 0xe879f9,
  glowCoreColor = 0xffffff,
  glowIntensity = 1.55,
  glowLength = 1.05,
  glowSpread = 1,
  spillRadius = 0.22,
  spillIntensity = 1.28,
  pulseLengthFrac = 0.11,
}: WebGLHorizontalBeamBridgeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pathKey = useMemo(() => {
    const geo =
      pathWaypointsProp && pathWaypointsProp.length >= 2
        ? pathWaypointsProp.map((p) => `${p.nx},${p.ny}`).join("|")
        : `${beamStart.nx},${beamStart.ny}-${beamEnd.nx},${beamEnd.ny}`;
    return [
      geo,
      String(lineColor),
      lineOpacity,
      String(glowColor),
      String(glowMidColor),
      String(glowCoreColor),
      glowIntensity,
      glowLength,
      glowSpread,
      spillRadius,
      spillIntensity,
      pulseLengthFrac,
    ].join(";");
  }, [
    pathWaypointsProp,
    beamStart.nx,
    beamStart.ny,
    beamEnd.nx,
    beamEnd.ny,
    lineColor,
    lineOpacity,
    glowColor,
    glowMidColor,
    glowCoreColor,
    glowIntensity,
    glowLength,
    glowSpread,
    spillRadius,
    spillIntensity,
    pulseLengthFrac,
  ]);

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
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    const lineGeom = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: lineOpacity,
      depthWrite: false,
      depthTest: false,
    });
    const traceLine = new THREE.Line(lineGeom, lineMat);
    traceLine.renderOrder = 0;
    scene.add(traceLine);

    const colRim = new THREE.Color(glowColor);
    const colAura = new THREE.Color(glowMidColor);
    const colHot = new THREE.Color(glowCoreColor);

    const pulseGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
    const pulseMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: true,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: glowIntensity },
        uRim: { value: colRim },
        uAura: { value: colAura },
        uHot: { value: colHot },
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
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uRim;
        uniform vec3 uAura;
        uniform vec3 uHot;

        void main() {
          float x = vUv.x;
          float y = abs(vUv.y - 0.5) * 2.0;

          float tail = smoothstep(0.0, 0.42, x) * (1.0 - smoothstep(0.9, 1.0, x));
          float head = smoothstep(0.62, 0.985, x);
          float body = exp(-y * y * 10.0);
          float halo = exp(-y * y * 2.1);

          float n = sin(x * 40.0 + uTime * 14.0) * 0.5 + 0.5;
          float flick = 0.94 + 0.06 * n;

          vec3 col =
            uRim * halo * 0.38 * tail +
            uAura * mix(halo, body, 0.55) * (0.45 + 0.55 * tail) +
            uHot * body * (0.25 + 1.35 * head) * (0.85 + 0.15 * tail);
          col *= uIntensity * flick;

          float a =
            clamp(halo * 0.42 * tail + body * (0.35 + 0.65 * head) * tail, 0.0, 1.0) * 1.05;
          gl_FragColor = vec4(col, min(a, 1.0));
        }
      `,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.renderOrder = 2;
    scene.add(pulseMesh);

    const spillGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
    const spillMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: true,
      uniforms: {
        uTime: { value: 0 },
        uGlow: { value: colAura.clone().lerp(colHot, 0.45) },
        uRim: { value: colRim },
        uSpill: { value: spillIntensity },
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
        uniform float uTime;
        uniform float uSpill;
        uniform vec3 uGlow;
        uniform vec3 uRim;
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float r = length(p);
          float ang = atan(p.y, p.x);
          float wob = 0.04 * sin(ang * 7.0 + uTime * 9.0);
          float rr = r + wob;
          float a0 = exp(-rr * rr * 1.25);
          float a1 = exp(-rr * rr * 5.0);
          float a2 = exp(-rr * rr * 16.0);
          vec3 col = uRim * a0 * 0.48 + uGlow * (a0 * 0.62 + a1 * 0.92 + a2 * 1.05);
          col *= uSpill;
          float a = clamp(a0 * 0.52 + a1 * 0.72 + a2 * 0.85, 0.0, 1.0);
          float flick = 0.9 + 0.1 * sin(uTime * 11.0);
          gl_FragColor = vec4(col * flick, a * flick);
        }
      `,
    });
    const spillDisc = new THREE.Mesh(spillGeo, spillMat);
    spillDisc.renderOrder = 3;
    scene.add(spillDisc);

    let curvePath = new THREE.CurvePath();
    let pathLength = 400;

    const tmp = new THREE.Vector3();
    const tan = new THREE.Vector3();
    const pos = new THREE.Vector3();
    const ahead = new THREE.Vector3();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;
    const onMq = () => {
      reduceMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const clock = new THREE.Clock();
    let raf = 0;

    const applyLayout = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 4 || h < 4) return;

      const halfW = w * 0.5;
      const halfH = h * 0.5;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const pts =
        pathWaypointsProp && pathWaypointsProp.length >= 2
          ? pathWaypointsProp
          : defaultOrthogonalPath(beamStart, beamEnd);

      curvePath = new THREE.CurvePath();
      for (let i = 0; i < pts.length - 1; i++) {
        const a = normToWorld(pts[i]!.nx, pts[i]!.ny, halfW, halfH);
        const b = normToWorld(pts[i + 1]!.nx, pts[i + 1]!.ny, halfW, halfH);
        curvePath.add(new THREE.LineCurve3(a, b));
      }

      pathLength = Math.max(curvePath.getLength(), 8);

      const verts: number[] = [];
      for (const p of pts) {
        const v = normToWorld(p.nx, p.ny, halfW, halfH);
        verts.push(v.x, v.y, v.z);
      }
      const na = verts.length;
      let attr = lineGeom.getAttribute("position") as THREE.BufferAttribute | null;
      if (!attr || attr.array.length !== na) {
        lineGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(na), 3));
        attr = lineGeom.getAttribute("position") as THREE.BufferAttribute;
      }
      (attr.array as Float32Array).set(verts);
      attr.needsUpdate = true;

      const m = Math.min(w, h);
      const pulseLen = THREE.MathUtils.clamp(
        pathLength * pulseLengthFrac * glowLength,
        16,
        pathLength * 0.22,
      );
      const pulseThick = THREE.MathUtils.clamp(m * 0.032 * glowSpread, 2.2, m * 0.088);
      pulseMesh.scale.set(pulseLen, pulseThick, 1);

      const sr = m * spillRadius * 2.1;
      spillDisc.scale.set(sr, sr, 1);

      lineMat.color.set(lineColor);
      lineMat.opacity = lineOpacity;
      pulseMat.uniforms.uRim.value.copy(colRim);
      pulseMat.uniforms.uAura.value.copy(colAura);
      pulseMat.uniforms.uHot.value.copy(colHot);
      pulseMat.uniforms.uIntensity.value = glowIntensity;
      spillMat.uniforms.uGlow.value.copy(colAura.clone().lerp(colHot, 0.45));
      spillMat.uniforms.uRim.value.copy(colRim);
      spillMat.uniforms.uSpill.value = spillIntensity;
    };

    const ro = new ResizeObserver(applyLayout);
    ro.observe(wrap);
    applyLayout();
    let layoutTries = 0;
    const ensureLayout = () => {
      if (wrap.clientWidth >= 4 && wrap.clientHeight >= 4) return;
      if (layoutTries++ > 48) return;
      requestAnimationFrame(() => {
        applyLayout();
        ensureLayout();
      });
    };
    ensureLayout();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();
      let t = (elapsed / duration) % 1;
      if (reverse) t = 1 - t;
      if (reduceMotion) t = 0.38;

      const arc = pulseLengthFrac * 0.42;
      const tc = THREE.MathUtils.clamp(t, arc * 0.5, 1 - arc * 0.5);
      curvePath.getPointAt(tc, pos);
      curvePath.getTangentAt(tc, tan);
      tan.z = 0;
      if (tan.lengthSq() < 1e-8) tan.set(1, 0, 0);
      tan.normalize();

      pulseMesh.position.copy(pos);
      pulseMesh.rotation.z = Math.atan2(tan.y, tan.x);

      const tTip = THREE.MathUtils.clamp(t + arc * 0.55, 0.001, 0.999);
      curvePath.getPointAt(tTip, ahead);
      curvePath.getTangentAt(tTip, tmp);
      tmp.z = 0;
      if (tmp.lengthSq() < 1e-8) tmp.set(1, 0, 0);
      tmp.normalize();
      spillDisc.position.copy(ahead);
      spillDisc.rotation.z = Math.atan2(tmp.y, tmp.x);

      pulseMat.uniforms.uTime.value = elapsed;
      spillMat.uniforms.uTime.value = elapsed;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      disposeObject3D(scene);
      renderer.dispose();
    };
  }, [pathKey, duration, reverse]);

  const fill = minHeight === 0;

  return (
    <div
      ref={wrapRef}
      className={["relative w-full overflow-hidden", className].filter(Boolean).join(" ")}
      style={
        fill
          ? { minHeight: 0, height: "100%" }
          : { minHeight }
      }
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
    </div>
  );
}
