import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/components/ui/Card";
import {
  DailyBarChart,
  HorizontalBarChart,
} from "@/components/admin/TrafficCharts";
import { buildPathAnalyticsHref, getTrafficReportData, parseTrafficFilters } from "@/lib/analytics";
import {
  formatVisitDevice,
  formatVisitLocation,
} from "@/lib/client-request-meta";
import { formatDateTimeTR } from "@/lib/payments";
import { AnalyticsFilters } from "./AnalyticsFilters";

export const metadata: Metadata = {
  title: "Site Analytics — Admin",
  description: "URL bazlı site trafiği ve ziyaret raporları",
};

export const dynamic = "force-dynamic";

type AnalyticsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default async function AdminAnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const query = await searchParams;
  const filters = parseTrafficFilters(query);
  const report = await getTrafficReportData(filters);
  const activeFilterCount = [filters.from, filters.to].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Site Analytics</h1>
        <p className="mt-2 text-[#888]">
          Hangi URL&apos;lerin ne kadar ziyaret edildiğini grafiksel olarak
          inceleyin.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Filtreler</h2>
          <p className="mt-1 text-sm text-[#888]">
            {activeFilterCount > 0
              ? `${activeFilterCount} aktif filtre uygulanıyor.`
              : "Tüm dönemdeki site ziyaretleri gösteriliyor."}
          </p>
        </div>
        <Suspense fallback={<p className="text-sm text-[#888]">Filtreler yükleniyor...</p>}>
          <AnalyticsFilters filters={filters} />
        </Suspense>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Toplam Görüntülenme
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.totalViews.toLocaleString("tr-TR")}
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
            Farklı URL
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {report.uniquePaths.toLocaleString("tr-TR")}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            En Yoğun Sayfa
          </p>
          <p className="mt-3 truncate text-lg font-semibold">
            {report.topPaths[0]?.path ?? "—"}
          </p>
          {report.topPaths[0] ? (
            <p className="mt-1 text-sm tabular text-[#888]">
              {report.topPaths[0].views.toLocaleString("tr-TR")} görüntülenme
            </p>
          ) : null}
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">En Çok Ziyaret Edilen URL&apos;ler</h2>
          <p className="mt-1 text-sm text-[#888]">
            Seçilen dönemde en çok görüntülenen sayfalar.
          </p>
          <div className="mt-6">
            {report.topPaths.length === 0 ? (
              <p className="text-sm text-[#888]">
                Henüz trafik verisi yok. Site gezildikçe burada görünecek.
              </p>
            ) : (
              <HorizontalBarChart
                items={report.topPaths.map((row) => ({
                  label: row.path,
                  value: row.views,
                  meta: formatPercent(row.share),
                  href: buildPathAnalyticsHref(row.path, filters),
                }))}
              />
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Günlük Trafik</h2>
          <p className="mt-1 text-sm text-[#888]">
            Gün bazında toplam sayfa görüntülenmesi.
          </p>
          <div className="mt-6">
            {report.dailyViews.length === 0 ? (
              <p className="text-sm text-[#888]">
                Seçilen dönem için günlük trafik bulunamadı.
              </p>
            ) : (
              <DailyBarChart
                items={report.dailyViews.map((row) => ({
                  label: row.label,
                  value: row.views,
                }))}
              />
            )}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1a1a1a] px-6 py-5">
          <h2 className="text-lg font-semibold">URL Detay Tablosu</h2>
          <p className="mt-1 text-sm text-[#888]">
            Her URL&apos;in görüntülenme sayısı ve toplam trafik içindeki payı.
          </p>
        </div>

        {report.topPaths.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Henüz trafik kaydı yok. Public sayfalar gezildikçe veriler burada
            birikecek.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">URL</th>
                  <th className="px-4 py-3 font-medium">Görüntülenme</th>
                  <th className="px-4 py-3 font-medium">Pay</th>
                </tr>
              </thead>
              <tbody>
                {report.topPaths.map((row) => (
                  <tr
                    key={row.path}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={buildPathAnalyticsHref(row.path, filters)}
                        className="font-medium hover:text-white"
                      >
                        {row.path}
                      </Link>
                    </td>
                    <td className="px-4 py-4 align-top tabular">
                      {row.views.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-4 py-4 align-top tabular text-[#888]">
                      {formatPercent(row.share)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1a1a1a] px-6 py-5">
          <h2 className="text-lg font-semibold">Son Ziyaretler</h2>
          <p className="mt-1 text-sm text-[#888]">
            Seçilen dönemdeki son 50 ziyaret; URL, IP, cihaz, konum ve referrer
            bilgisi.
          </p>
        </div>

        {report.recentVisits.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Henüz ziyaret kaydı yok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">URL</th>
                  <th className="px-4 py-3 font-medium">IP Adresi</th>
                  <th className="px-4 py-3 font-medium">Cihaz</th>
                  <th className="px-4 py-3 font-medium">Konum</th>
                  <th className="px-4 py-3 font-medium">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {report.recentVisits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatDateTimeTR(new Date(visit.createdAt))}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={buildPathAnalyticsHref(visit.path, filters)}
                        className="font-medium hover:text-white"
                      >
                        {visit.path}
                      </Link>
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
    </div>
  );
}
