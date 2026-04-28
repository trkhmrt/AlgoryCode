export type ProductStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  visual:
    | "terminal"
    | "config"
    | "integration"
    | "monitoring"
    | "result";
};

export type Product = {
  slug: string;
  category: string;
  name: string;
  purpose: string;
  description: string;
  rhetoricalQuestion: string;
  problems: string[];
  panels: Array<{
    problem: string;
    solution: string;
  }>;
  steps: ProductStep[];
  primaryMetric: {
    value: string;
    label: string;
    description: string;
  };
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    company: string;
    initials: string;
  }>;
  pullQuote: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "deploy-engine",
    category: "Otomasyon · Enterprise",
    name: "Deploy Engine",
    purpose: "Tek satırla, tek tıkla, dünya çapına dağıtın.",
    description:
      "Deploy Engine, kaynak kodunuzdan üretim ortamına kadar olan bütün adımları otomatikleştirir. CI/CD, edge dağıtımı ve önizleme ortamlarını tek bir akışta birleştirir. Ekiplerinizin enerjisini kod yazmaya, bekleme sürelerine değil.",
    rhetoricalQuestion: "Süreçleriniz neden hâlâ yavaş?",
    problems: [
      "Manuel dağıtım, geceleri kaybolan saatlere dönüşüyor.",
      "Ortamlar arasında konfigürasyon farkları üretimi kırıyor.",
      "Ekibiniz yeni özellikten çok DevOps tartışıyor.",
    ],
    panels: [
      {
        problem: "Her dağıtım için 40 dakikalık manuel checklist.",
        solution: "Tek komut, ortalama 28 saniyede üretim ortamı.",
      },
      {
        problem: "Önizleme ortamı yok, her PR ‘benim makinemde çalışıyor’.",
        solution: "Her commit için izole önizleme URL'si, otomatik temizlik.",
      },
      {
        problem: "Rollback sürecinde 15 dakika kesinti.",
        solution: "Atomic deploy, rollback 2 saniyede tamamlanır.",
      },
    ],
    steps: [
      {
        id: "s1",
        label: "Kurulum",
        title: "Tek komutla başlayın",
        description:
          "CLI'yı kurun, projenizi bağlayın. Konfigürasyon yok, sihir yok, sadece deploy.",
        visual: "terminal",
      },
      {
        id: "s2",
        label: "Yapılandırma",
        title: "Akıllı varsayılanlar",
        description:
          "Framework'ünüzü algılar, optimum ayarları otomatik üretir. İsterseniz YAML ile özelleştirin.",
        visual: "config",
      },
      {
        id: "s3",
        label: "Entegrasyon",
        title: "Servisleriniz tek noktadan",
        description:
          "Veritabanı, kuyruk, mail, ödeme — hepsi merkezi bir hub üzerinden bağlanır.",
        visual: "integration",
      },
      {
        id: "s4",
        label: "Monitoring",
        title: "Anlık görünürlük",
        description:
          "Her dağıtımın etkisini saniyeler içinde görün. Anomaliler otomatik işaretlenir.",
        visual: "monitoring",
      },
      {
        id: "s5",
        label: "Sonuç",
        title: "Daha hızlı ekipler",
        description:
          "Önce/sonra kıyaslamasında ortalama 12× hız artışı, %40 daha az olay.",
        visual: "result",
      },
    ],
    primaryMetric: {
      value: "28s",
      label: "ortalama dağıtım süresi",
      description: "Push'tan üretime kadar p95 değeri.",
    },
    testimonials: [
      {
        quote:
          "Dağıtım süreçlerimiz haftalardan saniyelere indi. Ekibimiz artık ürün konuşuyor, pipeline değil.",
        name: "Eren Yılmaz",
        role: "VP Engineering",
        company: "Volthane",
        initials: "EY",
      },
      {
        quote:
          "İlk haftada 38 önizleme ortamı oluşturduk. Ürün ekibi artık kod beklemiyor, deniyor.",
        name: "Naz Aksu",
        role: "Head of Product",
        company: "Lumencore",
        initials: "NA",
      },
      {
        quote:
          "Rollback'in iki saniye olması, gece nöbetlerimi tamamen değiştirdi.",
        name: "Berk Soylu",
        role: "Staff SRE",
        company: "Fyrm",
        initials: "BS",
      },
    ],
    pullQuote:
      "Deploy Engine bizim için bir araç değil, takım üyesi haline geldi.",
  },
  {
    slug: "edge-network",
    category: "Altyapı · Global",
    name: "Edge Network",
    purpose: "Kullanıcılarınıza fiziksel olarak yakın çalışın.",
    description:
      "Edge Network 280+ noktada barınan global bir yürütme katmanıdır. Statik içerik, dinamik fonksiyonlar ve ML çıkarım uçları aynı altyapıda yan yana çalışır.",
    rhetoricalQuestion: "Neden hâlâ tek bölgede çalışıyorsunuz?",
    problems: [
      "Avrupa kullanıcılarınız 600ms gecikme yaşıyor.",
      "Global trafik artışında origin sunucularınız çöküyor.",
      "Cache stratejisi her ekipte farklı, kontrol elden çıkıyor.",
    ],
    panels: [
      {
        problem: "Tek bölgede çalışan API, dünya genelinde tutarsız deneyim.",
        solution: "Edge runtime, p95 gecikmesini 180ms'in altında tutar.",
      },
      {
        problem: "Trafik patlamasında manuel ölçekleme.",
        solution: "Sıfır yapılandırmayla 0'dan milyon RPS'e kadar otomatik.",
      },
      {
        problem: "Origin'i koruyan tutarlı bir cache katmanı yok.",
        solution: "Akıllı cache invalidation, tag tabanlı temizlik.",
      },
    ],
    steps: [
      {
        id: "s1",
        label: "Kurulum",
        title: "Edge'i devreye alın",
        description:
          "DNS'i bağlayın, geri kalanı Edge Network halleder. SSL ve HTTP/3 dahil.",
        visual: "terminal",
      },
      {
        id: "s2",
        label: "Yapılandırma",
        title: "Routing kuralları",
        description:
          "Bölgesel yönlendirme, A/B testleri ve hız sınırları tek bir konfigürasyonda.",
        visual: "config",
      },
      {
        id: "s3",
        label: "Entegrasyon",
        title: "Backend'leriniz korunur",
        description:
          "Origin sunucularınızı Edge arkasına alın. Saldırılar size ulaşmadan filtrelenir.",
        visual: "integration",
      },
      {
        id: "s4",
        label: "Monitoring",
        title: "Coğrafi görünürlük",
        description:
          "Hangi bölgede ne kadar gecikme var, anlık harita üzerinden izleyin.",
        visual: "monitoring",
      },
      {
        id: "s5",
        label: "Sonuç",
        title: "Tutarlı global deneyim",
        description:
          "Kullanıcılarınızın bulunduğu yer fark etmeksizin aynı hız, aynı stabilite.",
        visual: "result",
      },
    ],
    primaryMetric: {
      value: "180ms",
      label: "global p95 gecikme",
      description: "280+ edge lokasyonda gerçek kullanıcı verisi.",
    },
    testimonials: [
      {
        quote:
          "Asya pazarında dönüşüm oranımız tek hafta içinde %18 arttı. Tek değişen şey edge'e geçmemizdi.",
        name: "Tarık Bilgi",
        role: "CTO",
        company: "Caret",
        initials: "TB",
      },
      {
        quote:
          "Black Friday günü origin sunucularımız sessiz kaldı. Edge bütün yükü emdi.",
        name: "Sema Önder",
        role: "Infrastructure Lead",
        company: "Halyx",
        initials: "SÖ",
      },
      {
        quote:
          "Cache invalidation sorunumuzu kökten çözen ilk platform oldu.",
        name: "Cem Atalay",
        role: "Tech Lead",
        company: "Nordix",
        initials: "CA",
      },
    ],
    pullQuote:
      "Edge Network sayesinde altyapı bize görünmez oldu — tam olarak istediğimiz şey.",
  },
  {
    slug: "observe-stack",
    category: "Gözlemlenebilirlik · Suite",
    name: "Observe Stack",
    purpose: "Üretimde olanı, üretim hızında görün.",
    description:
      "Logs, metrics ve traces tek bir motorda birleşir. Sorgu yazmadan, panel düzenlemeden, sorunun kaynağına dakikalar yerine saniyeler içinde inin.",
    rhetoricalQuestion: "Olay anında neden hâlâ ekran ekran geziyorsunuz?",
    problems: [
      "Logs ve metrics farklı araçlarda, korelasyon manuel.",
      "Kritik anlarda paneli açan kişi sadece bir kişi.",
      "Geçmişe dönük debug, tape sürmek gibi.",
    ],
    panels: [
      {
        problem: "Üç farklı araçta, üç farklı sorgu dili.",
        solution: "Tek arayüz, tek sorgu dili, tek hesap.",
      },
      {
        problem: "Panel oluşturmak iki günü buluyor.",
        solution: "Servis seçer seçmez paneller otomatik üretilir.",
      },
      {
        problem: "Anomalileri kullanıcı önce siz sonra görüyorsunuz.",
        solution: "ML tabanlı anomali tespiti, ortalama 90 saniye önde.",
      },
    ],
    steps: [
      {
        id: "s1",
        label: "Kurulum",
        title: "Tek satır SDK",
        description:
          "Servisinize SDK'yı ekleyin, otomatik instrumentation devreye girer.",
        visual: "terminal",
      },
      {
        id: "s2",
        label: "Yapılandırma",
        title: "Akıllı örnekleme",
        description:
          "Hata içeren trace'leri korur, normal trafiği akıllıca seyreltir.",
        visual: "config",
      },
      {
        id: "s3",
        label: "Entegrasyon",
        title: "Mevcut araçlarınız",
        description:
          "Slack, PagerDuty, Linear ve Jira — alarmlar olması gereken yere düşer.",
        visual: "integration",
      },
      {
        id: "s4",
        label: "Monitoring",
        title: "Canlı korelasyon",
        description:
          "Bir metrik tepkisinin hangi commit'ten geldiğini tek tıkla görün.",
        visual: "monitoring",
      },
      {
        id: "s5",
        label: "Sonuç",
        title: "Daha kısa olay süresi",
        description:
          "Ortalama olay çözüm süresinde %63 düşüş, on-call sayısında yarıya iniş.",
        visual: "result",
      },
    ],
    primaryMetric: {
      value: "%63",
      label: "olay çözüm süresi düşüşü",
      description: "Müşteri ortalamalarında karşılaştırma.",
    },
    testimonials: [
      {
        quote:
          "Üç farklı aracı tek hesapta birleştirdik. Hem maliyet düştü hem ekibimizin morali yükseldi.",
        name: "Pelin Soysal",
        role: "Engineering Manager",
        company: "Sintel",
        initials: "PS",
      },
      {
        quote:
          "Kritik bir hatayı kullanıcılarımız fark etmeden 4 dakikada çözdük.",
        name: "Yusuf Eren",
        role: "Director of Platform",
        company: "Quanta",
        initials: "YE",
      },
      {
        quote:
          "Observe Stack'in sorgu dili, dökümantasyona bakmadan kullanılan ilk araç oldu.",
        name: "Hande Şen",
        role: "Senior SRE",
        company: "Brokk",
        initials: "HŞ",
      },
    ],
    pullQuote: "Sorun değil, sorunun yerini saniyeler içinde söyleyen bir takım.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
