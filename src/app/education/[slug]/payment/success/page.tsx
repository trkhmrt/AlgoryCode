import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/layout";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  formatInstallmentSummary,
  formatPaymentAmount,
  PAYMENT_STATUS_LABELS,
  type PaymentReceiptRecord,
} from "@/lib/payments";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SuccessPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ paymentId?: string }>;
};

export const metadata: Metadata = {
  title: "Ödeme Başarılı — AlgoryCode",
};

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const { slug } = await params;
  const query = await searchParams;

  if (!query.paymentId) {
    notFound();
  }

  const payment: PaymentReceiptRecord | null = await prisma.payment.findFirst({
    where: {
      id: query.paymentId,
      status: "SUCCESS",
      education: { slug },
    },
    include: { education: { select: { title: true } } },
  });

  if (!payment) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <section className="section">
          <div className="container-x max-w-2xl">
            <Card className="p-8 text-center">
              <p className="text-[13px] uppercase tracking-[0.12em] text-emerald-300">
                Başarılı
              </p>
              <h1 className="heading mt-4 text-3xl font-semibold">
                {payment.provider === "FREE"
                  ? "Kaydınız alındı"
                  : "Ödemeniz alındı"}
              </h1>
              <p className="mt-3 text-sm text-[#888]">
                {payment.education.title} eğitimi için işleminiz tamamlandı.
              </p>
              <dl className="mt-8 space-y-3 text-left text-sm">
                <div className="flex justify-between gap-4 border-b border-[#1a1a1a] pb-3">
                  <dt className="text-[#888]">Durum</dt>
                  <dd>{PAYMENT_STATUS_LABELS[payment.status]}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1a1a1a] pb-3">
                  <dt className="text-[#888]">Tutar</dt>
                  <dd>{formatPaymentAmount(payment.paidPrice, payment.currency)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1a1a1a] pb-3">
                  <dt className="text-[#888]">Ödeme Tipi</dt>
                  <dd>{formatInstallmentSummary(payment)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888]">E-posta</dt>
                  <dd>{payment.buyerEmail}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href={`/education/${slug}`} variant="secondary">
                  Eğitim Detayı
                </Button>
                <Button href="/education">Tüm Eğitimler</Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
