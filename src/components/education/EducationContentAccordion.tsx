"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { EducationContentSection } from "@/lib/education";

type EducationContentAccordionProps = {
  sections: EducationContentSection[];
};

export function EducationContentAccordion({
  sections,
}: EducationContentAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-[#1a1a1a] rounded-[8px] border border-[#1a1a1a]">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={`${section.title}-${index}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#080808] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#333]"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-[#ededed]">
                {section.title}
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-[#888] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-[#1a1a1a] px-5 py-4">
                <p className="whitespace-pre-line text-sm leading-7 text-[#888]">
                  {section.body}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
