import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "speed" | "security" | "scale" | "warn";
};

const TONE: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "border-[#1a1a1a] text-[#ededed]",
  speed: "border-[#1a3a26] text-[#00ff88]",
  security: "border-[#16243f] text-[#3b82f6]",
  scale: "border-[#311a4a] text-[#a855f7]",
  warn: "border-[#3a2a0c] text-[#f59e0b]",
};

export function Badge({ children, className = "", tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] tracking-tight bg-[#0a0a0a] ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
