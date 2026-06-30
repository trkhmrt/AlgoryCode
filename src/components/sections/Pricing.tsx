"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Tier = {
  name: string;
  monthly: number | null;
  description: string;
  cta: string;
  features: string[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Başlangıç",
    monthly: 0,
    description: "Fikrinizi hayata geçirin.",
    cta: "Ücretsiz Başla",
    features: [
      "1 domain seçimi",
      "Temel özellik seti",
      "3 aya kadar destek",
      "Standart hosting",
    ],
  },
  {
    name: "Profesyonel",
    monthly: 24,
    description: "Büyüyen işletmeler için.",
    cta: "Profesyonel'e Başla",
    highlight: true,
    features: [
      "3 domain seçimi",
      "AI entegrasyonu dahil",
      "Özel UI/UX tasarım",
      "12 ay öncelikli destek",
      "Performans optimizasyonu",
    ],
  },
  {
    name: "Kurumsal",
    monthly: null,
    description: "Ölçek ve kontrol.",
    cta: "Satış Ekibiyle Görüş",
    features: [
      "Tüm 5 domain",
      "White-label çözüm",
      "Dedicated ekip",
      "SLA garantisi",
      "Özel entegrasyonlar",
      "7/24 destek",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="section border-b border-[#1a1a1a]"
      aria-labelledby="pricing-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Fiyatlandırma
          </p>
          <h2
            id="pricing-heading"
            className="heading text-[36px] md:text-[52px] font-extrabold"
          >
            Projenize uygun plan.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#888]">
            Hangi domainde olursanız olun, başlangıç noktanız var.
          </p>
        </motion.div>

        <div className="mb-10 inline-flex items-center gap-1 p-1 rounded-full border border-[#1a1a1a] bg-[#0a0a0a]">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`px-4 h-8 rounded-full text-[13px] transition-colors ${
              !yearly ? "bg-white text-black" : "text-[#888] hover:text-[#ededed]"
            }`}
            aria-pressed={!yearly}
          >
            Aylık
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`px-4 h-8 rounded-full text-[13px] inline-flex items-center gap-2 transition-colors ${
              yearly ? "bg-white text-black" : "text-[#888] hover:text-[#ededed]"
            }`}
            aria-pressed={yearly}
          >
            Yıllık
            <span
              className={`text-[10px] font-medium tracking-wide ${
                yearly ? "text-black/70" : "text-[#00ff88]"
              }`}
            >
              −20%
            </span>
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TIERS.map((t, i) => {
            const monthlyPrice =
              t.monthly == null
                ? null
                : yearly && t.monthly > 0
                  ? Math.round(t.monthly * 0.8)
                  : t.monthly;

            return (
              <motion.li
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className={`relative bg-[#0a0a0a] border rounded-[8px] p-7 transition-colors duration-300 ${
                  t.highlight
                    ? "border-white"
                    : "border-[#1a1a1a] hover:border-[#333]"
                }`}
              >
                {t.highlight ? (
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black">
                    En Popüler
                  </span>
                ) : null}
                <p className="text-[14px] font-semibold tracking-tight">
                  {t.name}
                </p>
                <p className="mt-1 text-[13px] text-[#888]">{t.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {monthlyPrice == null ? (
                    <span className="text-[36px] font-extrabold heading-tight">
                      Özel
                    </span>
                  ) : (
                    <>
                      <span className="text-[44px] font-extrabold heading-tight tabular">
                        ${monthlyPrice}
                      </span>
                      <span className="text-[13px] text-[#888]">/ay</span>
                    </>
                  )}
                </div>
                <Button
                  href="/contact"
                  variant={t.highlight ? "primary" : "secondary"}
                  size="md"
                  className="mt-6 w-full"
                >
                  {t.cta}
                </Button>
                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[14px] text-[#ededed]"
                    >
                      <Check
                        size={14}
                        className="mt-1 text-[#888] flex-shrink-0"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
