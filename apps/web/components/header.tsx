import { Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-text">대시보드</h1>
        <p className="text-xs text-text-muted">다시 오신 것을 환영합니다! 오늘 진행 현황을 확인하세요.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 text-text-muted absolute left-3" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-9 pr-12 py-2 bg-surface-hover rounded-xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all border border-transparent focus:border-brand-500/30"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block border border-border/80 rounded px-1.5 py-0.5 text-[10px] font-medium text-text-muted bg-surface">
              ⌘K
            </kbd>
          </div>
        </div>
        
        <button className="relative p-2 text-text-muted hover:text-text transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-600 border-2 border-surface rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border/50 cursor-pointer hover:bg-surface-hover/50 p-1.5 rounded-lg transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-surface-hover overflow-hidden border border-border/50 flex-shrink-0">
            {/* Placeholder Image avatar */}
            <div className="w-full h-full bg-gradient-to-tr from-brand-100 to-brand-500"></div>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-text leading-tight">관리자</p>
            <p className="text-xs text-text-muted">최고 관리자</p>
          </div>
        </div>
      </div>
    </header>
  );
}