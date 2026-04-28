import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ children, className = "", as = "div" }: CardProps) {
  const Tag = as;
  return (
    <Tag
      className={`relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] transition-colors duration-300 hover:border-[#333] ${className}`}
    >
      {children}
    </Tag>
  );
}
