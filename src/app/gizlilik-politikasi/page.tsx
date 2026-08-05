import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_TITLE,
} from "@/lib/legal/privacy-policy";

const DESCRIPTION =
  "AlgoryCode Gizlilik Politikası: kişisel verilerinizin toplanması, kullanımı, saklanması ve korunmasına ilişkin bilgiler.";

export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/gizlilik-politikasi",
  },
  openGraph: {
    title: `${PRIVACY_POLICY_TITLE} — AlgoryCode`,
    description: DESCRIPTION,
    url: "/gizlilik-politikasi",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title={PRIVACY_POLICY_TITLE}
      lastUpdated={PRIVACY_POLICY_LAST_UPDATED}
      sections={PRIVACY_POLICY_SECTIONS}
    />
  );
}
