import type { Metadata } from "next";
import LegalDocumentShell from "@/components/legal/LegalDocumentShell";
import { PrivacyPolicyContent } from "@/content/privacy-policy-tr";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | AlgroyCode",
  description:
    "AlgroyCode kişisel verilerinizi nasıl işler? KVKK kapsamında veri sorumlusu bilgileri, işleme amaçları, haklarınız ve iletişim.",
  openGraph: {
    title: "Gizlilik Politikası | AlgroyCode",
    description: "Kişisel verilerin korunması ve çerez politikası hakkında ayrıntılı bilgilendirme.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocumentShell title="Gizlilik Politikası" updated="20 Nisan 2026">
      <PrivacyPolicyContent />
    </LegalDocumentShell>
  );
}
