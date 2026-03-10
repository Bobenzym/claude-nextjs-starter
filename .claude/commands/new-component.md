재사용 가능한 UI 컴포넌트를 만들어줘: $ARGUMENTS

## 규칙

1. **파일 위치**
   - `src/components/ui/` — 범용 UI 컴포넌트 (shadcn/ui 스타일)
   - `src/components/` — 레이아웃/도메인 컴포넌트
   - 기존 파일을 먼저 읽어 폴더 패턴 파악 후 적절한 위치에 생성

2. **컴포넌트 패턴**
   - CVA (`class-variance-authority`)로 `variants` 정의
   - 클래스 조합은 반드시 `cn()` 유틸리티 사용 (`src/lib/utils.ts`)
   - `"use client"` 지시문은 인터랙션이 있을 때만 추가

3. **TypeScript**
   - props 인터페이스 완전 타입 지정
   - `VariantProps<typeof ...>` 활용해 variants 타입 자동 추론

4. **아이콘**
   - 아이콘 필요 시 `lucide-react`에서 import

5. **코드 스타일**
   - 들여쓰기 2칸
   - 코드 주석 한국어 작성
   - 컴포넌트는 named export + default export 둘 다 제공
