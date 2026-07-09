import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 border border-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:border-white/15 dark:hover:bg-white/5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-white/5",
        link: "text-primary underline-offset-4 hover:underline",
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 border border-primary/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-[13px]",
        md: "h-10 px-4 text-[14px]",
        lg: "h-12 rounded-md px-6 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type CommonProps = ButtonVariants & {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function resolveVariant(variant?: ButtonVariants["variant"]) {
  if (variant === "primary") return "default";
  if (variant === "secondary") return "outline";
  return variant;
}

function resolveSize(size?: ButtonVariants["size"]) {
  if (size === "md") return "default";
  return size;
}

export function Button(props: ButtonProps) {
  const {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    children,
  } = props;

  const resolvedVariant = resolveVariant(variant);
  const resolvedSize = resolveSize(size);
  const cls = cn(
    buttonVariants({ variant: resolvedVariant, size: resolvedSize, className }),
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";
  const { children: _c, className: _cl, variant: _v, size: _s, asChild: _a, ...rest } =
    props as ButtonAsButton;
  void _c;
  void _cl;
  void _v;
  void _s;
  void _a;

  return (
    <Comp className={cls} {...rest}>
      {children}
    </Comp>
  );
}

export { buttonVariants };
