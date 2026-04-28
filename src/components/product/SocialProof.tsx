"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/products";

export function SocialProof({ product }: { product: Product }) {
  return (
    <section className="section border-b border-[#1a1a1a]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Müşteriler
          </p>
          <h2 className="heading text-[36px] md:text-[48px] font-extrabold">
            Onlar da seçti.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {product.testimonials.slice(0, 1).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300"
            >
              <Quote name={t.name} role={t.role} company={t.company} initials={t.initials} quote={t.quote} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 bg-transparent p-7 grid place-items-center text-center"
          >
            <p className="italic text-[28px] md:text-[40px] leading-snug text-[#555] heading-tight">
              &ldquo;{product.pullQuote}&rdquo;
            </p>
          </motion.div>

          {product.testimonials.slice(1, 2).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.16 + i * 0.08 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300"
            >
              <Quote name={t.name} role={t.role} company={t.company} initials={t.initials} quote={t.quote} />
            </motion.div>
          ))}
        </div>

        {product.testimonials[2] ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mt-2 md:max-w-[60%] bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300"
          >
            <Quote
              name={product.testimonials[2].name}
              role={product.testimonials[2].role}
              company={product.testimonials[2].company}
              initials={product.testimonials[2].initials}
              quote={product.testimonials[2].quote}
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function Quote({
  quote,
  initials,
  name,
  role,
  company,
}: {
  quote: string;
  initials: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <>
      <p className="text-[15px] leading-relaxed text-[#ededed]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-7 pt-6 border-t border-[#1a1a1a] flex items-center gap-3">
        <span
          className="h-9 w-9 rounded-full grid place-items-center text-[12px] font-semibold text-black"
          style={{
            background: "linear-gradient(135deg, #ededed, #888)",
          }}
          aria-hidden
        >
          {initials}
        </span>
        <div>
          <p className="text-[13px] text-[#ededed] font-medium">{name}</p>
          <p className="text-[12px] text-[#666]">
            {role} · {company}
          </p>
        </div>
      </div>
    </>
  );
}
