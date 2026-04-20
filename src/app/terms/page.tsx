import type { Metadata } from "next";
import LegalDocumentShell from "@/components/legal/LegalDocumentShell";
import { TermsOfServiceContent } from "@/content/terms-of-service-tr";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | AlgroyCode",
  description:
    "AlgroyCode web sitesi ve hizmetlerinin kullanımına ilişkin şartlar, fikri mülkiyet, sorumluluk sınırlaması ve uygulanacak hukuk.",
  openGraph: {
    title: "Kullanım Koşulları | AlgroyCode",
    description: "Web sitesi kullanım şartları ve yasal çerçeve.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalDocumentShell title="Kullanım Koşulları" updated="20 Nisan 2026">
      <TermsOfServiceContent />
    </LegalDocumentShell>
  );
}
