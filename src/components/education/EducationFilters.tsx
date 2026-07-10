"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  EDUCATION_TRACK_LABELS,
  EDUCATION_TRACK_TECH_MAP,
  type EducationTrack,
} from "@/lib/education";
import {
  EDUCATION_LIST_ANCHOR_ID,
  markEducationFilterNav,
} from "@/components/education/EducationScrollManager";

const MAIN_TRACKS: EducationTrack[] = [
  "FRONTEND",
  "BACKEND",
  "MOBILE",
  "DEVOPS",
  "DATABASE",
  "AI",
  "FULLSTACK",
];

function buildHref(
  pathname: string,
  current: URLSearchParams,
  updates: Partial<Record<"track" | "tech", string | null>>,
) {
  const params = new URLSearchParams(current.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }

  const query = params.toString();
  const base = query ? `${pathname}?${query}` : pathname;
  return `${base}#${EDUCATION_LIST_ANCHOR_ID}`;
}

export function EducationFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTrack = searchParams.get("track") ?? "";
  const selectedTech = searchParams.get("tech") ?? "";
  const activeTrack =
    selectedTrack && selectedTrack in EDUCATION_TRACK_LABELS
      ? (selectedTrack as EducationTrack)
      : null;

  const subcategories = activeTrack
    ? EDUCATION_TRACK_TECH_MAP[activeTrack]
    : [];

  const clearHref = `${pathname}#${EDUCATION_LIST_ANCHOR_ID}`;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#888]">
            Alan
          </p>
          <p className="mt-1 text-sm text-[#888]">
            Önce ana kategoriyi seçin, ardından alt kategoriyi belirleyin.
          </p>
        </div>
        {selectedTrack || selectedTech ? (
          <Link
            href={clearHref}
            scroll={false}
            onClick={markEducationFilterNav}
            className="text-sm font-medium text-[#121212] underline-offset-2 hover:underline"
          >
            Filtreleri temizle
          </Link>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          href={clearHref}
          active={!selectedTrack}
          label="Tümü"
        />
        {MAIN_TRACKS.map((track) => (
          <FilterChip
            key={track}
            href={buildHref(pathname, searchParams, {
              track: selectedTrack === track ? null : track,
              tech: null,
            })}
            active={selectedTrack === track}
            label={EDUCATION_TRACK_LABELS[track]}
          />
        ))}
      </div>

      {activeTrack ? (
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-foreground">
            {EDUCATION_TRACK_LABELS[activeTrack]} — Alt kategori
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              href={buildHref(pathname, searchParams, { tech: null })}
              active={!selectedTech}
              label="Tümü"
            />
            {subcategories.map((tech) => (
              <FilterChip
                key={tech}
                href={buildHref(pathname, searchParams, {
                  tech: selectedTech === tech ? null : tech,
                })}
                active={selectedTech === tech}
                label={tech}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      onClick={markEducationFilterNav}
      className={
        active
          ? "inline-flex items-center rounded-full border border-[#2a2622] bg-[#2a2622] px-3.5 py-1.5 text-[13px] font-medium text-[#f3efe9]"
          : "inline-flex items-center rounded-full border border-[#d9d2c8] bg-[#ebe6de] px-3.5 py-1.5 text-[13px] font-medium text-[#6b6560] transition-colors hover:border-[#c4bbb0] hover:bg-[#e4ddd3] hover:text-[#2a2622]"
      }
    >
      {label}
    </Link>
  );
}
