"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import gsap from "gsap";

export default function HomeHeroThreeBand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
    camera.position.set(0, 1.5, 9.4);

    const domeGroup = new THREE.Group();
    domeGroup.position.set(0, -2.9, 0);
    domeGroup.scale.setScalar(1.38);
    scene.add(domeGroup);

    const sphereGeometry = new THREE.SphereGeometry(0.1, 24, 24);
    const sphereMaterialBase = new THREE.MeshStandardMaterial({
      color: 0x070707,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x1b1340,
      emissiveIntensity: 0.18,
    });

    type DomeSphere = {
      mesh: THREE.Mesh;
      baseY: number;
      anim: { yOffset: number; glow: number };
      tw?: gsap.core.Tween;
    };

    const domeSpheres: DomeSphere[] = [];
    const latitudeBands = 12;
    const radius = 4;
    for (let lat = 0; lat < latitudeBands; lat++) {
      const v = lat / (latitudeBands - 1);
      const phi = v * (Math.PI * 0.5);
      const ringRadius = Math.cos(phi) * radius;
      const y = Math.sin(phi) * radius;
      const ringCount = Math.max(7, Math.round(7 + ringRadius * 10.4));
      for (let i = 0; i < ringCount; i++) {
        const theta = (i / ringCount) * Math.PI * 2;
        const jitter = (Math.random() - 0.5) * 0.05;
        const mesh = new THREE.Mesh(sphereGeometry, sphereMaterialBase.clone());
        mesh.position.set(
          Math.cos(theta) * (ringRadius + jitter),
          y + jitter * 0.35,
          Math.sin(theta) * (ringRadius + jitter),
        );
        const scale = 0.88 + Math.random() * 0.3;
        mesh.scale.setScalar(scale);
        domeGroup.add(mesh);
        domeSpheres.push({
          mesh,
          baseY: mesh.position.y,
          anim: { yOffset: 0, glow: 0.18 },
        });
      }
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 520;
    const starPos = new Float32Array(starCount * 3);
    const starVel = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 32;
      starPos[i * 3 + 1] = Math.random() * 20 - 1.5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 28 - 1;
      starVel[i] = 0.12 + Math.random() * 0.42;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x5d72a8,
      size: 0.03,
      transparent: true,
      opacity: 0.46,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const ambient = new THREE.AmbientLight(0x090f2a, 0.52);
    scene.add(ambient);

    const underGlow = new THREE.PointLight(0x5b36ff, 3.1, 24, 1.15);
    underGlow.position.set(0, -3.6, 0.2);
    scene.add(underGlow);
    const underGlowSoft = new THREE.PointLight(0x1d39a7, 1.35, 21, 1.5);
    underGlowSoft.position.set(0, -3.1, 1.7);
    scene.add(underGlowSoft);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.45, 0.75, 0.12);
    bloomPass.threshold = 0.06;
    bloomPass.strength = 1.68;
    bloomPass.radius = 0.92;
    composer.addPass(bloomPass);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;
    const mouseNdc = new THREE.Vector2(100, 100);
    let targetOrbit = 0;
    let orbitAngle = 0;
    let scrollRatio = 0;

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
      camera.position.z = aspect < 0.8 ? 10.5 : 9.4;
      camera.position.y = aspect < 0.8 ? 1.65 : 1.45;
    };

    const ro = new ResizeObserver(applyLayout);
    ro.observe(wrap);
    applyLayout();

    const onPointerMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseNdc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNdc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onPointerLeave = () => {
      mouseNdc.set(100, 100);
    };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const onScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollRatio = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
      targetOrbit = (scrollRatio - 0.5) * 0.9;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onMq = () => {
      reduceMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const clock = new THREE.Clock();
    let raf = 0;
    const sphereWorld = new THREE.Vector3();
    const sphereNdc = new THREE.Vector3();
    const camTarget = new THREE.Vector3(0, 0.65, 0);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const delta = clock.getDelta();

      if (!reduceMotion) {
        orbitAngle = THREE.MathUtils.damp(orbitAngle, targetOrbit, 2.6, delta);
        const orbitR = 9.4;
        camera.position.x = Math.cos(orbitAngle) * orbitR;
        camera.position.z = Math.sin(orbitAngle) * orbitR;
        camera.position.y += (1.45 + Math.sin(orbitAngle * 0.5) * 0.25 - camera.position.y) * 0.08;
        domeGroup.rotation.y += delta * 0.03;
      } else {
        camera.position.set(0, 1.45, 9.6);
      }
      camera.lookAt(camTarget);

      const starAttr = starsGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < starCount; i++) {
        const idx = i * 3 + 1;
        let y = starPos[idx] - starVel[i]! * delta;
        if (y < -3.2) y = 18.2;
        starPos[idx] = y;
      }
      starAttr.needsUpdate = true;

      let hoverCount = 0;
      for (const item of domeSpheres) {
        sphereWorld.copy(item.mesh.position);
        sphereWorld.applyMatrix4(domeGroup.matrixWorld);
        sphereNdc.copy(sphereWorld).project(camera);
        const dx = mouseNdc.x - sphereNdc.x;
        const dy = mouseNdc.y - sphereNdc.y;
        const d2 = dx * dx + dy * dy;
        const isHover = d2 < 0.02;
        if (isHover) hoverCount += 1;
        const targetY = isHover ? 0.17 : 0;
        const targetGlow = isHover ? 0.4 : 0.16;
        if (Math.abs(item.anim.yOffset - targetY) > 0.015) {
          item.tw = gsap.to(item.anim, {
            yOffset: targetY,
            glow: targetGlow,
            duration: 0.72,
            ease: "elastic.out(1, 0.55)",
            overwrite: true,
            onComplete: () => {
              item.tw = undefined;
            },
          });
        }
        item.mesh.position.y = item.baseY + item.anim.yOffset;
        const mat = item.mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = item.anim.glow;
      }

      const glowTarget = hoverCount > 0 ? 3.95 : 3.1;
      underGlow.intensity = THREE.MathUtils.damp(underGlow.intensity, glowTarget, 5, delta);
      bloomPass.strength = THREE.MathUtils.damp(bloomPass.strength, hoverCount > 0 ? 2.25 : 1.68, 5, delta);

      composer.render();
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      sphereGeometry.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      domeSpheres.forEach((item) => {
        item.tw?.kill();
        (item.mesh.material as THREE.Material).dispose();
      });
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="site-hero-three-band" aria-hidden="true">
      <div ref={wrapRef} className="site-hero-three-band-canvas-wrap">
        <canvas ref={canvasRef} className="site-hero-three-band-canvas" />
      </div>
    </section>
  );
}
