export const KVKK_NOTICE_TITLE =
  "ALGORYCODE KİŞİSEL VERİLERİN KORUNMASI KANUNU AYDINLATMA METNİ";

export const KVKK_NOTICE_SUBTITLE =
  "(Başvuru / İletişim Formu Kapsamında)";

export type KvkkSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export const KVKK_NOTICE_SECTIONS: KvkkSection[] = [
  {
    heading: "1. Veri Sorumlusunun Kimliği",
    paragraphs: [
      '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK" veya "Kanun") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla AlgoryCode ("Şirket") tarafından, bu aydınlatma metninde açıklanan kapsamda işlenebilecektir.',
      "Unvan: AlgoryCode Şahıs Şirketi",
      "E-posta: info@algorycode.com",
      "İnternet Sitesi: algorycode.com",
    ],
  },
  {
    heading: "2. İşlenen Kişisel Verileriniz",
    paragraphs: [
      "Başvuru/iletişim formunu doldurmanız halinde, aşağıda belirtilen kategorilerdeki kişisel verileriniz işlenmektedir:",
    ],
    bullets: [
      "Kimlik Bilgileri: Ad, soyad",
      "İletişim Bilgileri: E-posta adresi, telefon numarası",
      "Başvuru İçeriği Bilgileri: Talep edilen eğitim/hizmet bilgisi, form üzerinden ilettiğiniz mesaj ve talep içeriği",
      "İşlem Güvenliği Bilgileri: Form gönderim tarihi/saati, IP adresi, cihaz/tarayıcı bilgisi",
    ],
  },
  {
    heading: "2.1. İnternet Sitesi Ziyaretine İlişkin IP ve Cihaz Bilgileri",
    paragraphs: [
      "İnternet sitemizi ziyaret eden kullanıcıların IP adresi ve cihaz/tarayıcı bilgileri, site ve sistem güvenliğinin sağlanması, kötüye kullanım ve saldırı girişimlerinin tespit edilmesi amacıyla sınırlı olarak işlenmektedir. Bu veriler, KVKK'nın 5/2-f maddesi uyarınca veri sorumlusunun meşru menfaati kapsamında işlenmekte olup, işbu amaçlar dışında kullanılmamaktadır. Söz konusu veriler üçüncü kişi veya kuruluşlarla paylaşılmamakta, yalnızca Şirket bünyesinde saklanmaktadır. Bu veriler, toplandıkları tarihten itibaren en fazla 1 (bir) yıl süreyle saklanmakta, bu sürenin sonunda silinmektedir.",
    ],
  },
  {
    heading: "3. Kişisel Verilerinizin İşlenme Amaçları",
    paragraphs: [
      "Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde, aşağıdaki amaçlarla sınırlı olarak işlenmektedir:",
    ],
    bullets: [
      "Başvurunuzun/talebinizin değerlendirilmesi ve sizinle iletişime geçilmesi",
      "Talep ettiğiniz eğitim/hizmet hakkında bilgilendirme yapılması",
      "Başvuru süreçlerinin yürütülmesi ve takibi",
      "Müşteri ilişkileri yönetimi süreçlerinin yürütülmesi",
      "Yasal yükümlülüklerin yerine getirilmesi ve mevzuattan doğan hakların kullanılması",
    ],
  },
  {
    heading: "4. Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi",
    paragraphs: [
      "Kişisel verileriniz, internet sitemiz üzerindeki başvuru formunu doldurmanız suretiyle tamamen otomatik olan elektronik ortamlarda toplanmaktadır. Bu veriler; KVKK m. 5/2-c (Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması) ve KVKK m. 5/2-f (Veri sorumlusunun meşru menfaati için veri işlenmesinin zorunlu olması) hukuki sebeplerine dayanılarak işlenmektedir. Pazarlama, reklam ve Telegram dahil kanallardan bilgilendirme süreçleri ise tamamen sizin Açık Rızanıza dayanmaktadır.",
    ],
  },
  {
    heading: "5. Kişisel Verilerinizin Aktarılması",
    paragraphs: [
      "Toplanan kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesiyle sınırlı olarak ve gerekli teknik/idari güvenlik önlemleri alınmak suretiyle;",
    ],
    bullets: [
      "Yasal olarak yetkili kamu kurum ve kuruluşlarına (talep edilmesi halinde yasal zorunluluk gereği)",
      "Hizmet aldığımız sunucu, barındırma ve altyapı hizmeti sağlayıcımız olan Radore Veri Merkezi Hizmetleri A.Ş. firmasına",
      "KVKK'nın 8. maddesinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir",
    ],
  },
  {
    heading: "6. Kişisel Verilerinizin Saklanma Süresi",
    paragraphs: [
      "Kişisel verileriniz; işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri dikkate alınarak saklanmaktadır. Başvurunuz sonuçlandıktan sonra verileriniz kanuni süreler uyarınca 2 (iki) yıl boyunca saklanacak, bu sürenin sonunda KVKK'ya uygun olarak silinecek, yok edilecek veya anonim hale getirilecektir.",
    ],
  },
  {
    heading: "7. KVKK'nın 11. Maddesi Uyarınca Sahip Olduğunuz Haklar",
    paragraphs: [
      "KVKK'nın 11. maddesi uyarınca AlgoryCode'a başvurarak; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini talep etme haklarına sahipsiniz. Taleplerinizi kimliğinizi doğrulayan belgelerle birlikte info@algorycode.com e-posta adresimize iletebilirsiniz.",
    ],
  },
];

export const KVKK_CONSENT_ERROR =
  "Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekir.";
