"use client";

import { useMemo, useState } from "react";
import {
  AlertOctagon,
  Download,
  FilePenLine,
  FileText,
  Play,
  Search,
} from "lucide-react";
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
  cn,
} from "@uty/ui";
import { orderRequests, reportSummaries } from "@/server/order-workflow/mock-data";
import type { RequestStatus } from "@/types/order-workflow";

const filters: Array<{ value: "all" | RequestStatus; label: string }> = [
  { value: "all", label: "전체" },
  { value: "pending_approval", label: "신청 승인 대기" },
  { value: "in_progress", label: "진행중" },
  { value: "completed", label: "완료" },
];

export default function CustomerStatusPage() {
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const visibleOrders = useMemo(
    () => (filter === "all" ? orderRequests : orderRequests.filter((order) => order.status === filter)),
    [filter],
  );

  return (
    <div className="space-y-6 animate-ui-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Status</p>
          <h1 className="mt-2 text-3xl font-medium text-foreground">진행 현황</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            신청 승인 대기, 진행중, 완료 상태를 구분해 확인합니다.
          </p>
        </div>
        <Button variant="outline">
          <Download className="size-4" />
          엑셀 다운로드
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {filters.map((item) => {
          const count =
            item.value === "all"
              ? orderRequests.length
              : orderRequests.filter((order) => order.status === item.value).length;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-sm border border-border bg-card p-3 text-left transition-colors duration-[330ms] hover:border-primary md:p-4",
                filter === item.value && "border-primary bg-brand-50",
              )}
            >
              <span className="break-keep text-xs text-muted-foreground md:text-sm">{item.label}</span>
              <span className="mt-1 block text-xl font-medium text-foreground md:mt-2 md:text-2xl">
                {count}건
              </span>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle>작업 목록</CardTitle>
              <CardDescription>승인 전에는 수정, 진행중에는 중지 요청이 가능합니다.</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-10 w-full rounded-sm border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors duration-[330ms] focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="업체, 계정 검색"
                type="search"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {visibleOrders.map((order) => {
              const progress = Math.round((order.completedItems / order.totalItems) * 100);
              const report = reportSummaries.find((item) => item.orderId === order.id);

              return (
                <article key={order.id} className="rounded-sm border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-keep text-base font-medium leading-6 text-foreground">
                        {order.vendorName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.id} · {order.accountName}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={order.status} progress={progress} />
                    </div>
                  </div>

                  <div className="mt-4">
                    {order.status === "in_progress" ? (
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-foreground">
                            {order.completedItems}/{order.totalItems}건
                          </span>
                          <span className="text-xs font-medium text-primary">{progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-sm bg-secondary">
                          <div className="h-full rounded-sm bg-primary" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="mt-2 break-keep text-xs leading-5 text-muted-foreground">
                          {order.blogs.join(", ")}
                        </p>
                      </div>
                    ) : order.status === "completed" && report ? (
                      <p className="break-keep text-sm leading-6 text-muted-foreground">{report.summary}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">관리자 승인 전 수정 가능</p>
                    )}
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-sm bg-secondary/60 p-3">
                      <dt className="text-xs font-medium text-muted-foreground">예정일</dt>
                      <dd className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
                        {order.scheduledDate}
                      </dd>
                    </div>
                    <div className="rounded-sm bg-secondary/60 p-3">
                      <dt className="text-xs font-medium text-muted-foreground">금액</dt>
                      <dd className="mt-1 whitespace-nowrap text-sm font-medium text-primary">
                        {order.totalAmount.toLocaleString()}원
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 grid gap-2">
                    {order.status === "pending_approval" && (
                      <Button variant="outline" className="w-full">
                        <FilePenLine className="size-4" />
                        수정
                      </Button>
                    )}
                    {order.status === "in_progress" && (
                      <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                        <AlertOctagon className="size-4" />
                        중지 요청
                      </Button>
                    )}
                    {order.status === "completed" && (
                      <>
                        <Button variant="outline" className="w-full">
                          <FileText className="size-4" />
                          간편 리포트
                        </Button>
                        <Button className="w-full">전체 결과보고서</Button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>접수 정보</TableHead>
                <TableHead>진행 정보</TableHead>
                <TableHead>일정 / 금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleOrders.map((order) => {
                const progress = Math.round((order.completedItems / order.totalItems) * 100);
                const report = reportSummaries.find((item) => item.orderId === order.id);

                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{order.vendorName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.id} · {order.accountName}
                      </p>
                    </TableCell>
                    <TableCell>
                      {order.status === "in_progress" ? (
                        <div className="min-w-52">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-foreground">
                              {order.completedItems}/{order.totalItems}건
                            </span>
                            <span className="text-xs font-medium text-primary">{progress}%</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-sm bg-secondary">
                            <div className="h-full rounded-sm bg-primary" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {order.blogs.join(", ")}
                          </p>
                        </div>
                      ) : order.status === "completed" && report ? (
                        <p className="max-w-xs text-sm leading-6 text-muted-foreground">{report.summary}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">관리자 승인 전 수정 가능</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{order.scheduledDate}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.totalAmount.toLocaleString()}원
                      </p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} progress={progress} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === "pending_approval" && (
                          <Button variant="outline" size="sm">
                            <FilePenLine className="size-4" />
                            수정
                          </Button>
                        )}
                        {order.status === "in_progress" && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <AlertOctagon className="size-4" />
                            중지 요청
                          </Button>
                        )}
                        {order.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <FileText className="size-4" />
                              간편 리포트
                            </Button>
                            <Button size="sm">전체 결과보고서</Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status, progress }: { status: RequestStatus; progress: number }) {
  if (status === "in_progress") {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="default">
          <Play className="size-3" />
          진행중
        </Badge>
        <span className="text-xs font-medium text-primary">{progress}%</span>
      </div>
    );
  }

  if (status === "completed") {
    return <Badge variant="outline">완료</Badge>;
  }

  return <Badge variant="secondary">신청 승인 대기</Badge>;
}
