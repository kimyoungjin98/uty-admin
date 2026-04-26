"use client";

import { useState } from "react";
import { FileSpreadsheet, PauseCircle, CheckCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BusinessesPage() {
  const [qty, setQty] = useState(1);
  const [option1, setOption1] = useState(false);
  
  const basePrice = 50000;
  const optionPrice = option1 ? 10000 : 0;
  const total = (basePrice + optionPrice) * qty;

  const mockData = [
    { id: 1, name: "A사 스토어", campaign: "무선청소기 리뷰", status: "진행중", amount: 120000 },
    { id: 2, name: "B사 자사몰", campaign: "오픈 기념 이벤트 안내", status: "대기", amount: 50000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">업체 관리</h1>
        <p className="text-muted-foreground mt-2">
          업체 등록 및 발주 결제, 엑셀 대량 업로드 기능을 이용할 수 있습니다.
        </p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">업체/발주 목록</TabsTrigger>
          <TabsTrigger value="single">단건 업체 등록 플로우</TabsTrigger>
          <TabsTrigger value="bulk">엑셀 다수 등록</TabsTrigger>
        </TabsList>

        {/* 목록 탭 */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>등록된 업체 현황</CardTitle>
              <CardDescription>현재 진행 중이거나 대기 중인 발주 내역입니다. 이슈 발생 시 중지 요청을 할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>회사/계정</TableHead>
                      <TableHead>캠페인명(키워드)</TableHead>
                      <TableHead>결제금액</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.campaign}</TableCell>
                        <TableCell>{item.amount.toLocaleString()}원</TableCell>
                        <TableCell>
                          <Badge variant={item.status === '진행중' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="sm" className="gap-1">
                            <PauseCircle className="w-4 h-4" /> 중지 요청
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 단건 등록 플로우 */}
        <TabsContent value="single">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                    <CardTitle>업체 및 기본 정보 입력</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>업체(계정) 선택 또는 신규 등록</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="업체를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">A사 (스토어)</SelectItem>
                          <SelectItem value="b">B사 (자사몰)</SelectItem>
                          <SelectItem value="new">+ 신규 업체 등록</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>상품 링크 URL</Label>
                      <Input type="url" placeholder="https://" />
                    </div>
                    <div className="space-y-2">
                      <Label>작성 유형</Label>
                      <Select defaultValue="review">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="review">후기성</SelectItem>
                          <SelectItem value="info">정보성</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>타겟 키워드</Label>
                      <Input placeholder="예: 무선청소기 추천" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                    <CardTitle>상품 및 옵션 선택</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>배포 상품 (VAT 별도)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="border-2 border-primary bg-primary/5 rounded-xl p-4 cursor-pointer flex justify-between items-center relative">
                        <input type="radio" name="product" className="absolute opacity-0" defaultChecked />
                        <div>
                          <p className="font-semibold text-foreground">일반 블로그 배포</p>
                          <p className="text-xs text-muted-foreground mt-1">기본형 블로그 배포</p>
                        </div>
                        <span className="font-bold text-primary">50,000원</span>
                      </label>
                      <label className="border-2 border-border hover:border-primary/50 transition-colors rounded-xl p-4 cursor-pointer flex justify-between items-center relative">
                        <input type="radio" name="product" className="absolute opacity-0" />
                        <div>
                          <p className="font-semibold text-foreground">프리미엄 블로그</p>
                          <p className="text-xs text-muted-foreground mt-1">상위 노출 최적화</p>
                        </div>
                        <span className="font-bold text-muted-foreground">150,000원</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>추가 옵션</Label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={option1} 
                        onChange={(e) => setOption1(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">24년 이전 블로그 배포 옵션</p>
                        <p className="text-xs text-muted-foreground">지수 최적화 블로그 우선 배정</p>
                      </div>
                      <span className="text-sm font-semibold">+10,000원</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <Label>수량 선택</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
                      <span className="w-12 text-center font-medium">{qty}건</span>
                      <Button variant="outline" size="icon" onClick={() => setQty(qty + 1)}>+</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 결제 영역 (우측 사이드) */}
            <div className="space-y-6">
              <Card className="sticky top-24 border-primary">
                <CardHeader className="bg-primary/5 rounded-t-xl border-b pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> 결제 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">기본 금액 (건당)</span>
                    <span>{basePrice.toLocaleString()}원</span>
                  </div>
                  {option1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">추가 옵션</span>
                      <span>+10,000원</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">수량</span>
                    <span>{qty}건</span>
                  </div>
                  <div className="border-t my-4 py-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">공급가액</span>
                      <span>{total.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">부가세 (10%)</span>
                      <span>{(total * 0.1).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t">
                      <span className="text-foreground">총 결제 금액</span>
                      <span className="text-primary">{(total * 1.1).toLocaleString()}원</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>결제 방식</Label>
                    <Select defaultValue="point">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point">보유 포인트 차감 (-)</SelectItem>
                        <SelectItem value="transfer">무통장 입금 (건별)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-bold h-12" size="lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    작업 신청 및 결제하기
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 엑셀 등록 플로우 */}
        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>다수 접수건 엑셀 등록</CardTitle>
              <CardDescription>
                동일 양식의 대량 업체/발주 데이터를 엑셀로 한 번에 등록합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors">
                <FileSpreadsheet className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">엑셀 파일을 여기에 드래그하거나 클릭하여 업로드하세요</h3>
                <p className="text-sm text-muted-foreground">지원 파일: .xlsx, .xls</p>
                <div className="mt-6 flex gap-4">
                  <Button variant="outline">등록 양식 다운로드</Button>
                  <Button>파일 선택</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
