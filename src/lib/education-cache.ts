import { unstable_cache } from "next/cache";
import {
  normalizeContentSections,
  type EducationPublicListItem,
  type EducationTrack,
} from "@/lib/education";
import { prisma } from "@/lib/prisma";

export const EDUCATION_CACHE_TAG = "educations";
export const EDUCATION_CACHE_REVALIDATE_SECONDS = 60;

export function educationSlugTag(slug: string) {
  return `education:${slug}`;
}

type PublishedListFilters = {
  track?: EducationTrack;
  tech?: string;
};

async function queryPublishedEducations({
  track,
  tech,
}: PublishedListFilters): Promise<EducationPublicListItem[]> {
  const rows = await prisma.education.findMany({
    where: {
      status: "PUBLISHED",
      ...(track ? { track } : {}),
      ...(tech ? { techLanguage: tech } : {}),
    },
    orderBy: { startDate: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      level: true,
      format: true,
      track: true,
      techLanguage: true,
      isFree: true,
      price: true,
      currency: true,
      instructorName: true,
      startDate: true,
      durationWeeks: true,
      durationHours: true,
      location: true,
      coverImageUrl: true,
    },
  });

  return rows as EducationPublicListItem[];
}

export function getPublishedEducationsCached(filters: PublishedListFilters = {}) {
  const trackKey = filters.track ?? "all";
  const techKey = filters.tech ?? "all";

  return unstable_cache(
    () => queryPublishedEducations(filters),
    ["published-educations", trackKey, techKey],
    {
      revalidate: EDUCATION_CACHE_REVALIDATE_SECONDS,
      tags: [EDUCATION_CACHE_TAG],
    },
  )();
}

export function getPublishedEducationBySlugCached(slug: string) {
  return unstable_cache(
    async () => {
      const education = await prisma.education.findFirst({
        where: { slug, status: "PUBLISHED" },
        include: {
          curriculum: {
            include: {
              details: {
                orderBy: { sortOrder: "asc" },
              },
            },
          },
        },
      });

      if (!education) {
        return null;
      }

      return {
        ...education,
        contentSections: normalizeContentSections(education.contentSections),
      };
    },
    ["published-education", slug],
    {
      revalidate: EDUCATION_CACHE_REVALIDATE_SECONDS,
      tags: [EDUCATION_CACHE_TAG, educationSlugTag(slug)],
    },
  )();
}

export function getPublishedEducationMetaCached(slug: string) {
  return unstable_cache(
    () =>
      prisma.education.findFirst({
        where: { slug, status: "PUBLISHED" },
        select: { title: true, shortDescription: true },
      }),
    ["published-education-meta", slug],
    {
      revalidate: EDUCATION_CACHE_REVALIDATE_SECONDS,
      tags: [EDUCATION_CACHE_TAG, educationSlugTag(slug)],
    },
  )();
}
