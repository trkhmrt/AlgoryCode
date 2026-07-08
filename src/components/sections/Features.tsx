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
    accent: "#ffffff",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="section border-b border-border"
      aria-labelledby="features-heading"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px] mb-16"
        >
          <p className="mb-6 text-[22px] font-bold uppercase tracking-[0.06em] text-text md:text-[26px]">
            Hizmetlerimiz
          </p>
          <h2
            id="features-heading"
            className="heading text-[36px] font-extrabold md:text-[52px]"
          >
            Her alanda uzman ekip,
            <br />
            <span className="font-normal text-muted">projenize özel çözüm.</span>
          </h2>
          <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-muted">
            E-ticaret, mobil uygulama, yapay zeka, kurumsal ve bireysel web ile eğitim
            hizmetlerini tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-[0_1px_2px_rgba(15,15,15,0.04),0_10px_28px_-14px_rgba(15,15,15,0.12)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-bright hover:shadow-[0_2px_4px_rgba(15,15,15,0.05),0_22px_48px_-18px_rgba(15,15,15,0.22)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_24px_48px_-18px_rgba(0,0,0,0.7)]"
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: f.accent }}
                  aria-hidden
                />
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors duration-300"
                  style={{
                    color: f.accent,
                    backgroundColor: `color-mix(in srgb, ${f.accent} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${f.accent} 30%, transparent)`,
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="mt-6 text-[17px] font-semibold tracking-tight text-text">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {f.desc}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
