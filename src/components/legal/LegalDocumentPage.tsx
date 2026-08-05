import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import type { LegalSection } from "@/lib/legal/types";

type LegalDocumentPageProps = {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalSection[];
};

export function LegalDocumentPage({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalDocumentPageProps) {
  return (
    <>
      <SiteHeader />
      <main className={`${SITE_HEADER_OFFSET_CLASS} bg-[#f3efe9]`}>
        <article className="section border-b border-border">
          <div className="container-x max-w-3xl">
            <header>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#888]">
                Yasal
              </p>
              <h1 className="heading mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-2 text-sm text-[#666]">{subtitle}</p>
              ) : null}
              {lastUpdated ? (
                <p className="mt-2 text-[12px] text-[#888]">
                  Son güncelleme: {lastUpdated}
                </p>
              ) : null}
            </header>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-base font-semibold text-[#121212]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${section.heading}-p-${index}`}
                      className="mt-3 text-[14px] leading-relaxed text-[#444]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[#444]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
