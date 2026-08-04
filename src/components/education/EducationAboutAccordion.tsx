"use client";

import { FileText, LayoutList, ListChecks } from "lucide-react";
import { useState } from "react";
import { CourseCurriculumAccordion } from "@/components/education/CourseCurriculumAccordion";
import type { CourseModuleView } from "@/lib/curriculum";

type EducationAboutAccordionProps = {
  description: string;
  prerequisites?: string | null;
  modules?: CourseModuleView[];
};

type TabKey = "aciklama" | "gereksinimler" | "icerik";

const tabClass = (active: boolean, disabled: boolean) =>
  `inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212] ${
    disabled
      ? "cursor-not-allowed text-[#bbb]"
      : active
        ? "bg-white font-medium text-foreground shadow-sm"
        : "font-normal text-[#888] hover:text-foreground"
  }`;

export function EducationAboutAccordion({
  description,
  prerequisites = null,
  modules = [],
}: EducationAboutAccordionProps) {
  const requirements = (prerequisites ?? "").trim();

  const hasAciklama = description.trim().length > 0;
  const hasGereksinimler = requirements.length > 0;
  const hasIcerik = modules.length > 0;

  const initialTab: TabKey = hasAciklama
    ? "aciklama"
    : hasGereksinimler
      ? "gereksinimler"
      : "icerik";

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Eğitim hakkında sekmeleri"
        className="inline-flex flex-wrap gap-0.5 rounded-md border border-border bg-white/60 p-1"
      >
        <button
          type="button"
          role="tab"
          id="education-tab-aciklama"
          aria-selected={activeTab === "aciklama"}
          aria-controls="education-panel-aciklama"
          onClick={() => setActiveTab("aciklama")}
          className={tabClass(activeTab === "aciklama", !hasAciklama)}
          disabled={!hasAciklama}
        >
          <FileText size={15} strokeWidth={1.5} />
          Açıklama
        </button>

        <button
          type="button"
          role="tab"
          id="education-tab-gereksinimler"
          aria-selected={activeTab === "gereksinimler"}
          aria-controls="education-panel-gereksinimler"
          onClick={() => setActiveTab("gereksinimler")}
          className={tabClass(activeTab === "gereksinimler", !hasGereksinimler)}
          disabled={!hasGereksinimler}
        >
          <ListChecks size={15} strokeWidth={1.5} />
          Gereksinimler
        </button>

        <button
          type="button"
          role="tab"
          id="education-tab-icerik"
          aria-selected={activeTab === "icerik"}
          aria-controls="education-panel-icerik"
          onClick={() => setActiveTab("icerik")}
          className={tabClass(activeTab === "icerik", !hasIcerik)}
          disabled={!hasIcerik}
        >
          <LayoutList size={15} strokeWidth={1.5} />
          İçerik
        </button>
      </div>

      {activeTab === "aciklama" && hasAciklama ? (
        <div
          role="tabpanel"
          id="education-panel-aciklama"
          aria-labelledby="education-tab-aciklama"
          className="pt-5"
        >
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#4a4640]">
            {description}
          </p>
        </div>
      ) : null}

      {activeTab === "gereksinimler" && hasGereksinimler ? (
        <div
          role="tabpanel"
          id="education-panel-gereksinimler"
          aria-labelledby="education-tab-gereksinimler"
          className="pt-5"
        >
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#4a4640]">
            {requirements}
          </p>
        </div>
      ) : null}

      {activeTab === "icerik" && hasIcerik ? (
        <div
          role="tabpanel"
          id="education-panel-icerik"
          aria-labelledby="education-tab-icerik"
          className="pt-5"
        >
          <CourseCurriculumAccordion modules={modules} />
        </div>
      ) : null}

      {activeTab === "icerik" && !hasIcerik ? (
        <div className="pt-5">
          <p className="text-sm text-[#888]">
            Bu eğitime henüz müfredat atanmamış.
          </p>
        </div>
      ) : null}
    </div>
  );
}
