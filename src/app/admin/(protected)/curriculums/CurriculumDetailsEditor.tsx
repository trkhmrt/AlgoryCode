"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { CurriculumLesson } from "@/lib/curriculum";

type DetailDraft = {
  key: string;
  title: string;
  totalDuration: string;
  lessonsText: string;
};

type CurriculumDetailsEditorProps = {
  initialDetails?: Array<{
    title: string;
    totalDuration?: string | null;
    lessons: CurriculumLesson[];
  }>;
};

function createKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function lessonsToText(lessons: CurriculumLesson[]): string {
  return lessons
    .map((lesson) => {
      const base = `${lesson.title} | ${lesson.duration}`;
      return lesson.previewUrl ? `${base} | ${lesson.previewUrl}` : base;
    })
    .join("\n");
}

function textToLessons(value: string): CurriculumLesson[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, duration, previewUrl] = line.split("|").map((part) => part.trim());
      return {
        title: title || "Ders",
        duration: duration || "—",
        ...(previewUrl ? { previewUrl } : {}),
      };
    });
}

export function CurriculumDetailsEditor({
  initialDetails = [],
}: CurriculumDetailsEditorProps) {
  const [details, setDetails] = useState<DetailDraft[]>(() =>
    initialDetails.length > 0
      ? initialDetails.map((detail) => ({
          key: createKey(),
          title: detail.title,
          totalDuration: detail.totalDuration ?? "",
          lessonsText: lessonsToText(detail.lessons),
        }))
      : [
          {
            key: createKey(),
            title: "",
            totalDuration: "",
            lessonsText: "",
          },
        ],
  );

  const serialized = useMemo(
    () =>
      details.map((detail) => ({
        title: detail.title,
        totalDuration: detail.totalDuration,
        lessons: textToLessons(detail.lessonsText),
      })),
    [details],
  );

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div
          key={detail.key}
          className="space-y-3 rounded-md border border-[#1a1a1a] bg-[#080808] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-[#ededed]">
              Konu {index + 1}
            </p>
            <button
              type="button"
              onClick={() =>
                setDetails((current) =>
                  current.length === 1
                    ? current
                    : current.filter((item) => item.key !== detail.key),
                )
              }
              className="inline-flex items-center gap-1 text-xs text-[#888] transition-colors hover:text-red-300"
            >
              <Trash2 size={14} />
              Sil
            </button>
          </div>

          <input type="hidden" name="detailTitle" value={detail.title} />
          <input
            type="hidden"
            name="detailDuration"
            value={detail.totalDuration}
          />
          <input
            type="hidden"
            name="detailLessons"
            value={JSON.stringify(serialized[index]?.lessons ?? [])}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-[13px] font-medium text-[#ededed]">
                Konu başlığı
              </span>
              <input
                value={detail.title}
                onChange={(event) =>
                  setDetails((current) =>
                    current.map((item) =>
                      item.key === detail.key
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
                className="h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]"
                placeholder="HTML Dersleri"
              />
            </label>

            <label className="space-y-2">
              <span className="block text-[13px] font-medium text-[#ededed]">
                Toplam süre
              </span>
              <input
                value={detail.totalDuration}
                onChange={(event) =>
                  setDetails((current) =>
                    current.map((item) =>
                      item.key === detail.key
                        ? { ...item, totalDuration: event.target.value }
                        : item,
                    ),
                  )
                }
                className="h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]"
                placeholder="3 sa"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="block text-[13px] font-medium text-[#ededed]">
              Dersler
            </span>
            <p className="text-xs text-[#888]">
              Her satır: Başlık | Süre | Önizleme URL (opsiyonel)
            </p>
            <textarea
              value={detail.lessonsText}
              onChange={(event) =>
                setDetails((current) =>
                  current.map((item) =>
                    item.key === detail.key
                      ? { ...item, lessonsText: event.target.value }
                      : item,
                  ),
                )
              }
              className="min-h-[140px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]"
              placeholder={"HTML Nedir? | 8:12 | #\nTemel Etiketler | 14:05"}
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setDetails((current) => [
            ...current,
            {
              key: createKey(),
              title: "",
              totalDuration: "",
              lessonsText: "",
            },
          ])
        }
        className="inline-flex items-center gap-2 rounded-md border border-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] transition-colors hover:border-[#333] hover:bg-[#0a0a0a]"
      >
        <Plus size={15} />
        Konu Ekle
      </button>
    </div>
  );
}
