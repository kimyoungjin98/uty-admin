"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "스타터",
    description: "소규모 팀에 적합한 플랜",
    price: { monthly: "29,000", yearly: "24,000" },
    features: [
      "최대 5명 사용자",
      "10GB 스토리지",
      "기본 분석 대시보드",
      "이메일 지원",
    ],
    cta: "시작하기",
    featured: false,
  },
  {
    name: "프로",
    description: "성장하는 비즈니스를 위한 플랜",
    price: { monthly: "79,000", yearly: "66,000" },
    features: [
      "최대 25명 사용자",
      "100GB 스토리지",
      "고급 분석 및 리포트",
      "우선 지원",
      "API 접근",
      "커스텀 통합",
    ],
    cta: "시작하기",
    featured: true,
  },
  {
    name: "엔터프라이즈",
    description: "대규모 조직을 위한 맞춤 플랜",
    price: { monthly: "문의", yearly: "문의" },
    features: [
      "무제한 사용자",
      "무제한 스토리지",
      "전담 계정 매니저",
      "SLA 보장",
      "온프레미스 배포",
      "맞춤 개발",
    ],
    cta: "문의하기",
    featured: false,
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold text-accent uppercase tracking-wide">
            가격 정책
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            합리적인 가격, 강력한 기능
          </p>
          <p className="mt-4 text-muted-foreground">
            규모에 맞는 플랜을 선택하세요. 언제든지 업그레이드 가능합니다.
          </p>
          
          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={cn("text-sm", billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground")}>
              월간 결제
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                billingCycle === "yearly" ? "bg-accent" : "bg-border"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform",
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm", billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground")}>
              연간 결제
              <span className="ml-1.5 text-xs text-accent font-medium">20% 할인</span>
            </span>
          </div>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.featured
                  ? "border-accent bg-card shadow-xl scale-105"
                  : "border-border bg-card"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                    인기
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price[billingCycle] === "문의" ? "" : "₩"}
                  {plan.price[billingCycle]}
                </span>
                {plan.price[billingCycle] !== "문의" && (
                  <span className="text-muted-foreground">/월</span>
                )}
              </div>
              
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.featured ? "default" : "outline"}
                className={cn(
                  "w-full",
                  plan.featured && "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
