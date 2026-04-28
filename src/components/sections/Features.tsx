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
    title: "Satışa Hazır Mağazalar",
    desc: "Ödeme entegrasyonu, stok yönetimi ve sipariş takibi dahil, hızla yayına alın.",
    accent: "#f59e0b",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobil",
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
    title: "Kurumsal Web Platformları",
    desc: "Ölçeklenebilir SaaS mimarisi, rol tabanlı erişim ve gerçek zamanlı dashboard.",
    accent: "#00ff88",
  },
  {
    icon: GraduationCap,
    title: "Eğitim & LMS Sistemleri",
    desc: "Kurs yönetimi, ilerleme takibi, sertifika ve öğrenci analitikleri tek platformda.",
    accent: "#f97316",
  },
  {
    icon: Layers,
    title: "Uçtan Uca Teslimat",
    desc: "Keşif, tasarım, geliştirme ve destek — tüm süreç tek bir ekiple yönetilir.",
    accent: "#ffffff",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="section border-b border-[#1a1a1a]"
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
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Neden Biz?
          </p>
          <h2
            id="features-heading"
            className="heading text-[36px] md:text-[52px] font-extrabold"
          >
            Her domain&apos;de uzman,
            <br />
            <span className="font-light text-[#888]">her projede ortak.</span>
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-[8px] overflow-hidden">
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
                className="group relative bg-[#0a0a0a] hover:bg-[#0d0d0d] p-8 transition-colors duration-300"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: f.accent }}
                  aria-hidden
                />
                <div
                  className="h-9 w-9 inline-flex items-center justify-center border border-[#1a1a1a] group-hover:border-[#333] rounded-md transition-colors duration-300"
                  style={{ color: f.accent }}
                >
                  <Icon size={16} />
                </div>
                <h3 className="mt-6 text-[17px] font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#888]">
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
