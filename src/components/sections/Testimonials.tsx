"use client";

import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  hue: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mağazamızın dönüşüm oranı ilk ayda %34 arttı. Ödeme akışındaki iyileştirmeler oyun değiştirdi.",
    name: "Ayşe K.",
    role: "E-Ticaret Direktörü",
    company: "Volthane",
    initials: "AK",
    hue: 38,
  },
  {
    quote:
      "React Native seçimi doğruydu. iOS ve Android'de aynı kalite, yarı zamanda teslimat.",
    name: "Mehmet D.",
    role: "CTO",
    company: "Lumencore",
    initials: "MD",
    hue: 217,
  },
  {
    quote:
      "Öneri motorumuz entegrasyondan sonra sepet ortalaması %28 yükseldi. AI gerçekten fark yaratıyor.",
    name: "Selin T.",
    role: "Ürün Müdürü",
    company: "Halyx",
    initials: "ST",
    hue: 270,
  },
  {
    quote:
      "Kurumsal panelimizi 3 ayda teslim ettiler. Rol bazlı erişim ve raporlama ihtiyaçlarımızı tam karşıladı.",
    name: "Burak A.",
    role: "Operasyon Müdürü",
    company: "Caret",
    initials: "BA",
    hue: 142,
  },
  {
    quote:
      "LMS platformumuz 8.000 öğrenciye ölçeklendi, tek bir kesinti olmadan.",
    name: "Fatma Y.",
    role: "Kurucu",
    company: "Sintel",
    initials: "FY",
    hue: 18,
  },
];

export function Testimonials() {
  return (
    <section
      className="section border-b border-[#1a1a1a]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-16"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Müşterilerimiz
          </p>
          <h2
            id="testimonials-heading"
            className="heading text-[36px] md:text-[52px] font-extrabold"
          >
            Beş alanda, tek ekibe güveniyorlar.
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-7 hover:border-[#333] transition-colors duration-300"
            >
              <p className="text-[15px] leading-relaxed text-[#ededed]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 pt-6 border-t border-[#1a1a1a] flex items-center gap-3">
                <span
                  className="h-9 w-9 rounded-full grid place-items-center text-[12px] font-semibold text-black"
                  style={{
                    background: `linear-gradient(135deg, hsl(${t.hue} 70% 70%), hsl(${
                      (t.hue + 40) % 360
                    } 70% 60%))`,
                  }}
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-[13px] text-[#ededed] font-medium">{t.name}</p>
                  <p className="text-[12px] text-[#666]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
