import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-secondary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        speed: "border-[#1a3a26] bg-[#0a0a0a] text-[#00ff88]",
        security: "border-[#16243f] bg-[#0a0a0a] text-[#3b82f6]",
        scale: "border-[#311a4a] bg-[#0a0a0a] text-[#a855f7]",
        warn: "border-[#3a2a0c] bg-[#0a0a0a] text-[#f59e0b]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    tone?: "default" | "speed" | "security" | "scale" | "warn";
  };

export function Badge({
  className,
  variant,
  tone,
  ...props
}: BadgeProps) {
  const resolvedVariant = tone ?? variant ?? "default";
  return (
    <span
      className={cn(badgeVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
