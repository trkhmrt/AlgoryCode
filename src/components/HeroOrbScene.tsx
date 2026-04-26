"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOrbScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;

        float random2(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = uv * 2.0 - 1.0;
          p.x *= uResolution.x / max(uResolution.y, 1.0);

          float t = uTime * 0.52;
          float mouseY = (uMouse.y - 0.5) * 0.34;

          float curve = 0.27 * sin(p.x * 1.16 - t) + 0.11 * sin(p.x * 0.57 + t * 0.7) + mouseY;
          float d = abs(p.y - curve);

          float core = smoothstep(0.028, 0.0, d);
          float glowNear = smoothstep(0.18, 0.0, d);
          float glowFar = smoothstep(0.44, 0.0, d);

          float cyanEdge = smoothstep(0.06, 0.0, abs((p.y + 0.008) - curve));
          float warmEdge = smoothstep(0.06, 0.0, abs((p.y - 0.008) - curve));

          vec3 bg = vec3(0.005, 0.012, 0.03);
          vec3 color = bg;
          color += vec3(0.75, 0.92, 1.0) * glowFar * 0.18;
          color += vec3(0.58, 0.82, 1.0) * glowNear * 0.44;
          color += vec3(1.0, 1.0, 1.0) * core * 1.35;
          color += vec3(0.56, 0.86, 1.0) * cyanEdge * 0.5;
          color += vec3(1.0, 0.74, 0.54) * warmEdge * 0.36;

          float vignette = smoothstep(1.28, 0.3, length(p * vec2(0.86, 1.2)));
          color *= vignette;

          float grain = (random2(uv * uResolution.xy + uTime * 120.0) - 0.5) * 0.022;
          color += grain;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerCurrent = new THREE.Vector2(0.5, 0.5);

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerTarget.x = (event.clientX - rect.left) / rect.width;
      pointerTarget.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    let rafId = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    mount.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
      pointerCurrent.lerp(pointerTarget, 0.06);
      uniforms.uMouse.value.copy(pointerCurrent);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onPointerMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="startup-hero-scene" ref={mountRef} aria-hidden />;
}
