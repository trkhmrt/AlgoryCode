import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import {
  formatDateTimeTR,
  formatInstallmentSummary,
  formatPaymentAmount,
  maskCard,
  PAYMENT_STATUS_LABELS,
  type PaymentListItem,
  type PaymentStatusGroupRow,
} from "@/lib/payments";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Ödemeler — Admin",
  description: "Ödeme raporları ve taksit detayları",
};

export default async function AdminPaymentsPage() {
  const [payments, stats] = (await Promise.all([
    prisma.payment.findMany({
      include: {
        education: {
          select: { title: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.groupBy({
      by: ["status"],
      _count: { _all: true },
      _sum: { paidPrice: true },
    }),
  ])) as [PaymentListItem[], PaymentStatusGroupRow[]];

  const successStats = stats.find((item) => item.status === "SUCCESS");
  const failedStats = stats.find((item) => item.status === "FAILED");
  const installmentCount = payments.filter((payment) => payment.installment > 1).length;
  const singlePaymentCount = payments.filter(
    (payment) => payment.status === "SUCCESS" && payment.installment <= 1,
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Ödemeler</h1>
        <p className="mt-2 text-[#888]">
          Tüm ödeme işlemlerini, taksit detaylarını ve raporları görüntüleyin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Başarılı Ödeme
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {successStats?._count._all ?? 0}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Başarısız Ödeme
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {failedStats?._count._all ?? 0}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Taksitli Ödeme
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">{installmentCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Toplam Tahsilat
          </p>
          <p className="mt-3 text-2xl font-semibold tabular">
            {formatPaymentAmount(successStats?._sum.paidPrice ?? 0)}
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Henüz ödeme kaydı yok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">Eğitim</th>
                  <th className="px-4 py-3 font-medium">Alıcı</th>
                  <th className="px-4 py-3 font-medium">Tutar</th>
                  <th className="px-4 py-3 font-medium">Taksit</th>
                  <th className="px-4 py-3 font-medium">Kart</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Detay</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatDateTimeTR(new Date(payment.createdAt))}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p className="font-medium">{payment.education.title}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p>{payment.buyerName} {payment.buyerSurname}</p>
                      <p className="text-xs text-[#888]">{payment.buyerEmail}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      {formatPaymentAmount(payment.paidPrice, payment.currency)}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatInstallmentSummary(payment)}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {maskCard(payment.binNumber, payment.lastFourDigits)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${
                          payment.status === "SUCCESS"
                            ? "border-emerald-500/30 text-emerald-300"
                            : payment.status === "FAILED"
                              ? "border-red-500/30 text-red-300"
                              : "border-[#333] text-[#888]"
                        }`}
                      >
                        {PAYMENT_STATUS_LABELS[payment.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={`/admin/payments/${payment.id}`}
                        className="text-sm text-[#ededed] hover:text-white"
                      >
                        Görüntüle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Özet</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-[#888]">Tek çekim başarılı ödeme</dt>
            <dd className="mt-1 font-medium tabular">{singlePaymentCount}</dd>
          </div>
          <div>
            <dt className="text-sm text-[#888]">Taksitli işlem sayısı</dt>
            <dd className="mt-1 font-medium tabular">{installmentCount}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
