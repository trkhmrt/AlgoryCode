import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type TrafficFilters = {
  from?: string;
  to?: string;
};

export type PathVisitSort = "newest" | "oldest" | "ip_asc" | "ip_desc";

export type PathVisitFilters = TrafficFilters & {
  path: string;
  sort: PathVisitSort;
  page: number;
};

export type PathVisitReportData = {
  filters: PathVisitFilters;
  totalVisits: number;
  uniqueIps: number;
  visits: RecentVisitRow[];
  totalPages: number;
};

export type PathTrafficRow = {
  path: string;
  views: number;
  share: number;
};

export type DailyTrafficRow = {
  key: string;
  label: string;
  views: number;
};

export type RecentVisitRow = {
  id: string;
  path: string;
  ipAddress: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  referrer: string | null;
  createdAt: Date;
};

export type TrafficReportData = {
  filters: TrafficFilters;
  totalViews: number;
  uniquePaths: number;
  uniqueIps: number;
  topPaths: PathTrafficRow[];
  dailyViews: DailyTrafficRow[];
  recentVisits: RecentVisitRow[];
};

function endOfDay(date: Date): Date {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

export function parseTrafficFilters(
  searchParams: Record<string, string | string[] | undefined>,
): TrafficFilters {
  const get = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  };

  return {
    from: get("from"),
    to: get("to"),
  };
}

export function buildPageViewWhere(filters: TrafficFilters): Prisma.PageViewWhereInput {
  const where: Prisma.PageViewWhereInput = {};

  if (filters.from || filters.to) {
    where.createdAt = {};

    if (filters.from) {
      where.createdAt.gte = new Date(filters.from);
    }

    if (filters.to) {
      where.createdAt.lte = endOfDay(new Date(filters.to));
    }
  }

  return where;
}

const PAGE_SIZE = 50;

export function buildPathAnalyticsHref(
  path: string,
  filters?: TrafficFilters,
): string {
  const params = new URLSearchParams();
  params.set("path", path);

  if (filters?.from) {
    params.set("from", filters.from);
  }

  if (filters?.to) {
    params.set("to", filters.to);
  }

  return `/admin/analytics/path?${params.toString()}`;
}

export function buildAnalyticsHref(filters?: TrafficFilters): string {
  const params = new URLSearchParams();

  if (filters?.from) {
    params.set("from", filters.from);
  }

  if (filters?.to) {
    params.set("to", filters.to);
  }

  const query = params.toString();
  return query ? `/admin/analytics?${query}` : "/admin/analytics";
}

export function parsePathVisitFilters(
  searchParams: Record<string, string | string[] | undefined>,
): PathVisitFilters | null {
  const get = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  };

  const path = get("path");
  if (!path) {
    return null;
  }

  const normalizedPath = normalizePagePath(path);
  if (!normalizedPath) {
    return null;
  }

  const sort = get("sort");
  const pageValue = Number(get("page") ?? "1");

  return {
    path: normalizedPath,
    from: get("from"),
    to: get("to"),
    sort:
      sort === "oldest" || sort === "ip_asc" || sort === "ip_desc"
        ? sort
        : "newest",
    page: Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1,
  };
}

function getPathVisitOrderBy(
  sort: PathVisitSort,
): Prisma.PageViewOrderByWithRelationInput | Prisma.PageViewOrderByWithRelationInput[] {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" };
    case "ip_asc":
      return [{ ipAddress: "asc" }, { createdAt: "desc" }];
    case "ip_desc":
      return [{ ipAddress: "desc" }, { createdAt: "desc" }];
    default:
      return { createdAt: "desc" };
  }
}

const visitSelect = {
  id: true,
  path: true,
  ipAddress: true,
  deviceType: true,
  browser: true,
  os: true,
  country: true,
  city: true,
  region: true,
  referrer: true,
  createdAt: true,
} as const;

export async function getPathVisitReportData(
  filters: PathVisitFilters,
): Promise<PathVisitReportData> {
  const where: Prisma.PageViewWhereInput = {
    ...buildPageViewWhere(filters),
    path: filters.path,
  };

  const skip = (filters.page - 1) * PAGE_SIZE;

  const [totalVisits, uniqueIps, visits] = await Promise.all([
    prisma.pageView.count({ where }),
    prisma.pageView.groupBy({
      by: ["ipAddress"],
      where: {
        ...where,
        ipAddress: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.pageView.findMany({
      where,
      select: visitSelect,
      orderBy: getPathVisitOrderBy(filters.sort),
      skip,
      take: PAGE_SIZE,
    }),
  ]);

  return {
    filters,
    totalVisits,
    uniqueIps: uniqueIps.length,
    visits,
    totalPages: Math.max(1, Math.ceil(totalVisits / PAGE_SIZE)),
  };
}

function buildDailyViews(
  views: Array<{ createdAt: Date }>,
): DailyTrafficRow[] {
  const dayMap = new Map<string, DailyTrafficRow>();

  for (const view of views) {
    const date = new Date(view.createdAt);
    const key = date.toISOString().slice(0, 10);
    const label = new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "short",
    }).format(date);
    const existing = dayMap.get(key);

    if (existing) {
      existing.views += 1;
    } else {
      dayMap.set(key, { key, label, views: 1 });
    }
  }

  return [...dayMap.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export function normalizePagePath(path: string): string | null {
  if (!path.startsWith("/")) {
    return null;
  }

  if (path.startsWith("/admin") || path.startsWith("/api")) {
    return null;
  }

  const [pathname] = path.split("?");
  return pathname.length > 0 ? pathname : "/";
}

export async function recordPageView(input: {
  path: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceType?: string | null;
  browser?: string | null;
  os?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  referrer?: string | null;
}): Promise<void> {
  const path = normalizePagePath(input.path);

  if (!path) {
    return;
  }

  await prisma.pageView.create({
    data: {
      path,
      ipAddress: input.ipAddress?.slice(0, 45) ?? null,
      userAgent: input.userAgent?.slice(0, 500) ?? null,
      deviceType: input.deviceType?.slice(0, 50) ?? null,
      browser: input.browser?.slice(0, 100) ?? null,
      os: input.os?.slice(0, 100) ?? null,
      country: input.country?.slice(0, 100) ?? null,
      city: input.city?.slice(0, 100) ?? null,
      region: input.region?.slice(0, 100) ?? null,
      referrer: input.referrer?.slice(0, 500) ?? null,
    },
  });
}

export async function getTrafficReportData(
  filters: TrafficFilters,
): Promise<TrafficReportData> {
  const where = buildPageViewWhere(filters);

  const [totalViews, groupedPaths, uniquePaths, uniqueIps, viewsInRange, recentVisits] =
    await Promise.all([
    prisma.pageView.count({ where }),
    prisma.pageView.groupBy({
      by: ["path"],
      where,
      _count: { _all: true },
      orderBy: { _count: { path: "desc" } },
      take: 15,
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      where,
      _count: { _all: true },
    }),
    prisma.pageView.groupBy({
      by: ["ipAddress"],
      where: {
        ...where,
        ipAddress: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.pageView.findMany({
      where,
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.pageView.findMany({
      where,
      select: {
        id: true,
        path: true,
        ipAddress: true,
        deviceType: true,
        browser: true,
        os: true,
        country: true,
        city: true,
        region: true,
        referrer: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  const topPaths: PathTrafficRow[] = groupedPaths.map((row) => ({
    path: row.path,
    views: row._count._all,
    share: totalViews > 0 ? (row._count._all / totalViews) * 100 : 0,
  }));

  return {
    filters,
    totalViews,
    uniquePaths: uniquePaths.length,
    uniqueIps: uniqueIps.length,
    topPaths,
    dailyViews: buildDailyViews(viewsInRange),
    recentVisits,
  };
}
