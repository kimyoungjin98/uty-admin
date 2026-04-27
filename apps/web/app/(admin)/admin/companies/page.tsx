import Link from "next/link";
import { ArrowRight, Building2, Search } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@uty/ui";
import { adminCompanies } from "@/server/order-workflow/admin-data";

export default function AdminCompaniesPage() {
  return (
    <div className="space-y-6 animate-ui-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Companies
          </p>
          <h1 className="mt-2 text-3xl font-medium text-foreground">업체 관리</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            업체를 선택한 뒤 상세 화면에서 발주 승인과 진행 관리를 처리합니다.
          </p>
        </div>
        <Button>
          <Building2 className="size-4" />
          업체 등록
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>업체 목록</CardTitle>
            <CardDescription>직접 발주/진행 관리 메뉴는 업체 상세 내부로 통합되었습니다.</CardDescription>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="업체명, 계정 검색" type="search" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {adminCompanies.map((company) => (
              <article key={company.id} className="rounded-sm border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-keep text-base font-medium leading-6 text-foreground">
                      {company.name}
                    </p>
                    <p className="mt-1 break-all text-xs text-muted-foreground">{company.contact}</p>
                  </div>
                  <Badge variant={company.status === "활성" ? "default" : "secondary"}>
                    {company.status}
                  </Badge>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">계정</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">
                      {company.accountName}
                    </dd>
                  </div>
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">담당자</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">{company.manager}</dd>
                  </div>
                  <div className="col-span-2 rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">작업 현황</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">
                      승인 {company.pendingOrders} · 진행 {company.activeOrders} · 완료{" "}
                      {company.completedOrders}
                    </dd>
                  </div>
                </dl>

                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href={`/admin/companies/${company.id}`}>
                    업체 상세
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
                <TableHead>업체</TableHead>
                <TableHead>계정</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>작업 현황</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">상세</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{company.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{company.contact}</p>
                  </TableCell>
                  <TableCell>{company.accountName}</TableCell>
                  <TableCell>{company.manager}</TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground">
                      승인 {company.pendingOrders} · 진행 {company.activeOrders} · 완료{" "}
                      {company.completedOrders}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.status === "활성" ? "default" : "secondary"}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/companies/${company.id}`}>
                        업체 상세
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
