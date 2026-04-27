import Link from "next/link";
import { ArrowLeft, Download, FileSpreadsheet, Upload } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uty/ui";

export default function BulkOrderPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-ui-enter">
      <div>
        <Button asChild variant="link" className="mb-3">
          <Link href="/orders">
            <ArrowLeft className="size-4" />
            발주 목록
          </Link>
        </Button>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Bulk Order
        </p>
        <h1 className="mt-2 text-3xl font-medium text-foreground">엑셀 다수 등록</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          계정을 먼저 선택한 뒤 동일 양식의 접수건을 업로드합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>업로드 기준</CardTitle>
          <CardDescription>계정별 정책과 포인트 기준으로 접수 데이터가 검증됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <FormField label="고객 계정" required description="업로드된 모든 행에 적용할 계정입니다.">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="계정을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-a">브랜드 A</SelectItem>
                <SelectItem value="account-b">브랜드 B</SelectItem>
                <SelectItem value="account-c">브랜드 C</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <Button variant="outline">
            <Download className="size-4" />
            양식 다운로드
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>엑셀 파일 업로드</CardTitle>
          <CardDescription>지원 파일은 .xlsx, .xls 형식입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-input bg-secondary/60 p-8 text-center transition-colors duration-[330ms] hover:border-primary hover:bg-brand-50">
            <FileSpreadsheet className="size-12 text-muted-foreground" />
            <span className="mt-4 text-lg font-medium text-foreground">접수건 엑셀 파일 선택</span>
            <span className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              업로드 후 행 단위 검증 결과를 확인하고 접수할 수 있도록 설계된 화면입니다.
            </span>
            <span className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground">
              <Upload className="size-4" />
              파일 선택
            </span>
            <input className="sr-only" type="file" accept=".xlsx,.xls" />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
