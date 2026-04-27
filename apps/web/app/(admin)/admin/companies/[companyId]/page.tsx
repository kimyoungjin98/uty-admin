import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileClock, ListChecks } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@uty/ui";
import { adminCompanies, companyOrders, companyProgressItems } from "@/server/order-workflow/admin-data";

export default async function AdminCompanyDetailPage({
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
  const progressItems = companyProgressItems.filter((item) => item.companyId === company.id);

  return (
    <div className="space-y-6 animate-ui-enter">
      <div>
        <Button asChild variant="link" className="mb-3">
          <Link href="/admin/companies">
            <ArrowLeft className="size-4" />
            업체 목록
          </Link>
        </Button>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Company Detail
            </p>
            <h1 className="mt-2 text-3xl font-medium text-foreground">{company.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {company.accountName} · 담당 {company.manager} · {company.contact}
            </p>
          </div>
          <Badge variant={company.status === "활성" ? "default" : "secondary"}>{company.status}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="승인 대기" value={`${company.pendingOrders}건`} />
        <Metric label="진행중" value={`${company.activeOrders}건`} />
        <Metric label="완료" value={`${company.completedOrders}건`} />
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
              <ListChecks className="size-5" />
            </span>
            <CardTitle className="pt-3">발주 승인 및 결제 확인</CardTitle>
            <CardDescription>
              이 업체의 승인 대기, 입금 확인, 중지 요청을 처리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              {orders.slice(0, 2).map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-3 rounded-sm border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.campaign}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{order.status} · {order.payment}</p>
                  </div>
                  <p className="text-sm font-medium text-primary">{order.amount.toLocaleString()}원</p>
                </div>
              ))}
            </div>
            <Button asChild className="w-full">
              <Link href={`/admin/companies/${company.id}/orders`}>
                발주 관리로 이동
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="flex size-10 items-center justify-center rounded-sm bg-brand-50 text-primary">
              <FileClock className="size-5" />
            </span>
            <CardTitle className="pt-3">진행 작업 및 리포트</CardTitle>
            <CardDescription>
              진행률, 블로그 리스트, 완료 리포트를 업체 단위로 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              {progressItems.length > 0 ? (
                progressItems.map((item) => (
                  <div key={item.id} className="rounded-sm border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs font-medium text-primary">
                        {item.completed}/{item.total}건
                      </p>
                    </div>
                    <div className="mt-3 h-1.5 rounded-sm bg-secondary">
                      <div
                        className="h-full rounded-sm bg-primary"
                        style={{ width: `${Math.round((item.completed / item.total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-sm border border-border p-3 text-sm text-muted-foreground">
                  진행중 작업이 없습니다.
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/admin/companies/${company.id}/progress`}>
                진행 관리로 이동
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-medium text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
