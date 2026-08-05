import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  KVKK_NOTICE_SECTIONS,
  KVKK_NOTICE_SUBTITLE,
  KVKK_NOTICE_TITLE,
} from "@/lib/kvkk";

const DESCRIPTION =
  "AlgoryCode KVKK Aydınlatma Metni: kişisel verilerinizin işlenmesine ilişkin bilgilendirme.";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: DESCRIPTION,
  alternates: {
    canonical: "/kvkk",
  },
  openGraph: {
    title: `KVKK Aydınlatma Metni — AlgoryCode`,
    description: DESCRIPTION,
    url: "/kvkk",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
};

export default function KvkkPage() {
  return (
    <LegalDocumentPage
      title={KVKK_NOTICE_TITLE}
      subtitle={KVKK_NOTICE_SUBTITLE}
      sections={KVKK_NOTICE_SECTIONS}
    />
  );
}
