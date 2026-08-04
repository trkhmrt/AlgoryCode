"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  GraduationCap,
  Layers,
  Monitor,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { AuraCard } from "@/components/ui/AuraCard";
import { CardContent } from "@/components/ui/Card";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
};

const FEATURES: Feature[] = [
  {
    icon: ShoppingCart,
    title: "E-Ticaret Hizmeti",
    desc: "Ödeme, stok ve sipariş yönetimi entegre; mağazanızı hızla satışa hazır hale getiriyoruz.",
    accent: "#f59e0b",
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama",
    desc: "iOS ve Android için tek kod tabanı. Native performans, modern kullanıcı deneyimi.",
    accent: "#3b82f6",
  },
  {
    icon: Cpu,
    title: "Yapay Zeka Entegrasyonu",
    desc: "LLM destekli chatbot, öneri motoru ve otomasyon sistemlerini ürününüze ekleyin.",
    accent: "#a855f7",
  },
  {
    icon: Monitor,
    title: "Kurumsal Web Hizmeti",
    desc: "Markanıza özel kurumsal siteler, yönetim panelleri ve müşteri portalları — ölçeklenebilir, güvenli ve SEO uyumlu.",
    accent: "#00ff88",
  },
  {
    icon: GraduationCap,
    title: "Eğitim Hizmeti",
    desc: "Bu platformda eğitim alarak uygulama geliştirmeyi öğrenin; adım adım içeriklerle kendi projelerinizi hayata geçirin.",
    accent: "#f97316",
  },
  {
    icon: Layers,
    title: "Bireysel Web Hizmeti",
    desc: "Kişisel portfolyo, blog ve tanıtım siteleri — modern tasarım, mobil uyum ve hızlı yayına alma.",
    accent: "#ededed",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="section border-b border-border bg-[#f3efe9]"
      aria-labelledby="features-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-[640px]"
        >
          <p className="mb-4 text-[13px] uppercase tracking-[0.16em] text-[#8a8378]">
            Hizmetlerimiz
          </p>
          <h2
            id="features-heading"
            className="heading text-[28px] font-semibold tracking-tight text-[#121212] md:text-[36px]"
          >
            Her alanda uzman ekip,
            <br />
            <span className="font-normal text-[#2a2a2a]">
              projenize özel çözüm.
            </span>
          </h2>
          <p className="section-desc mt-4 max-w-[580px]">
            E-ticaret, mobil uygulama, yapay zeka, kurumsal ve bireysel web ile
            eğitim hizmetlerini tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              >
                <AuraCard accent={f.accent} className="h-full">
                  <CardContent className="p-8">
                    <div
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300"
                      style={{
                        color: f.accent,
                        backgroundColor: `color-mix(in srgb, ${f.accent} 12%, transparent)`,
                        borderColor: `color-mix(in srgb, ${f.accent} 28%, transparent)`,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="heading mt-6 text-[17px] font-semibold leading-snug tracking-tight text-[#121212]">
                      {f.title}
                    </h3>
                    <p className="section-desc mt-2 text-[14px] leading-[1.65]">
                      {f.desc}
                    </p>
                  </CardContent>
                </AuraCard>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
