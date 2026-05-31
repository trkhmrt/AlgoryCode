"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import type { TrafficFilters as TrafficFiltersType } from "@/lib/analytics";

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors focus:border-[#333]";

type AnalyticsFiltersProps = {
  filters: TrafficFiltersType;
};

export function AnalyticsFilters({ filters }: AnalyticsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(searchParams.toString());

    for (const key of ["from", "to"]) {
      const value = String(formData.get(key) ?? "");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    startTransition(() => {
      router.push(`/admin/analytics?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Filtreleniyor..." : "Filtrele"}
        </Button>
        <Link
          href="/admin/analytics"
          className="inline-flex h-11 items-center rounded-md border border-[#333] px-4 text-sm text-[#ededed] transition-colors hover:border-[#555] hover:text-white"
        >
          Filtreleri Temizle
        </Link>
      </div>
    </form>
  );
}
