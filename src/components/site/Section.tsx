import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow-sr">
      <span className="eyebrow-dot" aria-hidden />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="sr-heading mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">{title}</h1>
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
        >
          {description}
        </p>
        {children ? <div className="mt-10">{children}</div> : null}
      </Reveal>
    </section>
  );
}

export function Section({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("mx-auto max-w-6xl px-5 py-14 sm:py-20", className)}
    >
      {title ? (
        <Reveal className="mb-10 max-w-2xl">
          <h2 className="sr-heading text-3xl leading-[1.05] sm:text-5xl">{title}</h2>
          {description ? (
            <p
              className="mt-4 text-base sm:text-lg"
              style={{ color: "var(--sr-muted)", fontFamily: "var(--font-manrope)" }}
            >
              {description}
            </p>
          ) : null}
        </Reveal>
      ) : null}
      <Reveal delay={80}>{children}</Reveal>
    </section>
  );
}
