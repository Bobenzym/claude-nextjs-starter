새 Next.js App Router 페이지를 생성해줘: $ARGUMENTS

## 규칙

1. **파일 생성**
   - `src/app/{route}/page.tsx` — 서버 컴포넌트 기본
   - 인터랙션(onClick, useState 등)이 필요한 경우 `src/app/{route}/_components/` 폴더에 클라이언트 컴포넌트로 분리하고 `"use client"` 지시문 추가

2. **스타일 & 컴포넌트**
   - shadcn/ui 컴포넌트 적극 활용 (Button, Card, Badge 등)
   - lucide-react 아이콘 필요 시 포함
   - Tailwind CSS로 스타일링, 클래스 조합은 `cn()` (`src/lib/utils.ts`) 사용

3. **네비게이션 등록**
   - `src/lib/constants.ts`를 읽고 기존 네비게이션 배열에 새 링크 추가

4. **타입**
   - TypeScript 완전 타입 지정
   - 필요 시 `src/lib/types.ts`의 기존 타입 재사용

5. **코드 스타일**
   - 들여쓰기 2칸
   - 코드 주석 한국어 작성
