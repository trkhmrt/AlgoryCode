import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  CONTACT_TYPE_LABELS,
  formatContactDate,
  formatContactName,
  type ContactDetailRecord,
} from "@/lib/contact";
import { prisma } from "@/lib/prisma";

type ContactDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ContactDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const contact = await prisma.contactSubmission.findUnique({
    where: { id },
    select: { firstName: true, lastName: true },
  });

  return {
    title: contact
      ? `${formatContactName(contact.firstName, contact.lastName)} — İletişim`
      : "İletişim Detayı — Admin",
  };
}

export default async function ContactDetailPage({
  params,
}: ContactDetailPageProps) {
  const { id } = await params;
  const contact: ContactDetailRecord | null =
    await prisma.contactSubmission.findUnique({
      where: { id },
      include: {
        education: {
          select: { title: true, slug: true },
        },
      },
    });

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/contacts"
          className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
        >
          ← Tüm İletişimler
        </Link>
        <h1 className="heading mt-4 text-3xl font-semibold">İletişim Detayı</h1>
        <p className="mt-2 text-[#888]">
          {formatContactName(contact.firstName, contact.lastName)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Kişi Bilgileri</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Ad</dt>
              <dd>{contact.firstName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Soyad</dt>
              <dd>{contact.lastName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Telefon</dt>
              <dd>{contact.phone}</dd>
            </div>
            {contact.email ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">E-posta</dt>
                <dd>{contact.email}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Tip</dt>
              <dd>{CONTACT_TYPE_LABELS[contact.type]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#888]">Tarih</dt>
              <dd>{formatContactDate(new Date(contact.createdAt))}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Bağlam</h2>
          <dl className="mt-5 space-y-4 text-sm">
            {contact.education ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">Eğitim</dt>
                <dd>
                  <Link
                    href={`/education/${contact.education.slug}`}
                    className="text-[#ededed] hover:text-white"
                  >
                    {contact.education.title}
                  </Link>
                </dd>
              </div>
            ) : null}
            {contact.company ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">Şirket</dt>
                <dd>{contact.company}</dd>
              </div>
            ) : null}
            {contact.domain ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">Alan</dt>
                <dd>{contact.domain}</dd>
              </div>
            ) : null}
            {contact.source ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[#888]">Kaynak</dt>
                <dd>{contact.source}</dd>
              </div>
            ) : null}
          </dl>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">Mesaj</h2>
        <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#888]">
          {contact.message}
        </p>
      </Card>
    </div>
  );
}
