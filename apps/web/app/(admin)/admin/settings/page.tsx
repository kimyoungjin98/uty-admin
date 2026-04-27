import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FormField, Input } from "@uty/ui";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-ui-enter">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Settings</p>
        <h2 className="mt-2 text-3xl font-medium text-foreground">설정</h2>
        <p className="mt-2 text-sm text-muted-foreground">관리자 계정과 운영 알림을 설정합니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>관리자 프로필</CardTitle>
          <CardDescription>기본 정보를 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="이름">
            <Input defaultValue="최고 관리자" />
          </FormField>
          <FormField label="이메일">
            <Input defaultValue="admin@utw.co.kr" type="email" />
          </FormField>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>저장</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>보안</CardTitle>
          <CardDescription>비밀번호를 변경합니다.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="현재 비밀번호">
            <Input type="password" />
          </FormField>
          <FormField label="새 비밀번호">
            <Input type="password" />
          </FormField>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="secondary">비밀번호 변경</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>알림</CardTitle>
          <CardDescription>업무 알림 수신 여부를 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toggle label="신규 발주 등록 시 이메일 알림" defaultChecked />
          <Toggle label="긴급 이슈 발생 시 SMS 알림" />
        </CardContent>
      </Card>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-sm border border-border p-4">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input className="size-4 accent-[#3E6AE1]" defaultChecked={defaultChecked} type="checkbox" />
    </label>
  );
}
