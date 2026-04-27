import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Play } from "lucide-react";
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
import { adminCompanies, companyProgressItems } from "@/server/order-workflow/admin-data";

export default async function AdminCompanyProgressPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = adminCompanies.find((item) => item.id === companyId);

  if (!company) {
    notFound();
  }

  const items = companyProgressItems.filter((item) => item.companyId === company.id);

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
          Company Progress
        </p>
        <h1 className="mt-2 text-3xl font-medium text-foreground">{company.name} 진행 관리</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          진행 작업, 블로그 리스트, 완료 리포트를 업체 단위로 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>작업 진행 목록</CardTitle>
          <CardDescription>진행률은 완료 건수와 신청 총 건수 기준으로 계산됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {items.map((item) => {
              const progress = Math.round((item.completed / item.total) * 100);

              return (
                <article key={item.id} className="rounded-sm border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-keep text-base font-medium leading-6 text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.orderId}</p>
                    </div>
                    <ProgressStatus status={item.status} />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {item.completed}/{item.total}건
                      </span>
                      <span className="text-xs font-medium text-primary">{progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-sm bg-secondary">
                      <div className="h-full rounded-sm bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 rounded-sm bg-secondary/60 p-3">
                    <p className="text-xs font-medium text-muted-foreground">블로그 리스트</p>
                    {item.blogs.length > 0 ? (
                      <p className="mt-1 break-keep text-sm leading-6 text-foreground">
                        {item.blogs.join(", ")}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">승인 후 배정 예정</p>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2">
                    {item.status === "진행중" && (
                      <Button variant="outline" className="w-full">
                        <Play className="size-4" />
                        블로그 갱신
                      </Button>
                    )}
                    {item.status === "완료" && (
                      <Button className="w-full">
                        <FileText className="size-4" />
                        리포트 관리
                      </Button>
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
                <TableHead>작업</TableHead>
                <TableHead>블로그 리스트</TableHead>
                <TableHead>진행률</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const progress = Math.round((item.completed / item.total) * 100);

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.orderId}</p>
                    </TableCell>
                    <TableCell>
                      {item.blogs.length > 0 ? (
                        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                          {item.blogs.join(", ")}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">승인 후 배정 예정</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="min-w-44">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-foreground">
                            {item.completed}/{item.total}건
                          </span>
                          <span className="text-xs font-medium text-primary">{progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-sm bg-secondary">
                          <div className="h-full rounded-sm bg-primary" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ProgressStatus status={item.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.status === "진행중" && (
                          <Button variant="outline" size="sm">
                            <Play className="size-4" />
                            블로그 갱신
                          </Button>
                        )}
                        {item.status === "완료" && (
                          <Button size="sm">
                            <FileText className="size-4" />
                            리포트 관리
                          </Button>
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

function ProgressStatus({ status }: { status: string }) {
  if (status === "진행중") {
    return <Badge variant="default">진행중</Badge>;
  }

  if (status === "완료") {
    return <Badge variant="outline">완료</Badge>;
  }

  return <Badge variant="secondary">{status}</Badge>;
}
