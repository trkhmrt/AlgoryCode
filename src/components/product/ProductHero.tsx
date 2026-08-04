"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/data/products";

export function ProductHero({ product }: { product: Product }) {
  const words = product.name.split(" ");

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden border-b border-[#1a1a1a]">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
      <div className="spot-glow" aria-hidden />

      <div className="relative container-x text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge>{product.category}</Badge>
        </motion.div>

        <h1 className="heading mt-8 text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-tight">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-3"
              style={
                i === 0 ? { textShadow: "0 0 40px rgba(255,255,255,0.4)" } : undefined
              }
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-6 text-[20px] md:text-[24px] font-light text-[#888] max-w-[760px] mx-auto"
        >
          {product.purpose}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-6 text-[15px] text-[#666] max-w-[640px] mx-auto leading-relaxed"
        >
          {product.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button href="#demo" size="lg">
            Demo Talep Et
          </Button>
          <Button href="/education" variant="secondary" size="lg">
            Dokümantasyon →
          </Button>
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 chevron-pulse text-[#666]"
        aria-hidden
      >
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
