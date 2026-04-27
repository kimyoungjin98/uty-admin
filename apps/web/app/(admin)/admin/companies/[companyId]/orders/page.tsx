import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CreditCard, PauseCircle } from "lucide-react";
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
import { adminCompanies, companyOrders } from "@/server/order-workflow/admin-data";

export default async function AdminCompanyOrdersPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = adminCompanies.find((item) => item.id === companyId);

  if (!company) {
    notFound();
  }

  const orders = companyOrders.filter((order) => order.companyId === company.id);

  return (
    <div className="space-y-6 animate-ui-enter">
      <div>
        <Button asChild variant="link" className="mb-3">
          <Link href={`/admin/companies/${company.id}`}>
            <ArrowLeft className="size-4" />
            업체 상세
          </Link>
        </Button>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Company Orders
        </p>
        <h1 className="mt-2 text-3xl font-medium text-foreground">{company.name} 발주 관리</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          업체 상세 내부에서 승인, 결제 확인, 중지 요청을 처리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>발주 승인 목록</CardTitle>
          <CardDescription>승인 대기와 결제 확인이 필요한 접수건을 우선 처리합니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {orders.map((order) => (
              <article key={order.id} className="rounded-sm border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="mt-1 break-keep text-xs text-muted-foreground">{order.campaign}</p>
                  </div>
                  <OrderStatus status={order.stopRequested ? "중지 요청" : order.status} />
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">접수일</dt>
                    <dd className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
                      {order.requestedAt}
                    </dd>
                  </div>
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">금액</dt>
                    <dd className="mt-1 whitespace-nowrap text-sm font-medium text-primary">
                      {order.amount.toLocaleString()}원
                    </dd>
                  </div>
                  <div className="col-span-2 rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">결제</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">{order.payment}</dd>
                  </div>
                </dl>

                <div className="mt-4 grid gap-2">
                  {order.status === "승인 대기" && (
                    <Button className="w-full">
                      <CheckCircle2 className="size-4" />
                      승인
                    </Button>
                  )}
                  {order.status === "결제 대기" && (
                    <Button variant="outline" className="w-full">
                      <CreditCard className="size-4" />
                      입금 확인
                    </Button>
                  )}
                  {order.stopRequested && (
                    <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                      <PauseCircle className="size-4" />
                      중지 처리
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:block">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문</TableHead>
                <TableHead>접수일</TableHead>
                <TableHead>결제</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{order.campaign}</p>
                  </TableCell>
                  <TableCell>{order.requestedAt}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>{order.amount.toLocaleString()}원</TableCell>
                  <TableCell>
                    <OrderStatus status={order.stopRequested ? "중지 요청" : order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === "승인 대기" && (
                        <Button size="sm">
                          <CheckCircle2 className="size-4" />
                          승인
                        </Button>
                      )}
                      {order.status === "결제 대기" && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="size-4" />
                          입금 확인
                        </Button>
                      )}
                      {order.stopRequested && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <PauseCircle className="size-4" />
                          중지 처리
                        </Button>
                      )}
                    </div>
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

function OrderStatus({ status }: { status: string }) {
  if (status === "중지 요청") {
    return <Badge variant="destructive">중지 요청</Badge>;
  }

  if (status === "진행중") {
    return <Badge variant="default">진행중</Badge>;
  }

  return <Badge variant="secondary">{status}</Badge>;
}
