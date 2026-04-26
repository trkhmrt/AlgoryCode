"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type IconKind = "send" | "bars" | "play" | "spark";

function buildCoinGeometry(radius: number, halfHeight: number, bevel: number): THREE.LatheGeometry {
  const seg = 12;
  const pts: THREE.Vector2[] = [];
  pts.push(new THREE.Vector2(0, halfHeight));
  pts.push(new THREE.Vector2(radius - bevel, halfHeight));
  for (let i = 1; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 0.5;
    pts.push(
      new THREE.Vector2(
        radius - bevel + Math.sin(a) * bevel,
        halfHeight - bevel + Math.cos(a) * bevel,
      ),
    );
  }
  pts.push(new THREE.Vector2(radius, -halfHeight + bevel));
  for (let i = 1; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 0.5;
    pts.push(
      new THREE.Vector2(
        radius - bevel + Math.cos(a) * bevel,
        -halfHeight + bevel - Math.sin(a) * bevel,
      ),
    );
  }
  pts.push(new THREE.Vector2(0, -halfHeight));
  const geo = new THREE.LatheGeometry(pts, 96);
  geo.computeVertexNormals();
  return geo;
}

function sendShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.55, -0.5);
  s.lineTo(0.55, 0);
  s.lineTo(-0.55, 0.5);
  s.lineTo(-0.18, 0);
  s.closePath();
  return s;
}

function barsShapes(): THREE.Shape[] {
  const make = (x: number, w: number, h: number) => {
    const s = new THREE.Shape();
    const y0 = -0.45;
    s.moveTo(x, y0);
    s.lineTo(x + w, y0);
    s.lineTo(x + w, y0 + h);
    s.lineTo(x, y0 + h);
    s.closePath();
    return s;
  };
  const w = 0.18;
  return [
    make(-0.42, w, 0.42),
    make(-0.09, w, 0.62),
    make(0.24, w, 0.86),
  ];
}

function playShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.36, -0.5);
  s.lineTo(0.5, 0);
  s.lineTo(-0.36, 0.5);
  s.closePath();
  return s;
}

function sparkShape(): THREE.Shape {
  const s = new THREE.Shape();
  const outer = 0.6;
  const inner = 0.16;
  const points: Array<[number, number]> = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    points.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  s.moveTo(points[0]![0], points[0]![1]);
  for (let i = 1; i < points.length; i++) {
    s.lineTo(points[i]![0], points[i]![1]);
  }
  s.closePath();
  return s;
}

function buildIconGeometry(kind: IconKind, scale: number, depth: number): THREE.BufferGeometry {
  const opts: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.02,
    bevelSegments: 4,
    curveSegments: 24,
  };
  let geo: THREE.BufferGeometry;
  if (kind === "send") {
    geo = new THREE.ExtrudeGeometry(sendShape(), opts);
  } else if (kind === "bars") {
    geo = new THREE.ExtrudeGeometry(barsShapes(), opts);
  } else if (kind === "play") {
    geo = new THREE.ExtrudeGeometry(playShape(), opts);
  } else {
    geo = new THREE.ExtrudeGeometry(sparkShape(), opts);
  }
  geo.center();
  geo.scale(scale, scale, 1);
  return geo;
}

export default function HeroChromeArt() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment();
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 50);
    camera.position.set(0, 0, 6.4);

    const root = new THREE.Group();
    scene.add(root);

    const coinGeo = buildCoinGeometry(0.92, 0.14, 0.07);

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xb8e8ff,
      emissive: 0x061a2e,
      emissiveIntensity: 0.12,
      metalness: 0,
      roughness: 0.035,
      transmission: 0.94,
      thickness: 0.62,
      ior: 1.52,
      attenuationColor: new THREE.Color(0x1e8fff),
      attenuationDistance: 0.55,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xd8f4ff),
      envMapIntensity: 1.35,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      iridescence: 0.45,
      iridescenceIOR: 1.22,
      iridescenceThicknessRange: [80, 420],
    });
    const iconMat = new THREE.MeshPhysicalMaterial({
      color: 0x9bdcff,
      emissive: 0x042238,
      emissiveIntensity: 0.1,
      metalness: 0,
      roughness: 0.04,
      transmission: 0.88,
      thickness: 0.38,
      ior: 1.48,
      attenuationColor: new THREE.Color(0x2a9fff),
      attenuationDistance: 0.35,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xe8fbff),
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      iridescence: 0.55,
      iridescenceIOR: 1.25,
      iridescenceThicknessRange: [60, 380],
    });
    const plinthMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a2848,
      metalness: 0,
      roughness: 0.22,
      transmission: 0.42,
      thickness: 1.2,
      ior: 1.45,
      attenuationColor: new THREE.Color(0x1566aa),
      attenuationDistance: 1.8,
      envMapIntensity: 0.95,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      transparent: true,
      opacity: 0.92,
    });

    type CoinDef = {
      x: number;
      y: number;
      icon: IconKind;
      tilt: number;
      yaw: number;
      phase: number;
    };
    const coins: CoinDef[] = [
      { x: -1.35, y: 0.95, icon: "send", tilt: -0.18, yaw: 0.32, phase: 0.0 },
      { x: 1.35, y: 0.95, icon: "bars", tilt: -0.12, yaw: -0.34, phase: 1.7 },
      { x: -1.35, y: -1.15, icon: "play", tilt: 0.16, yaw: 0.28, phase: 3.1 },
      { x: 1.35, y: -1.15, icon: "spark", tilt: 0.12, yaw: -0.3, phase: 4.6 },
    ];

    const coinNodes: Array<{
      group: THREE.Group;
      coin: THREE.Mesh;
      icon: THREE.Mesh;
      plinth: THREE.Mesh;
      def: CoinDef;
    }> = [];

    const plinthGeo = new THREE.CylinderGeometry(0.78, 0.86, 6, 64, 1, true);

    for (const def of coins) {
      const group = new THREE.Group();
      group.position.set(def.x, def.y, 0);
      group.rotation.set(def.tilt, def.yaw, 0);

      const coin = new THREE.Mesh(coinGeo, chromeMat);
      coin.rotation.x = -Math.PI / 2;
      group.add(coin);

      const iconGeo = buildIconGeometry(def.icon, 0.7, 0.09);
      const icon = new THREE.Mesh(iconGeo, iconMat);
      icon.position.z = 0.16;
      icon.position.y = 0;
      group.add(icon);

      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.set(0, -3.0, -0.05);
      plinth.renderOrder = -1;
      group.add(plinth);

      root.add(group);
      coinNodes.push({ group, coin, icon, plinth, def });
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6cb0ff, 0.85);
    rim.position.set(-6, 2, -4);
    scene.add(rim);
    const warm = new THREE.PointLight(0xff8ad8, 0.5, 14);
    warm.position.set(2.5, -3.5, 3);
    scene.add(warm);
    const cool = new THREE.PointLight(0x6ad8ff, 0.55, 14);
    cool.position.set(-3, -3.5, 3);
    scene.add(cool);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;
    const onMq = () => {
      reduceMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    const applyLayout = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      const aspect = w / h;
      if (aspect < 0.7) {
        root.scale.setScalar(0.78);
        camera.position.z = 7.2;
      } else if (aspect < 1.05) {
        root.scale.setScalar(0.92);
        camera.position.z = 6.7;
      } else {
        root.scale.setScalar(1);
        camera.position.z = 6.4;
      }
    };
    const ro = new ResizeObserver(applyLayout);
    ro.observe(wrap);
    applyLayout();

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      const ease = 0.06;
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      root.rotation.y = pointer.x * 0.18;
      root.rotation.x = -pointer.y * 0.12;

      if (!reduceMotion) {
        for (const node of coinNodes) {
          const f = Math.sin(t * 0.9 + node.def.phase) * 0.08;
          node.group.position.y = node.def.y + f;
          node.coin.rotation.y = t * 0.55 + node.def.phase * 0.2;
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      coinGeo.dispose();
      plinthGeo.dispose();
      coinNodes.forEach((n) => n.icon.geometry.dispose());
      chromeMat.dispose();
      iconMat.dispose();
      plinthMat.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="site-hero-chrome-art" aria-hidden="true">
      <canvas ref={canvasRef} className="site-hero-chrome-art-canvas" />
    </div>
  );
}
