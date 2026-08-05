import type { LegalSection } from "@/lib/legal/types";

export const PRIVACY_POLICY_TITLE = "Gizlilik Politikası";

export const PRIVACY_POLICY_LAST_UPDATED = "5 Ağustos 2026";

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    heading: "1. Giriş",
    paragraphs: [
      'Bu Gizlilik Politikası, AlgoryCode Şahıs Şirketi ("AlgoryCode", "biz") tarafından işletilen algorycode.com internet sitesi ve bu site üzerinden sunulan hizmetler kapsamında kişisel verilerinizin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklar.',
      "Siteyi ziyaret ederek, formlarımızı doldurarak veya hizmetlerimizden yararlanarak bu politikada belirtilen uygulamaları kabul etmiş sayılırsınız.",
    ],
  },
  {
    heading: "2. Veri Sorumlusu",
    paragraphs: [
      "Unvan: AlgoryCode Şahıs Şirketi",
      "E-posta: info@algorycode.com",
      "Web sitesi: algorycode.com",
    ],
  },
  {
    heading: "3. Toplanan Kişisel Veriler",
    paragraphs: [
      "Hizmetlerimizden yararlandığınız bağlamda aşağıdaki veri kategorileri işlenebilir:",
    ],
    bullets: [
      "Kimlik ve iletişim bilgileri: ad, soyad, e-posta adresi, telefon numarası",
      "Başvuru ve talep bilgileri: iletişim formları, eğitim başvuruları, mesaj içeriği",
      "Ödeme ve işlem bilgileri: satın alınan eğitim/hizmet, tutar, ödeme durumu, işlem referans numaraları",
      "Teknik ve güvenlik bilgileri: IP adresi, tarayıcı/cihaz bilgisi, oturum ve erişim kayıtları",
      "Çerez ve benzeri teknolojiler aracılığıyla elde edilen kullanım verileri",
    ],
  },
  {
    heading: "4. Kişisel Verilerin İşlenme Amaçları",
    paragraphs: [
      "Kişisel verileriniz aşağıdaki amaçlarla, ilgili mevzuata uygun şekilde işlenmektedir:",
    ],
    bullets: [
      "İletişim taleplerinin ve başvuruların değerlendirilmesi",
      "Eğitim ve dijital hizmet satış süreçlerinin yürütülmesi",
      "Ödeme işlemlerinin gerçekleştirilmesi ve muhasebe/fatura süreçlerinin yönetilmesi",
      "Müşteri ilişkileri, destek ve bilgilendirme faaliyetlerinin yürütülmesi",
      "Site güvenliğinin sağlanması, kötüye kullanımın önlenmesi ve teknik altyapının işletilmesi",
      "Yasal yükümlülüklerin yerine getirilmesi",
    ],
  },
  {
    heading: "5. Ödeme İşlemleri",
    paragraphs: [
      "Ücretli eğitim ve hizmet satın alımlarında ödeme işlemleri iyzico ödeme altyapısı üzerinden gerçekleştirilmektedir. Kart bilgileriniz AlgoryCode sunucularında saklanmaz; ödeme süreci iyzico tarafından güvenli şekilde yönetilir.",
      "Ödeme işlemi sırasında ad, soyad, e-posta, telefon ve fatura/teslimat bilgileri gibi veriler, ödemenin tamamlanması amacıyla iyzico ile paylaşılabilir.",
    ],
  },
  {
    heading: "6. Kişisel Verilerin Aktarılması",
    paragraphs: [
      "Kişisel verileriniz, yalnızca gerekli olduğu ölçüde ve uygun güvenlik önlemleri alınarak aşağıdaki taraflara aktarılabilir:",
    ],
    bullets: [
      "Ödeme hizmet sağlayıcısı: iyzico",
      "Barındırma ve altyapı hizmeti sağlayıcısı: Radore Veri Merkezi Hizmetleri A.Ş.",
      "Yasal yükümlülük halinde yetkili kamu kurum ve kuruluşları",
    ],
  },
  {
    heading: "7. Saklama Süreleri",
    paragraphs: [
      "Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri dikkate alınarak saklanır. Amaç ortadan kalktığında veya yasal süre dolduğunda veriler silinir, yok edilir veya anonim hale getirilir.",
      "İletişim başvurularına ilişkin veriler genel olarak 2 (iki) yıl; teknik güvenlik kayıtları en fazla 1 (bir) yıl saklanır.",
    ],
  },
  {
    heading: "8. Çerezler",
    paragraphs: [
      "Web sitemizde site işlevselliği, güvenlik ve kullanım analizi amacıyla çerezler kullanılabilir. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz; ancak bazı site özellikleri bu durumda sınırlı çalışabilir.",
    ],
  },
  {
    heading: "9. Haklarınız",
    paragraphs: [
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, aktarıldığı üçüncü kişileri bilme ve kanuna aykırı işlenmesi halinde şikâyet hakkına sahipsiniz.",
      "Taleplerinizi info@algorycode.com adresine iletebilirsiniz.",
    ],
  },
  {
    heading: "10. Politika Değişiklikleri",
    paragraphs: [
      "Bu Gizlilik Politikası, yasal ve operasyonel gereklilikler doğrultusunda güncellenebilir. Güncel metin her zaman algorycode.com/gizlilik-politikasi adresinde yayımlanır.",
    ],
  },
];
