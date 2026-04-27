import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, RotateCcw } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uty/ui";
import { seededOrderDraft } from "@/server/order-workflow/mock-data";

const recentTemplates = [
  {
    id: "tpl-001",
    account: "브랜드 A",
    vendor: seededOrderDraft.vendorName,
    keywords: seededOrderDraft.keywords.join(", "),
    product: "네이버 블로그 일반 배포",
    quantity: seededOrderDraft.quantity,
    date: "2026-04-26",
  },
  {
    id: "tpl-002",
    account: "브랜드 A",
    vendor: "퍼퓸 아틀리에",
    keywords: "니치 향수, 퍼퓸 추천",
    product: "네이버 블로그 프리미엄 배포",
    quantity: 5,
    date: "2026-04-20",
  },
  {
    id: "tpl-003",
    account: "브랜드 B",
    vendor: "가든 바이옴",
    keywords: "유기농 식단, 샐러드 배송",
    product: "인플루언서 시딩 패키지",
    quantity: 4,
    date: "2026-04-18",
  },
];

export default function RecentOrderPage() {
  return (
    <div className="space-y-6 animate-ui-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Button asChild variant="link" className="mb-3">
            <Link href="/orders">
              <ArrowLeft className="size-4" />
              발주 목록
            </Link>
          </Button>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Recent Templates
          </p>
          <h1 className="mt-2 text-3xl font-medium text-foreground">
            최근 작업 이력
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            계정별 최근 양식을 불러와 수정 후 바로 재발주합니다.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/orders/new">
            빈 신청서 작성
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>계정 선택</CardTitle>
          <CardDescription>
            선택한 계정의 최근 작업 양식만 노출됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-xl">
          <FormField label="고객 계정" required>
            <Select defaultValue="account-a">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-a">브랜드 A</SelectItem>
                <SelectItem value="account-b">브랜드 B</SelectItem>
                <SelectItem value="account-c">브랜드 C</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {recentTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
                  <Clock3 className="size-5" />
                </span>
                <Badge variant="secondary">{template.date}</Badge>
              </div>
              <CardTitle className="pt-3">{template.vendor}</CardTitle>
              <CardDescription>{template.keywords}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 rounded-sm border border-border p-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">상품</p>
                  <p className="mt-1 font-medium text-foreground">
                    {template.product}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">수량</p>
                  <p className="mt-1 font-medium text-foreground">
                    {template.quantity}건
                  </p>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href={`/orders/new?templateId=${template.id}`}>
                  <RotateCcw className="size-4" />이 양식으로 재발주
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
