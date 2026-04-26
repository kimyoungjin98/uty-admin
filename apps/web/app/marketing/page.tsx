import { HelpCircle, FileText, ChevronDown } from 'lucide-react';

export default function MarketingGuidePage() {
  const faqs = [
    {
      q: "포인트 충전은 어떻게 하나요?",
      a: "결제 단계에서 '포인트 충전/결제' 버튼을 클릭하면 지정된 입금 계좌로 안내됩니다. 입금 확인 후 관리자가 승인하면 포인트가 충전되며 즉시 발주가 가능합니다."
    },
    {
      q: "진행중인 작업의 수정이 가능한가요?",
      a: "신청 승인 대기 상태에서는 접수 내용 수정이 가능합니다. 단, '진행중'으로 상태가 변경된 후에는 직접 수정이 불가능하며 우측의 '수정 요청' 버튼을 통해 별도로 문의해주셔야 합니다."
    },
    {
      q: "결과 보고서는 언제 확인할 수 있나요?",
      a: "작업이 100% 완료되고 상태가 '완료'로 변경되면 진행 현황 리스트 우측에 '리포트' 버튼이 생성됩니다. 클릭 시 간편 리포트와 전체 결과보고서를 확인 및 다운로드할 수 있습니다."
    },
    {
      q: "이전에 진행했던 동일한 양식으로 재발주할 수 있나요?",
      a: "네, 가능합니다. 발주 관리 메뉴에서 '최근 작업 내역 불러오기' 기능을 클릭하면 기존에 작성하셨던 동일 양식을 원클릭으로 불러와 수정하여 바로 신청할 수 있습니다."
    },
    {
      q: "작업 중 이슈사항 발생 시 어떻게 하나요?",
      a: "진행 현황 페이지에서 해당 발주 건 우측의 '중지 요청' 버튼을 클릭하여 사유를 기입해주시면, 담당자가 확인 후 신속하게 처리해 드립니다."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">가이드 및 FAQ</h1>
        <p className="text-text-muted mt-1 text-sm">초기 사용 유저를 위한 가이드와 자주 묻는 질문을 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-surface hover:bg-surface-hover border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors group">
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-text">시스템 사용 매뉴얼</h3>
            <p className="text-xs text-text-muted mt-1">원클릭 발주부터 결과 확인까지 A-Z</p>
          </div>
          <span className="text-brand-600 text-sm font-medium mt-2 group-hover:underline">다운로드 (.pdf)</span>
        </button>

        <button className="bg-surface hover:bg-surface-hover border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors group">
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-text">1:1 문의하기</h3>
            <p className="text-xs text-text-muted mt-1">해결되지 않은 궁금증이 있으신가요?</p>
          </div>
          <span className="text-brand-600 text-sm font-medium mt-2 group-hover:underline">문의 접수하기</span>
        </button>
      </div>

      <h2 className="text-lg font-bold pt-8 pb-4 border-b border-border/50 text-text">자주 묻는 질문</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-brand-500/30 transition-colors">
            <button className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none group">
              <span className="font-medium text-sm text-text group-hover:text-brand-600 transition-colors flex gap-3">
                <span className="text-brand-500 font-bold opacity-70">Q.</span>
                {faq.q}
              </span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
            <div className="px-6 pb-5 pt-1 text-sm text-text-muted leading-relaxed border-t border-border/50 bg-surface-hover/30 ml-4 flex gap-3">
              <span className="font-bold text-text-muted opacity-50">A.</span>
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}