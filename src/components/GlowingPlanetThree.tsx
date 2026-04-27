"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const MODEL_URL = "/models/glowing_planet_particles.gltf";

type PulsingMat = {
  material: THREE.MeshPhysicalMaterial;
  baseEmissive: number;
  pulseAmp: number;
};

function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry?.dispose();
    const m = mesh.material;
    if (Array.isArray(m)) m.forEach((x) => x.dispose());
    else m?.dispose();
  });
}

export default function GlowingPlanetThree() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x02030a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.08, 2000);
    camera.position.set(0, 0.45, 7.2);
    camera.lookAt(0, -0.15, 0);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 42;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 28 + 2;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 42 - 8;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    scene.add(new THREE.AmbientLight(0x1a1040, 0.35));
    const key = new THREE.PointLight(0xa855f7, 2.4, 40, 1.2);
    key.position.set(4, 2.5, 6);
    scene.add(key);
    const fill = new THREE.PointLight(0x22d3ee, 1.35, 35, 1.4);
    fill.position.set(-5, -1.2, 4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x6366f1, 0.55);
    rim.position.set(-2, 4, 8);
    scene.add(rim);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.35, 0.72, 0.1);
    bloomPass.threshold = 0.08;
    bloomPass.strength = 1.82;
    bloomPass.radius = 0.88;
    composer.addPass(bloomPass);

    const pulsers: PulsingMat[] = [];
    let loaded = false;
    let killed = false;

    const applyPhysicalSkin = (mesh: THREE.Mesh) => {
      const n = mesh.name.toLowerCase();
      const isTube = n.includes("tube") || n.includes("glowing");
      const isBoolean = n.includes("boolean");
      const isElipse = n.includes("elipse") || n.includes("ellipse");
      const emissive = new THREE.Color(isTube ? 0xd8b4fe : isBoolean ? 0x1e3a8a : 0x60a5fa);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(isBoolean ? 0x020617 : 0x050816),
        emissive,
        emissiveIntensity: isTube ? 1.55 : isBoolean ? 0.22 : 0.75,
        metalness: isTube ? 0.35 : 0.12,
        roughness: isTube ? 0.22 : 0.48,
        clearcoat: isTube || isElipse ? 1 : 0.65,
        clearcoatRoughness: 0.18,
        iridescence: isTube ? 0.35 : 0,
        iridescenceIOR: 1.2,
        sheen: 0.45,
        sheenRoughness: 0.35,
        sheenColor: new THREE.Color(0x818cf8),
      });
      const prev = mesh.material;
      if (Array.isArray(prev)) prev.forEach((m) => m.dispose());
      else prev?.dispose();
      mesh.material = mat;
      pulsers.push({
        material: mat,
        baseEmissive: mat.emissiveIntensity,
        pulseAmp: isTube ? 0.35 : isBoolean ? 0.08 : 0.18,
      });
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (killed) {
          disposeObject(gltf.scene);
          return;
        }
        const root = gltf.scene;
        modelRoot.add(root);

        root.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh) applyPhysicalSkin(mesh);
        });

        const box = new THREE.Box3().setFromObject(modelRoot);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        modelRoot.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
        const target = 5.2;
        modelRoot.scale.setScalar(target / maxDim);
        modelRoot.rotation.x = 0.22;
        modelRoot.rotation.y = -0.35;

        loaded = true;
        if (statusRef.current) statusRef.current.textContent = "";
      },
      undefined,
      () => {
        if (statusRef.current) {
          statusRef.current.textContent = "3D model yüklenemedi. Sayfayı yenileyin.";
        }
      }
    );

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;

    const applyLayout = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloomPass.setSize(w, h);
      const aspect = w / h;
      camera.position.z = aspect < 0.75 ? 8.4 : 7.2;
      camera.position.y = aspect < 0.75 ? 0.55 : 0.45;
      camera.lookAt(0, -0.12, 0);
    };

    const ro = new ResizeObserver(applyLayout);
    ro.observe(wrap);
    applyLayout();

    const onMq = () => {
      reduceMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      if (loaded && !reduceMotion) {
        modelRoot.rotation.y += delta * 0.052;
        modelRoot.rotation.z = Math.sin(t * 0.35) * 0.02;
        for (const p of pulsers) {
          p.material.emissiveIntensity =
            p.baseEmissive + Math.sin(t * 1.15 + p.baseEmissive) * p.pulseAmp;
        }
        stars.rotation.y += delta * 0.012;
      }

      key.intensity = reduceMotion ? 1.6 : 2.4 + Math.sin(t * 0.8) * 0.25;
      composer.render();
    };
    tick();

    return () => {
      killed = true;
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      starGeo.dispose();
      starMat.dispose();
      disposeObject(modelRoot);
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full min-h-[inherit] w-full">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <p
        ref={statusRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-500"
      >
        Sahne yükleniyor…
      </p>
    </div>
  );
}
