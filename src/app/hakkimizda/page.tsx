import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import {
  ABOUT_LAST_UPDATED,
  ABOUT_SECTIONS,
  ABOUT_TITLE,
} from "@/lib/legal/about";

const DESCRIPTION =
  "AlgoryCode hakkında: yazılım geliştirme, dijital çözümler ve kurumsal eğitim programları.";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: `${ABOUT_TITLE} — AlgoryCode`,
    description: DESCRIPTION,
    url: "/hakkimizda",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
};

export default function AboutPage() {
  return (
    <LegalDocumentPage
      title={ABOUT_TITLE}
      lastUpdated={ABOUT_LAST_UPDATED}
      sections={ABOUT_SECTIONS}
    />
  );
}
