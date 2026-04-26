import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">설정</h1>
        <p className="text-text-muted mt-1 text-sm">계정 관리와 시스템 환경설정을 관리합니다.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>관리자 프로필</CardTitle>
            <CardDescription>
              관리자의 기본 정보를 설정합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" defaultValue="최고 관리자" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일 계정</Label>
              <Input id="email" type="email" defaultValue="admin@utw.co.kr" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 px-6 py-4">
            <Button>저장하기</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>보안</CardTitle>
            <CardDescription>
              비밀번호 및 보안 관련 설정을 변경합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input id="new-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 px-6 py-4">
            <Button variant="secondary">비밀번호 변경</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>알림 설정</CardTitle>
            <CardDescription>
              신규 발주 및 시스템 알림 수신 여부를 설정합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <input type="checkbox" id="email-notif" className="w-4 h-4 rounded border-border" defaultChecked />
              <Label htmlFor="email-notif">신규 발주 등록 시 이메일 알림 받기</Label>
            </div>
            <div className="flex items-center space-x-4">
              <input type="checkbox" id="sms-notif" className="w-4 h-4 rounded border-border" />
              <Label htmlFor="sms-notif">긴급 이슈 발생 시 SMS 수신</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
