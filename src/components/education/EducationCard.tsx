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
        <div className="p-4 pb-0">
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
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                    {trackLabel}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-[11px] font-medium tracking-wide text-[#8a847c]">
            {chips.join(" · ")}
          </p>

          <div className="flex-1 space-y-1">
            <h2 className="heading text-[17px] font-semibold leading-snug tracking-tight text-[#121212]">
              {education.title}
            </h2>
            <p className="line-clamp-2 text-[13px] leading-relaxed text-[#888]">
              {education.shortDescription}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#121212]">
            Detayları Gör
            <ArrowRight
              size={13}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
