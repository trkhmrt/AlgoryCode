import Link from "next/link";

type HorizontalBarChartProps = {
  items: Array<{ label: string; value: number; meta?: string; href?: string }>;
};

export function HorizontalBarChart({ items }: HorizontalBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-start justify-between gap-4 text-sm">
            {item.href ? (
              <Link
                href={item.href}
                className="min-w-0 truncate font-medium text-[#ededed] transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span className="min-w-0 truncate font-medium">{item.label}</span>
            )}
            <span className="shrink-0 tabular text-[#888]">
              {item.value.toLocaleString("tr-TR")}
              {item.meta ? ` · ${item.meta}` : ""}
            </span>
          </div>
          {item.href ? (
            <Link
              href={item.href}
              className="block h-2 overflow-hidden rounded-full bg-[#1a1a1a] transition-colors hover:bg-[#222]"
              aria-label={`${item.label} ziyaret detayları`}
            >
              <div
                className="h-full rounded-full bg-[#ededed]"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </Link>
          ) : (
            <div className="h-2 overflow-hidden rounded-full bg-[#1a1a1a]">
              <div
                className="h-full rounded-full bg-[#ededed] transition-all"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type DailyBarChartProps = {
  items: Array<{ label: string; value: number }>;
};

export function DailyBarChart({ items }: DailyBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="flex min-w-full items-end gap-2"
        style={{ minHeight: "220px" }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-w-[52px] flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-xs tabular text-[#888]">{item.value}</span>
            <div className="flex w-full items-end justify-center">
              <div
                className="w-full max-w-10 rounded-t-md bg-[#ededed]"
                style={{
                  height: `${Math.max((item.value / maxValue) * 160, item.value > 0 ? 8 : 0)}px`,
                }}
              />
            </div>
            <span className="text-center text-[11px] text-[#888]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
