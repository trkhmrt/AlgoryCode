import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { DeleteCurriculumButton } from "./DeleteCurriculumButton";

export const metadata: Metadata = {
  title: "Müfredatlar — Admin",
  description: "Eğitim müfredatlarını yönet",
};

export default async function AdminCurriculumsPage() {
  const curriculums = await prisma.curriculum.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: {
          details: true,
          educations: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading text-3xl font-semibold">Müfredatlar</h1>
          <p className="mt-2 text-[#888]">
            Hazır müfredatlar oluşturun ve eğitimlere atayın.
          </p>
        </div>
        <Button href="/admin/curriculums/new">Yeni Müfredat</Button>
      </div>

      <Card className="overflow-hidden">
        {curriculums.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#888]">Henüz müfredat eklenmemiş.</p>
            <div className="mt-4">
              <Button href="/admin/curriculums/new" variant="secondary">
                İlk Müfredatı Oluştur
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Müfredat</th>
                  <th className="px-4 py-3 font-medium">Konu</th>
                  <th className="px-4 py-3 font-medium">Atanan Eğitim</th>
                  <th className="px-4 py-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {curriculums.map((curriculum) => (
                  <tr
                    key={curriculum.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top">
                      <p className="font-medium text-[#ededed]">
                        {curriculum.title}
                      </p>
                      {curriculum.description ? (
                        <p className="mt-1 line-clamp-2 text-xs text-[#888]">
                          {curriculum.description}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {curriculum._count.details}
                    </td>
                    <td className="px-4 py-4 align-top text-[#888]">
                      {curriculum._count.educations}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/curriculums/${curriculum.id}/edit`}
                          className="inline-flex h-9 items-center rounded-md border border-[#1a1a1a] px-3 text-sm text-[#ededed] transition-colors hover:border-[#333] hover:bg-[#0a0a0a]"
                        >
                          Düzenle
                        </Link>
                        <DeleteCurriculumButton
                          id={curriculum.id}
                          title={curriculum.title}
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
