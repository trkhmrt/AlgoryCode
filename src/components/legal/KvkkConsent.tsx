"use client";

import { X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  KVKK_NOTICE_SECTIONS,
  KVKK_NOTICE_SUBTITLE,
  KVKK_NOTICE_TITLE,
} from "@/lib/kvkk";

type KvkkConsentProps = {
  error?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function KvkkConsent({
  error,
  tone = "light",
  className = "",
}: KvkkConsentProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const isDark = tone === "dark";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="kvkkAccepted"
          value="on"
          required
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border accent-[#121212] ${
            isDark ? "border-[#333] bg-black" : "border-[#d9d2c8] bg-white"
          }`}
        />
        <p
          className={`text-[13px] leading-relaxed ${
            isDark ? "text-[#aaa]" : "text-[#6b6560]"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`font-medium underline underline-offset-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark
                ? "text-[#ededed] focus-visible:outline-white"
                : "text-[#121212] focus-visible:outline-[#121212]"
            }`}
          >
            KVKK Aydınlatma Metni
          </button>
          &apos;ni okudum ve kişisel verilerimin belirtilen kapsamda
          işlenmesini kabul ediyorum.
        </p>
      </div>

      {error ? (
        <p
          className={`mt-2 text-xs ${
            isDark ? "text-red-300" : "text-red-600"
          }`}
        >
          {error}
        </p>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[#e5dfd6] bg-[#faf8f5] shadow-xl sm:max-h-[85vh] sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#e5dfd6] px-5 py-4 sm:px-6">
              <div className="min-w-0 pr-2">
                <h2
                  id={titleId}
                  className="text-[15px] font-semibold leading-snug tracking-tight text-[#121212] sm:text-base"
                >
                  {KVKK_NOTICE_TITLE}
                </h2>
                <p className="mt-1 text-[12px] text-[#8a847c]">
                  {KVKK_NOTICE_SUBTITLE}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5dfd6] text-[#6b6560] transition-colors hover:bg-[#f3efe9] hover:text-[#121212] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="space-y-6">
                {KVKK_NOTICE_SECTIONS.map((section) => (
                  <section key={section.heading} className="space-y-2.5">
                    <h3 className="text-[14px] font-semibold text-[#121212]">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-[13px] leading-relaxed text-[#6b6560]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-[#6b6560]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e5dfd6] px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#121212] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2622] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
