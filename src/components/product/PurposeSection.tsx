"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/data/products";

export function PurposeSection({ product }: { product: Product }) {
  return (
    <section className="border-b border-[#1a1a1a]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 py-20">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-6">
              Ne Çözer?
            </p>
            <h2 className="heading text-[36px] md:text-[48px] font-extrabold">
              {product.rhetoricalQuestion}
            </h2>

            <ul className="mt-10 space-y-4">
              {product.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[14px] text-[#888]">
                  <X size={14} className="mt-1 text-[#333] flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-7 py-10">
          {product.panels.map((panel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="min-h-[80vh] py-10 flex flex-col justify-center"
            >
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#444]">
                Problem
              </p>
              <p className="mt-3 text-[20px] md:text-[24px] text-[#555] line-through decoration-[#333]">
                {panel.problem}
              </p>

              <div
                className="my-10 h-px relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                }}
                aria-hidden
              />

              <p className="text-[12px] uppercase tracking-[0.18em] text-[#888]">
                Çözüm
              </p>
              <p className="mt-3 heading text-[26px] md:text-[36px] font-bold text-[#ededed]">
                {panel.solution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
