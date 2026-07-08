import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-white text-black border border-white hover:bg-[#ededed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  secondary:
    "bg-transparent text-text border border-border hover:border-border-bright hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-bright",
  ghost:
    "bg-transparent text-text border border-transparent hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-bright",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
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

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {props.children}
      </Link>
    );
  }
  const { children, className: _c, variant: _v, size: _s, ...rest } =
    props as ButtonAsButton;
  void _c;
  void _v;
  void _s;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
