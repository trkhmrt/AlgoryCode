import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getPublicPaymentErrorMessage } from "@/lib/iyzico/errors";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type FailedPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ paymentId?: string; limit?: string }>;
};

export const metadata: Metadata = {
  title: "Ödeme Başarısız — AlgoryCode",
};

export default async function PaymentFailedPage({
  params,
  searchParams,
}: FailedPageProps) {
  const { slug } = await params;
  const query = await searchParams;

  if (!query.paymentId) {
    notFound();
  }

  const payment = await prisma.payment.findFirst({
    where: {
      id: query.paymentId,
      status: "FAILED",
      education: { slug },
    },
    include: { education: true },
  });

  if (!payment) {
    notFound();
  }

  const isLimit = payment.isLimitError || query.limit === "1";
  const message = getPublicPaymentErrorMessage(isLimit);

  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <section className="section">
          <div className="container-x max-w-2xl">
            <Card className="p-8 text-center">
              <p className="text-[13px] uppercase tracking-[0.12em] text-red-300">
                Başarısız
              </p>
              <h1 className="heading mt-4 text-3xl font-semibold">
                Ödeme tamamlanamadı
              </h1>
              <p
                className={`mx-auto mt-4 max-w-md rounded-md border px-4 py-3 text-sm ${
                  isLimit
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-200"
                    : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >
                {message}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href={`/education/${slug}/checkout`}>
                  Tekrar Dene
                </Button>
                <Button href={`/education/${slug}`} variant="secondary">
                  Eğitime Dön
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
