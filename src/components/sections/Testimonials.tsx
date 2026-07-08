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
      className="section border-b border-border"
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
          <p className="text-[12px] uppercase tracking-[0.18em] text-dim mb-4">
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
              className="rounded-2xl border border-border bg-surface p-7 shadow-[0_1px_2px_rgba(15,15,15,0.04),0_10px_28px_-14px_rgba(15,15,15,0.12)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-border-bright hover:shadow-[0_2px_4px_rgba(15,15,15,0.05),0_20px_44px_-18px_rgba(15,15,15,0.2)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_22px_44px_-18px_rgba(0,0,0,0.7)]"
            >
              <p className="text-[15px] leading-relaxed text-text">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-border pt-6">
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
                  <p className="text-[13px] text-text font-medium">{t.name}</p>
                  <p className="text-[12px] text-muted">
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
