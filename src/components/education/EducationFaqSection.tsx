"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  EDUCATION_FAQS,
  type EducationFaqItem,
} from "@/lib/education-faqs";

type EducationFaqSectionProps = {
  faqs?: EducationFaqItem[];
};

export function EducationFaqSection({
  faqs = EDUCATION_FAQS,
}: EducationFaqSectionProps) {
  const items = faqs.filter(
    (faq) => faq.question.trim() && faq.answer.trim(),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="heading text-xl font-semibold">Sıkça Sorulan Sorular</h2>
      <p className="mt-2 text-sm text-[#888]">
        Eğitim hakkında en çok merak edilenler.
      </p>

      <div className="mt-6 divide-y divide-[#e5dfd6] overflow-hidden rounded-xl border border-[#e5dfd6] bg-[#faf8f5]">
        {items.map((faq, index) => (
          <FaqItem
            key={`${faq.question}-${index}`}
            question={faq.question}
            answer={faq.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#f3efe9]"
      >
        <span className="text-[15px] font-medium text-[#121212]">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#8a847c] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className="px-5 pb-5">
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#6b6560]">
            {answer}
          </p>
        </div>
      ) : null}
    </div>
  );
}
