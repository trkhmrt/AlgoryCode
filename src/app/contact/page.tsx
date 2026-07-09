import type { Metadata } from "next";
import { FileSignature, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { JobRequestContactForm } from "@/components/contact/JobRequestContactForm";
import { Footer } from "@/components/sections/Footer";
import {
  SiteHeader,
  SITE_HEADER_OFFSET_CLASS,
} from "@/components/sections/SiteHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "İletişim — AlgoryCode",
  description: "Projeniz için bizimle iletişime geçin.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className={`${SITE_HEADER_OFFSET_CLASS} bg-[#f3efe9]`}>
        <section className="section border-b border-border">
          <div className="container-x">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
                  İletişim
                </p>
                <h1 className="heading mt-4 text-4xl font-semibold md:text-5xl">
                  Projenizi birlikte hayata geçirelim.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#888]">
                  Hangi alanda olursa olsun — e-ticaret, mobil, AI, web veya eğitim —
                  48 saat içinde ilk adımı atıyoruz.
                </p>

                <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[#888]">
                  {[
                    { icon: Sparkles, label: "Ücretsiz Keşif" },
                    { icon: Headphones, label: "48s Geri Dönüş" },
                    { icon: ShieldCheck, label: "KVKK Uyumlu" },
                    { icon: FileSignature, label: "NDA İmzalarız" },
                  ].map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-1.5 text-[12px] tracking-tight"
                    >
                      <Icon size={12} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <Card className="p-7 md:p-8">
                  <p className="mb-5 text-[12px] uppercase tracking-[0.18em] text-[#888]">
                    Demo Talep Et
                  </p>
                  <JobRequestContactForm source="/contact" />
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
