"use client";

type InfoTooltipProps = {
  text: string;
};

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Bilgi"
        className="flex h-4 w-4 items-center justify-center rounded-full border border-[#333] text-[10px] font-medium text-[#888] transition-colors hover:border-[#555] hover:text-[#ededed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
      >
        ?
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-md border border-[#1a1a1a] bg-[#0a0a0a] px-3 py-2 text-left text-[11px] leading-relaxed text-[#ededed] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
