import { Zap, Shield, BarChart3, Users, Clock, Globe } from "lucide-react";

const features = [
  {
    name: "빠른 성능",
    description: "최적화된 인프라로 빠르고 안정적인 서비스를 제공합니다.",
    icon: Zap,
  },
  {
    name: "보안 강화",
    description: "엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다.",
    icon: Shield,
  },
  {
    name: "실시간 분석",
    description: "직관적인 대시보드로 핵심 지표를 실시간 모니터링하세요.",
    icon: BarChart3,
  },
  {
    name: "팀 협업",
    description: "팀원들과 원활하게 협업하고 생산성을 극대화하세요.",
    icon: Users,
  },
  {
    name: "24/7 지원",
    description: "언제든 전문 지원팀의 도움을 받을 수 있습니다.",
    icon: Clock,
  },
  {
    name: "글로벌 확장",
    description: "전 세계 어디서든 최적의 성능을 경험하세요.",
    icon: Globe,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold text-accent uppercase tracking-wide">
            핵심 기능
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            비즈니스 성장에 필요한 모든 것
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            복잡한 작업을 단순하게. 강력한 기능으로 효율성을 높이세요.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative rounded-2xl border border-border bg-card p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
