import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersService {
  getPreview() {
    return {
      statuses: [
        { key: "pending_approval", label: "승인 대기", count: 1 },
        { key: "in_progress", label: "진행 중", count: 1 },
        { key: "completed", label: "진행 완료", count: 1 }
      ],
      paymentMethods: ["points", "bank_transfer"],
      features: [
        "one-click ordering",
        "price calculation",
        "approval queue",
        "progress tracking",
        "report publishing"
      ]
    };
  }
}
