import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ContactFiltersBar } from "@/app/admin/(protected)/contacts/ContactFilters";
import {
  buildContactWhere,
  CONTACT_TYPE_LABELS,
  formatContactDate,
  formatContactName,
  parseContactFilters,
  type ContactListItem,
} from "@/lib/contact";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "İletişim — Admin",
  description: "İletişim formlarından gelen mesajlar",
};

type AdminContactsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminContactsPage({
  searchParams,
}: AdminContactsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseContactFilters(resolvedSearchParams);
  const where = buildContactWhere(filters);

  const [contacts, stats] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      include: {
        education: {
          select: { title: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.groupBy({
      by: ["type"],
      _count: { _all: true },
    }),
  ]);

  const typedContacts = contacts as ContactListItem[];
  const educationCount =
    stats.find((item) => item.type === "EDUCATION")?._count._all ?? 0;
  const jobRequestCount =
    stats.find((item) => item.type === "JOB_REQUEST")?._count._all ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">İletişim</h1>
        <p className="mt-2 text-[#888]">
          Eğitim ve iş talebi formlarından gelen mesajları görüntüleyin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Toplam Mesaj
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {educationCount + jobRequestCount}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            Eğitim
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">{educationCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
            İş Talebi
          </p>
          <p className="mt-3 text-3xl font-semibold tabular">
            {jobRequestCount}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <ContactFiltersBar filters={filters} />
      </Card>

      <Card className="overflow-hidden">
        {typedContacts.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#888]">
            Henüz iletişim kaydı yok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#1a1a1a] bg-[#080808] text-[#888]">
                <tr>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">Ad</th>
                  <th className="px-4 py-3 font-medium">Soyad</th>
                  <th className="px-4 py-3 font-medium">Telefon</th>
                  <th className="px-4 py-3 font-medium">Tip</th>
                  <th className="px-4 py-3 font-medium">Detay</th>
                </tr>
              </thead>
              <tbody>
                {typedContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-[#1a1a1a] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-top text-[#888]">
                      {formatContactDate(new Date(contact.createdAt))}
                    </td>
                    <td className="px-4 py-4 align-top font-medium">
                      {contact.firstName}
                    </td>
                    <td className="px-4 py-4 align-top font-medium">
                      {contact.lastName}
                    </td>
                    <td className="px-4 py-4 align-top">{contact.phone}</td>
                    <td className="px-4 py-4 align-top">
                      <span className="rounded-full border border-[#333] px-2.5 py-1 text-xs text-[#ededed]">
                        {CONTACT_TYPE_LABELS[contact.type]}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        className="text-sm text-[#ededed] hover:text-white"
                        aria-label={`${formatContactName(contact.firstName, contact.lastName)} mesaj detayı`}
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
    </div>
  );
}
