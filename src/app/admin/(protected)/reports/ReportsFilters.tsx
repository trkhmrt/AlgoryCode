"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import type { ReportFilters } from "@/lib/reports";

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors focus:border-[#333]";

type ReportsFiltersProps = {
  filters: ReportFilters;
  educations: Array<{ id: string; title: string }>;
};

export function ReportsFilters({ filters, educations }: ReportsFiltersProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value);
      }
    }

    startTransition(() => {
      router.push(`/admin/reports?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Eğitim
          </span>
          <select
            name="educationId"
            defaultValue={filters.educationId ?? ""}
            className={inputClassName}
          >
            <option value="">Tüm eğitimler</option>
            {educations.map((education) => (
              <option key={education.id} value={education.id}>
                {education.title}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Başlangıç Tarihi
          </span>
          <input
            type="date"
            name="from"
            defaultValue={filters.from ?? ""}
            className={inputClassName}
          />
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Bitiş Tarihi
          </span>
          <input
            type="date"
            name="to"
            defaultValue={filters.to ?? ""}
            className={inputClassName}
          />
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Ödeme Durumu
          </span>
          <select
            name="status"
            defaultValue={filters.status}
            className={inputClassName}
          >
            <option value="SUCCESS">Başarılı</option>
            <option value="FAILED">Başarısız</option>
            <option value="PENDING">Bekliyor</option>
            <option value="ALL">Tümü</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Ödeme Kaynağı
          </span>
          <select
            name="provider"
            defaultValue={filters.provider}
            className={inputClassName}
          >
            <option value="ALL">Tümü</option>
            <option value="IYZICO">iyzico</option>
            <option value="FREE">Ücretsiz kayıt</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Taksit Tipi
          </span>
          <select
            name="installment"
            defaultValue={filters.installment}
            className={inputClassName}
          >
            <option value="ALL">Tümü</option>
            <option value="SINGLE">Tek çekim</option>
            <option value="INSTALLMENT">Taksitli</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Filtreleniyor..." : "Filtrele"}
        </Button>
        <Link
          href="/admin/reports"
          className="inline-flex h-11 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
        >
          Filtreleri Temizle
        </Link>
      </div>
    </form>
  );
}
