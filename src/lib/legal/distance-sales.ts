import type { LegalSection } from "@/lib/legal/types";

export const DISTANCE_SALES_TITLE = "Mesafeli Satış Sözleşmesi";

export const DISTANCE_SALES_LAST_UPDATED = "19 Ağustos 2026";

export const DISTANCE_SALES_SECTIONS: LegalSection[] = [
  {
    heading: "1. Taraflar",
    paragraphs: [
      'Satıcı: AlgoryCode Şahıs Şirketi ("AlgoryCode")',
      "E-posta: info@algorycode.com",
      "Web sitesi: algorycode.com",
      "Alıcı: Satın alma sırasında sisteme kaydedilen hesap ve fatura/iletişim bilgileri esas alınır.",
    ],
  },
  {
    heading: "2. Konu",
    paragraphs: [
      "Bu sözleşme; Alıcı'nın algorycode.com üzerinden satın aldığı ücretli eğitim ve dijital hizmetlerin elektronik ortamda sunulması ile bedelinin tahsil edilmesine ilişkin hak ve yükümlülükleri düzenler.",
      "Fiziksel ürün teslimatı yapılmaz. Hizmet, dijital içerik ve/veya uzaktan hizmet niteliğindedir.",
    ],
  },
  {
    heading: "3. Hizmetin ifası",
    paragraphs: [
      "Ödeme başarıyla tamamlandığında kayıt süreci başlatılır; eğitim erişimi veya dijital hizmet sunumu ilgili program koşullarına göre sağlanır.",
      "Hizmetin ifası, ödeme onayı sonrasında elektronik ortamda başlatılabilir.",
    ],
  },
  {
    heading: "4. Bedel ve ödeme",
    paragraphs: [
      "Güncel bedeller satın alma ekranında gösterilir. Ödemeler PayTR ödeme altyapısı üzerinden kredi/banka kartı ile alınır.",
      "Kart bilgileri AlgoryCode sunucularında saklanmaz; ödeme işlemi PayTR tarafından güvenli şekilde yürütülür.",
    ],
  },
  {
    heading: "5. Cayma ve iade",
    paragraphs: [
      "Cayma ve iade koşulları 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelik hükümlerine tabidir.",
      "Dijital içeriğin ifasına Alıcı onayıyla başlanmış olması halinde cayma hakkı sınırlı olabilir. Ayrıntılar için Teslimat ve İade Şartları sayfasına bakınız.",
    ],
  },
  {
    heading: "6. Uyuşmazlık",
    paragraphs: [
      "Uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır. Tüketici işlemlerinde ilgili tüketici hakem heyeti ve mahkemeler yetkilidir.",
    ],
  },
];
