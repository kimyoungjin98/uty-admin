"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "무료 체험 기간이 있나요?",
    answer:
      "네, 모든 플랜에 14일 무료 체험 기간이 제공됩니다. 신용카드 정보 없이 바로 시작할 수 있습니다.",
  },
  {
    question: "언제든지 플랜을 변경할 수 있나요?",
    answer:
      "물론입니다. 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 다음 결제 주기부터 적용됩니다.",
  },
  {
    question: "데이터 보안은 어떻게 보장하나요?",
    answer:
      "모든 데이터는 AES-256 암호화로 보호되며, SOC 2 Type II 인증을 받은 데이터센터에서 관리됩니다. 정기적인 보안 감사를 통해 최고 수준의 보안을 유지합니다.",
  },
  {
    question: "기존 도구와 연동이 가능한가요?",
    answer:
      "Slack, Notion, Jira, Google Workspace 등 100개 이상의 인기 도구와 원활하게 연동됩니다. API를 통해 맞춤 통합도 구축할 수 있습니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "결제 후 30일 이내에 만족하지 않으시면 전액 환불해 드립니다. 별도의 질문이나 조건 없이 처리해 드립니다.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold text-accent uppercase tracking-wide">
            자주 묻는 질문
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            궁금한 점이 있으신가요?
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
