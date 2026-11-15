# 마이링크 (MyLink)

한양대학교 코딩없이 배우는 데이터 분석 실무(노코드 AI) 실습 과제 저장소입니다.

## 📁 저장소 구조

본 저장소는 과제 평가 기준에 따라 **'마이링크(MyLink)' 전용 폴더** 내에 모든 소스 코드가 구성되어 있습니다.

```text
my-link/
├── README.md               # 저장소 메인 가이드
├── LICENSE
└── MyLink/                 # ⭐️ [9점 채점 항목] 마이링크(MyLink) 전용 폴더
    ├── src/                # Next.js App Router 소스 코드 (React Hook Form, Zod, shadcn/ui)
    ├── public/             # 정적 에셋
    ├── docs/               # PRD 기능 정의서 (PRD_MyLink.md)
    ├── package.json        # 의존성 및 스크립트 설정
    ├── design.md           # 토스 디자인 시스템(TDS) 가이드라인
    └── tsconfig.json       # TypeScript 설정
```

## 🚀 실행 방법

```bash
# 1. MyLink 전용 폴더로 이동
cd MyLink

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 마이링크 서비스를 확인할 수 있습니다.
