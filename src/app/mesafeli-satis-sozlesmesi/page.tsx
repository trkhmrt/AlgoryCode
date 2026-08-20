import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  DISTANCE_SALES_LAST_UPDATED,
  DISTANCE_SALES_SECTIONS,
  DISTANCE_SALES_TITLE,
} from "@/lib/legal/distance-sales";

const DESCRIPTION =
  "AlgoryCode mesafeli satış sözleşmesi: dijital eğitim ve hizmet satış koşulları.";

export const metadata: Metadata = {
  title: DISTANCE_SALES_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/mesafeli-satis-sozlesmesi",
  },
  openGraph: {
    title: `${DISTANCE_SALES_TITLE} — AlgoryCode`,
    description: DESCRIPTION,
    url: "/mesafeli-satis-sozlesmesi",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
};

export default function DistanceSalesPage() {
  return (
    <LegalDocumentPage
      title={DISTANCE_SALES_TITLE}
      lastUpdated={DISTANCE_SALES_LAST_UPDATED}
      sections={DISTANCE_SALES_SECTIONS}
    />
  );
}
