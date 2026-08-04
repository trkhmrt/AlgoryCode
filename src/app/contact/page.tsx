import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { JobRequestContactForm } from "@/components/contact/JobRequestContactForm";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";

const CONTACT_DESCRIPTION =
  "Projeniz, ürün fikriniz veya eğitim talebiniz için AlgoryCode ile iletişime geçin. Formu doldurun, ekibimiz size özel dönüş yapsın.";

export const metadata: Metadata = {
  title: "İletişim",
  description: CONTACT_DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <SiteHeader />
      <main className={`${SITE_HEADER_OFFSET_CLASS} bg-[#f3efe9]`}>
        <section className="border-b border-border py-8 md:py-10">
          <div className="container-x flex justify-center">
            <div className="w-full max-w-md">
              <header className="mb-5 md:mb-6">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#888]">
                  İletişim
                </p>
                <h1 className="heading mt-1.5 text-xl font-semibold tracking-tight md:text-2xl">
                  Projenizi konuşalım
                </h1>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#666]">
                  48 saat içinde dönüş yapıyoruz.
                </p>
                <a
                  href="mailto:info@algorycode.com"
                  className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-[#121212] underline-offset-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]"
                >
                  <Mail size={13} strokeWidth={1.75} aria-hidden />
                  info@algorycode.com
                </a>
              </header>

              <JobRequestContactForm source="/contact" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
