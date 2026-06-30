import type { Metadata } from "next";
import { FileSignature, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { JobRequestContactForm } from "@/components/contact/JobRequestContactForm";
import { Footer } from "@/components/sections/Footer";
import {
  SiteHeader,
  SITE_HEADER_OFFSET_CLASS,
} from "@/components/sections/SiteHeader";

export const metadata: Metadata = {
  title: "İletişim — Synapse",
  description: "Projeniz için bizimle iletişime geçin.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <section className="section relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-black to-black"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            aria-hidden
          />

          <div className="container-x relative">
            <div className="liquid-glass overflow-hidden rounded-[22px] border border-white/10 p-8 md:p-14">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#5ed29c]">
                    İletişim
                  </p>
                  <h1 className="heading text-[36px] font-extrabold leading-[1.05] text-white md:text-[56px]">
                    Projenizi birlikte
                    <br />
                    <span className="font-light text-white/70">hayata geçirelim.</span>
                  </h1>
                  <p className="mt-6 max-w-[460px] text-[14px] leading-relaxed text-white/70">
                    Hangi alanda olursa olsun — e-ticaret, mobil, AI, web veya eğitim —
                    48 saat içinde ilk adımı atıyoruz.
                  </p>

                  <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/70">
                    {[
                      { icon: Sparkles, label: "Ücretsiz Keşif" },
                      { icon: Headphones, label: "48s Geri Dönüş" },
                      { icon: ShieldCheck, label: "KVKK Uyumlu" },
                      { icon: FileSignature, label: "NDA İmzalarız" },
                    ].map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="inline-flex items-center gap-1.5 text-[11px] tracking-tight"
                      >
                        <Icon size={11} />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div className="liquid-glass rounded-[16px] border border-white/10 p-7 md:p-8">
                    <p className="mb-5 text-[12px] uppercase tracking-[0.18em] text-white/70">
                      Demo Talep Et
                    </p>
                    <JobRequestContactForm source="/contact" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
