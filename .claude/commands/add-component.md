---
description: '새 React 컴포넌트를 src/components/에 생성합니다'
argument-hint: '<컴포넌트-이름>'
allowed-tools: ['Read', 'Write', 'Edit', 'Glob']
---

`$1` 이름의 React 함수형 컴포넌트를 `src/components/`에 생성해줘.

> variants(CVA)가 필요한 shadcn 스타일 UI 컴포넌트는 `/new-component`를 사용할 것.
> 이 커맨드는 variants 없는 기본 컴포넌트 파일을 바로 생성한다.

## 규칙

1. **인자 처리**
   - `$1`을 컴포넌트 이름으로 받는다
   - `$1`이 비어 있으면 파일을 만들지 말고 사용자에게 컴포넌트 이름을 물어본 뒤 중단
   - 입력이 `UserCard` / `user-card` / `userCard` 어떤 형태든 아래로 정규화
     - **파일명**: kebab-case (`user-card.tsx`)
     - **컴포넌트명**: PascalCase (`UserCard`)

2. **파일 생성 위치**
   - `src/components/{kebab-case}.tsx`
   - 동일 경로에 파일이 이미 있으면 **덮어쓰지 말고** 사용자에게 알린 뒤 중단

3. **템플릿** (`{{ComponentName}}`을 PascalCase 이름으로 치환)

   ```tsx
   import { cn } from "@/lib/utils";

   interface {{ComponentName}}Props extends React.ComponentProps<"div"> {
     title?: string;
   }

   /**
    * {{ComponentName}} 컴포넌트
    */
   export function {{ComponentName}}({
     className,
     title,
     children,
     ...props
   }: {{ComponentName}}Props) {
     return (
       <div className={cn("rounded-lg border p-4", className)} {...props}>
         {title && <h3 className="mb-2 font-semibold">{title}</h3>}
         {children}
       </div>
     );
   }
   ```

4. **배럴 등록**
   - `src/components/index.ts`를 읽고 `// 기타 컴포넌트` 섹션에 export 추가
   - 형식은 기존 줄과 동일하게 `@/` 별칭 사용

   ```ts
   export { {{ComponentName}} } from "@/components/{{kebab-name}}";
   ```

5. **클라이언트 컴포넌트**
   - `useState`, `onClick` 등 인터랙션이 필요할 때만 최상단에 `"use client";` 추가
   - 테마/`window` 등 SSR 불일치가 생길 수 있으면 `@/hooks`의 `useIsMounted()` 활용

6. **코드 스타일**
   - 들여쓰기 2칸, 세미콜론 사용
   - 클래스 조합은 반드시 `cn()` (`src/lib/utils.ts`) 사용
   - export는 **named export만** (default export 사용하지 않음)
   - TypeScript 완전 타입 지정, `any` 금지
   - 코드 주석과 사용자 노출 문자열은 한국어
   - 아이콘이 필요하면 `lucide-react`에서 import
   - 경로 별칭 `@/*` 사용

7. **완료 후**
   - 생성한 파일 경로와 사용 예시(import 한 줄 + JSX 한 줄)를 간단히 안내
