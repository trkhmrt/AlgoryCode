"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DarkVeilScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_hueShift: { value: 118.0 },
      u_noise: { value: 0.045 },
      u_speed: { value: 0.36 },
      u_scanlines: { value: 0.035 },
      u_scanlineAmount: { value: 120.0 },
      u_warp: { value: 0.28 },
      u_soften: { value: 0.55 },
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
        uniform float u_hueShift;
        uniform float u_noise;
        uniform float u_speed;
        uniform float u_scanlines;
        uniform float u_scanlineAmount;
        uniform float u_warp;

        float hash(vec2 p) {
          p = fract(p * vec2(234.34, 435.345));
          p += dot(p, p + 34.23);
          return fract(p.x * p.y);
        }

        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        vec3 darkVeilSample(vec2 uv) {
          vec2 p = uv - 0.5;
          p.x *= u_resolution.x / max(u_resolution.y, 1.0);
          float t = u_time * u_speed;

          float wobbleA = sin(p.x * 2.6 + t) * 0.1;
          float wobbleB = sin(p.x * 1.6 - t * 0.8 + 1.3) * 0.08;
          float wobbleC = sin(p.x * 3.8 + t * 0.6) * 0.035;
          float veilY = p.y + wobbleA + wobbleB + wobbleC;

          float veil = exp(-pow(veilY / (0.14 + u_warp * 0.12), 2.0));
          float veil2 = exp(-pow((veilY + 0.25 * sin(p.x * 2.0 + t * 0.7)) / (0.22 + u_warp * 0.16), 2.0)) * 0.58;
          float shape = clamp(veil + veil2, 0.0, 1.0);

          float lightTrail = exp(-pow((p.y + 0.32 + sin(p.x * 2.7 + t * 0.8) * 0.16) / 0.12, 2.0)) * 0.65;
          shape += lightTrail;

          float hue = fract(u_hueShift / 360.0 + 0.02 * sin(t * 0.4));
          vec3 veilColor = hsv2rgb(vec3(hue, 0.92, 1.0));
          vec3 deepBg = vec3(0.0, 0.02, 0.03);
          vec3 color = mix(deepBg, veilColor, shape * 0.9);
          color += vec3(0.05, 0.24, 0.08) * shape * 0.45;

          float edge = exp(-pow((veilY + 0.01) / 0.05, 2.0));
          color += vec3(0.22, 1.0, 0.35) * edge * 0.32;

          float scan = sin(uv.y * u_scanlineAmount + t * 2.2) * 0.5 + 0.5;
          float scanSoft = smoothstep(0.42, 0.58, scan);
          color *= 1.0 - (scanSoft * u_scanlines * 0.06);

          float n = hash(uv * u_resolution + t * 80.0) - 0.5;
          color += n * u_noise;

          float vignette = smoothstep(1.24, 0.14, length(p));
          color *= 0.74 + vignette * 0.48;

          return clamp(color, 0.0, 1.0);
        }

        void main() {
          vec2 px = vec2(1.0) / max(u_resolution, vec2(1.0));
          vec3 c0 = darkVeilSample(vUv);
          vec3 c1 = darkVeilSample(vUv + vec2(px.x, 0.0) * 1.4);
          vec3 c2 = darkVeilSample(vUv - vec2(px.x, 0.0) * 1.4);
          vec3 c3 = darkVeilSample(vUv + vec2(0.0, px.y) * 1.4);
          vec3 c4 = darkVeilSample(vUv - vec2(0.0, px.y) * 1.4);
          vec3 blurAvg = (c1 + c2 + c3 + c4) * 0.25;
          vec3 color = mix(c0, blurAvg, u_soften);
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
