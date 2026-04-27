"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Building2,
  FileText,
  ListChecks,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Button, cn } from "@uty/ui";
import { adminCompanies } from "@/server/order-workflow/admin-data";

const adminItems = [
  { label: "업체 관리", href: "/admin/companies", icon: ListChecks },
  { label: "로그", href: "/admin/logs", icon: Activity },
  { label: "설정", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const companyId = pathname.match(/^\/admin\/companies\/([^/]+)/)?.[1];
  const activeCompany = adminCompanies.find((company) => company.id === companyId);
  const companyItems = activeCompany
    ? [
        {
          label: "개요",
          href: `/admin/companies/${activeCompany.id}`,
          icon: Building2,
          exact: true,
        },
        {
          label: "발주 관리",
          href: `/admin/companies/${activeCompany.id}/orders`,
          icon: ListChecks,
          exact: false,
        },
        {
          label: "진행 관리",
          href: `/admin/companies/${activeCompany.id}/progress`,
          icon: Activity,
          exact: false,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[248px_1fr]">
      <aside className="hidden border-r border-border bg-surface md:flex md:min-h-screen md:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-border px-5">
          <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-xs font-medium text-white">
            U
          </span>
          <div>
            <p className="text-sm font-medium tracking-[0.16em] text-foreground">UTY ADMIN</p>
            <p className="text-xs text-muted-foreground">Operations</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-3">
          <nav className="flex flex-col gap-1" aria-label="관리자 메뉴">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors duration-[330ms] hover:bg-secondary hover:text-foreground",
                    active && "bg-brand-50 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {activeCompany && (
            <section className="mt-4 border-t border-border pt-4" aria-label="업체 상세 메뉴">
              <div className="mb-3 flex items-start gap-3 px-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-primary">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    업체 상세
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {activeCompany.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {activeCompany.accountName}
                  </p>
                </div>
              </div>
              <nav className="flex flex-col gap-1" aria-label={`${activeCompany.name} 상세 메뉴`}>
                {companyItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex h-10 items-center gap-3 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors duration-[330ms] hover:bg-secondary hover:text-foreground",
                        active && "bg-brand-50 text-primary",
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </section>
          )}
        </div>
        <div className="border-t border-border p-4 text-xs text-muted-foreground">
          <p className="font-medium text-text-secondary">admin@utw.co.kr</p>
          <p className="mt-1">최고 관리자</p>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Admin
              </p>
              <h1 className="truncate text-base font-medium text-foreground">운영 관리</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className="h-10 w-64 rounded-sm border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors duration-[330ms] focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="주문, 업체, 로그 검색"
                  type="search"
                />
              </div>
              <Button variant="outline" size="icon" aria-label="필터">
                <SlidersHorizontal className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="알림">
                <Bell className="size-4" />
              </Button>
            </div>
          </div>

          <nav className="grid grid-cols-3 border-t border-border md:hidden" aria-label="모바일 관리자 메뉴">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground",
                    active && "bg-brand-50 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
