import {
  Badge,
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

const logs = [
  { id: "LOG-001", date: "2026-04-27 10:23", user: "admin1", action: "업체 승인", target: "에이전시A", status: "성공" },
  { id: "LOG-002", date: "2026-04-27 10:15", user: "system", action: "엑셀 업로드", target: "15건 처리", status: "성공" },
  { id: "LOG-003", date: "2026-04-26 18:40", user: "user2", action: "작업 중지 요청", target: "캠페인-B", status: "요청 확인" },
  { id: "LOG-004", date: "2026-04-26 15:20", user: "admin1", action: "결제 상태 변경", target: "에이전시C", status: "성공" },
];

export default function AdminLogsPage() {
  return (
    <div className="space-y-6 animate-ui-enter">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Logs</p>
        <h2 className="mt-2 text-3xl font-medium text-foreground">로그 관리</h2>
        <p className="mt-2 text-sm text-muted-foreground">사용자 활동과 시스템 이벤트를 확인합니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>시스템 로그</CardTitle>
          <CardDescription>최근 운영 이벤트 기준으로 표시됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {logs.map((log) => (
              <article key={log.id} className="rounded-sm border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{log.id}</p>
                    <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">{log.date}</p>
                  </div>
                  <Badge variant={log.status === "성공" ? "secondary" : "default"}>{log.status}</Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">사용자</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">{log.user}</dd>
                  </div>
                  <div className="rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">활동</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">{log.action}</dd>
                  </div>
                  <div className="col-span-2 rounded-sm bg-secondary/60 p-3">
                    <dt className="text-xs font-medium text-muted-foreground">대상</dt>
                    <dd className="mt-1 break-keep text-sm font-medium text-foreground">{log.target}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden md:block">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>로그 ID</TableHead>
                <TableHead>발생일시</TableHead>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>대상</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-foreground">{log.id}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "성공" ? "secondary" : "default"}>{log.status}</Badge>
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
