"use client";

import { FileText, LayoutList } from "lucide-react";
import { useState } from "react";
import { CourseCurriculumAccordion } from "@/components/education/CourseCurriculumAccordion";

type EducationAboutAccordionProps = {
  description: string;
};

type TabKey = "aciklama" | "icerik";

const tabClass = (active: boolean, disabled: boolean) =>
  `inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333] ${
    disabled
      ? "cursor-not-allowed text-[#444]"
      : active
        ? "bg-[#1a1a1a] font-medium text-[#ededed]"
        : "font-normal text-[#666] hover:text-[#888]"
  }`;

export function EducationAboutAccordion({
  description,
}: EducationAboutAccordionProps) {
  const hasAciklama = description.trim().length > 0;
  const hasIcerik = true;

  const [activeTab, setActiveTab] = useState<TabKey>(
    hasAciklama ? "aciklama" : "icerik",
  );

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Eğitim hakkında sekmeleri"
        className="inline-flex gap-0.5 rounded-md bg-[#0a0a0a] p-1"
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
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#888]">
            {description}
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
          <CourseCurriculumAccordion />
        </div>
      ) : null}
    </div>
  );
}
