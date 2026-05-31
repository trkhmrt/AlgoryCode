import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  EDUCATION_STATUS_LABELS,
  formatDateTR,
  formatEducationDuration,
  formatPrice,
} from "@/lib/education";
import { prisma } from "@/lib/prisma";
import { DeleteEducationButton } from "./DeleteEducationButton";

export const metadata: Metadata = {
  title: "Eğitimler — Admin",
  description: "Eğitimleri yönet",
};

export default async function AdminEducationsPage() {
  const educations = await prisma.education.findMany({
    orderBy: [{ status: "asc" }, { startDate: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading text-3xl font-semibold">Eğitimler</h1>
          <p className="mt-2 text-[#888]">
            Yayınladığınız eğitimleri ekleyin, düzenleyin veya arşivleyin.
          </p>
        </div>
        <Button href="/admin/educations/new">Yeni Eğitim</Button>
      </div>

      <Card className="overflow-hidden">
        {educations.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#888]">Henüz eğitim eklenmemiş.</p>
            <div className="mt-4">
              <Button href="/admin/educations/new" variant="secondary">
                İlk Eğitimi Oluştur
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Eğitim</th>
                  <th className="px-4 py-3 font-medium">Eğitmen</th>
                  <th className="px-4 py-3 font-medium">Başlangıç</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {educations.map((education) => (
                  <tr
                    key={education.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <p className="font-medium text-[#ededed]">
                          {education.title}
                        </p>
                        <p className="text-xs text-[#888]">
                          {EDUCATION_FORMAT_LABELS[education.format]} ·{" "}
                          {EDUCATION_LEVEL_LABELS[education.level]} ·{" "}
                          {formatPrice(
                            education.isFree,
                            education.price,
                            education.currency,
                          )}
                        </p>
                        {formatEducationDuration(
                          education.durationWeeks,
                          education.durationHours,
                        ) ? (
                          <p className="text-xs text-[#666]">
                            {formatEducationDuration(
                              education.durationWeeks,
                              education.durationHours,
                            )}
                          </p>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {education.instructorName}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatDateTR(new Date(education.startDate))}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="rounded-full border border-[#333] px-2.5 py-1 text-xs">
                        {EDUCATION_STATUS_LABELS[education.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/admin/educations/${education.id}/edit`}
                          className="text-sm text-[#ededed] transition-colors hover:text-white"
                        >
                          Düzenle
                        </Link>
                        {education.status === "PUBLISHED" ? (
                          <Link
                            href={`/education/${education.slug}`}
                            className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
                          >
                            Görüntüle
                          </Link>
                        ) : null}
                        <DeleteEducationButton
                          id={education.id}
                          title={education.title}
                        />
                      </div>
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
