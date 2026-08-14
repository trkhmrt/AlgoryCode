import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { JobRequestContactForm } from "@/components/contact/JobRequestContactForm";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { PageHero, Section } from "@/components/site/Section";

const CONTACT_DESCRIPTION =
  "Projeniz, ürün fikriniz veya eğitim talebiniz için AlgoryCode ile iletişime geçin. Formu doldurun, ekibimiz size özel dönüş yapsın.";

export const metadata: Metadata = {
  title: "İletişim",
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "İletişim — AlgoryCode",
    description: CONTACT_DESCRIPTION,
    url: "/contact",
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
  },
  twitter: {
    card: "summary",
    title: "İletişim — AlgoryCode",
    description: CONTACT_DESCRIPTION,
  },
};

const contactStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://algorycode.com/#organization",
      name: "AlgoryCode",
      url: "https://algorycode.com",
      email: "info@algorycode.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://algorycode.com/#website",
      url: "https://algorycode.com",
      name: "AlgoryCode",
      inLanguage: "tr-TR",
      publisher: { "@id": "https://algorycode.com/#organization" },
    },
    {
      "@type": "ContactPage",
      "@id": "https://algorycode.com/contact#webpage",
      url: "https://algorycode.com/contact",
      name: "İletişim — AlgoryCode",
      description: CONTACT_DESCRIPTION,
      inLanguage: "tr-TR",
      isPartOf: { "@id": "https://algorycode.com/#website" },
      about: { "@id": "https://algorycode.com/#organization" },
    },
  ],
};

const INFO = [
  { icon: Mail, title: "E-posta", detail: "info@algorycode.com" },
  { icon: Phone, title: "Telefon", detail: "+90 850 000 00 00" },
  { icon: MapPin, title: "Ofis", detail: "İstanbul, Türkiye" },
] as const;

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="İletişim"
          title="Kısa bir görüşmeyle başlayalım."
          description="Formu doldurun, 1 iş günü içinde uygun ekip arkadaşımız size dönsün."
        />

        <Section>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <div className="surface-card p-7">
              <JobRequestContactForm source="/contact" />
            </div>

            {/* Contact info */}
            <div className="grid content-start gap-4">
              {INFO.map(({ icon: Icon, title, detail }) => (
                <div
                  key={title}
                  className="surface-card flex items-start gap-3 p-5"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-border bg-surface-2 p-5 text-sm text-muted-foreground">
                Çalışma saatleri: Hafta içi 09:00 – 18:00
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
