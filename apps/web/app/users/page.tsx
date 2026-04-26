import { Plus, Search, MoreHorizontal, Mail, ExternalLink } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 1, name: '에이치앤비랩', email: 'contact@hnblab.co.kr', type: '스토어', status: 'Active', date: '2026.04.10' },
    { id: 2, name: '테크기어', email: 'master@techgear.io', type: '자사몰', status: 'Active', date: '2026.04.12' },
    { id: 3, name: '자연식탁', email: 'sales@naturetable.net', type: '스토어', status: 'Pending', date: '2026.04.26' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">업체 관리</h1>
          <p className="text-text-muted mt-1 text-sm">시스템에 등록된 발주 업체 목록을 확인하고 관리합니다.</p>
        </div>
        <a href="/users/new" className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> 신규 업체 등록
        </a>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border/50 flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="업체명 또는 이메일 검색..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-hover border border-border/80 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-surface-hover/50 uppercase border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold">업체명</th>
                <th className="px-6 py-4 font-semibold">이메일</th>
                <th className="px-6 py-4 font-semibold">유형</th>
                <th className="px-6 py-4 font-semibold">등록일</th>
                <th className="px-6 py-4 font-semibold">상태</th>
                <th className="px-6 py-4 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-brand-50/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-text">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-hover px-2 py-1 rounded text-xs font-medium border border-border/50">
                      {u.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{u.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {u.status === 'Active' ? '승인됨' : '승인 대기'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button className="text-text-muted hover:text-brand-600 p-1.5 rounded-md hover:bg-brand-50" title="상세보기">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="text-text-muted hover:text-text p-1.5 rounded-md hover:bg-surface-hover">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}