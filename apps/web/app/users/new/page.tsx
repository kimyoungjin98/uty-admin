"use client";

import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();

  const handleSave = () => {
    // 임시로 그냥 전 페이지로 돌아가며 저장 효과.
    router.push('/users');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">신규 업체 등록</h1>
          <p className="text-text-muted mt-1 text-sm">새로운 발주 업체의 정보를 시스템에 입력합니다.</p>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader className="bg-surface-hover/30 rounded-t-xl border-b border-border/50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5 text-brand-600" /> 업체 기본 정보
          </CardTitle>
          <CardDescription>
            업체명, 담당자 및 플랫폼 유형을 정확히 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">업체명 (상호)</Label>
              <Input id="companyName" placeholder="예: 에이치앤비랩" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platformType">플랫폼 유형</Label>
              <Select defaultValue="store">
                <SelectTrigger>
                  <SelectValue placeholder="유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="store">스마트스토어</SelectItem>
                  <SelectItem value="mall">자사몰</SelectItem>
                  <SelectItem value="open">오픈마켓 (쿠팡, 11번가 등)</SelectItem>
                  <SelectItem value="etc">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">담당자 이름</Label>
              <Input id="contactName" placeholder="예: 김담당" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">연락처 (휴대폰)</Label>
              <Input id="phone" type="tel" placeholder="010-0000-0000" />
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="email">이메일 (계정 ID로 사용)</Label>
              <Input id="email" type="email" placeholder="example@company.com" />
            </div>
          </div>
          
          <hr className="border-border/50" />
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text">초기 포인트 및 상태</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="initialPoint">초기 지급 포인트</Label>
                <div className="relative">
                  <Input id="initialPoint" type="number" defaultValue="0" className="pr-12" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">원</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">초기 승인 상태</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">즉시 승인 (Active)</SelectItem>
                    <SelectItem value="pending">승인 대기 (Pending)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-border/50 px-6 py-4 bg-surface-hover/30 rounded-b-xl">
          <Link href="/users">
            <Button variant="outline">취소</Button>
          </Link>
          <Button onClick={handleSave} className="bg-brand-600 hover:bg-brand-500 text-white border-transparent">
            업체 등록 완료
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
