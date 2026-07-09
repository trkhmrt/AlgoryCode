"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  ListTree,
  MessageSquare,
  PenLine,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/educations",
    label: "Eğitimler",
    icon: GraduationCap,
    exact: false,
  },
  {
    href: "/admin/curriculums",
    label: "Müfredatlar",
    icon: ListTree,
    exact: false,
  },
  {
    href: "/admin/blog",
    label: "Blog",
    icon: PenLine,
    exact: false,
  },
  {
    href: "/admin/payments",
    label: "Ödemeler",
    icon: CreditCard,
    exact: false,
  },
  {
    href: "/admin/contacts",
    label: "İletişim",
    icon: MessageSquare,
    exact: false,
  },
  {
    href: "/admin/reports",
    label: "Raporlar",
    icon: BarChart3,
    exact: false,
  },
  {
    href: "/admin/analytics",
    label: "Site Analytics",
    icon: Activity,
    exact: false,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-[#1a1a1a] bg-black lg:w-56 lg:border-b-0 lg:border-r">
      <div className="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:overflow-visible lg:p-6">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                active
                  ? "border-[#333] bg-[#0a0a0a] text-[#ededed]"
                  : "border-transparent text-[#888] hover:border-[#1a1a1a] hover:bg-[#0a0a0a] hover:text-[#ededed]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="hidden border-t border-[#1a1a1a] p-6 lg:block">
        <div className="flex items-start gap-3 rounded-md border border-[#1a1a1a] bg-[#0a0a0a] p-4">
          <BookOpen size={16} className="mt-0.5 text-[#888]" />
          <div>
            <p className="text-sm font-medium">Eğitim Yönetimi</p>
            <p className="mt-1 text-xs leading-relaxed text-[#888]">
              Yayınlanan eğitimler `/education` sayfasında listelenir.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
