import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
              <span className="text-muted-foreground">새로운 기능</span>
              <span className="text-accent">자세히 보기</span>
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            모든 팀을 위한
            <br />
            <span className="text-foreground">강력한 솔루션</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
            최고의 기술력과 사용자 경험을 바탕으로 비즈니스 성장을 가속화하세요.
            지금 바로 시작하여 놀라운 결과를 경험해 보세요.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-accent text-accent-foreground hover:bg-accent/90">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              데모 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
