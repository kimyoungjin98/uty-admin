import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getIndex() {
    return {
      name: "UTY Admin API",
      version: "0.1.0",
      docs: {
        health: "/health",
        ordersPreview: "/orders/preview"
      }
    };
  }

  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString()
    };
  }
}
