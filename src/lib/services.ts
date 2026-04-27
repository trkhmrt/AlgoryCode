export interface ServiceHowStep {
  title: string;
  description: string;
}

export interface ServicePricing {
  title: string;
  bullets: string[];
}

export interface Service {
  slug: "commerce" | "mobil-app" | "web-app" | "chatbot" | "voice-assistant" | "egitim";
  title: string;
  description: string;
  icon: string;
  color: "purple" | "teal" | "blue" | "pink" | "orange" | "red-blue";
  features: string[];
  howItWorks: ServiceHowStep[];
  pricing: ServicePricing | null;
}

export const services: Service[] = [
  {
    slug: "commerce",
    title: "Commerce",
    description:
      "E-ticaret altyapısı, ödeme entegrasyonları ve envanter yönetimi ile satış süreçlerinizi büyütün.",
    icon: "🛒",
    color: "purple",
    features: [
      "Ödeme ve POS entegrasyonları",
      "Sipariş, kargo ve iade akışları",
      "Katalog, varyant ve stok yönetimi",
      "Kampanya, kupon ve sadakat altyapısı",
      "Raporlama ve dönüşüm ölçümü",
    ],
    howItWorks: [
      {
        title: "Keşif ve mimari",
        description: "Kanal stratejiniz, ürün kataloğu ve entegrasyon ihtiyaçları netleştirilir.",
      },
      {
        title: "Uygulama ve entegrasyon",
        description: "Mağaza, ödeme, ERP ve lojistik sistemleri güvenli API katmanlarıyla birleştirilir.",
      },
      {
        title: "Canlıya alma ve iyileştirme",
        description: "A/B testleri, performans ve güvenlik gözlemiyle sürekli iyileştirme döngüsü kurulur.",
      },
    ],
    pricing: null,
  },
  {
    slug: "mobil-app",
    title: "Mobil App",
    description:
      "iOS ve Android için native ve cross-platform mobil uygulamalar; hızlı, güvenilir ve kullanıcı odaklı.",
    icon: "📱",
    color: "teal",
    features: [
      "Offline-first ve push bildirimleri",
      "Biyometrik ve güvenli depolama",
      "Mağaza yayın süreçleri ve sürümleme",
      "Analytics ve crash raporlama",
      "CI/CD ile otomatik dağıtım",
    ],
    howItWorks: [
      {
        title: "Ürün ve UX tanımı",
        description: "Kullanıcı akışları, ekranlar ve teknik kısıtlar birlikte netleştirilir.",
      },
      {
        title: "Geliştirme ve test",
        description: "Paralel sprintler, cihaz testleri ve mağaza politikalarına uyum sağlanır.",
      },
      {
        title: "Yayın ve operasyon",
        description: "Canlı izleme, güncelleme planı ve kullanıcı geri bildirimiyle büyüme desteklenir.",
      },
    ],
    pricing: null,
  },
  {
    slug: "web-app",
    title: "Web App",
    description:
      "Kurumsal portallar, SaaS ve yüksek trafikli web uygulamaları; modern stack ile performans, güvenlik ve ölçeklenebilir mimari.",
    icon: "🌐",
    color: "blue",
    features: [
      "SSR/SSG ve edge uyumlu mimari",
      "Rol tabanlı yetkilendirme ve denetim izi",
      "Gözlemlenebilirlik ve performans bütçesi",
      "Çok kiracılı (multi-tenant) yapılar",
      "Güvenlik incelemesi ve sızma testi hazırlığı",
    ],
    howItWorks: [
      {
        title: "Domain ve veri modeli",
        description: "İş kuralları, roller ve entegrasyon sınırları net bir domain modeline dökülür.",
      },
      {
        title: "Uygulama katmanları",
        description: "API, arayüz ve arka plan işleri ayrıştırılır; test ve kalite kapıları tanımlanır.",
      },
      {
        title: "Ölçek ve operasyon",
        description: "Yük testleri, kapasite planı ve incident süreçleriyle üretim olgunluğu sağlanır.",
      },
    ],
    pricing: null,
  },
  {
    slug: "chatbot",
    title: "ChatBot",
    description:
      "Yapay zeka destekli sohbet botları ile müşteri hizmetleri ve satış süreçlerinizi otomatikleştirin.",
    icon: "💬",
    color: "pink",
    features: [
      "Şirket bilgisi ve politika uyumlu yanıtlar",
      "İnsan temsilciye akıllı devretme",
      "CRM ve ticket entegrasyonları",
      "Çok dilli ve ton ayarlı iletişim",
      "Konuşma analitiği ve kalite metrikleri",
    ],
    howItWorks: [
      {
        title: "Bilgi tabanı ve güvenlik",
        description: "Kaynak dokümanlar, erişim politikaları ve red-line kuralları tanımlanır.",
      },
      {
        title: "Orkestrasyon ve araçlar",
        description: "Bot; arama, form, ödeme veya randevu gibi işlemleri güvenli araçlarla tamamlar.",
      },
      {
        title: "Ölçüm ve iyileştirme",
        description: "Gerçek konuşma verisiyle başarısızlıklar giderilir, yeni senaryolar eklenir.",
      },
    ],
    pricing: null,
  },
  {
    slug: "voice-assistant",
    title: "Voice Assistant",
    description:
      "Sesli asistan çözümleri ile kullanıcılarınız doğal dil komutlarıyla işlem yapabilsin.",
    icon: "🎙️",
    color: "orange",
    features: [
      "Wake word ve komut sözlüğü yönetimi",
      "Gürültü ve aksan dayanıklı akış",
      "Cihaz ve platform SDK entegrasyonu",
      "Gizlilik: yerel işleme veya güvenli bulut",
      "Özel iş akışlarına bağlanma (API)",
    ],
    howItWorks: [
      {
        title: "Senaryo tasarımı",
        description: "Kullanıcı niyetleri, hata kurtarma ve onay diyalogları tasarlanır.",
      },
      {
        title: "Ses boru hattı",
        description: "STT, NLU ve TTS bileşenleri gecikme bütçesine göre seçilir ve bağlanır.",
      },
      {
        title: "Saha testi",
        description: "Gerçek ortam kayıtlarıyla doğrulama; mağaza veya cihaz sertifikasyon adımları.",
      },
    ],
    pricing: null,
  },
  {
    slug: "egitim",
    title: "Eğitim",
    description:
      "Kurumsal ve bireysel eğitim programları: yazılım, AI ve dijital dönüşüm alanında sertifikalı eğitimler.",
    icon: "📚",
    color: "red-blue",
    features: [
      "Müfredat ve seviye uyumu (junior → ileri)",
      "Canlı kodlama ve laboratuvar oturumları",
      "Ödev, değerlendirme ve geri bildirim",
      "Kurumsal ekip programları ve raporlama",
      "Sertifika ve materyal paketi",
    ],
    howItWorks: [
      {
        title: "İhtiyaç analizi",
        description: "Hedef rol, mevcut seviye ve zaman çerçevesine göre program seçilir.",
      },
      {
        title: "Eğitim teslimi",
        description: "Canlı oturumlar, kayıtlar ve uygulamalı görevlerle pekiştirme yapılır.",
      },
      {
        title: "Ölçüm ve devam",
        description: "Başarı kriterleri raporlanır; mentörlük ve ileri modüller planlanır.",
      },
    ],
    pricing: {
      title: "Paket örnekleri",
      bullets: [
        "Kurumsal bootcamp (2–5 gün yoğun)",
        "Haftalık modüler program (4–8 hafta)",
        "Bire bir mentörlük blokları",
      ],
    },
  },
];

export type ServiceSlug = Service["slug"];

export function getServiceBySlug(slug: string): Service | null {
  return services.find((s) => s.slug === slug) ?? null;
}
