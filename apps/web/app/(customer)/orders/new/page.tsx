"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Link2,
  Minus,
  Plus,
  ReceiptText,
  Sparkles,
  Upload,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from "@uty/ui";
import {
  catalogOptions,
  catalogProducts,
} from "@/server/order-workflow/mock-data";

const accounts = [
  { id: "account-a", name: "브랜드 A", pointBalance: 820000 },
  { id: "account-b", name: "브랜드 B", pointBalance: 360000 },
  { id: "account-c", name: "브랜드 C", pointBalance: 1280000 },
];

export default function NewOrderPage() {
  const [accountId, setAccountId] = useState("");
  const [vendorMode, setVendorMode] = useState("select");
  const [productId, setProductId] = useState(catalogProducts[0]?.id ?? "");
  const [optionIds, setOptionIds] = useState<string[]>(["legacy-blog"]);
  const [quantity, setQuantity] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("points");
  const [autoInfoLoaded, setAutoInfoLoaded] = useState(false);

  const selectedProduct = catalogProducts.find(
    (product) => product.id === productId,
  );
  const optionTotal = catalogOptions
    .filter((option) => optionIds.includes(option.id))
    .reduce((sum, option) => sum + option.priceDelta, 0);
  const subtotal = ((selectedProduct?.unitPrice ?? 0) + optionTotal) * quantity;
  const vat = Math.floor(subtotal * 0.1);
  const total = subtotal + vat;
  const selectedAccount = accounts.find((account) => account.id === accountId);
  const formDisabled = !accountId;

  const accountError = useMemo(
    () =>
      !accountId
        ? "고객 계정을 먼저 선택해야 신청서 입력을 진행할 수 있습니다."
        : undefined,
    [accountId],
  );

  function toggleOption(optionId: string) {
    setOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
  }

  return (
    <div className="space-y-6 animate-ui-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Button asChild variant="link" className="mb-3">
            <Link href="/orders">
              <ArrowLeft className="size-4" />
              발주 목록
            </Link>
          </Button>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Single Order
          </p>
          <h1 className="mt-2 text-3xl font-medium text-foreground">
            단건 발주 신청서
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            고객 계정 선택 후 업체, 신청 정보, 금액, 결제 방식을 순서대로
            확정합니다.
          </p>
        </div>
        <Badge variant={accountId ? "default" : "secondary"}>
          {accountId ? "신청서 입력 가능" : "계정 선택 필요"}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. 고객 계정 선택</CardTitle>
              <CardDescription>
                계정을 선택해야 업체와 신청 항목을 입력할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField label="고객 계정" required error={accountError}>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger>
                    <SelectValue placeholder="계정을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <div className="rounded-sm border border-border bg-secondary/60 p-4">
                <p className="text-sm font-medium text-foreground">
                  포인트 잔액
                </p>
                <p className="mt-2 text-2xl font-medium text-primary">
                  {selectedAccount
                    ? selectedAccount.pointBalance.toLocaleString()
                    : "0"}
                  P
                </p>
              </div>
            </CardContent>
          </Card>

          <fieldset
            disabled={formDisabled}
            className="space-y-6 disabled:opacity-55"
          >
            <Card>
              <CardHeader>
                <CardTitle>2. 업체 등록 및 상품 정보</CardTitle>
                <CardDescription>
                  기존 업체를 선택하거나 신규 업체 정보를 입력합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="업체 등록/선택" required>
                    <Select value={vendorMode} onValueChange={setVendorMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select">기존 업체 선택</SelectItem>
                        <SelectItem value="new">신규 업체 등록</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField
                    label={vendorMode === "new" ? "신규 업체명" : "업체명"}
                    required
                  >
                    <Input
                      placeholder={
                        vendorMode === "new"
                          ? "업체명을 입력하세요"
                          : "스튜디오 리프"
                      }
                    />
                  </FormField>
                </div>

                <FormField
                  label="업체/상품 링크"
                  required
                  description="링크 입력 후 자동정보 불러오기를 눌러 관리자 확인용 미리보기를 생성합니다."
                >
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                      <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="https://example.com/product"
                        type="url"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAutoInfoLoaded(true)}
                    >
                      <Sparkles className="size-4" />
                      자동정보 불러오기
                    </Button>
                  </div>
                </FormField>

                {autoInfoLoaded && (
                  <div className="rounded-sm border border-brand-100 bg-brand-50 p-4">
                    <p className="text-sm font-medium text-foreground">
                      불러온 정보 미리보기
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      스튜디오 리프 비건 세럼 · 뷰티/스킨케어 · 대표 이미지 4장
                      확인
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. 신청서 작성</CardTitle>
                <CardDescription>
                  작성 유형, 키워드, 진행 일정, 업로드 자료를 입력합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <FormField label="작성 유형" required>
                  <Select defaultValue="review">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">후기성</SelectItem>
                      <SelectItem value="info">정보성</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="진행 일자" required>
                  <Input defaultValue="2026-05-01" type="date" />
                </FormField>
                <FormField
                  label="키워드"
                  required
                  description="쉼표로 구분해 여러 키워드를 입력합니다."
                >
                  <Input defaultValue="비건 세럼, 수분 진정, 네이버 블로그 배포" />
                </FormField>
                <FormField
                  label="배포 이미지 ZIP"
                  description="관리자가 바로 확인할 수 있도록 압축파일로 등록합니다."
                >
                  <label className="flex h-[var(--form-control-height)] cursor-pointer items-center justify-between gap-3 rounded-sm border border-input bg-background px-3 text-sm text-muted-foreground transition-colors duration-[330ms] hover:border-primary">
                    <span>이미지 압축파일 선택</span>
                    <Upload className="size-4" />
                    <input className="sr-only" type="file" accept=".zip" />
                  </label>
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. 배포상품 및 옵션</CardTitle>
                <CardDescription>
                  상품과 옵션, 수량을 변경하면 우측 금액이 자동 계산됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="배포상품" required>
                  <div className="grid gap-3 md:grid-cols-3">
                    {catalogProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setProductId(product.id)}
                        className={cn(
                          "rounded-sm border border-border p-4 text-left transition-colors duration-[330ms] hover:border-primary",
                          product.id === productId &&
                            "border-primary bg-brand-50",
                        )}
                      >
                        <span className="block text-sm font-medium text-foreground">
                          {product.name}
                        </span>
                        <span className="mt-2 block min-h-10 text-xs leading-5 text-muted-foreground">
                          {product.description}
                        </span>
                        <span className="mt-3 block text-sm font-medium text-primary">
                          {product.unitPrice.toLocaleString()}원
                        </span>
                      </button>
                    ))}
                  </div>
                </FormField>

                <FormField label="옵션 추가">
                  <div className="grid gap-3 md:grid-cols-3">
                    {catalogOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-start gap-3 rounded-sm border border-border p-4 transition-colors duration-[330ms] hover:border-primary"
                      >
                        <input
                          checked={optionIds.includes(option.id)}
                          className="mt-0.5 size-4 accent-[#3E6AE1]"
                          onChange={() => toggleOption(option.id)}
                          type="checkbox"
                        />
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {option.name}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                            {option.description}
                          </span>
                          <span className="mt-2 block text-sm font-medium text-primary">
                            +{option.priceDelta.toLocaleString()}원
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField
                  label="수량"
                  required
                  description="최소 1건부터 신청할 수 있습니다."
                >
                  <div className="flex h-[var(--form-control-height)] w-full items-center justify-between rounded-sm border border-input bg-background px-2 sm:w-56">
                    <Button
                      aria-label="수량 감소"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="text-sm font-medium text-foreground">
                      {quantity}건
                    </span>
                    <Button
                      aria-label="수량 증가"
                      onClick={() => setQuantity((value) => value + 1)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </FormField>
              </CardContent>
            </Card>
          </fieldset>
        </div>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ReceiptText className="size-4 text-primary" />
              금액 및 결제
            </CardTitle>
            <CardDescription>부가세 포함 예상 결제 금액입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PriceRow
              label="상품 단가"
              value={`${(selectedProduct?.unitPrice ?? 0).toLocaleString()}원`}
            />
            <PriceRow
              label="옵션 합계"
              value={`${optionTotal.toLocaleString()}원`}
            />
            <PriceRow label="수량" value={`${quantity}건`} />
            <div className="border-t border-border pt-4">
              <PriceRow
                label="공급가액"
                value={`${subtotal.toLocaleString()}원`}
              />
              <PriceRow label="부가세" value={`${vat.toLocaleString()}원`} />
              <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
                <span className="text-sm font-medium text-foreground">
                  총 결제 금액
                </span>
                <span className="text-2xl font-medium text-primary">
                  {total.toLocaleString()}원
                </span>
              </div>
            </div>
            <FormField label="결제 방식" required>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                disabled={formDisabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">포인트</SelectItem>
                  <SelectItem value="bank_transfer">무통장 입금</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <div className="rounded-sm border border-border bg-secondary/70 p-4 text-sm leading-6 text-muted-foreground">
              {paymentMethod === "points"
                ? "승인 시점에 선택 계정의 포인트에서 차감됩니다."
                : "접수 후 전용 입금계좌가 안내되며, 관리자 입금 확인 후 승인됩니다."}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={formDisabled} size="lg">
              <CheckCircle2 className="size-4" />
              작업 신청 및 결제
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
