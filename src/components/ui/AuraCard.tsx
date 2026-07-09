import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

type AuraCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent: string;
  className?: string;
};

export function AuraCard({
  children,
  accent,
  className,
  ...props
}: AuraCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/80 bg-card/50 backdrop-blur-sm",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1 hover:border-border hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
        "dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: accent }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -bottom-16 -left-16 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </Card>
  );
}
