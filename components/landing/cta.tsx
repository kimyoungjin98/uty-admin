import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            14일 무료 체험으로 모든 기능을 경험해 보세요.
            신용카드 없이 시작할 수 있습니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto px-8"
            >
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              영업팀 문의
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
