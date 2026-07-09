"use client";

import { motion } from "framer-motion";
import { ArrowRight, Headphones, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BentoGrid() {
  return (
    <section
      id="cta"
      className="section border-b border-border bg-[#f3efe9]"
      aria-labelledby="cta-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div
            className="relative isolate flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat px-8 py-16 text-center md:min-h-[480px] md:px-16 md:py-20"
            style={{ backgroundImage: "url(/images/cta-bg.png)" }}
          >
            <div className="relative z-10 flex max-w-[640px] flex-col items-center">
              <span className="mb-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                Hadi başlayalım
              </span>

              <h2
                id="cta-heading"
                className="heading !text-white text-[32px] font-bold leading-[1.1] md:text-[48px] lg:text-[52px]"
              >
                Fikriniz hazır.
                <br />
                <span className="font-normal text-white/90">
                  Doğru ekiple tanışma zamanı.
                </span>
              </h2>

              <p className="section-desc mt-6 max-w-[520px] !text-white/95">
                Ücretsiz keşif görüşmesinde projenizi dinliyor, ihtiyacınıza özel
                yol haritasını birlikte çıkarıyoruz. 48 saat içinde size dönüş
                yapıyoruz.
              </p>

              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <li className="inline-flex items-center gap-2 text-[14px] text-white/85">
                  <Sparkles size={15} strokeWidth={1.75} />
                  Ücretsiz keşif
                </li>
                <li className="inline-flex items-center gap-2 text-[14px] text-white/85">
                  <Headphones size={15} strokeWidth={1.75} />
                  48 saat geri dönüş
                </li>
              </ul>

              <div className="mt-10">
                <Button
                  href="/contact"
                  size="lg"
                  className="rounded-full bg-white px-8 text-[#121212] shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:bg-white hover:text-[#121212]"
                >
                  İletişime Geç
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
