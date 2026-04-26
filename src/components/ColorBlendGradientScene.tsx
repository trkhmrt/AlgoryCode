"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ColorBlendGradientScene({ className }: { className?: string }) {
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

        float band(vec2 uv, float yCenter, float width, float sharpness) {
          float d = abs(uv.y - yCenter);
          float g = exp(-pow(d / width, 2.0));
          float s = 1.0 - smoothstep(width * 0.72, width * sharpness, d);
          return max(g, s);
        }

        float crispBand(vec2 uv, float yCenter, float width) {
          float d = abs(uv.y - yCenter);
          return 1.0 - smoothstep(width, width + 0.0025, d);
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = uv - 0.5;
          p.x *= u_resolution.x / max(u_resolution.y, 1.0);
          float t = u_time * 0.45;

          float waveA = 0.24 + 0.1 * sin(uv.x * 5.1 + t * 1.1);
          float waveB = 0.31 + 0.12 * sin(uv.x * 3.5 + 1.4 + t * 0.86);
          float waveC = 0.41 + 0.08 * sin(uv.x * 2.8 + 2.1 + t * 0.72);
          float waveD = 0.5 + 0.09 * sin(uv.x * 2.2 + 2.9 + t * 0.64);
          float waveE = 0.6 + 0.07 * sin(uv.x * 3.0 + 0.7 + t * 0.58);

          float b1 = band(uv, waveA, 0.022, 1.04);
          float b2 = band(uv, waveB, 0.024, 1.05);
          float b3 = band(uv, waveC, 0.03, 1.08);
          float b4 = band(uv, waveD, 0.028, 1.08);
          float b5 = band(uv, waveE, 0.032, 1.1);

          float edge1 = crispBand(uv, waveA, 0.0065);
          float edge2 = crispBand(uv, waveB, 0.0075);
          float edge3 = crispBand(uv, waveC, 0.009);
          float edge4 = crispBand(uv, waveD, 0.008);

          vec3 base = vec3(0.0, 0.01, 0.07);
          vec3 c1 = vec3(0.55, 1.0, 0.06);
          vec3 c2 = vec3(0.98, 1.0, 0.92);
          vec3 c3 = vec3(0.62, 1.0, 0.15);
          vec3 c4 = vec3(0.92, 0.96, 0.25);
          vec3 c5 = vec3(1.0, 0.55, 0.18);

          vec3 color = base;
          color += c1 * b1 * 1.25;
          color += c2 * b2 * 1.1;
          color += c3 * b3 * 1.15;
          color += c4 * b4 * 1.0;
          color += c5 * b5 * 0.72;
          color += vec3(0.97, 1.0, 0.95) * (edge1 * 0.42 + edge2 * 0.34 + edge3 * 0.24 + edge4 * 0.18);

          float diagonal = smoothstep(0.75, -0.05, uv.y + uv.x * 0.52);
          color *= mix(0.62, 1.42, diagonal);

          float glowTop = exp(-pow((uv.y - (waveA - 0.016)) / 0.022, 2.0));
          color += vec3(0.98, 1.0, 0.86) * glowTop * 0.88;

          float glowMid = exp(-pow((uv.y - (waveC + 0.008)) / 0.028, 2.0));
          color += vec3(0.62, 1.0, 0.2) * glowMid * 0.34;

          float vignette = smoothstep(1.25, 0.08, length(p));
          color *= 0.82 + vignette * 0.36;

          float grain = fract(sin(dot(uv * u_resolution + t * 40.0, vec2(12.9898, 78.233))) * 43758.5453);
          color += (grain - 0.5) * 0.01;

          color = pow(color, vec3(0.74));

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
