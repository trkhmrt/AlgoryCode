"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactFilters } from "@/lib/contact";

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors focus:border-[#333]";

type ContactFiltersProps = {
  filters: ContactFilters;
};

export function ContactFiltersBar({ filters }: ContactFiltersProps) {
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
      router.push(`/admin/contacts?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            İletişim Tipi
          </span>
          <select
            name="type"
            defaultValue={filters.type}
            className={inputClassName}
          >
            <option value="ALL">Tümü</option>
            <option value="EDUCATION">Eğitim</option>
            <option value="JOB_REQUEST">İş Talebi</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="block text-[13px] font-medium text-[#ededed]">
            Ad, Soyad veya Telefon
          </span>
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="İsim veya telefon ara..."
            className={inputClassName}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Filtreleniyor..." : "Filtrele"}
        </Button>
        <Link
          href="/admin/contacts"
          className="inline-flex h-11 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
        >
          Filtreleri Temizle
        </Link>
      </div>
    </form>
  );
}
