import type { LandingPageData } from "@/content/schema";

export const homePage: LandingPageData = {
  sections: [
    {
      type: "hero",
      id: "hero",
      eyebrow: "Long-term landing system for client work",
      title: "도메인별 구조 변화까지 감당하는 장기형 랜딩 보일러플레이트",
      description:
        "한 프로젝트를 빨리 띄우는 템플릿이 아니라, 외주마다 달라지는 섹션 구성과 브랜드 스타일을 장기적으로 재사용할 수 있는 기반을 목표로 합니다.",
      primaryAction: {
        href: "/#contact",
        label: "프로젝트 문의 받기",
      },
      secondaryAction: {
        href: "/#services",
        label: "구성 살펴보기",
      },
      highlights: [
        "Section registry 기반 페이지 조합",
        "Tailwind CSS v4 semantic token system",
        "다크모드 / primary color 스위칭",
        "문의 폼 + 선택형 Resend / Turnstile",
      ],
      aside: {
        eyebrow: "Reusable by design",
        stats: [
          { value: "Composable", label: "섹션을 조립해 도메인별 페이지 구성 가능" },
          { value: "SEO ready", label: "메타데이터 / robots / sitemap 기본 제공" },
          { value: "System-first", label: "공통 컴포넌트와 디자인 토큰 중심 구조" },
        ],
        checklistTitle: "권장 작업 흐름",
        checklist: [
          "`content/pages/home.ts`에서 섹션 조합과 내용 수정",
          "`config/site.ts`에서 브랜드/법률/연락처 수정",
          "`app/globals.css`에서 토큰과 테마 조정",
          "필요 시 새 섹션 컴포넌트만 추가 후 registry 연결",
        ],
      },
    },
    {
      type: "feature-grid",
      id: "services",
      navigationLabel: "서비스",
      eyebrow: "Built for long-term reuse",
      title: "재사용성을 기준으로 나눈 보일러플레이트 구성",
      description:
        "도메인별 요구가 달라도 공통 레이어는 유지하고, 섹션과 데이터 shape만 바꿔서 확장하기 쉬운 구조를 지향합니다.",
      columns: 3,
      items: [
        {
          eyebrow: "Composition",
          title: "섹션 기반 페이지 조립",
          description:
            "페이지는 section array를 기준으로 조합되며, 필요한 섹션만 켜고 끌 수 있습니다.",
        },
        {
          eyebrow: "System",
          title: "공통 UI 스타일 시스템",
          description:
            "Button, Input, Surface 같은 공통 요소를 중심으로 프로젝트 전체 스타일을 일관되게 바꿀 수 있습니다.",
        },
        {
          eyebrow: "Content",
          title: "설정과 콘텐츠의 역할 분리",
          description:
            "사이트 메타, 테마, 페이지 섹션 데이터를 분리해 고정형 config 한 파일 의존을 줄였습니다.",
        },
      ],
    },
    {
      type: "steps",
      id: "process",
      navigationLabel: "프로세스",
      eyebrow: "Production flow",
      title: "외주 프로젝트 운영 기준에 맞춘 작업 흐름",
      description:
        "디자인과 카피 변경이 잦아도 전체 구조를 흔들지 않고 수정할 수 있도록 흐름을 기준으로 섹션을 분리했습니다.",
      steps: [
        {
          title: "도메인 요구사항 정리",
          description:
            "브랜드 톤, 섹션 필요 여부, CTA, 수집할 문의 항목을 먼저 정리합니다.",
        },
        {
          title: "페이지 조합 선택",
          description:
            "section array에서 사용할 섹션과 순서를 정하고 필요한 경우 새 section type을 추가합니다.",
        },
        {
          title: "스타일 토큰 적용",
          description:
            "테마 토큰과 공통 컴포넌트 variant를 활용해 프로젝트 전체 스타일을 빠르게 통일합니다.",
        },
        {
          title: "폼 / SEO / 배포 연결",
          description:
            "Resend, Turnstile, 메타데이터, 도메인 URL, Vercel 환경변수를 연결합니다.",
        },
      ],
    },
    {
      type: "social-proof",
      id: "proof",
      navigationLabel: "신뢰 요소",
      eyebrow: "Credibility blocks",
      title: "신뢰 요소도 독립 섹션으로 관리",
      description:
        "수치와 후기, 운영 기준을 한 파일에 고정하지 않고 섹션 shape로 관리해 다른 도메인에서도 재사용하기 쉽습니다.",
      metrics: [
        { label: "구성 가능한 섹션", value: "6+" },
        { label: "기본 제공 페이지", value: "4" },
        { label: "테마 프리셋", value: "4" },
      ],
      testimonials: [
        {
          quote:
            "섹션 구성이 페이지 파일에 박혀 있지 않아서 프로젝트별 랜딩 구조를 바꾸는 비용이 확실히 줄었습니다.",
          name: "김지훈",
          role: "Freelance Designer",
        },
        {
          quote:
            "버튼, 필드, surface 계열 공통 UI가 잡혀 있으니 스타일 수정이 전체 프로젝트에 한 번에 반영됩니다.",
          name: "박서윤",
          role: "Frontend Developer",
        },
        {
          quote:
            "문의 폼, 법률 페이지, SEO 기본값까지 갖춰져 있어 외주 전달 전에 놓치는 항목이 적었습니다.",
          name: "이도현",
          role: "Agency PM",
        },
      ],
    },
    {
      type: "faq",
      id: "faq",
      navigationLabel: "FAQ",
      eyebrow: "Questions",
      title: "자주 바뀌는 질문도 section 데이터로 관리",
      description:
        "FAQ는 SEO 구조화 데이터와 연결되며, 섹션 구성과 분리된 상태로 수정할 수 있습니다.",
      items: [
        {
          question: "이 구조는 여러 외주 프로젝트에서 재사용하기 쉬운가요?",
          answer:
            "네. 공통 레이아웃과 UI는 유지하고, 페이지는 section array 기준으로 조합하므로 다른 도메인에 맞게 유연하게 바꿀 수 있습니다.",
        },
        {
          question: "site-config 같은 단일 파일보다 이 방식이 더 나은가요?",
          answer:
            "장기적으로는 더 낫습니다. 전역 설정, 테마, 페이지 조합이 분리되어 있기 때문에 특정 프로젝트 요구가 전체 config shape를 망가뜨리지 않습니다.",
        },
        {
          question: "백엔드 없이도 문의 폼을 쓸 수 있나요?",
          answer:
            "가능합니다. 기본 성공 흐름은 유지하면서, Resend나 Neon 같은 외부 서비스를 필요할 때만 붙이도록 열어두었습니다.",
        },
      ],
    },
    {
      type: "contact",
      id: "contact",
      navigationLabel: "문의",
      eyebrow: "Contact",
      title: "운영형으로 확장 가능한 문의 경험",
      description:
        "기본 문의 폼은 바로 쓸 수 있고, Resend / Turnstile / Neon 등은 필요할 때만 연결하는 구조입니다.",
      details: [
        {
          label: "기본 응답 흐름",
          value: "유효성 검증 후 성공 페이지 이동",
        },
        {
          label: "선택 확장",
          value: "Resend / Turnstile / Neon 연결 가능",
        },
        {
          label: "배포 기준",
          value: "Vercel 환경변수 기반",
        },
      ],
      formNote:
        "Resend 미연동 상태에서도 성공 흐름을 테스트할 수 있도록 기본 동작이 준비되어 있습니다.",
    },
  ],
};
