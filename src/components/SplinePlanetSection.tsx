"use client";

import GlowingPlanetThree from "@/components/GlowingPlanetThree";

export default function SplinePlanetSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#03050c] py-12 md:py-16"
      aria-labelledby="spline-planet-heading"
    >
      <div className="mx-auto w-[min(1109px,92vw)]">
        <div className="mb-6 text-center md:mb-8">
          <h2
            id="spline-planet-heading"
            className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Ürününüzün çevresinde dönen fikirler
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
            Three.js ile yüklenen GLTF modeli; mor–turkuaz rim ışığı, yıldız alanı ve bloom ile
            görseldeki gibi neon bir gezegen kıvrımı hedeflenir.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_rgba(37,99,235,0.12)]">
          <div className="relative aspect-video min-h-[320px] w-full md:min-h-[480px] lg:min-h-[560px]">
            <GlowingPlanetThree />
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          WebGL ile yerel Three.js sahnesi; mor–mavi rim ışığı ve bloom ile renklendirilir. Zayıf
          cihazlarda kalite düşebilir.
        </p>
      </div>
    </section>
  );
}
