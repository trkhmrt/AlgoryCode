import type { LegalSection } from "@/lib/legal/types";

export const ABOUT_TITLE = "Hakkımızda";

export const ABOUT_LAST_UPDATED = "19 Ağustos 2026";

export const ABOUT_SECTIONS: LegalSection[] = [
  {
    heading: "Biz kimiz?",
    paragraphs: [
      "AlgoryCode Şahıs Şirketi; yazılım geliştirme, dijital ürün danışmanlığı ve kurumsal eğitim programları sunan bir teknoloji markasıdır.",
      "Ürün geliştirme ile ekip eğitimini aynı çatı altında birleştirir; işletmelerin dijital dönüşüm süreçlerinde hem teknik hem operasyonel destek sağlarız.",
    ],
  },
  {
    heading: "Ne sunuyoruz?",
    paragraphs: [
      "AlgoryCode olarak yazılım geliştirme ve eğitim alanlarında uçtan uca hizmet sunarız:",
    ],
    bullets: [
      "Özel yazılım ve web/mobil uygulama geliştirme",
      "E-ticaret, SaaS ve yapay zeka entegrasyon projeleri",
      "Bulut altyapısı, DevOps ve ölçeklenebilir mimari danışmanlığı",
      "AlgoryCode Akademi ile canlı ve kayıtlı teknoloji eğitimleri",
      "Kuruma özel eğitim programları ve mentorluk",
    ],
  },
  {
    heading: "Çalışma modelimiz",
    paragraphs: [
      "Projeleri keşif, prototip, üretim ve devir olmak üzere dört aşamada yürütürüz. Her sprint sonunda çalışan bir sürüm teslim eder; şeffaf ilerleme ve dokümantasyonu sürecin parçası yaparız.",
      "Eğitim tarafında gerçek kod tabanları üzerinde ilerleyen, uygulamalı programlar sunarız.",
    ],
  },
  {
    heading: "İletişim",
    paragraphs: [
      "Unvan: AlgoryCode Şahıs Şirketi",
      "Adres: İstanbul, Küçükçekmece, Sefaköy, Gültepe",
      "E-posta: info@algorycode.com",
      "Web sitesi: algorycode.com",
    ],
  },
];
