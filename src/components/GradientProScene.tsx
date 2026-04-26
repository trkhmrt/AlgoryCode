"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GradientProScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
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
        uniform float u_time;
        uniform vec2 u_resolution;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = uv - 0.5;
          p.x *= u_resolution.x / max(u_resolution.y, 1.0);
          float t = u_time * 0.28;

          vec2 pA = p + vec2(sin(t * 0.7) * 0.08, cos(t * 0.5) * 0.05);
          vec2 pB = p + vec2(cos(t * 0.45 + 1.7) * 0.12, sin(t * 0.52 + 0.9) * 0.08);
          vec2 pC = p + vec2(sin(t * 0.36 + 2.3) * 0.1, cos(t * 0.34 + 2.1) * 0.07);

          float g1 = exp(-dot(pA - vec2(-0.62, -0.28), pA - vec2(-0.62, -0.28)) * 2.4);
          float g2 = exp(-dot(pB - vec2(0.02, -0.12), pB - vec2(0.02, -0.12)) * 2.0);
          float g3 = exp(-dot(pC - vec2(0.56, 0.18), pC - vec2(0.56, 0.18)) * 2.7);
          float g4 = exp(-dot(p - vec2(0.35, 0.55), p - vec2(0.35, 0.55)) * 5.0);

          vec3 deep = vec3(0.0, 0.01, 0.09);
          vec3 cyan = vec3(0.7, 0.98, 1.0);
          vec3 sky = vec3(0.28, 0.62, 1.0);
          vec3 blue = vec3(0.12, 0.42, 1.0);
          vec3 navy = vec3(0.02, 0.06, 0.28);

          vec3 color = deep;
          color += cyan * g1 * 1.2;
          color += sky * g2 * 0.95;
          color += blue * g3 * 1.05;
          color += navy * g4 * 0.95;

          float horizon = smoothstep(0.55, -0.15, uv.y);
          color *= mix(0.62, 1.16, horizon);

          float grain = hash(uv * u_resolution + t * 120.0) - 0.5;
          color += grain * 0.08;

          float vignette = smoothstep(1.28, 0.12, length(p));
          color *= 0.72 + 0.48 * vignette;

          color = clamp(color, 0.0, 1.0);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      uniforms.u_resolution.value.set(w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
