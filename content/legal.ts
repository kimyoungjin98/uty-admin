export type LegalDocument = {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const legalDocuments: Record<"privacy" | "terms", LegalDocument> = {
  privacy: {
    title: "개인정보처리방침",
    description:
      "문의 폼을 통해 수집되는 이름, 이메일, 회사명, 문의 내용은 프로젝트 응대 목적으로만 사용됩니다.",
    sections: [
      {
        title: "수집 항목",
        body: "문의 폼을 통해 이름, 이메일, 회사명, 예산, 문의 내용을 수집할 수 있습니다.",
      },
      {
        title: "수집 목적",
        body: "수집한 정보는 프로젝트 문의 응대, 일정 조율, 견적 안내를 위해서만 사용합니다.",
      },
      {
        title: "보관 기간",
        body: "실제 서비스 운영 시에는 계약 또는 문의 목적 달성 후 지체 없이 파기하는 기준을 프로젝트별 정책에 맞춰 명시해 주세요.",
      },
    ],
  },
  terms: {
    title: "이용약관",
    description:
      "실제 운영 시 서비스 성격에 맞춰 책임 범위, 환불 정책, 저작권 기준을 프로젝트별로 보완해 주세요.",
    sections: [
      {
        title: "서비스 안내",
        body: "본 보일러플레이트는 랜딩페이지 구축을 빠르게 시작하는 것이 아니라, 외주 프로젝트 전반에서 재사용 가능한 기본 코드 구조를 제공합니다.",
      },
      {
        title: "책임 범위",
        body: "실제 외주 프로젝트에서는 기능 명세, 검수 범위, 수정 횟수, 배포 책임 범위를 별도 계약서 또는 약관으로 구체화해 주세요.",
      },
      {
        title: "지적 재산권",
        body: "산출물의 소유권과 2차 활용 범위는 프로젝트별 계약 조건에 따라 조정할 수 있도록 문구를 보완해 주세요.",
      },
    ],
  },
};
