export const siteSettings = {
  name: "Landing Boilerplate",
  shortName: "Boilerplate",
  description:
    "웹 외주 프로젝트를 장기적으로 재사용하기 위한 Next.js 기반 랜딩페이지 보일러플레이트",
  locale: "ko_KR",
  email: "hello@example.com",
  phone: "+82 10-1234-5678",
  location: "Seoul, South Korea",
  countryCode: "KR",
  brandMark: "LB",
  header: {
    tagline: "Composable landing system",
    primaryAction: {
      label: "문의 시작하기",
      href: "/#contact",
    },
    compactAction: {
      label: "문의",
      href: "/#contact",
    },
  },
  footer: {
    links: [
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "이용약관", href: "/terms" },
    ],
  },
} as const;
