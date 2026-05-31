import "server-only";

import type { EducationStatus } from "@/lib/education";
import type {
  PaymentGroupByRow,
  PaymentProvider,
  PaymentReportEducationRow,
  PaymentStatus,
  PaymentSuccessReportRow,
  PaymentWhereInput,
  ReportEducationOption,
} from "@/lib/payments";
import { prisma } from "@/lib/prisma";

export type ReportFilters = {
  from?: string;
  to?: string;
  educationId?: string;
  status: PaymentStatus | "ALL";
  provider: PaymentProvider | "ALL";
  installment: "ALL" | "SINGLE" | "INSTALLMENT";
};

export type EducationRevenueRow = {
  educationId: string;
  title: string;
  slug: string;
  educationStatus: EducationStatus;
  isFree: boolean;
  listPrice: number | null;
  successCount: number;
  failedCount: number;
  pendingCount: number;
  freeEnrollmentCount: number;
  totalRevenue: number;
  averageRevenue: number;
  currency: string;
};

export type ReportSummary = {
  totalRevenue: number;
  successCount: number;
  failedCount: number;
  pendingCount: number;
  averageOrderValue: number;
  installmentCount: number;
  singlePaymentCount: number;
  currency: string;
};

export type StatusBreakdownRow = {
  status: PaymentStatus;
  count: number;
  revenue: number;
};

export type ProviderBreakdownRow = {
  provider: PaymentProvider;
  count: number;
  revenue: number;
};

export type MonthlyBreakdownRow = {
  key: string;
  label: string;
  count: number;
  revenue: number;
};

export type ReportData = {
  filters: ReportFilters;
  summary: ReportSummary;
  educationRows: EducationRevenueRow[];
  statusBreakdown: StatusBreakdownRow[];
  providerBreakdown: ProviderBreakdownRow[];
  monthlyBreakdown: MonthlyBreakdownRow[];
};

const DEFAULT_FILTERS: ReportFilters = {
  status: "SUCCESS",
  provider: "ALL",
  installment: "ALL",
};

function getSearchParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function parseReportFilters(
  searchParams: Record<string, string | string[] | undefined>,
): ReportFilters {
  const status = getSearchParam(searchParams, "status");
  const provider = getSearchParam(searchParams, "provider");
  const installment = getSearchParam(searchParams, "installment");

  return {
    from: getSearchParam(searchParams, "from"),
    to: getSearchParam(searchParams, "to"),
    educationId: getSearchParam(searchParams, "educationId"),
    status:
      status === "SUCCESS" ||
      status === "FAILED" ||
      status === "PENDING" ||
      status === "ALL"
        ? status
        : DEFAULT_FILTERS.status,
    provider:
      provider === "IYZICO" || provider === "FREE"
        ? provider
        : DEFAULT_FILTERS.provider,
    installment:
      installment === "SINGLE" || installment === "INSTALLMENT"
        ? installment
        : DEFAULT_FILTERS.installment,
  };
}

function endOfDay(date: Date): Date {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

export function buildPaymentWhere(filters: ReportFilters): PaymentWhereInput {
  const where: PaymentWhereInput = {};

  if (filters.from || filters.to) {
    where.createdAt = {};

    if (filters.from) {
      where.createdAt.gte = new Date(filters.from);
    }

    if (filters.to) {
      where.createdAt.lte = endOfDay(new Date(filters.to));
    }
  }

  if (filters.educationId) {
    where.educationId = filters.educationId;
  }

  if (filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters.provider !== "ALL") {
    where.provider = filters.provider;
  }

  if (filters.installment === "SINGLE") {
    where.installment = { lte: 1 };
  }

  if (filters.installment === "INSTALLMENT") {
    where.installment = { gt: 1 };
  }

  return where;
}

function toNumber(value: { toString(): string } | null | undefined): number {
  if (!value) {
    return 0;
  }

  return Number(value.toString());
}

function buildMonthlyBreakdown(
  payments: Array<{ createdAt: Date; paidPrice: { toString(): string } }>,
): MonthlyBreakdownRow[] {
  const monthMap = new Map<string, MonthlyBreakdownRow>();

  for (const payment of payments) {
    const date = new Date(payment.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("tr-TR", {
      month: "long",
      year: "numeric",
    }).format(date);
    const revenue = toNumber(payment.paidPrice);
    const existing = monthMap.get(key);

    if (existing) {
      existing.count += 1;
      existing.revenue += revenue;
    } else {
      monthMap.set(key, { key, label, count: 1, revenue });
    }
  }

  return [...monthMap.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export async function getReportData(
  filters: ReportFilters,
): Promise<ReportData> {
  const where = buildPaymentWhere(filters);

  const [educations, groupedPayments, successfulPayments, installmentCount, singleCount] =
    (await Promise.all([
      prisma.education.findMany({
        where: filters.educationId ? { id: filters.educationId } : undefined,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          isFree: true,
          price: true,
          currency: true,
        },
        orderBy: { title: "asc" },
      }),
      prisma.payment.groupBy({
        by: ["educationId", "status", "provider"],
        where,
        _count: { _all: true },
        _sum: { paidPrice: true },
      }),
      prisma.payment.findMany({
        where: {
          ...where,
          status: "SUCCESS",
        },
        select: {
          createdAt: true,
          paidPrice: true,
          currency: true,
          installment: true,
        },
      }),
      prisma.payment.count({
        where: {
          ...where,
          status: "SUCCESS",
          installment: { gt: 1 },
        },
      }),
      prisma.payment.count({
        where: {
          ...where,
          status: "SUCCESS",
          installment: { lte: 1 },
        },
      }),
    ])) as [
      PaymentReportEducationRow[],
      PaymentGroupByRow[],
      PaymentSuccessReportRow[],
      number,
      number,
    ];

  const aggregateByEducation = new Map<
    string,
    {
      successCount: number;
      failedCount: number;
      pendingCount: number;
      freeEnrollmentCount: number;
      totalRevenue: number;
      currency: string;
    }
  >();

  for (const education of educations) {
    aggregateByEducation.set(education.id, {
      successCount: 0,
      failedCount: 0,
      pendingCount: 0,
      freeEnrollmentCount: 0,
      totalRevenue: 0,
      currency: education.currency,
    });
  }

  for (const row of groupedPayments) {
    const current = aggregateByEducation.get(row.educationId) ?? {
      successCount: 0,
      failedCount: 0,
      pendingCount: 0,
      freeEnrollmentCount: 0,
      totalRevenue: 0,
      currency: "TRY",
    };

    const count = row._count._all;
    const revenue = toNumber(row._sum.paidPrice);

    if (row.status === "SUCCESS") {
      current.successCount += count;
      current.totalRevenue += revenue;

      if (row.provider === "FREE") {
        current.freeEnrollmentCount += count;
      }
    } else if (row.status === "FAILED") {
      current.failedCount += count;
    } else {
      current.pendingCount += count;
    }

    aggregateByEducation.set(row.educationId, current);
  }

  const educationRows: EducationRevenueRow[] = educations
    .map((education) => {
      const stats = aggregateByEducation.get(education.id)!;
      const averageRevenue =
        stats.successCount > 0 ? stats.totalRevenue / stats.successCount : 0;

      return {
        educationId: education.id,
        title: education.title,
        slug: education.slug,
        educationStatus: education.status,
        isFree: education.isFree,
        listPrice: education.price ? toNumber(education.price) : null,
        successCount: stats.successCount,
        failedCount: stats.failedCount,
        pendingCount: stats.pendingCount,
        freeEnrollmentCount: stats.freeEnrollmentCount,
        totalRevenue: stats.totalRevenue,
        averageRevenue,
        currency: stats.currency,
      };
    })
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  const totalRevenue = successfulPayments.reduce(
    (sum, payment) => sum + toNumber(payment.paidPrice),
    0,
  );
  const successCount = successfulPayments.length;
  const currency = successfulPayments[0]?.currency ?? "TRY";

  const statusBreakdown: StatusBreakdownRow[] = (
    ["SUCCESS", "FAILED", "PENDING"] as PaymentStatus[]
  ).map((status) => {
    const rows = groupedPayments.filter((row) => row.status === status);
    return {
      status,
      count: rows.reduce((sum, row) => sum + row._count._all, 0),
      revenue: rows.reduce(
        (sum, row) => sum + toNumber(row._sum.paidPrice),
        0,
      ),
    };
  });

  const providerBreakdown: ProviderBreakdownRow[] = (
    ["IYZICO", "FREE"] as PaymentProvider[]
  ).map((provider) => {
    const rows = groupedPayments.filter((row) => row.provider === provider);
    return {
      provider,
      count: rows.reduce((sum, row) => sum + row._count._all, 0),
      revenue: rows.reduce(
        (sum, row) => sum + (row.status === "SUCCESS" ? toNumber(row._sum.paidPrice) : 0),
        0,
      ),
    };
  });

  const failedCount = statusBreakdown.find((row) => row.status === "FAILED")?.count ?? 0;
  const pendingCount = statusBreakdown.find((row) => row.status === "PENDING")?.count ?? 0;

  return {
    filters,
    summary: {
      totalRevenue,
      successCount,
      failedCount,
      pendingCount,
      averageOrderValue: successCount > 0 ? totalRevenue / successCount : 0,
      installmentCount,
      singlePaymentCount: singleCount,
      currency,
    },
    educationRows,
    statusBreakdown,
    providerBreakdown,
    monthlyBreakdown: buildMonthlyBreakdown(successfulPayments),
  };
}

export async function getReportEducationOptions(): Promise<ReportEducationOption[]> {
  return (await prisma.education.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  })) as ReportEducationOption[];
}
