import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { markEducationDetailNav } from "@/components/education/EducationScrollManager";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  EDUCATION_TRACK_LABELS,
  type EducationPublicListItem,
} from "@/lib/education";

type EducationCardProps = {
  education: EducationPublicListItem;
};

export function EducationCard({ education }: EducationCardProps) {
  const href = `/education/${education.slug}`;
  const trackLabel = education.track
    ? EDUCATION_TRACK_LABELS[education.track]
    : null;

  const chips = [
    education.track ? EDUCATION_TRACK_LABELS[education.track] : null,
    education.techLanguage,
    EDUCATION_LEVEL_LABELS[education.level],
    EDUCATION_FORMAT_LABELS[education.format],
  ].filter(Boolean) as string[];

  return (
    <Link
      href={href}
      onClick={markEducationDetailNav}
      className="group block h-full"
    >
      <Card
        as="article"
        className="flex h-full flex-col rounded-xl border border-black/[0.06] bg-[#faf8f5] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        <div className="p-2 pb-0 sm:p-4 sm:pb-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            {education.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={education.coverImageUrl}
                alt={education.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{ backgroundImage: "url(/images/education-card-bg.png)" }}
              >
                <div className="absolute inset-0 bg-black/25" aria-hidden />
                {trackLabel ? (
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-2 sm:text-[11px]">
                    {trackLabel}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
          <p className="line-clamp-1 text-[10px] font-medium tracking-wide text-[#8a847c] sm:text-[11px]">
            {chips.join(" · ")}
          </p>

          <div className="flex-1 space-y-1">
            <h3 className="heading text-[14px] font-semibold leading-snug tracking-tight text-[#121212] sm:text-[16px]">
              {education.title}
            </h3>
            <p className="line-clamp-2 text-[11px] leading-relaxed text-[#888] sm:text-[13px]">
              {education.shortDescription}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#121212] sm:gap-1.5 sm:text-[13px]">
            <span className="sm:hidden">Detay</span>
            <span className="hidden sm:inline">Detayları Gör</span>
            <ArrowRight
              size={12}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 sm:size-[13px]"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
