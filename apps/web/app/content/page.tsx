import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertOctagon,
  Download
} from 'lucide-react';

export default function ContentPage() {
  const tableData = [
    { id: 'ORD-2026-0512', company: '에이치앤비랩', product: '블로그 일반배포', status: 'pending', progress: 0, date: '2026.04.26', kw: '수분크림 추천' },
    { id: 'ORD-2026-0511', company: '테크기어', product: '프리미엄 배포', status: 'in-progress', progress: 45, date: '2026.04.25', kw: '무선이어폰' },
    { id: 'ORD-2026-0509', company: '자연식탁', product: '블로그 일반배포', status: 'completed', progress: 100, date: '2026.04.23', kw: '유기농 식단' },
    { id: 'ORD-2026-0504', company: '데일리룩', product: '인플루언서 배포', status: 'in-progress', progress: 80, date: '2026.04.20', kw: '여름 코디' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">진행 현황</h1>
          <p className="text-text-muted mt-1 text-sm">신청한 작업의 상태와 보고서를 확인하세요.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface hover:bg-surface-hover border border-border text-text px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
            <Download className="w-4 h-4 text-text-muted" /> 엑셀 다운로드
          </button>
          <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            + 신규 발주
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface border border-border rounded-xl p-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex p-1 bg-surface-hover rounded-lg overflow-x-auto">
          <Tab active>전체 보기</Tab>
          <Tab>신청 승인 대기</Tab>
          <Tab>진행중 작업</Tab>
          <Tab>완료 건</Tab>
        </div>
        <div className="flex items-center gap-2 px-2">
          <div className="relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="검색..." 
              className="pl-9 pr-4 py-2 bg-surface text-sm border border-border/80 rounded-lg focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-border/80 rounded-lg hover:bg-surface-hover text-text-muted">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-surface-hover/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold">주문 번호 / 키워드</th>
                <th className="px-6 py-4 font-semibold">업체 및 상품</th>
                <th className="px-6 py-4 font-semibold">신청일</th>
                <th className="px-6 py-4 font-semibold">상태 및 진행률</th>
                <th className="px-6 py-4 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-brand-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-text">{row.id}</div>
                    <div className="text-xs text-text-muted mt-1 bg-surface-hover inline-block px-2 py-0.5 rounded border border-border/50">
                      {row.kw}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{row.company}</div>
                    <div className="text-xs text-text-muted mt-0.5">{row.product}</div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{row.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={row.status} progress={row.progress} />
                    {row.status === 'in-progress' && (
                      <div className="w-full bg-surface-hover rounded-full h-1.5 mt-2 overflow-hidden border border-border/30">
                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${row.progress}%` }}></div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {row.status === 'completed' && (
                        <button className="text-xs font-medium bg-brand-50 text-brand-600 hover:bg-brand-100 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-brand-200">
                          <FileText className="w-3.5 h-3.5" /> 리포트
                        </button>
                      )}
                      {row.status === 'pending' && (
                        <button className="text-xs font-medium bg-surface-hover text-text hover:bg-border/50 px-3 py-1.5 rounded-lg border border-border">
                          수정
                        </button>
                      )}
                      {row.status === 'in-progress' && (
                        <button className="text-xs font-medium text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg flex items-center gap-1">
                          <AlertOctagon className="w-3.5 h-3.5" /> 중지
                        </button>
                      )}
                      <button className="text-text-muted hover:text-text p-1.5 rounded-md hover:bg-surface-hover">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-text-muted">
          <span>총 142건 중 1-4건</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md border border-border hover:bg-surface-hover disabled:opacity-50">이전</button>
            <button className="px-3 py-1 rounded-md border border-border bg-surface-hover text-text font-medium">1</button>
            <button className="px-3 py-1 rounded-md border border-border hover:bg-surface-hover">2</button>
            <button className="px-3 py-1 rounded-md border border-border hover:bg-surface-hover">3</button>
            <button className="px-3 py-1 rounded-md border border-border hover:bg-surface-hover">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({ children, active }: { children: React.ReactNode, active?: boolean }) {
  return (
    <button className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
      active ? 'bg-surface shadow-sm text-text border border-border/50' : 'text-text-muted hover:text-text hover:bg-surface-hover/80'
    }`}>
      {children}
    </button>
  );
}

function StatusBadge({ status, progress }: { status: string, progress: number }) {
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50">
        <Clock className="w-3 h-3" /> 승인 대기중
      </span>
    );
  }
  if (status === 'in-progress') {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200/50">
          <Play className="w-3 h-3" /> 진행중
        </span>
        <span className="text-xs font-semibold text-brand-600">{progress}%</span>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
      <CheckCircle2 className="w-3 h-3" /> 완료
    </span>
  );
}
