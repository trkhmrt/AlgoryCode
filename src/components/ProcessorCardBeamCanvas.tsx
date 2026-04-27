"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export type ProcessorCardBeamCanvasProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  hubRef: React.RefObject<HTMLElement | null>;
  cardRefs: React.RefObject<HTMLElement | null>[];
  duration?: number;
  delays?: number[];
  beamColor?: THREE.ColorRepresentation;
  traceColor?: THREE.ColorRepresentation;
  traceOpacity?: number;
};

function domToWorld(domX: number, domY: number, halfW: number, halfH: number) {
  return new THREE.Vector3(domX - halfW, halfH - domY, 0);
}

export default function ProcessorCardBeamCanvas({
  containerRef,
  hubRef,
  cardRefs,
  duration = 2.45,
  delays,
  beamColor = 0xc8e8ff,
  traceColor = 0x4a5568,
  traceOpacity = 0.55,
}: ProcessorCardBeamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 800);
    camera.position.set(0, 0, 220);
    camera.lookAt(0, 0, 0);

    const hemi = new THREE.HemisphereLight(0xa8c8ff, 0x0a1018, 0.42);
    const ambient = new THREE.AmbientLight(0xffffff, 0.38);
    const key = new THREE.DirectionalLight(0xffffff, 0.55);
    key.position.set(120, 200, 280);
    const rim = new THREE.DirectionalLight(0x6eb8ff, 0.28);
    rim.position.set(-140, -40, 180);
    const hubLight = new THREE.PointLight(0x8ac8ff, 0.85, 420, 1.2);
    hubLight.position.set(0, 40, 120);
    scene.add(hemi, ambient, key, rim, hubLight);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.95, 0.55, 0.14);
    bloomPass.threshold = 0.22;
    bloomPass.strength = 1.05;
    bloomPass.radius = 0.72;
    composer.addPass(bloomPass);

    const cpuGroup = new THREE.Group();
    cpuGroup.renderOrder = 6;
    scene.add(cpuGroup);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2838,
      metalness: 0.55,
      roughness: 0.38,
      clearcoat: 0.35,
      clearcoatRoughness: 0.35,
      emissive: 0x050810,
      emissiveIntensity: 0.08,
    });
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x151c2a,
      metalness: 0.48,
      roughness: 0.42,
      clearcoat: 0.25,
      emissive: 0x020408,
      emissiveIntensity: 0.04,
    });
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x5a6578,
      metalness: 0.65,
      roughness: 0.35,
    });
    const padMat = new THREE.MeshStandardMaterial({
      color: 0xc9a227,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x2a1805,
      emissiveIntensity: 0.06,
    });

    type PathBundle = {
      curve: THREE.CurvePath<THREE.Vector3>;
      trace: THREE.Mesh;
      beam: THREE.Mesh;
      beamMat: THREE.ShaderMaterial;
      delay: number;
    };

    const traceCol = new THREE.Color(traceColor);
    const traceMat = new THREE.MeshPhysicalMaterial({
      color: traceCol,
      metalness: 0.25,
      roughness: 0.55,
      transparent: true,
      opacity: traceOpacity,
      emissive: traceCol.clone().multiplyScalar(0.08),
      emissiveIntensity: 0.35,
      clearcoat: 0.12,
    });

    const beamColA = new THREE.Color(beamColor);
    const beamColB = new THREE.Color(0xffffff);
    const createBeamMat = () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uFlow: { value: 0 },
          uTime: { value: 0 },
          uColorA: { value: beamColA.clone() },
          uColorB: { value: beamColB.clone() },
        },
        vertexShader: `
          varying vec2 vTubeUv;
          void main() {
            vTubeUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vTubeUv;
          uniform float uFlow;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          void main() {
            float px = vTubeUv.x;
            float f = fract(uFlow);
            float w = smoothstep(f - 0.16, f - 0.02, px) * (1.0 - smoothstep(f + 0.02, f + 0.22, px));
            w *= smoothstep(0.02, 0.08, px) * (1.0 - smoothstep(0.94, 0.998, px));
            float n = 0.96 + 0.04 * sin(px * 80.0 + uTime * 18.0);
            vec3 col = mix(uColorA * 0.25, uColorB, pow(w, 0.55) * n);
            float a = clamp(0.12 + w * 1.15, 0.0, 1.0);
            gl_FragColor = vec4(col * (0.55 + 0.45 * w), a);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        toneMapped: true,
        side: THREE.DoubleSide,
      });

    const paths: PathBundle[] = [];
    for (let i = 0; i < cardRefs.length; i++) {
      const beamMat = createBeamMat();
      const traceMesh = new THREE.Mesh(new THREE.BufferGeometry(), traceMat);
      const beamMesh = new THREE.Mesh(new THREE.BufferGeometry(), beamMat);
      traceMesh.renderOrder = 1;
      beamMesh.renderOrder = 4;
      scene.add(traceMesh, beamMesh);
      paths.push({
        curve: new THREE.CurvePath<THREE.Vector3>(),
        trace: traceMesh,
        beam: beamMesh,
        beamMat,
        delay: delays?.[i] ?? i * 0.14,
      });
    }

    type CardLayer = {
      mesh: THREE.Mesh;
      mat: THREE.MeshPhysicalMaterial;
      delay: number;
    };
    const cardLayers: CardLayer[] = [];
    const createCardMat = () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x1a2230,
        metalness: 0.2,
        roughness: 0.28,
        transmission: 0.42,
        thickness: 1.2,
        ior: 1.45,
        transparent: true,
        opacity: 0,
        clearcoat: 0.55,
        clearcoatRoughness: 0.18,
        emissive: 0x1c4a8a,
        emissiveIntensity: 0,
        depthWrite: false,
      });
    for (let i = 0; i < cardRefs.length; i++) {
      const mat = createCardMat();
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
      mesh.renderOrder = 2;
      mesh.position.z = -2;
      mesh.userData.baseSx = 1;
      mesh.userData.baseSy = 1;
      scene.add(mesh);
      cardLayers.push({ mesh, mat, delay: i * 0.09 });
    }

    const clock = new THREE.Clock();
    let raf = 0;
    let layoutReady = false;

    const applyLayout = () => {
      const cr = container.getBoundingClientRect();
      const hub = hubRef.current;
      if (!hub || cr.width < 8 || cr.height < 8) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      const halfW = w * 0.5;
      const halfH = h * 0.5;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloomPass.setSize(w, h);

      hubLight.position.set(0, halfH * 0.35, 140);

      const hr = hub.getBoundingClientRect();
      const hubDomX = hr.left - cr.left;
      const hubDomY = hr.top - cr.top;
      const hubW = hr.width;
      const hubH = hr.height;
      const hubBottom = domToWorld(hubDomX + hubW * 0.5, hubDomY + hubH, halfW, halfH);

      while (cpuGroup.children.length) {
        const ch = cpuGroup.children[0]!;
        cpuGroup.remove(ch);
        if (ch instanceof THREE.Mesh) {
          ch.geometry.dispose();
        }
        if (ch instanceof THREE.InstancedMesh) {
          ch.geometry.dispose();
        }
      }

      const bw = Math.max(32, hubW * 0.76);
      const bh = Math.max(20, hubH * 0.5);
      const bd = Math.max(5, Math.min(bw, bh) * 0.14);
      const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), bodyMat);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(bw * 1.002, bh * 1.002, bd * 1.002), 35),
        new THREE.LineBasicMaterial({
          color: 0x5a7ab8,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        }),
      );
      cpuGroup.add(body, edges);

      const capT = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.9, bh * 0.07, bd * 1.02), capMat);
      capT.position.y = bh * 0.5 + bh * 0.038;
      const capB = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.9, bh * 0.07, bd * 1.02), capMat);
      capB.position.y = -bh * 0.5 - bh * 0.038;
      cpuGroup.add(capT, capB);

      const pinW = bw * 0.052;
      const pinH = bh * 0.065;
      const pinD = bd * 0.92;
      const nPins = 10;
      const span = bw * 0.8;
      for (let i = 0; i < nPins; i++) {
        const t = (i + 0.5) / nPins;
        const px = (t - 0.5) * span;
        const pinT = new THREE.Mesh(new THREE.BoxGeometry(pinW, pinH, pinD), pinMat);
        pinT.position.set(px, bh * 0.5 + pinH * 0.52, 0);
        const pinB = new THREE.Mesh(new THREE.BoxGeometry(pinW, pinH, pinD), pinMat);
        pinB.position.set(px, -bh * 0.5 - pinH * 0.52, 0);
        cpuGroup.add(pinT, pinB);
      }

      const padGeo = new THREE.CylinderGeometry(bw * 0.018, bw * 0.018, 0.6, 10);
      const padCount = 14;
      const pads = new THREE.InstancedMesh(padGeo, padMat, padCount);
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler(0, 0, 0);
      const s = new THREE.Vector3(1, 1, 1);
      const p = new THREE.Vector3();
      let pi = 0;
      for (let row = 0; row < 2; row++) {
        const y = row === 0 ? bh * 0.22 : -bh * 0.22;
        for (let j = 0; j < 7; j++) {
          const t = (j + 0.5) / 7;
          const px = (t - 0.5) * span * 0.92;
          p.set(px, y, bd * 0.52);
          m.compose(p, q, s);
          pads.setMatrixAt(pi++, m);
        }
      }
      pads.instanceMatrix.needsUpdate = true;
      cpuGroup.add(pads);

      const hubCx = hubDomX + hubW * 0.5 - halfW;
      const hubCy = halfH - (hubDomY + hubH * 0.5);
      cpuGroup.position.set(hubCx, hubCy, 4);

      cardRefs.forEach((ref, idx) => {
        const el = ref.current;
        const layer = cardLayers[idx]!;
        if (!el) return;
        const er = el.getBoundingClientRect();
        const cx = er.left - cr.left + er.width * 0.5;
        const cy = er.top - cr.top + er.height * 0.5;
        const pos = domToWorld(cx, cy, halfW, halfH);
        layer.mesh.position.set(pos.x, pos.y, -1);
        const sx = er.width * 0.985;
        const sy = er.height * 0.985;
        layer.mesh.scale.set(sx, sy, 6);
        layer.mesh.userData.baseSx = sx;
        layer.mesh.userData.baseSy = sy;
      });

      paths.forEach((bundle, idx) => {
        const el = cardRefs[idx]?.current;
        if (!el) return;
        const er = el.getBoundingClientRect();
        const cx = er.left - cr.left + er.width * 0.5;
        const cy = er.top - cr.top;
        const end = domToWorld(cx, cy, halfW, halfH);
        const corner = new THREE.Vector3(hubBottom.x, end.y, 0);

        bundle.curve.curves.splice(0, bundle.curve.curves.length);
        bundle.curve.add(new THREE.LineCurve3(hubBottom.clone(), corner));
        bundle.curve.add(new THREE.LineCurve3(corner, end.clone()));

        const len = bundle.curve.getLength();
        const segs = Math.max(32, Math.min(160, Math.floor(len / 3)));
        const traceRad = THREE.MathUtils.clamp(len * 0.0045, 0.9, 2.4);
        const beamRad = THREE.MathUtils.clamp(len * 0.0068, 1.2, 3.2);

        bundle.trace.geometry.dispose();
        bundle.beam.geometry.dispose();
        bundle.trace.geometry = new THREE.TubeGeometry(bundle.curve, segs, traceRad, 7, false);
        bundle.beam.geometry = new THREE.TubeGeometry(bundle.curve, segs, beamRad, 8, false);
      });

      layoutReady = true;
    };

    const ro = new ResizeObserver(applyLayout);
    ro.observe(container);
    applyLayout();
    let nudge = 0;
    let nudgeId: number | undefined = window.setInterval(() => {
      applyLayout();
      if (++nudge >= 24 && nudgeId !== undefined) {
        window.clearInterval(nudgeId);
        nudgeId = undefined;
      }
    }, 80);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();

      paths.forEach((p) => {
        const len = p.curve.getLength();
        if (len < 4) return;
        const u = ((elapsed + p.delay) % duration) / duration;
        p.beamMat.uniforms.uFlow.value = u;
        p.beamMat.uniforms.uTime.value = elapsed;
      });

      const revealStart = 0.15;
      cardLayers.forEach((c) => {
        const t = THREE.MathUtils.clamp((elapsed - revealStart - c.delay) / 0.65, 0, 1);
        const e = 1 - Math.pow(1 - t, 2.4);
        c.mat.opacity = e * 0.26;
        c.mat.emissiveIntensity = e * 0.22;
        const bsx = (c.mesh.userData.baseSx as number) || 1;
        const bsy = (c.mesh.userData.baseSy as number) || 1;
        const g = 0.96 + e * 0.04;
        c.mesh.scale.set(bsx * g, bsy * g, 6);
      });

      if (layoutReady) {
        composer.render();
      }
    };
    tick();

    return () => {
      if (nudgeId !== undefined) window.clearInterval(nudgeId);
      cancelAnimationFrame(raf);
      ro.disconnect();
      paths.forEach((p) => {
        scene.remove(p.trace);
        scene.remove(p.beam);
        p.trace.geometry.dispose();
        p.beam.geometry.dispose();
        p.beamMat.dispose();
      });
      scene.remove(cpuGroup);
      cpuGroup.traverse((ch) => {
        if (ch instanceof THREE.Mesh || ch instanceof THREE.InstancedMesh) {
          ch.geometry.dispose();
        }
        if (ch instanceof THREE.LineSegments) {
          ch.geometry.dispose();
          (ch.material as THREE.Material).dispose();
        }
      });
      cardLayers.forEach((c) => {
        scene.remove(c.mesh);
        c.mesh.geometry.dispose();
        c.mat.dispose();
      });
      scene.remove(hemi, ambient, key, rim, hubLight);
      traceMat.dispose();
      bodyMat.dispose();
      capMat.dispose();
      pinMat.dispose();
      padMat.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [
    containerRef,
    hubRef,
    cardRefs.length,
    duration,
    delays,
    beamColor,
    traceColor,
    traceOpacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] block h-full w-full"
      aria-hidden
    />
  );
}
