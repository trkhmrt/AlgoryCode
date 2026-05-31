"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import type { PathVisitFilters } from "@/lib/analytics";

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors focus:border-[#333]";

type PathVisitFiltersProps = {
  filters: PathVisitFilters;
};

export function PathVisitFiltersForm({ filters }: PathVisitFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(searchParams.toString());
    params.set("path", filters.path);
    params.delete("page");

    for (const key of ["from", "to", "sort"]) {
      const value = String(formData.get(key) ?? "");
      if (value) {
        params.set(key, value);
      } else if (key !== "sort") {
        params.delete(key);
      }
    }

    startTransition(() => {
      router.push(`/admin/analytics/path?${params.toString()}`);
    });
  }

  const clearHref = `/admin/analytics/path?path=${encodeURIComponent(filters.path)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
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
            Sıralama
          </span>
          <select
            name="sort"
            defaultValue={filters.sort}
            className={inputClassName}
          >
            <option value="newest">Yeni → Eski</option>
            <option value="oldest">Eski → Yeni</option>
            <option value="ip_asc">IP (A → Z)</option>
            <option value="ip_desc">IP (Z → A)</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Uygulanıyor..." : "Filtrele"}
        </Button>
        <Link
          href={clearHref}
          className="inline-flex h-11 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
        >
          Filtreleri Temizle
        </Link>
      </div>
    </form>
  );
}
