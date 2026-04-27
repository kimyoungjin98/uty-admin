import { ChevronDown, FileText, HelpCircle } from "lucide-react";
import { Button, Card, CardContent } from "@uty/ui";

const faqs = [
  {
    q: "포인트 충전은 어떻게 하나요?",
    a: "결제 단계에서 포인트 결제를 선택하면 지정 입금 계좌가 안내됩니다. 입금 확인 후 관리자가 승인하면 즉시 발주할 수 있습니다.",
  },
  {
    q: "진행중인 작업의 수정이 가능한가요?",
    a: "승인 대기 상태에서는 접수 내용 수정이 가능합니다. 진행중으로 변경된 뒤에는 중지 또는 수정 요청으로 문의해야 합니다.",
  },
  {
    q: "결과 보고서는 언제 확인할 수 있나요?",
    a: "작업이 완료되면 진행 현황 목록에 리포트 버튼이 표시됩니다. 해당 버튼에서 간편 리포트와 전체 결과보고서를 확인할 수 있습니다.",
  },
  {
    q: "이전 양식으로 재발주할 수 있나요?",
    a: "발주 화면의 최근 내역에서 기존 양식을 불러와 필요한 항목만 수정한 뒤 다시 신청할 수 있습니다.",
  },
];

export default function CustomerFaqPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-ui-enter">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Support</p>
        <h1 className="mt-2 text-3xl font-medium text-foreground">가이드 및 FAQ</h1>
        <p className="mt-2 text-sm text-muted-foreground">초기 사용자를 위한 핵심 안내만 정리했습니다.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
                <FileText className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">시스템 사용 매뉴얼</p>
                <p className="mt-1 text-xs text-muted-foreground">발주부터 결과 확인까지</p>
              </div>
            </div>
            <Button variant="outline" size="sm">PDF</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
                <HelpCircle className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">1:1 문의</p>
                <p className="mt-1 text-xs text-muted-foreground">해결되지 않은 질문 접수</p>
              </div>
            </div>
            <Button variant="outline" size="sm">문의</Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.q}>
            <button className="flex w-full items-center justify-between gap-4 border-b border-border px-5 py-4 text-left">
              <span className="text-sm font-medium text-foreground">{faq.q}</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
