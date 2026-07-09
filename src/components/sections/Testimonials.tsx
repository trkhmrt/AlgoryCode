"use client";

import { motion } from "framer-motion";
import { AuraCard } from "@/components/ui/AuraCard";
import { Badge } from "@/components/ui/Badge";
import { CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mağazamızın dönüşüm oranı ilk ayda %34 arttı. Ödeme akışındaki iyileştirmeler oyun değiştirdi.",
    name: "Ayşe K.",
    role: "E-Ticaret Direktörü",
    company: "Volthane",
    initials: "AK",
    accent: "#f59e0b",
  },
  {
    quote:
      "React Native seçimi doğruydu. iOS ve Android'de aynı kalite, yarı zamanda teslimat.",
    name: "Mehmet D.",
    role: "CTO",
    company: "Lumencore",
    initials: "MD",
    accent: "#3b82f6",
  },
  {
    quote:
      "Öneri motorumuz entegrasyondan sonra sepet ortalaması %28 yükseldi. AI gerçekten fark yaratıyor.",
    name: "Selin T.",
    role: "Ürün Müdürü",
    company: "Halyx",
    initials: "ST",
    accent: "#a855f7",
  },
  {
    quote:
      "Kurumsal panelimizi 3 ayda teslim ettiler. Rol bazlı erişim ve raporlama ihtiyaçlarımızı tam karşıladı.",
    name: "Burak A.",
    role: "Operasyon Müdürü",
    company: "Caret",
    initials: "BA",
    accent: "#00ff88",
  },
  {
    quote:
      "LMS platformumuz 8.000 öğrenciye ölçeklendi, tek bir kesinti olmadan.",
    name: "Fatma Y.",
    role: "Kurucu",
    company: "Sintel",
    initials: "FY",
    accent: "#f97316",
  },
];

export function Testimonials() {
  return (
    <section
      className="section border-b border-border bg-[#f3efe9]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-[640px]"
        >
          <Badge
            variant="outline"
            className="mb-4 border-border bg-secondary/50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            Müşterilerimiz
          </Badge>
          <h2
            id="testimonials-heading"
            className="heading text-[36px] font-extrabold md:text-[52px]"
          >
            Beş alanda, tek ekibe güveniyorlar.
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <AuraCard accent={t.accent} className="h-full">
                <CardContent className="p-7">
                  <p className="section-desc leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <Separator className="my-6 bg-border" />
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-semibold text-black"
                      style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, ${t.accent} 70%, white), ${t.accent})`,
                      }}
                      aria-hidden
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AuraCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
