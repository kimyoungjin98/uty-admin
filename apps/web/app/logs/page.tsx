import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function LogsPage() {
  const mockLogs = [
    { id: 'LOG-001', date: '2026-04-27 10:23', user: 'admin1', action: '업체 승인', target: '에이전시A', status: '성공' },
    { id: 'LOG-002', date: '2026-04-27 10:15', user: 'system', action: '발주 등록 엑셀 업로드', target: '15건 처리', status: '성공' },
    { id: 'LOG-003', date: '2026-04-26 18:40', user: 'user2', action: '작업 중지 요청', target: '캠페인-B', status: '요청 확인' },
    { id: 'LOG-004', date: '2026-04-26 15:20', user: 'admin1', action: '결제 상태 변경', target: '에이전시C', status: '성공' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">로그 관리</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>시스템 로그 내역</CardTitle>
          <CardDescription>
            사용자 활동, 시스템 이벤트 및 이슈 사항 로그를 확인합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">로그 ID</TableHead>
                  <TableHead>발생일시</TableHead>
                  <TableHead>사용자</TableHead>
                  <TableHead>활동명</TableHead>
                  <TableHead>대상</TableHead>
                  <TableHead>결과/상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.target}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === '성공' ? 'default' : 'secondary'}>
                        {log.status}
                      </Badge>
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