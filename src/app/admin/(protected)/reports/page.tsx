import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { EDUCATION_STATUS_LABELS } from "@/lib/education";
import {
  formatPaymentAmount,
  PAYMENT_STATUS_LABELS,
} from "@/lib/payments";
import {
  getReportData,
  getReportEducationOptions,
  parseReportFilters,
} from "@/lib/reports";
import { ReportsFilters } from "./ReportsFilters";

export const metadata: Metadata = {
  title: "Raporlar — Admin",
  description: "Eğitim gelir raporları ve filtreli ödeme analizi",
};

export const dynamic = "force-dynamic";

type ReportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function formatPercent(value: number, total: number): string {
  if (total <= 0) {
    return "0%";
  }

  return `${((value / total) * 100).toFixed(1)}%`;
}

export default async function AdminReportsPage({ searchParams }: ReportsPageProps) {
  const query = await searchParams;
  const filters = parseReportFilters(query);
  const [report, educations] = await Promise.all([
    getReportData(filters),
    getReportEducationOptions(),
  ]);

  const activeFilterCount = [
    filters.from,
    filters.to,
    filters.educationId,
    filters.status !== "SUCCESS" ? filters.status : null,
    filters.provider !== "ALL" ? filters.provider : null,
    filters.installment !== "ALL" ? filters.installment : null,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Raporlar</h1>
        <p className="mt-2 text-[#888]">
          Eğitim bazlı gelir, tahsilat ve ödeme performansını filtreleyerek
          inceleyin.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Filtreler</h2>
            <p className="mt-1 text-sm text-[#888]">
              {activeFilterCount > 0
                ? `${activeFilterCount} aktif filtre uygulanıyor.`
                : "Varsayılan olarak başarılı ödemeler gösteriliyor."}
            </p>
          </div>
        </div>
        <ReportsFilters filters={filters} educations={educations} />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Toplam Tahsilat
          </p>
          <p className="mt-3 text-2xl font-semibold tabular">
            {formatPaymentAmount(report.summary.totalRevenue, report.summary.currency)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Başarılı İşlem
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.summary.successCount}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Ortalama Sepet
          </p>
          <p className="mt-3 text-2xl font-semibold tabular">
            {formatPaymentAmount(
              report.summary.averageOrderValue,
              report.summary.currency,
            )}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Başarısız / Bekleyen
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.summary.failedCount}
            <span className="mx-2 text-lg text-[#888]">/</span>
            {report.summary.pendingCount}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-1">
          <h2 className="text-lg font-semibold">Durum Dağılımı</h2>
          <dl className="mt-5 space-y-4">
            {report.statusBreakdown.map((row) => (
              <div
                key={row.status}
                className="flex items-start justify-between gap-4 border-b border-[#1a1a1a] pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <dt className="text-sm font-medium">
                    {PAYMENT_STATUS_LABELS[row.status]}
                  </dt>
                  <dd className="mt-1 text-xs text-[#888]">
                    {formatPercent(
                      row.count,
                      report.statusBreakdown.reduce((sum, item) => sum + item.count, 0),
                    )}{" "}
                    · {row.count} işlem
                  </dd>
                </div>
                <dd className="text-sm tabular text-[#ededed]">
                  {formatPaymentAmount(row.revenue, report.summary.currency)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-6 xl:col-span-1">
          <h2 className="text-lg font-semibold">Kaynak Dağılımı</h2>
          <dl className="mt-5 space-y-4">
            {report.providerBreakdown.map((row) => (
              <div
                key={row.provider}
                className="flex items-start justify-between gap-4 border-b border-[#1a1a1a] pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <dt className="text-sm font-medium">
                    {row.provider === "IYZICO" ? "iyzico" : "Ücretsiz kayıt"}
                  </dt>
                  <dd className="mt-1 text-xs text-[#888]">{row.count} işlem</dd>
                </div>
                <dd className="text-sm tabular text-[#ededed]">
                  {formatPaymentAmount(row.revenue, report.summary.currency)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-6 xl:col-span-1">
          <h2 className="text-lg font-semibold">Ödeme Tipi</h2>
          <dl className="mt-5 space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-[#1a1a1a] pb-4">
              <div>
                <dt className="text-sm font-medium">Tek çekim</dt>
                <dd className="mt-1 text-xs text-[#888]">
                  {report.summary.singlePaymentCount} işlem
                </dd>
              </div>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <dt className="text-sm font-medium">Taksitli</dt>
                <dd className="mt-1 text-xs text-[#888]">
                  {report.summary.installmentCount} işlem
                </dd>
              </div>
            </div>
          </dl>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1a1a1a] px-6 py-5">
          <h2 className="text-lg font-semibold">Eğitim Bazlı Gelir</h2>
          <p className="mt-1 text-sm text-[#888]">
            Her eğitimin ne kadar kazandırdığını, satış adedini ve kayıt
            performansını görüntüleyin.
          </p>
        </div>

        {report.educationRows.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Seçilen filtrelere uygun eğitim bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Eğitim</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Liste Fiyatı</th>
                  <th className="px-4 py-3 font-medium">Başarılı</th>
                  <th className="px-4 py-3 font-medium">Başarısız</th>
                  <th className="px-4 py-3 font-medium">Ücretsiz</th>
                  <th className="px-4 py-3 font-medium">Toplam Gelir</th>
                  <th className="px-4 py-3 font-medium">Ort. Gelir</th>
                  <th className="px-4 py-3 font-medium">Pay</th>
                </tr>
              </thead>
              <tbody>
                {report.educationRows.map((row) => (
                  <tr
                    key={row.educationId}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={`/education/${row.slug}`}
                        className="font-medium hover:text-white"
                      >
                        {row.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="rounded-full border border-[#333] px-2.5 py-1 text-xs text-[#888]">
                        {EDUCATION_STATUS_LABELS[row.educationStatus]}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {row.isFree
                        ? "Ücretsiz"
                        : row.listPrice
                          ? formatPaymentAmount(row.listPrice, row.currency)
                          : "—"}
                    </td>
                    <td className="px-4 py-4 align-top tabular">
                      {row.successCount}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {row.failedCount}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {row.freeEnrollmentCount}
                    </td>
                    <td className="px-4 py-4 align-top tabular font-medium">
                      {formatPaymentAmount(row.totalRevenue, row.currency)}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {row.successCount > 0
                        ? formatPaymentAmount(row.averageRevenue, row.currency)
                        : "—"}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {formatPercent(row.totalRevenue, report.summary.totalRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-[#1a1a1a] bg-[#080808]">
                <tr>
                  <td className="px-4 py-4 font-medium" colSpan={3}>
                    Toplam
                  </td>
                  <td className="px-4 py-4 tabular font-medium">
                    {report.educationRows.reduce(
                      (sum, row) => sum + row.successCount,
                      0,
                    )}
                  </td>
                  <td className="px-4 py-4 tabular font-medium text-[#888]">
                    {report.educationRows.reduce(
                      (sum, row) => sum + row.failedCount,
                      0,
                    )}
                  </td>
                  <td className="px-4 py-4 tabular font-medium text-[#888]">
                    {report.educationRows.reduce(
                      (sum, row) => sum + row.freeEnrollmentCount,
                      0,
                    )}
                  </td>
                  <td className="px-4 py-4 tabular font-medium">
                    {formatPaymentAmount(
                      report.summary.totalRevenue,
                      report.summary.currency,
                    )}
                  </td>
                  <td className="px-4 py-4" colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1a1a1a] px-6 py-5">
          <h2 className="text-lg font-semibold">Aylık Tahsilat</h2>
          <p className="mt-1 text-sm text-[#888]">
            Seçilen dönemdeki başarılı ödemelerin aylık dağılımı.
          </p>
        </div>

        {report.monthlyBreakdown.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Bu filtrelerle aylık tahsilat verisi bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Ay</th>
                  <th className="px-4 py-3 font-medium">İşlem Sayısı</th>
                  <th className="px-4 py-3 font-medium">Tahsilat</th>
                  <th className="px-4 py-3 font-medium">Pay</th>
                </tr>
              </thead>
              <tbody>
                {report.monthlyBreakdown.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top font-medium">{row.label}</td>
                    <td className="px-4 py-4 align-top tabular">{row.count}</td>
                    <td className="px-4 py-4 align-top tabular">
                      {formatPaymentAmount(row.revenue, report.summary.currency)}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {formatPercent(row.revenue, report.summary.totalRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
