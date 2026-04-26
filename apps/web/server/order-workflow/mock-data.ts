import type {
  AuditLogEntry,
  CatalogOption,
  CatalogProduct,
  FaqItem,
  OrderDraftSelection,
  OrderRequestSummary,
  ReportSummary
} from "@/types/order-workflow";

export const catalogProducts: CatalogProduct[] = [
  {
    id: "naver-standard",
    name: "네이버 블로그 일반 배포",
    description: "기본 리뷰형 배포 상품",
    channel: "blog",
    unitPrice: 85000,
    leadTimeDays: 7
  },
  {
    id: "naver-premium",
    name: "네이버 블로그 프리미엄 배포",
    description: "상위 노출 우선의 확장 상품",
    channel: "blog",
    unitPrice: 132000,
    leadTimeDays: 10
  },
  {
    id: "influencer-seeding",
    name: "인플루언서 시딩 패키지",
    description: "체험단 연계형 상품",
    channel: "social",
    unitPrice: 176000,
    leadTimeDays: 14
  }
];

export const catalogOptions: CatalogOption[] = [
  {
    id: "legacy-blog",
    name: "24년 이전 블로그 배포",
    description: "구형 블로그 자산까지 확장 배포",
    priceDelta: 12000
  },
  {
    id: "priority-review",
    name: "우선 검수",
    description: "운영자 우선 확인",
    priceDelta: 18000
  },
  {
    id: "image-copy",
    name: "이미지 재가공",
    description: "업로드 이미지 비율 보정",
    priceDelta: 9000
  }
];

export const seededOrderDraft: OrderDraftSelection = {
  accountId: "account-a",
  vendorName: "스튜디오 리프",
  productLink: "https://example.com/product/studio-leaf-serum",
  contentType: "review",
  keywords: ["비건 세럼", "수분 진정", "네이버 블로그 배포"],
  productId: "naver-standard",
  optionIds: ["legacy-blog", "priority-review"],
  quantity: 3,
  scheduledDate: "2026-05-01",
  paymentMethod: "bank_transfer"
};

export const orderRequests: OrderRequestSummary[] = [
  {
    id: "ord-001",
    accountName: "브랜드 A",
    vendorName: "스튜디오 리프",
    status: "pending_approval",
    totalItems: 8,
    completedItems: 0,
    scheduledDate: "2026-05-01",
    paymentMethod: "bank_transfer",
    totalAmount: 379500,
    blogs: [],
    lastUpdatedAt: "2026-04-26"
  },
  {
    id: "ord-002",
    accountName: "브랜드 B",
    vendorName: "퍼퓸 아틀리에",
    status: "in_progress",
    totalItems: 10,
    completedItems: 6,
    scheduledDate: "2026-04-30",
    paymentMethod: "points",
    totalAmount: 561000,
    blogs: ["lune-note", "city-aroma", "daily-scent"],
    lastUpdatedAt: "2026-04-26"
  },
  {
    id: "ord-003",
    accountName: "브랜드 C",
    vendorName: "가든 바이옴",
    status: "completed",
    totalItems: 12,
    completedItems: 12,
    scheduledDate: "2026-04-18",
    paymentMethod: "points",
    totalAmount: 814000,
    blogs: ["green-log", "plant-canvas", "weekend-herb"],
    lastUpdatedAt: "2026-04-25"
  }
];

export const reportSummaries: ReportSummary[] = [
  {
    id: "rpt-001",
    orderId: "ord-003",
    title: "가든 바이옴 봄 시즌 배포 리포트",
    publishedAt: "2026-04-25",
    placements: 12,
    completionRate: 100,
    summary: "배포 채널 12건이 모두 완료되었고, 핵심 키워드 중심의 콘텐츠 노출 구조를 정리한 요약 리포트입니다."
  },
  {
    id: "rpt-002",
    orderId: "ord-002",
    title: "퍼퓸 아틀리에 진행 중간 리포트",
    publishedAt: "2026-04-26",
    placements: 6,
    completionRate: 60,
    summary: "진행 중인 배포 리스트와 현재까지 완료된 채널을 기준으로 중간 결과를 공유하는 프리뷰입니다."
  }
];

export const auditLogs: AuditLogEntry[] = [
  {
    id: "log-001",
    actor: "admin",
    event: "deposit_verified",
    message: "브랜드 A 주문의 무통장 입금이 확인되어 승인 대기 검토로 이동했습니다."
  },
  {
    id: "log-002",
    actor: "system",
    event: "price_recalculated",
    message: "상품 옵션 변경으로 주문 예상 금액이 다시 계산되었습니다."
  },
  {
    id: "log-003",
    actor: "customer",
    event: "stop_requested",
    message: "브랜드 B 주문에 대해 별도 이슈로 중지 요청이 접수되었습니다."
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "승인 대기 중에는 어떤 항목을 수정할 수 있나요?",
    answer: "승인 전에는 상품, 옵션, 수량, 일정, 키워드, 이미지 ZIP을 다시 수정할 수 있고, 승인 후에는 운영자 확인 흐름으로 전환됩니다."
  },
  {
    question: "결제 방식은 어떻게 나뉘나요?",
    answer: "포인트 차감형과 건별 계좌 입금 확인형 두 흐름을 모두 지원하도록 설계되어 있으며, 실제 노출 방식은 계정 정책에 따라 분기할 수 있습니다."
  },
  {
    question: "엑셀 대량 등록은 언제 붙이나요?",
    answer: "기본 주문 모델과 검증 규칙이 확정된 다음, 같은 입력 스키마를 재사용하는 방식으로 추가하는 것이 안전합니다."
  }
];
