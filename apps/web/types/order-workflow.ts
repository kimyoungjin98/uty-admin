export type RequestStatus =
  | "draft"
  | "pending_approval"
  | "payment_pending"
  | "approved"
  | "in_progress"
  | "completed"
  | "stopped"
  | "report_published";

export type PaymentMethod = "points" | "bank_transfer";
export type ContentType = "review" | "info";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  channel: "blog" | "social";
  unitPrice: number;
  leadTimeDays: number;
};

export type CatalogOption = {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
};

export type OrderDraftSelection = {
  accountId: string;
  vendorName: string;
  productLink: string;
  contentType: ContentType;
  keywords: string[];
  productId: string;
  optionIds: string[];
  quantity: number;
  scheduledDate: string;
  paymentMethod: PaymentMethod;
};

export type OrderRequestSummary = {
  id: string;
  accountName: string;
  vendorName: string;
  status: RequestStatus;
  totalItems: number;
  completedItems: number;
  scheduledDate: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  blogs: string[];
  lastUpdatedAt: string;
};

export type ReportSummary = {
  id: string;
  orderId: string;
  title: string;
  publishedAt: string;
  placements: number;
  completionRate: number;
  summary: string;
};

export type AuditLogEntry = {
  id: string;
  actor: "admin" | "customer" | "system";
  event: string;
  message: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
