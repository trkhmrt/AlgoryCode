import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentShell from "@/components/legal/LegalDocumentShell";

export const metadata: Metadata = {
  title: "Lisans Politikası | AlgroyCode",
  description:
    "AlgroyCode markası, web sitesi içeriği ve yazılım lisansları hakkında bilgilendirme.",
  openGraph: {
    title: "Lisans Politikası | AlgroyCode",
    url: "/license",
  },
};

export default function LicensePage() {
  return (
    <LegalDocumentShell title="Lisans Politikası" updated="20 Nisan 2026">
      <p className="site-legal-note">
        Bu sayfa, AlgroyCode markası ve web sitesi içeriğine ilişkin lisans ilkelerini özetler.
        Ticari yazılım veya SaaS ürünleri için geçerli lisanslar, satın alma sırasında sunulan uç
        kullanıcı lisans sözleşmesi (EULA) veya kurumsal lisans anlaşması ile belirlenir.
      </p>

      <h2 id="lic-1">1. Marka ve içerik</h2>
      <p>
        “AlgroyCode” adı, logosu ve site tasarım unsurları üzerindeki haklar AlgroyCode’a aittir.
        İzinsiz ticari kullanım, türev çalışma veya karıştırılmaya yol açacak şekilde kullanım
        yasaktır. Basın ve iş ortaklığı kullanımı için önceden yazılı onay talep edilmelidir.
      </p>

      <h2 id="lic-2">2. Açık kaynak bileşenler</h2>
      <p>
        Projelerde kullanılan üçüncü taraf açık kaynak kütüphaneler, ilgili lisans dosyalarına
        (ör. MIT, Apache-2.0, BSD) tabidir. Kaynak kodu dağıtımı gerektiren lisanslar için uyum
        sağlanır; talep halinde bileşen listesi paylaşılabilir.
      </p>

      <h2 id="lic-3">3. Müşteri projeleri ve teslimatlar</h2>
      <p>
        Özel yazılım geliştirme sözleşmelerinde fikri mülkiyet devri, kaynak kod teslimi ve kullanım
        hakları sözleşme maddeleriyle ayrıca düzenlenir. Bu genel politika, sözleşme hükümleri ile
        çeliştiği ölçüde sözleşme önceliklidir.
      </p>

      <h2 id="lic-4">4. İletişim</h2>
      <p>
        Lisans veya marka kullanımı için{" "}
        <a href="mailto:info@algorycode.com">info@algorycode.com</a> veya{" "}
        <Link href="/iletisim">İletişim</Link> formunu kullanın.
      </p>
    </LegalDocumentShell>
  );
}
