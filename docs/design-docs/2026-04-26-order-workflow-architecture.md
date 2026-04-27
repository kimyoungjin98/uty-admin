# Order Workflow Architecture

Related plan:
- [2026-04-26-order-workflow-foundation](../exec-plans/active/2026-04-26-order-workflow-foundation.md)

## Problem Statement

The requested platform needs to support a much smoother customer ordering experience while giving admins clear control over approval, payment confirmation, execution tracking, issue handling, and reporting.

If these concerns are not separated early, the system will quickly become difficult to maintain because pricing rules, workflow state, uploads, and reporting all change at different speeds.

## Decision Summary

- use a staged order intake flow that saves a structured request rather than one large free-form form
- isolate automatic amount calculation in a dedicated pricing service
- model each request as a parent order with one or more child execution items
- separate customer-visible request status from internal execution progress details
- keep approval, payment verification, logs, and reporting as explicit modules instead of embedding them into the form layer
- treat bulk Excel import and one-click re-order as alternate intake channels that still feed the same core order workflow

## One-Glance Architecture

```mermaid
flowchart TB
    subgraph Customer["고객 영역"]
        C1["원클릭 발주
계정 선택 / 업체 등록"]
        C2["상품 링크 입력
자동 정보 불러오기"]
        C3["상품 / 옵션 / 수량 / 일정 선택
금액 자동 계산"]
        C4["이미지 ZIP 업로드
결제 방식 선택"]
        C5["신청 접수"]
        C6["진행 현황 확인
승인대기 / 진행중 / 완료"]
        C7["재주문 / FAQ / 중지 요청"]
    end

    subgraph Admin["관리자 영역"]
        A1["주문 검토 / 승인"]
        A2["입금 확인 또는 포인트 차감"]
        A3["상품 / 옵션 / 단가 관리"]
        A4["진행률 / 배포 리스트 관리"]
        A5["결과 리포트 발행"]
        A6["상세 로그 / 이슈 관리"]
        A7["엑셀 대량 등록"]
    end

    subgraph Core["핵심 서비스"]
        S1["주문 워크플로우"]
        S2["금액 계산 엔진"]
        S3["결제 처리"]
        S4["업로드 처리"]
        S5["진행 현황 처리"]
        S6["리포트 생성"]
        S7["로그 기록"]
    end

    DB[("DB")]
    FS["파일 저장소"]

    C1 --> C2 --> C3 --> C4 --> C5
    C5 --> S1
    C6 --> S5
    C7 --> S1

    A1 --> S1
    A2 --> S3
    A3 --> S2
    A4 --> S5
    A5 --> S6
    A6 --> S7
    A7 --> S1

    S1 --> S2
    S1 --> S3
    S1 --> S4
    S1 --> S5
    S1 --> S6
    S1 --> S7

    S1 --> DB
    S2 --> DB
    S3 --> DB
    S4 --> FS
    S5 --> DB
    S6 --> DB
    S7 --> DB
```

## Requirement-Based UI Flow

```mermaid
flowchart LR
    subgraph CustomerOrder["사용자 발주"]
        O0["/orders
발주 목록"]
        O1["/orders/new
고객 계정 선택"]
        O2["업체 등록/선택"]
        O3["신청서 작성
링크 / 자동정보 / 유형 / 키워드"]
        O4["상품 / 옵션 / 수량 / 진행일
금액 자동계산"]
        O5["이미지 ZIP 업로드
결제 방식 선택"]
        O6["신청 접수"]
        OB["/orders/bulk
엑셀 다수 등록"]
        OR["/orders/recent
최근 이력 재발주"]
    end

    subgraph CustomerStatus["사용자 진행 현황"]
        S0["/status
상태 필터"]
        S1["신청 승인 대기
수정 가능"]
        S2["진행중
블로그 리스트 / 진행률"]
        S3["완료
간편 리포트 / 전체 결과보고서"]
        S4["중지 요청"]
    end

    subgraph AdminCompany["관리자 업체 상세"]
        A0["/admin/companies
업체 목록"]
        A1["/admin/companies/[companyId]
업체 상세"]
        A2["orders
발주 승인 / 결제 확인 / 중지 처리"]
        A3["progress
진행 작업 / 블로그 리스트 / 리포트 관리"]
        A4["/admin/logs
상세 로그"]
    end

    O0 --> O1 --> O2 --> O3 --> O4 --> O5 --> O6
    O0 --> OB --> O6
    O0 --> OR --> O1
    O6 --> S0
    S0 --> S1
    S0 --> S2
    S0 --> S3
    S2 --> S4
    S1 --> A2
    S2 --> A3
    S3 --> A3
    S4 --> A2
    A0 --> A1
    A1 --> A2
    A1 --> A3
    A2 --> A4
    A3 --> A4
```

## System Overview

```mermaid
flowchart LR
    U["Customer"] --> W["Web App\nOrder / Status / Report / FAQ"]
    A["Admin"] --> M["Admin Console\nApproval / Pricing / Progress / Logs"]

    W --> API["Application API"]
    M --> API

    API --> ORD["Order Workflow Service"]
    API --> PRC["Pricing Service"]
    API --> PAY["Payment Service"]
    API --> UPL["Upload Service"]
    API --> RPT["Report Service"]
    API --> LOG["Audit Log Service"]
    API --> IMP["Bulk Import Service"]
    API --> CAT["Catalog Service"]

    ORD --> DB[("Database")]
    PRC --> DB
    PAY --> DB
    UPL --> FS["File Storage"]
    RPT --> DB
    LOG --> DB
    IMP --> DB
    CAT --> DB
```

## Customer Flow

```mermaid
flowchart TD
    S1["계정 선택"] --> S2["업체 등록 또는 선택"]
    S2 --> S3["상품 링크 입력"]
    S3 --> S4["자동 정보 불러오기"]
    S4 --> S5["작성 유형 선택\n후기성 / 정보성"]
    S5 --> S6["키워드 입력"]
    S6 --> S7["배포 상품 선택"]
    S7 --> S8["옵션 선택\n예: 24년 이전 블로그 / 일반 배포"]
    S8 --> S9["수량 / 진행일 선택"]
    S9 --> S10["자동 금액 계산"]
    S10 --> S11["이미지 ZIP 업로드"]
    S11 --> S12["결제 방식 선택\n포인트 또는 계좌 입금"]
    S12 --> S13["신청 접수"]
    S13 --> S14["승인 대기"]
```

## Core State Model

### Customer-visible request states

- `pending_approval`: 신청 접수 후 관리자 승인 전, 고객 수정 가능
- `in_progress`: 승인 완료 후 실제 배포 진행 중
- `completed`: 결과 리포트 확인 가능
- `stopped`: 이슈로 중지 요청되었거나 관리자 보류 상태

### Supporting states

- `draft`: 작성 중이지만 아직 제출 전
- `payment_pending`: 계좌 입금 대기 또는 포인트 부족 등 결제 완료 전
- `approved`: 관리자가 승인했고 실행 대기 또는 실행 시작 직전
- `report_published`: 완료 후 결과 보고서 공개됨

## State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingApproval: 신청 접수
    PendingApproval --> Draft: 고객 수정
    PendingApproval --> PaymentPending: 계좌 입금 대기
    PendingApproval --> Approved: 포인트 차감 또는 입금 확인
    PaymentPending --> Approved: 관리자 입금 확인
    Approved --> InProgress: 작업 시작
    InProgress --> Stopped: 중지 요청 또는 이슈 발생
    Stopped --> InProgress: 재개 승인
    InProgress --> Completed: 작업 완료
    Completed --> ReportPublished: 리포트 생성
```

## Module Responsibilities

### 1. Catalog Service

- 배포 상품, 옵션, 기본 단가 관리
- 상품별 설명과 부가세 제외 기준 금액 보관
- 특정 계정 또는 업체에 대한 판매 가능 여부 판단

### 2. Pricing Service

- 상품 선택, 옵션 선택, 수량, 일정 기준으로 금액 계산
- 세전 금액 기준 계산 결과와 표시용 합계 반환
- 계산식 변경 이력 저장 가능하도록 버전 관리 고려

### 3. Order Workflow Service

- 접수서 생성, 수정, 제출, 승인 잠금 처리
- 상위 주문과 하위 실행 항목 연결
- 상태 필터 기준 데이터 제공

### 4. Payment Service

- 포인트 차감형 처리
- 건별 입금 대기 및 관리자 입금 확인 처리
- 승인 전 결제 충족 여부 판단

### 5. Upload Service

- 이미지 ZIP 업로드, 검증, 저장
- 주문과 파일 연결
- 관리자 확인용 메타데이터 보관

### 6. Execution Tracking Service

- 진행률 계산
- 진행 블로그 리스트 연결
- 진행 건수 / 총 신청 건수 집계

### 7. Report Service

- 완료 건에 대한 간편 리포트 생성
- 전체 결과 보고서 조회용 데이터 조합

### 8. Audit Log Service

- 수정 이력
- 승인/반려/입금 확인 이력
- 중지 요청 및 재개 이력
- 엑셀 대량 등록 결과 이력

## Suggested Data Model

```mermaid
erDiagram
    ACCOUNT ||--o{ ORDER_REQUEST : places
    ACCOUNT ||--o{ POINT_TRANSACTION : owns
    VENDOR ||--o{ ORDER_REQUEST : targets
    CATALOG_PRODUCT ||--o{ ORDER_ITEM : selected_in
    CATALOG_OPTION ||--o{ ORDER_ITEM_OPTION : extends
    ORDER_REQUEST ||--|{ ORDER_ITEM : contains
    ORDER_REQUEST ||--o| PAYMENT : has
    ORDER_REQUEST ||--o{ FILE_ASSET : uploads
    ORDER_REQUEST ||--o{ AUDIT_LOG : records
    ORDER_REQUEST ||--o| REPORT : publishes
    ORDER_ITEM ||--o{ EXECUTION_TARGET : tracks
    ORDER_ITEM ||--o{ ORDER_ITEM_OPTION : includes
```

## Screen-Level View

```mermaid
flowchart TB
    subgraph Customer
        C1["원클릭 발주 화면"]
        C2["신청 승인 대기 목록"]
        C3["진행중 작업 목록"]
        C4["진행 완료 목록"]
        C5["FAQ / 가이드"]
    end

    subgraph Admin
        A1["접수 검토 / 승인"]
        A2["입금 확인 / 포인트 관리"]
        A3["진행 현황 관리"]
        A4["리포트 생성"]
        A5["로그 / 이슈 관리"]
        A6["엑셀 대량 등록"]
        A7["상품 / 가격 / 옵션 관리"]
    end

    C1 --> A1
    C1 --> A2
    A1 --> C2
    A3 --> C3
    A4 --> C4
    C2 --> A5
    C3 --> A5
    C4 --> A5
    A7 --> C1
    A6 --> A1
```

## Key Flows

### Approval and edit lock

- 고객은 `pending_approval` 상태까지만 접수서를 수정할 수 있다.
- 관리자가 승인하면 고객 편집은 잠기고, 이후 변경은 별도 수정 요청 또는 관리자 조정으로 처리한다.

### Progress display

- 진행중 화면에는 주문 단위 상태와 하위 실행 대상 리스트를 함께 보여준다.
- 진행률은 `완료 실행 건수 / 전체 실행 건수` 기반 계산이 가장 일관적이다.

### Re-order

- 최근 계정 작업 이력을 불러와 새 주문 초안으로 복제한다.
- 가격은 과거 값을 복제하지 말고 현재 가격 규칙으로 다시 계산한다.

### Bulk Excel import

- 엑셀은 개별 주문 행을 임시 검증한 뒤 일괄 생성한다.
- 부분 실패를 허용하되, 실패 사유를 행 단위로 반환해야 한다.

## Open Questions And Follow-Ups

- 자동 정보 불러오기 범위는 어디까지인가: 제목, 업체명, 상품명, 카테고리, 썸네일?
- 블로그 배포 결과 리스트는 외부 URL만 저장할지, 추가 메타데이터도 저장할지?
- 포인트 차감 시점은 승인 시점인지, 접수 시 예약 차감인지?
- 간편 리포트와 전체 결과 보고서의 차이를 어떤 수준으로 둘지?
- 중지 요청은 고객 단독 즉시 중지인지, 관리자 승인 기반인지?
