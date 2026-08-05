import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  CANCELLATION_REFUND_LAST_UPDATED,
  CANCELLATION_REFUND_SECTIONS,
  CANCELLATION_REFUND_TITLE,
} from "@/lib/legal/cancellation-refund";

const DESCRIPTION =
  "AlgoryCode ücretli eğitim ve dijital hizmet satışlarına ilişkin iptal, cayma ve iade şartları.";

export const metadata: Metadata = {
  title: CANCELLATION_REFUND_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/iptal-ve-iade-sartlari",
  },
  openGraph: {
    title: `${CANCELLATION_REFUND_TITLE} — AlgoryCode`,
    description: DESCRIPTION,
    url: "/iptal-ve-iade-sartlari",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
};

export default function CancellationRefundPage() {
  return (
    <LegalDocumentPage
      title={CANCELLATION_REFUND_TITLE}
      lastUpdated={CANCELLATION_REFUND_LAST_UPDATED}
      sections={CANCELLATION_REFUND_SECTIONS}
    />
  );
}
