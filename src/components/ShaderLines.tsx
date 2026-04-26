"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ShaderLinesProps = {
  className?: string;
  speed?: number;
  xScale?: number;
  yScale?: number;
  intensity?: number;
  background?: string;
};

export default function ShaderLines({
  className,
  speed = 0.2,
  xScale = 42,
  yScale = 6.5,
  intensity = 1.3,
  background = "#060a18",
}: ShaderLinesProps) {
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
      u_speed: { value: speed },
      u_xScale: { value: xScale },
      u_yScale: { value: yScale },
      u_intensity: { value: intensity },
      u_bg: { value: new THREE.Color(background) },
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
        uniform float u_speed;
        uniform float u_xScale;
        uniform float u_yScale;
        uniform float u_intensity;
        uniform vec3 u_bg;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        void main() {
          vec2 uv = vUv;
          vec2 centered = uv - 0.5;
          centered.x *= u_resolution.x / max(u_resolution.y, 1.0);
          float t = u_time * u_speed;

          vec2 p = centered;
          float drift = sin(t * 0.55) * 0.035;
          p += vec2(drift, -drift * 0.45);

          float bandCore = abs(p.y + 0.62 * p.x + 0.03 * sin(p.x * 10.0 + t * 0.9));
          float band = exp(-bandCore * (14.0 + u_xScale * 0.45));

          float sweep = smoothstep(-0.62, 0.12, -p.x + 0.15 * sin(t * 0.8));
          float blueRibbon = band * sweep;

          vec2 brightPos = vec2(-0.88 + 0.03 * sin(t * 0.7), 0.03 + 0.02 * cos(t * 0.6));
          float bright = exp(-length(p - brightPos) * (4.0 + u_yScale * 0.25));
          bright += exp(-length(p - brightPos) * 14.0) * 0.7;

          float haze = exp(-length(p - vec2(-0.55, 0.24)) * 2.25) * 0.45;
          float vignette = smoothstep(1.35, 0.26, length(p));

          vec3 deep = mix(u_bg, vec3(0.01, 0.02, 0.08), 0.82);
          vec3 blue = vec3(0.20, 0.28, 0.98);
          vec3 ice = vec3(0.90, 0.95, 1.0);

          vec3 color = deep;
          color += blue * blueRibbon * (1.55 * u_intensity);
          color += ice * bright * (1.1 * u_intensity);
          color += vec3(0.16, 0.24, 0.8) * haze;
          color *= (0.54 + 0.46 * vignette);

          float n = hash(uv * u_resolution + t * 120.0);
          float grain = (n - 0.5) * 0.22;
          color += grain;
          color = clamp(color, 0.0, 1.0);

          float alpha = clamp(0.9 + blueRibbon * 0.2 + bright * 0.18, 0.0, 1.0);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const applySize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      uniforms.u_resolution.value.set(w, h);
    };

    const ro = new ResizeObserver(applySize);
    ro.observe(wrap);
    applySize();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;
    const onMq = () => {
      reduceMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!reduceMotion) {
        uniforms.u_time.value = clock.getElapsedTime();
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [background, intensity, speed, xScale, yScale]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="nova-shader-canvas" />
    </div>
  );
}
