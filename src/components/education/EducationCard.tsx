import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { markEducationDetailNav } from "@/components/education/EducationScrollManager";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  EDUCATION_TRACK_LABELS,
  formatEducationDuration,
  type EducationPublicListItem,
} from "@/lib/education";

type EducationCardProps = {
  education: EducationPublicListItem;
};

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "#d1fae5",
  INTERMEDIATE: "#fef9c3",
  ADVANCED: "#fee2e2",
  ALL_LEVELS: "#e0e7ff",
};
const LEVEL_TEXT_COLORS: Record<string, string> = {
  BEGINNER: "#065f46",
  INTERMEDIATE: "#713f12",
  ADVANCED: "#991b1b",
  ALL_LEVELS: "#3730a3",
};

export function EducationCard({ education }: EducationCardProps) {
  const href = `/education/${education.slug}`;

  const duration = formatEducationDuration(
    education.durationWeeks,
    education.durationHours,
  );

  const topics: string[] = [
    education.track ? EDUCATION_TRACK_LABELS[education.track] : null,
    education.techLanguage,
  ].filter(Boolean) as string[];

  const bgColor = LEVEL_COLORS[education.level] ?? "#f3f4f6";
  const textColor = LEVEL_TEXT_COLORS[education.level] ?? "#374151";

  return (
    <Link
      href={href}
      onClick={markEducationDetailNav}
      className="group block h-full"
      style={{ textDecoration: "none" }}
    >
      <article
        className="surface-card-sr flex h-full flex-col p-6"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {/* Level + format */}
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: bgColor, color: textColor }}
          >
            {EDUCATION_LEVEL_LABELS[education.level]}
          </span>
          <span className="text-xs" style={{ color: "var(--sr-muted)" }}>
            {EDUCATION_FORMAT_LABELS[education.format]}
          </span>
        </div>

        {/* Cover image */}
        {education.coverImageUrl ? (
          <div className="mt-4 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={education.coverImageUrl}
              alt={education.title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        {/* Title */}
        <h3
          className="mt-4 text-lg font-bold leading-snug"
          style={{ color: "var(--sr-foreground)", letterSpacing: "-0.025em" }}
        >
          {education.title}
        </h3>

        {/* Description */}
        {education.shortDescription ? (
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--sr-muted)" }}
          >
            {education.shortDescription}
          </p>
        ) : null}

        {/* Topic chips */}
        {topics.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <span key={t} className="sr-chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Footer */}
        <div
          className="mt-6 flex items-center justify-between border-t pt-4 text-sm"
          style={{
            borderColor: "var(--sr-border)",
            color: "var(--sr-muted)",
          }}
        >
          {duration ? (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {duration}
            </span>
          ) : (
            <span />
          )}
          <span
            className="flex items-center gap-1 font-semibold transition-colors group-hover:underline"
            style={{ color: "var(--sr-foreground)" }}
          >
            Detaylar
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
