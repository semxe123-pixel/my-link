# [PRD] 링크트리 클론 서비스: 마이링크 (MyLink) 제품 기능 정의서

---

## 1. 프로젝트 개요 (Executive Summary)

### 1.1 서비스 개요
- **서비스명**: 마이링크 (MyLink)
- **한 줄 정의**: **shadcn/ui** 기반 컴포넌트 아키텍처 위에 **Design.md의 토스 디자인 시스템(TDS)**을 완벽히 이식한 IT 직군(개발자, 디자이너, PM 등) 및 프리랜서 전용 프로필 링크 & 디지털 명함 서비스
- **핵심 디자인 원칙 (TDS x shadcn/ui)**:
  - **컴포넌트 뼈대**: 접근성(a11y)과 유연성이 뛰어난 `shadcn/ui` 최신 공식 컴포넌트(`Button`, `Card`, `Badge`, `Dialog`, `Input`, `Sheet`, `Toast` 등) 채택
  - **시각적 스타일(TDS 규칙 엄격 준수)**: `design.md`에 정의된 토스 고유의 4계층 컬러 팔레트, 타이포그래피(Pretendard), 라운딩 스케일(16~24px 및 999px pill), 미세 인터랙션(`active:scale-[0.985]`)을 shadcn 테마 토큰에 주입
- **추진 전략 (단계별 접근)**:
  - **[현재 단계] Step 1. 시연용 로컬 스토리지 프로필 페이지 (Interactive Demo MVP)**:
    - 백엔드(DB/서버), 대시보드, 통계 등의 복잡한 기능은 제외
    - 브라우저 **로컬 스토리지(localStorage)**를 활용하여 프로필 정보 및 링크를 실시간으로 저장·조회·수정하는 단일 인터랙티브 페이지 구현
    - shadcn/ui 기반의 TDS 컴포넌트로 간이 편집 및 뷰어 인터랙션 구성
  - **[차후 확장] Step 2 & 3. 대시보드 및 멀티 유저 SaaS 전환**:
    - 대시보드 관리자 페이지, 드래그 앤 드롭 편집기, Supabase 연동, 방문자 통계 기능 확장

### 1.2 기획 배경 및 문제 정의
1. **복잡한 포트폴리오 관리의 피로도**: 이력서, 깃허브, 블로그(벨로그/티스토리/미디엄), 노션 포트폴리오, 링크드인 등 IT 직군은 채널이 파편화되어 있음.
2. **기존 링크트리의 심미적 한계**: 해외 서비스(Linktree 등)는 캐주얼하거나 상업적 인플루언서에 맞춰져 있어, 정갈한 커리어 브랜딩 및 포트폴리오 전달용으로는 아쉬움이 있음.
3. **토스 수준의 사용자 경험 제공**: 검증된 오픈소스 컴포넌트(`shadcn/ui`)를 토스 디자인 가이드(`design.md`)에 맞춤 커스텀하여 국내 최고 수준의 모바일 웹 UX 제공.

### 1.3 핵심 목표 (Goals)
- **TDS 감성의 shadcn/ui 컴포넌트 라이브러리 구축**: 토스 특유의 차분한 쿨그레이 캔버스와 단 하나의 강렬한 토스 블루 CTA 구현
- **시연(Demo)에 최적화된 빠른 사용성**: 별도 로그인이나 DB 세팅 없이 브라우저에서 바로 프로필을 편집하고 새로고침해도 유지되는 경험 제공
- **언제든 복구 가능한 데모 편의성**: 데이터 조작 후 원클릭 '기본값 초기화' 지원

---

## 2. 단계별 추진 로드맵 (Step-by-Step Scope)

```
[Step 1 : 현재 시연 단계]  ──▶  [Step 2 : 편집기 고도화]  ──▶  [Step 3 : 멀티 유저 SaaS]
• 로컬 스토리지 기반 저장          • 독립된 대시보드(/admin)         • Supabase Auth / DB 연동
• shadcn/ui 간이 편집 다이얼로그   • 드래그 앤 드롭 편집기           • 고유 URL (/@username)
• shadcn/ui x TDS 커스텀 디자인     • 실시간 모바일 프리뷰            • 방문자 통계 및 분석
(※ 대시보드/통계 미포함)
```

---

## 3. 사용자 시나리오 (User Scenarios)

### 시나리오 1: [시연자 / 강의 진행자] 로컬 스토리지를 활용한 실시간 프로필 커스텀 및 영속성 시연
- **상황**: '노코드 AI / 데이터 분석 실무' 수업에서 웹 서비스 프로토타입의 데이터 저장 및 UI 상호작용을 청중에게 시연하는 상황
- **사용자 행동 흐름**:
  1. 시연자가 브라우저에서 마이링크 페이지(`http://localhost:3000`)에 접속한다.
  2. 기본으로 세팅된 장연재 개발자의 프로필과 링크 목록(GitHub, 블로그)을 보여준다.
  3. 상단 앱바의 **[프로필 편집]** 버튼(shadcn Button variant="ghost")을 클릭하여 편집 모달(shadcn Dialog)을 띄운다.
  4. 닉네임("인공지능 분석가 김한양"), 직무 뱃지("🤖 AI Researcher"), 기술 스택("LangChain", "Python", "SQL")을 즉석에서 수정한다.
  5. 새로운 링크(예: "Kaggle 포트폴리오", "https://kaggle.com")를 추가하고 **[저장]** 버튼을 누른다.
  6. 화면에 즉시 토스 스타일 토스트 알림(`✓ 프로필을 저장했어요`)이 뜨며 수정된 프로필이 반영된다.
  7. **브라우저를 새로고침(F5)**하여 로컬 스토리지(`localStorage`)에 저장된 덕분에 데이터가 초기화되지 않고 유지됨을 증명한다.
  8. 시연 종료 후 **[기본값 초기화]** 버튼을 눌러 초기 데모 상태로 깨끗하게 원상 복구한다.

### 시나리오 2: [프로필 소유자 / IT 취준생] 모바일 최적화 포트폴리오 명함 생성 및 링크 공유
- **상황**: 서류 지원 시 이력서 상단이나 오픈채팅방, 깃허브 리드미에 부착할 깔끔하고 신뢰도 높은 프로필 링크가 필요한 상황
- **사용자 행동 흐름**:
  1. 취준생 연재는 본인의 직무와 보유 기술 스택, 대표 프로젝트 링크를 마이링크에 등록한다.
  2. 우측 상단의 **[공유]** 버튼을 탭한다.
  3. 모바일 기기인 경우 네이티브 공유 시트(카카오톡, 메시지 등)가 열리고, PC인 경우 링크가 클립보드에 복사되며 토스트 피드백을 받는다.
  4. 복사된 링크를 이력서의 포트폴리오 링크란 및 SNS 바이오에 간편하게 부착한다.

### 시나리오 3: [방문자 / 채용 담당자] 지원자 프로필 열람 및 원클릭 커피챗/문의
- **상황**: 지원자의 이력서에 적힌 마이링크 URL을 모바일 스마트폰으로 열어본 IT 스타트업 인사 담당자
- **사용자 행동 흐름**:
  1. 링크를 누르자마자 1초 이내에 토스 앱 느낌의 정갈한 모바일 카드 화면이 로딩된다.
  2. 지원자의 핵심 기술 칩(`Next.js`, `React`, `데이터 분석`)을 한눈에 파악한다.
  3. 바로가기 목록에서 `GitHub`와 `기술 블로그` 링크를 탭하여 지원자의 커밋 기록과 아티클을 순서대로 확인한다.
  4. 하단의 `이메일 주소 복사` 버튼을 눌러 이메일을 클립보드에 바로 복사하거나, 화면 하단에 고정된 파란색 **[이메일로 커피챗 제안하기]** 버튼(TDS 강조 CTA)을 눌러 메일 앱을 실행하고 즉시 면접/커피챗 제안을 전송한다.

---

## 4. 메인 화면 와이어프레임 (Wireframe & Layout)

방문자가 모바일/웹으로 접속했을 때 마주하는 메인 화면 레이아웃입니다. (shadcn/ui 및 TDS 컴포넌트 매핑)

```text
┌──────────────────────────────────────────────┐
│  [TopBar]                                    │
│  👤 프로필                   [편집]  [공유]   │ ◀ shadcn Button (TDS Ghost: rounded-xl, text-grey-600)
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [메인 프로필 카드] (shadcn Card)        │  │ ◀ TDS Card: rounded-3xl(24px), shadow-tds-card
│  │                                        │  │
│  │   ┌──────┐                             │  │
│  │   │  장  │        [ 🎓 정보시스템학과 ] │  │ ◀ shadcn Avatar & Badge (TDS Pill: rounded-full, blue-50)
│  │   └──────┘                             │  │
│  │                                        │  │
│  │   안녕하세요,                          │  │
│  │   개발자 장연재예요                    │  │ ◀ TDS Display-2 / H1 (Pretendard Bold, text-grey-900)
│  │                                        │  │
│  │   데이터와 코드로 일상의 문제를        │  │
│  │   해결해요. 견고한 소프트웨어를 만들기 │  │ ◀ TDS Body-1 (text-grey-700, line-height 1.5)
│  │   위해 꾸준히 배우고 있어요.           │  │
│  │                                        │  │
│  │   ── 관심 분야 및 기술 ─────────────   │  │
│  │   [Next.js]  [React]  [TypeScript]     │  │ ◀ shadcn Badge (TDS Chips: rounded-full, active scale)
│  │   [Python]   [데이터 분석]  [UI/UX]    │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  바로가기                                    │ ◀ TDS Section Header (Title-2, text-grey-900)
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [🐙] GitHub                         >  │  │ ◀ TDS ListRow: rounded-2xl, bg-white, active:scale-[0.985]
│  │      코드 저장소와 프로젝트 보기       │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [📝] 기술 블로그                    >  │  │ ◀ TDS ListRow
│  │      배운 지식과 회고를 기록해요       │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [✉️] 이메일 주소 복사               >  │  │ ◀ TDS ListRow (클릭 시 토스 토스트 알림)
│  │      contact@example.com               │  │
│  └────────────────────────────────────────┘  │
│                                              │
│            © 2026 장연재. TDS 스타일         │ ◀ TDS Caption
│                                              │
│                                              │
├──────────────────────────────────────────────┤
│  [화면 하단 고정 CTA (Bottom Fixed Area)]    │
│  ┌────────────────────────────────────────┐  │
│  │       이메일로 커피챗 제안하기  ➔       │  │ ◀ shadcn Button (TDS Primary: h-14, rounded-xl, blue-500)
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 5. 토스 디자인 시스템 (TDS) x shadcn/ui 구축 규격 (Design.md 기반)

### 5.1 TDS 컬러 시스템 융합 (`design.md`)
| 토스 토큰명 | Hex 코드 | shadcn/ui CSS 변수 | 용도 및 규칙 |
| :--- | :--- | :--- | :--- |
| **`blue-500`** | `#3182F6` | `--primary`, `--ring` | **카노니컬 Toss Blue.** 화면당 가장 중요한 단 하나의 채움 CTA 버튼에만 적용 |
| **`blue-600`** | `#1B64DA` | - | Primary 버튼 Hover / Pressed 상태 색상 |
| **`blue-50`** | `#E8F3FF` | `--secondary` | Brand-weak background (강조 뱃지, 선택된 칩 배경) |
| **`grey-900`** | `#191F28` | `--foreground` | Primary Text (절대 순수 Black을 쓰지 않고 미세한 쿨네이비 톤 적용) |
| **`grey-700`** | `#4E5968` | - | Secondary Text (본문 서브텍스트, 설명글) |
| **`grey-600`** | `#6B7684` | `--muted-foreground` | 보조 라벨, 날짜, 서브타이틀 |
| **`grey-200`** | `#E5E8EB` | `--border`, `--input` | 디바이더, 구분선, 기본 컴포넌트 보더 |
| **`grey-100`** | `#F2F4F6` | `--background`, `--muted` | **Body Canvas.** 화면 전체를 채우는 쿨그레이 보조 표면 |
| **`white`** | `#FFFFFF` | `--card`, `--popover` | 프로필 카드, 다이얼로그, 시트 등 Surface 표면 |
| **`green-500`** | `#04B068` | - | 토스트 체크 아이콘 등 성공(Success) 피드백 |
| **`red-500`** | `#F04452` | `--destructive` | 오류(Error), 삭제 등 경고 인터랙션 |

### 5.2 라운딩 및 그림자 규격 (`rounded & elevation`)
- **버튼 (Button)**: `rounded-xl` (16px) 또는 `rounded-2xl` (20px), 터치 영역 높이 최소 48px~56px 보장
- **메인 카드 (Card)**: `rounded-3xl` (24px) + `shadow-[0_4px_20px_rgba(0,0,0,0.04)]` + `border border-black/[0.03]`
- **칩 / 뱃지 (Badge)**: `rounded-full` (999px pill)
- **다이얼로그 / 모달 (Dialog)**: `rounded-3xl` (24px) + `shadow-[0_12px_32px_rgba(25,31,40,0.10)]`
- **토스트 알림 (Toast)**: `rounded-xl` (14px) + `bg-grey-900` + `shadow-[0_8px_24px_rgba(25,31,40,0.16)]`

### 5.3 인터랙션 및 마이크로 애니메이션 (`Micro-interaction`)
- **TDS 햅틱 바운스**: 모든 클릭 가능한 컴포넌트(버튼, 리스트 로우, 칩)는 누를 때 `active:scale-[0.985]` 및 `transition: all 0.12s ease`를 적용하여 물리적인 누름 감각 제공
- **보이스 앤 톤 (Voice)**: 토스 가이드에 따라 시스템 피드백 문구는 **해요체(대화형 존댓말)** 통일
  - 예: *"프로필을 저장했어요"*, *"이메일 주소를 복사했어요"*, *"링크를 열 수 없어요"*

---

## 6. shadcn/ui 기반 재사용 컴포넌트 및 TDS 매핑 명세

본 서비스는 **CSS Modules(`.module.css`)를 전면 배제하고 모든 스타일을 Tailwind CSS로 100% 일원화**하며, `shadcn/ui` 설계 철학에 따라 분리·재사용 가능한 컴포넌트 아키텍처를 구축합니다.

### 6.1 컴포넌트 매핑 명세표
| shadcn 컴포넌트 | 파일 경로 | TDS 역할 및 스타일 적용 가이드 |
| :--- | :--- | :--- |
| **`Button`** | `src/components/ui/button.tsx` | 하단 시그니처 BottomCTA (`bg-primary`, `rounded-2xl`, `h-14`) 및 상단 Ghost 액션 |
| **`Card`** | `src/components/ui/card.tsx` | `rounded-3xl bg-card shadow-card border border-black/[0.03]` (프로필/링크 목록 래퍼) |
| **`Badge`** | `src/components/ui/badge.tsx` | 직무 뱃지 및 기술 스택 칩 (`rounded-full px-3 py-1 font-bold text-xs bg-secondary text-primary`) |
| **`LinkItemRow`** | `src/components/ui/link-item-row.tsx` | **[핵심 재사용]** `LinkItem` 규격의 링크 행 컴포넌트 (아이콘 자동 분기, 복사/이동 인터랙션, `active:scale-[0.985]`) |
| **`ProfileCard`** | `src/components/ui/profile-card.tsx` | **[핵심 재사용]** `Card`와 `Badge`를 조합하여 아바타, 타이틀, 바이오, 기술 칩 그룹을 캡슐화한 컴포넌트 |
| **`ToastSimple`** | `src/components/ui/toast-simple.tsx` | TDS 햅틱 피드백 토스트 (`bg-toss-grey-900`, `rounded-2xl`, 체크 뱃지 피드백) |
| **`Dialog / Sheet`** | `src/components/ui/dialog.tsx` | *(향후 추가)* 시연용 간이 프로필 편집 모달 |
| **`Input`** | `src/components/ui/input.tsx` | *(향후 추가)* 편집창 텍스트 입력 필드 (`rounded-xl bg-muted`) |

---

## 7. 로컬 스토리지 데이터 스키마 및 기본 더미 데이터 (Step 1 Schema & Mock Data)

`localStorage` 저장 키: `mylink_profile_data`

### 7.1 데이터 인터페이스 정의
```typescript
export interface Skill {
  name: string;
  brand?: boolean;
}

export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: "github" | "blog" | "email" | "link" | "portfolio" | "linkedin";
  isCopyAction?: boolean; // 이메일 등 클립보드 복사 액션 링크 여부
}

export interface ProfileData {
  avatarText: string;
  badge: string;
  greetingTitle: string;
  bioText: string;
  contactEmail: string;
  skills: Skill[];
  links: LinkItem[];
}
```

### 7.2 초기 시연용 링크 목록 기본 더미 데이터 (Default Demo Mock Data)
최초 접속 시 로컬 스토리지에 데이터가 없을 때 또는 '기본값 초기화' 버튼 실행 시 세팅되는 표준 더미 데이터입니다.

```typescript
export const DEFAULT_LINKS: LinkItem[] = [
  {
    id: "link-1",
    title: "GitHub",
    subtitle: "오픈소스 기여와 코드 저장소를 둘러보세요",
    url: "https://github.com",
    icon: "github",
  },
  {
    id: "link-2",
    title: "기술 블로그 (Velog)",
    subtitle: "개발하면서 배운 지식과 회고를 기록해요",
    url: "https://velog.io",
    icon: "blog",
  },
  {
    id: "link-3",
    title: "노션 포트폴리오",
    subtitle: "프로젝트 트러블슈팅과 상세 과정을 담았어요",
    url: "https://notion.so",
    icon: "portfolio",
  },
  {
    id: "link-4",
    title: "LinkedIn 프로필",
    subtitle: "이력과 학력, 커리어 히스토리를 확인해보세요",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    id: "link-5",
    title: "AI 데이터 분석 데모 프로젝트",
    subtitle: "직접 체험해볼 수 있는 웹 서비스 데모예요",
    url: "https://demo.example.com",
    icon: "link",
  },
  {
    id: "link-6",
    title: "이메일 주소 복사",
    subtitle: "contact@example.com",
    url: "contact@example.com",
    icon: "email",
    isCopyAction: true,
  },
];
```

---

## 8. 기술 스택 및 아키텍처 (Tech Stack)

| 구분 | 기술 스택 | 선정 이유 |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router), TypeScript** | SEO 친화적, 빠른 초기 로딩, 모던 웹 표준 |
| **Styling & UI Architecture** | **Tailwind CSS v3 (100% 통합, CSS Modules 배제)** | CSS 모듈 파편화를 제거하고 shadcn/ui 디자인 토큰과 유틸리티 클래스로 완전 일원화 |
| **Design System & Components** | **shadcn/ui (TDS Tokenized Reusable Components)** | WAI-ARIA 웹 접근성, `design.md`의 토스 디자인 토큰 완벽 융합 및 모듈형 재사용 |
| **Client Storage** | **Browser localStorage (Step 1)** | 외부 백엔드 의존성 없이 시연 가능한 빠른 영속화 계층 |
| **Global State** | **Zustand (또는 React Hook)** | 가볍고(약 1KB) 보일러플레이트 제로, 상태 동기화에 최적 |

---

## 9. 현 단계(Step 1) 작업 체크리스트

- [x] 토스 스타일 프로필 페이지 마크업 및 스타일링 (`mylink_YuanJae`)
- [x] PRD 단계별 전략(Step 1 로컬 스토리지 중심) 수정 및 docs 저장
- [x] 사용자 시나리오 3종 작성 및 반영
- [x] 메인 화면 와이어프레임 텍스트 다이어그램 반영
- [x] **shadcn/ui 최신 CLI 환경 초기화 (`components.json`, Tailwind v3, cn 헬퍼)**
- [x] **Design.md 기반의 토스 디자인 시스템(TDS) 컬러/라운딩/그림자 토큰 전면 연동**
- [x] **링크 목록 시연용 더미 데이터셋(DEFAULT_LINKS) 정의 및 PRD 반영**
- [x] **CSS Modules(`.module.css`) 배제 및 Tailwind CSS 유틸리티 100% 통일**
- [x] **shadcn/ui 기반 재사용 컴포넌트 아키텍처 구축 (`Card`, `Badge`, `Button`, `LinkItemRow`, `ProfileCard`, `ToastSimple`)**
- [x] **더미 데이터 기반 링크 목록 뷰어 페이지 구현 (`/` 및 `/links`)**
- [ ] `localStorage` 읽기/쓰기 커스텀 훅 및 상태 연동
- [ ] shadcn/ui 기반 시연용 프로필/링크 간이 편집 Dialog(모달) 구현
- [ ] 신규 링크 추가 / 삭제 기능 연동
- [ ] 데모 데이터 복원(초기화) 버튼 연동
