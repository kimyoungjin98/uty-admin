"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Megaphone,
  Settings,
  ArrowRight,
  Activity,
  Building
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { label: '업체 관리', href: '/orders', icon: Building },
    { label: '진행 현황', href: '/content', icon: FileText },
    { label: 'FAQ/가이드', href: '/marketing', icon: Megaphone },
    { label: '로그 관리', href: '/logs', icon: Activity },
    { label: '설정', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-border bg-surface flex flex-col justify-between sticky top-0 hidden md:flex shrink-0">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <div className="flex items-center gap-2 text-brand-600">
            <div className="w-6 h-6 bg-brand-600 rounded-md"></div>
            <span className="font-bold text-xl text-text tracking-tight uppercase">utw admin</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname?.startsWith(link.href) ?? false;
            return (
              <Link 
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4">
        <button className="flex items-center gap-2 text-text-muted hover:text-text px-2 text-sm">
          <ArrowRight className="w-4 h-4 rotate-180" />
          접기
        </button>
      </div>
    </aside>
  );
}
