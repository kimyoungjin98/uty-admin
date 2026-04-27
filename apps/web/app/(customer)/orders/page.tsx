import Link from "next/link";
import { ArrowRight, FileClock, FilePlus2, FileSpreadsheet } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@uty/ui";
import { orderRequests } from "@/server/order-workflow/mock-data";

const orderActions = [
  {
    href: "/orders/new",
    title: "단건 등록",
    description: "계정 선택부터 결제 방식까지 한 건의 신청서를 작성합니다.",
    icon: FilePlus2,
  },
  {
    href: "/orders/bulk",
    title: "엑셀 등록",
    description: "동일 양식의 다수 접수건을 계정 기준으로 업로드합니다.",
    icon: FileSpreadsheet,
  },
  {
    href: "/orders/recent",
    title: "최근 내역 불러오기",
    description: "계정별 최근 작업 이력을 불러와 수정 후 재발주합니다.",
    icon: FileClock,
  },
];

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-6 animate-ui-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Orders
          </p>
          <h1 className="mt-2 text-3xl font-medium text-foreground">발주 목록</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            접수 방식별 페이지로 이동해 신청서를 작성합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/orders/new">
            단건 발주 시작
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {orderActions.map((action) => {
          const Icon = action.icon;

          return (
            <Card key={action.href} className="transition-colors duration-[330ms] hover:border-primary">
              <CardHeader>
                <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="pt-3">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={action.href}>
                    이동
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>최근 접수 현황</CardTitle>
          <CardDescription>상세 진행 상태는 진행 현황에서 확인합니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {orderRequests.map((order) => (
              <article key={order.id} className="rounded-sm border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-keep text-base font-medium leading-6 text-foreground">
                      {order.vendorName}
                    </p>
                    <p className="mt-1 break-keep text-xs text-muted-foreground">{order.accountName}</p>
                  </div>
                  <div className="shrink-0">
                    <OrderStatus value={order.status} />
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">신청 수량</dt>
                    <dd className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
                      {order.totalItems}건
                    </dd>
                  </div>
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">예정일</dt>
                    <dd className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
                      {order.scheduledDate}
                    </dd>
                  </div>
                  <div className="col-span-2 rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">결제 금액</dt>
                    <dd className="mt-1 whitespace-nowrap text-sm font-medium text-primary">
                      {order.totalAmount.toLocaleString()}원
                    </dd>
                  </div>
                </dl>

                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/status">
                    진행 확인
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>

          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>업체/계정</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>신청 수량</TableHead>
                  <TableHead>예정일</TableHead>
                  <TableHead>결제 금액</TableHead>
                  <TableHead className="text-right">상세</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderRequests.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{order.vendorName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{order.accountName}</p>
                    </TableCell>
                    <TableCell>
                      <OrderStatus value={order.status} />
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{order.totalItems}건</span>
                    </TableCell>
                    <TableCell>{order.scheduledDate}</TableCell>
                    <TableCell>
                      <span className="font-medium text-primary">
                        {order.totalAmount.toLocaleString()}원
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/status">
                          진행 확인
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OrderStatus({ value }: { value: string }) {
  if (value === "in_progress") {
    return <Badge variant="default">진행중</Badge>;
  }

  if (value === "completed") {
    return <Badge variant="outline">완료</Badge>;
  }

  return <Badge variant="secondary">승인 대기</Badge>;
}
