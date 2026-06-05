"use client";

import { ChevronDown, PlayCircle } from "lucide-react";
import { useState } from "react";
import type { CourseModule } from "@/data/course-curriculum";
import { courseData } from "@/data/course-curriculum";

type CourseCurriculumAccordionProps = {
  modules?: CourseModule[];
};

export function CourseCurriculumAccordion({
  modules = courseData,
}: CourseCurriculumAccordionProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    modules[0]?.id ?? null,
  );

  if (modules.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#1a1a1a] bg-[#080808]">
      {modules.map((module, index) => {
        const isOpen = openModuleId === module.id;
        const isLast = index === modules.length - 1;

        return (
          <div
            key={module.id}
            className={isLast ? "" : "border-b border-[#1a1a1a]"}
          >
            <button
              type="button"
              onClick={() =>
                setOpenModuleId((current) =>
                  current === module.id ? null : module.id,
                )
              }
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#0a0a0a] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#333]"
              aria-expanded={isOpen}
            >
              <span className="flex min-w-0 items-center gap-3">
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#888] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="truncate text-[15px] font-semibold text-[#ededed]">
                  {module.title}
                </span>
              </span>

              <span className="shrink-0 text-[13px] text-[#888]">
                {module.lessonCount} ders • {module.totalDuration}
              </span>
            </button>

            {isOpen ? (
              <div className="border-t border-[#1a1a1a] bg-black">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isLastLesson = lessonIndex === module.lessons.length - 1;

                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between gap-4 px-5 py-3.5 pl-12 ${
                        isLastLesson ? "" : "border-b border-[#1a1a1a]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <PlayCircle
                          size={16}
                          className="shrink-0 text-[#666]"
                          strokeWidth={1.75}
                        />
                        <span className="truncate text-[14px] text-[#888]">
                          {lesson.title}
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-4">
                        {lesson.previewUrl ? (
                          <a
                            href={lesson.previewUrl}
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#a855f7] underline-offset-2 transition-colors hover:text-[#c084fc] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                          >
                            <PlayCircle size={14} strokeWidth={2} />
                            Önizleme
                          </a>
                        ) : null}
                        <span className="min-w-[2.5rem] text-right text-[13px] text-[#666]">
                          {lesson.duration}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
