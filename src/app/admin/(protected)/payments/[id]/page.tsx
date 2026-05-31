import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  formatDateTimeTR,
  formatInstallmentSummary,
  formatPaymentAmount,
  maskCard,
  PAYMENT_STATUS_LABELS,
  type PaymentDetailRecord,
} from "@/lib/payments";
import { prisma } from "@/lib/prisma";

type PaymentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PaymentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const payment = await prisma.payment.findUnique({
    where: { id },
    select: { buyerEmail: true },
  });

  return {
    title: payment ? `Ödeme Detayı — Admin` : "Ödeme Detayı — Admin",
  };
}

export default async function PaymentDetailPage({ params }: PaymentDetailPageProps) {
  const { id } = await params;
  const payment: PaymentDetailRecord | null = await prisma.payment.findUnique({
    where: { id },
    include: {
      education: {
        select: { title: true, slug: true },
      },
    },
  });

  if (!payment) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/payments"
          className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
        >
          ← Tüm Ödemeler
        </Link>
        <h1 className="heading mt-4 text-3xl font-semibold">Ödeme Detayı</h1>
        <p className="mt-2 text-[#888]">{payment.education.title}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">İşlem Bilgileri</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Durum</dt>
              <dd>{PAYMENT_STATUS_LABELS[payment.status]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Sağlayıcı</dt>
              <dd>{payment.provider}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Tarih</dt>
              <dd>{formatDateTimeTR(new Date(payment.createdAt))}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Liste Fiyatı</dt>
              <dd>{formatPaymentAmount(payment.price, payment.currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Tahsil Edilen</dt>
              <dd>{formatPaymentAmount(payment.paidPrice, payment.currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Ödeme Tipi</dt>
              <dd>{formatInstallmentSummary(payment)}</dd>
            </div>
            {payment.iyzicoPaymentId ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">iyzico Payment ID</dt>
                <dd className="break-all text-right">{payment.iyzicoPaymentId}</dd>
              </div>
            ) : null}
            {payment.conversationId ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">Conversation ID</dt>
                <dd className="break-all text-right">{payment.conversationId}</dd>
              </div>
            ) : null}
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Alıcı & Kart</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Alıcı</dt>
              <dd>{payment.buyerName} {payment.buyerSurname}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">E-posta</dt>
              <dd>{payment.buyerEmail}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Telefon</dt>
              <dd>{payment.buyerPhone ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">T.C. Kimlik No</dt>
              <dd>{payment.buyerIdentityNumber}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Kart</dt>
              <dd>{maskCard(payment.binNumber, payment.lastFourDigits)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Banka</dt>
              <dd>{payment.cardBankName ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Kart Ailesi</dt>
              <dd>{payment.cardFamily ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Kart Şeması</dt>
              <dd>{payment.cardAssociation ?? "—"}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {payment.status === "FAILED" ? (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Hata Detayı</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Limit Hatası</dt>
              <dd>{payment.isLimitError ? "Evet" : "Hayır"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Hata Kodu</dt>
              <dd>{payment.failureCode ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[#888]">Hata Mesajı</dt>
              <dd className="mt-2 rounded-md border border-[#1a1a1a] bg-[#080808] p-3 text-[#ededed]">
                {payment.failureMessage ?? "—"}
              </dd>
            </div>
          </dl>
        </Card>
      ) : null}

      {payment.installment > 1 ? (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Taksit Detayı</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <dt className="text-[#888]">Taksit Sayısı</dt>
              <dd className="mt-1 text-lg font-semibold tabular">{payment.installment}</dd>
            </div>
            <div>
              <dt className="text-[#888]">Aylık Tutar</dt>
              <dd className="mt-1 text-lg font-semibold tabular">
                {payment.installmentAmount
                  ? formatPaymentAmount(payment.installmentAmount, payment.currency)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[#888]">Toplam Tutar</dt>
              <dd className="mt-1 text-lg font-semibold tabular">
                {formatPaymentAmount(payment.paidPrice, payment.currency)}
              </dd>
            </div>
          </dl>
        </Card>
      ) : null}

      {payment.iyzicoRawResponse ? (
        <Card className="p-6">
          <h2 className="text-lg font-semibold">iyzico Yanıtı</h2>
          <pre className="mt-4 overflow-x-auto rounded-md border border-[#1a1a1a] bg-[#080808] p-4 text-xs text-[#888]">
            {JSON.stringify(payment.iyzicoRawResponse, null, 2)}
          </pre>
        </Card>
      ) : null}
    </div>
  );
}
