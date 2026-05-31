import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { EDUCATION_STATUS_LABELS, formatDateTR } from "@/lib/education";
import {
  formatDateTimeTR,
  formatInstallmentSummary,
  formatPaymentAmount,
  PAYMENT_STATUS_LABELS,
} from "@/lib/payments";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
  description: "AlgoryCode yönetim paneli",
};

export default async function AdminDashboardPage() {
  const [
    total,
    published,
    draft,
    upcoming,
    recentEducations,
    paymentStats,
    recentPayments,
  ] = await Promise.all([
    prisma.education.count(),
    prisma.education.count({ where: { status: "PUBLISHED" } }),
    prisma.education.count({ where: { status: "DRAFT" } }),
    prisma.education.count({
      where: {
        status: "PUBLISHED",
        startDate: { gt: new Date() },
      },
    }),
    prisma.education.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    Promise.all([
      prisma.payment.count({ where: { status: "SUCCESS" } }),
      prisma.payment.count({ where: { status: "FAILED" } }),
      prisma.payment.count({ where: { installment: { gt: 1 } } }),
      prisma.payment.aggregate({
        where: { status: "SUCCESS" },
        _sum: { paidPrice: true },
      }),
    ]),
    prisma.payment.findMany({
      include: { education: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const [successfulPayments, failedPayments, installmentPayments, revenueAgg] =
    paymentStats;

  const stats = [
    { label: "Toplam Eğitim", value: total },
    { label: "Başarılı Ödeme", value: successfulPayments },
    { label: "Taksitli Ödeme", value: installmentPayments },
    {
      label: "Toplam Tahsilat",
      value: formatPaymentAmount(revenueAgg._sum.paidPrice ?? 0),
      isText: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading text-3xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-[#888]">
            Eğitimlerinizi ve ödeme raporlarınızı buradan yönetin.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/educations/new"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-[#ededed]"
          >
            Yeni Eğitim
          </Link>
          <Link
            href="/admin/blog/new"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#1a1a1a] px-4 text-sm font-medium text-[#ededed] transition-colors hover:border-[#333] hover:bg-[#0a0a0a]"
          >
            Yeni Blog Yazısı
          </Link>
          <Link
            href="/admin/payments"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#1a1a1a] px-4 text-sm font-medium text-[#ededed] transition-colors hover:border-[#333] hover:bg-[#0a0a0a]"
          >
            Ödemeler
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
              {stat.label}
            </p>
            <p
              className={`mt-3 font-semibold tabular ${
                stat.isText ? "text-2xl" : "text-3xl"
              }`}
            >
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Son Ödemeler</h2>
              <p className="mt-1 text-sm text-[#888]">
                Başarısız ödeme: {failedPayments}
              </p>
            </div>
            <Link
              href="/admin/payments"
              className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
            >
              Tümünü Gör
            </Link>
          </div>

          {recentPayments.length === 0 ? (
            <p className="text-sm text-[#888]">Henüz ödeme kaydı yok.</p>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-md border border-[#1a1a1a] bg-[#080808] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{payment.education.title}</p>
                      <p className="mt-1 text-sm text-[#888]">
                        {payment.buyerName} {payment.buyerSurname} ·{" "}
                        {formatDateTimeTR(new Date(payment.createdAt))}
                      </p>
                      <p className="mt-1 text-xs text-[#666]">
                        {formatInstallmentSummary(payment)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPaymentAmount(payment.paidPrice, payment.currency)}
                      </p>
                      <p className="mt-1 text-xs text-[#888]">
                        {PAYMENT_STATUS_LABELS[payment.status]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Son Eğitimler</h2>
              <p className="mt-1 text-sm text-[#888]">
                Yayında: {published} · Taslak: {draft} · Yaklaşan: {upcoming}
              </p>
            </div>
            <Link
              href="/admin/educations"
              className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
            >
              Tümünü Gör
            </Link>
          </div>

          {recentEducations.length === 0 ? (
            <p className="text-sm text-[#888]">
              Henüz eğitim yok. İlk eğitiminizi oluşturarak başlayın.
            </p>
          ) : (
            <div className="space-y-3">
              {recentEducations.map((education) => (
                <div
                  key={education.id}
                  className="flex flex-col gap-3 rounded-md border border-[#1a1a1a] bg-[#080808] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{education.title}</p>
                    <p className="mt-1 text-sm text-[#888]">
                      {education.instructorName} ·{" "}
                      {formatDateTR(new Date(education.startDate))}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#333] px-2.5 py-1 text-xs">
                      {EDUCATION_STATUS_LABELS[education.status]}
                    </span>
                    <Link
                      href={`/admin/educations/${education.id}/edit`}
                      className="text-sm text-[#ededed] transition-colors hover:text-white"
                    >
                      Düzenle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
