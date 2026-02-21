export const services = [
  {
    slug: "commerce",
    title: "Commerce",
    description:
      "E-ticaret altyapısı, ödeme entegrasyonları ve envanter yönetimi ile satış süreçlerinizi büyütün.",
    icon: "🛒",
    color: "purple",
  },
  {
    slug: "mobil-app",
    title: "Mobil App",
    description:
      "iOS ve Android için native ve cross-platform mobil uygulamalar; hızlı, güvenilir ve kullanıcı odaklı.",
    icon: "📱",
    color: "teal",
  },
  {
    slug: "chatbot",
    title: "ChatBot",
    description:
      "Yapay zeka destekli sohbet botları ile müşteri hizmetleri ve satış süreçlerinizi otomatikleştirin.",
    icon: "💬",
    color: "pink",
  },
  {
    slug: "voice-assistant",
    title: "Voice Assistant",
    description:
      "Sesli asistan çözümleri ile kullanıcılarınız doğal dil komutlarıyla işlem yapabilsin.",
    icon: "🎙️",
    color: "orange",
  },
  {
    slug: "egitim",
    title: "Eğitim",
    description:
      "Kurumsal ve bireysel eğitim programları: yazılım, AI ve dijital dönüşüm alanında sertifikalı eğitimler.",
    icon: "📚",
    color: "red-blue",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}
