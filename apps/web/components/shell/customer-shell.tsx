"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, FileText, HelpCircle, PackageCheck } from "lucide-react";
import { Button, cn } from "@uty/ui";

const navItems = [
  { label: "발주", href: "/orders", icon: FileText },
  { label: "진행", href: "/status", icon: PackageCheck },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
];

export function CustomerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/orders" className="flex items-center gap-3" aria-label="UTY 발주 목록">
            <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-xs font-medium text-white">
              U
            </span>
            <span className="text-sm font-medium tracking-[0.18em] text-foreground">UTY</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="사용자 메뉴">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors duration-[330ms] hover:bg-secondary hover:text-foreground",
                    active && "bg-brand-50 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="알림">
              <Bell className="size-4" />
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/orders/new">신규 발주</Link>
            </Button>
          </div>
        </div>

        <nav className="grid grid-cols-3 border-t border-border md:hidden" aria-label="모바일 사용자 메뉴">
          {navItems.map((item) => {
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
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
