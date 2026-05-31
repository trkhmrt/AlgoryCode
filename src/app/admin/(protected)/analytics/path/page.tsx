import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card } from "@/components/ui/Card";
import {
  buildAnalyticsHref,
  getPathVisitReportData,
  parsePathVisitFilters,
} from "@/lib/analytics";
import {
  formatVisitDevice,
  formatVisitLocation,
} from "@/lib/client-request-meta";
import { formatDateTimeTR } from "@/lib/payments";
import { PathVisitFiltersForm } from "./PathVisitFilters";

export const metadata: Metadata = {
  title: "URL Ziyaret Detayı — Site Analytics",
};

export const dynamic = "force-dynamic";

type PathVisitPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function buildPageHref(
  filters: ReturnType<typeof parsePathVisitFilters> & object,
  page: number,
): string {
  const params = new URLSearchParams();
  params.set("path", filters.path);

  if (filters.from) {
    params.set("from", filters.from);
  }

  if (filters.to) {
    params.set("to", filters.to);
  }

  if (filters.sort !== "newest") {
    params.set("sort", filters.sort);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  return `/admin/analytics/path?${params.toString()}`;
}

export default async function PathVisitPage({ searchParams }: PathVisitPageProps) {
  const query = await searchParams;
  const filters = parsePathVisitFilters(query);

  if (!filters) {
    notFound();
  }

  const report = await getPathVisitReportData(filters);
  const activeFilterCount = [
    filters.from,
    filters.to,
    filters.sort !== "newest" ? filters.sort : null,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={buildAnalyticsHref({ from: filters.from, to: filters.to })}
          className="text-sm text-[#888] transition-colors hover:text-white"
        >
          ← Site Analytics
        </Link>
        <h1 className="heading mt-4 text-3xl font-semibold">URL Ziyaret Detayı</h1>
        <p className="mt-2 font-mono text-sm text-[#ededed]">{filters.path}</p>
        <p className="mt-2 text-[#888]">
          Bu URL&apos;ye gelen istekleri tarih aralığına ve sıralama ölçütüne göre
          listeleyin.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Filtreler</h2>
          <p className="mt-1 text-sm text-[#888]">
            {activeFilterCount > 0
              ? `${activeFilterCount} aktif filtre uygulanıyor.`
              : "Tüm dönem, en yeni kayıtlar önce."}
          </p>
        </div>
        <Suspense fallback={<p className="text-sm text-[#888]">Filtreler yükleniyor...</p>}>
          <PathVisitFiltersForm filters={filters} />
        </Suspense>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Toplam Ziyaret
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.totalVisits.toLocaleString("tr-TR")}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Benzersiz IP
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.uniqueIps.toLocaleString("tr-TR")}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Sayfa
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.filters.page} / {report.totalPages}
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1a1a1a] px-6 py-5">
          <h2 className="text-lg font-semibold">Ziyaret Listesi</h2>
          <p className="mt-1 text-sm text-[#888]">
            Sayfa başına {report.visits.length > 0 ? "50" : "0"} kayıt gösteriliyor.
          </p>
        </div>

        {report.visits.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Seçilen filtrelere uygun ziyaret bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">IP Adresi</th>
                  <th className="px-4 py-3 font-medium">Cihaz</th>
                  <th className="px-4 py-3 font-medium">Konum</th>
                  <th className="px-4 py-3 font-medium">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {report.visits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatDateTimeTR(new Date(visit.createdAt))}
                    </td>
                    <td className="px-4 py-4 align-top font-mono text-xs tabular">
                      {visit.ipAddress ?? "—"}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatVisitDevice(visit)}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatVisitLocation(visit)}
                    </td>
                    <td className="max-w-xs truncate px-4 py-4 align-top text-[#888]">
                      {visit.referrer ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {report.totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#888]">
            {report.totalVisits.toLocaleString("tr-TR")} kayıttan{" "}
            {(report.filters.page - 1) * 50 + 1}–
            {Math.min(report.filters.page * 50, report.totalVisits)} arası
            gösteriliyor.
          </p>
          <div className="flex gap-2">
            {report.filters.page > 1 ? (
              <Link
                href={buildPageHref(filters, report.filters.page - 1)}
                className="inline-flex h-10 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
              >
                Önceki
              </Link>
            ) : null}
            {report.filters.page < report.totalPages ? (
              <Link
                href={buildPageHref(filters, report.filters.page + 1)}
                className="inline-flex h-10 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
              >
                Sonraki
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
