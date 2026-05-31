import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SITE_HEADER_OFFSET_CLASS } from "@/components/sections/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { getEducationCheckoutPrice } from "@/lib/iyzico/checkout";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "./CheckoutForm";

export const dynamic = "force-dynamic";

type CheckoutPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const education = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { title: true },
  });

  return {
    title: education
      ? `Ödeme — ${education.title}`
      : "Ödeme — AlgoryCode",
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const education = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
  });

  if (!education) {
    notFound();
  }

  const price = getEducationCheckoutPrice(education);

  if (!education.isFree && price <= 0) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <section className="section">
          <div className="container-x max-w-3xl">
            <Link
              href={`/education/${slug}`}
              className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
            >
              ← Eğitime Dön
            </Link>
            <h1 className="heading mt-6 text-3xl font-semibold md:text-4xl">
              {education.isFree ? "Kayıt Ol" : "Ödeme"}
            </h1>
            <p className="mt-3 text-sm text-[#888]">
              {education.isFree
                ? "Ücretsiz eğitime kayıt olmak için bilgilerinizi girin."
                : "Kart bilgilerinizi girin ve tek çekim veya taksitli ödeme seçin."}
            </p>
            <div className="mt-8">
              <CheckoutForm
                slug={slug}
                title={education.title}
                price={price}
                currency={education.currency}
                isFree={education.isFree}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
