# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 코드 검사
npm start        # 빌드된 앱 실행
```

테스트 프레임워크는 미설치 상태이며, Playwright MCP 서버가 자동화 테스트용으로 설정되어 있음 (`.mcp.json`).

## 프로젝트 아키텍처

Next.js 16 App Router 기반 스타터킷으로, 다음 기술 스택을 사용한다:
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (PostCSS 플러그인 방식, `@import "tailwindcss"`)
- **shadcn/ui** + **Radix UI** (접근성 우선 컴포넌트)
- **next-themes** (다크모드)
- **CVA (Class Variance Authority)** (컴포넌트 변형 스타일 관리)

### 폴더 구조

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── layout.tsx       # 루트 레이아웃 (ThemeProvider, Header, Footer 포함)
│   ├── page.tsx         # 홈페이지
│   ├── components/      # /components 페이지
│   ├── docs/            # /docs 페이지
│   └── examples/        # /examples 페이지
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트 (button, card, dialog 등 13개)
│   ├── layout/          # header.tsx, footer.tsx
│   └── theme-toggle.tsx
├── hooks/index.ts       # 커스텀 훅 6개 (useIsMounted, useLocalStorage, useDebounce, useMediaQuery, useToggle, useCopyToClipboard)
└── lib/
    ├── constants.ts     # 앱 전역 상수 (네비게이션, 기능 목록, 기술스택, 링크)
    ├── types.ts         # TypeScript 인터페이스 (ApiResponse<T>, User, NavLink 등)
    └── utils.ts         # cn() 유틸리티 (clsx + tailwind-merge)
```

### 핵심 패턴

**클라이언트 컴포넌트 구분**: 인터랙티브 컴포넌트는 반드시 `"use client"` 지시문 사용. SSR 안전을 위해 `useIsMounted()` 훅 활용.

**스타일링**: 클래스명 조합 시 항상 `cn()` 유틸리티 사용 (`src/lib/utils.ts`). 컴포넌트 변형은 CVA로 정의.

**상수 중앙화**: 네비게이션 링크, 앱 이름, 기능 목록 등 모든 전역 값은 `src/lib/constants.ts`에서 관리.

**타입 정의**: 제네릭 API 타입(`ApiResponse<T>`, `PaginatedResponse<T>`, `AsyncState<T>`)은 `src/lib/types.ts`에서 임포트.

**경로 별칭**: `@/*` → `src/*` (tsconfig에 설정됨)

### 테마 설정

`globals.css`에서 OKLch 색상 공간 기반 CSS 변수로 라이트/다크 테마를 정의. `ThemeProvider`는 루트 레이아웃에서 `next-themes`로 감싸져 있으며 클래스 기반 다크 모드를 사용.

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn add [component-name]
```
