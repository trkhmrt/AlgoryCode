"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { EducationContentSection } from "@/lib/education";

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

const textareaClassName =
  "min-h-[120px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

type EducationContentSectionsFieldProps = {
  initialSections?: EducationContentSection[];
};

export function EducationContentSectionsField({
  initialSections = [],
}: EducationContentSectionsFieldProps) {
  const [sections, setSections] = useState<EducationContentSection[]>(
    initialSections.length > 0 ? initialSections : [{ title: "", body: "" }],
  );

  function updateSection(
    index: number,
    field: keyof EducationContentSection,
    value: string,
  ) {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    );
  }

  function addSection() {
    setSections((current) => [...current, { title: "", body: "" }]);
  }

  function removeSection(index: number) {
    setSections((current) =>
      current.length === 1
        ? [{ title: "", body: "" }]
        : current.filter((_, sectionIndex) => sectionIndex !== index),
    );
  }

  const serializedSections = JSON.stringify(
    sections.filter((section) => section.title.trim() && section.body.trim()),
  );

  return (
    <div className="space-y-4">
      <input type="hidden" name="contentSections" value={serializedSections} />

      {sections.map((section, index) => (
        <div
          key={index}
          className="space-y-3 rounded-[8px] border border-[#1a1a1a] bg-[#080808] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium text-[#ededed]">
              Bölüm {index + 1}
            </p>
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="text-xs text-[#888] transition-colors hover:text-[#ededed]"
            >
              Kaldır
            </button>
          </div>

          <input
            value={section.title}
            onChange={(event) => updateSection(index, "title", event.target.value)}
            className={inputClassName}
            placeholder="Örn. Bu eğitimde neler var?"
          />

          <textarea
            value={section.body}
            onChange={(event) => updateSection(index, "body", event.target.value)}
            className={textareaClassName}
            placeholder="Bölüm içeriği..."
          />
        </div>
      ))}

      <Button type="button" variant="secondary" size="sm" onClick={addSection}>
        Bölüm Ekle
      </Button>
    </div>
  );
}
