# Next.js App Router 참고 문서

> **출처**: Context7 `/vercel/next.js/v15.1.8` (Next.js 15 계열 stable 공식 문서)
> **조회일**: 2026-07-28
>
> ⚠️ **버전 안내**: 이 프로젝트의 `package.json`은 `next: 16.1.6`입니다. 이 문서는 **15.1.8 기준**으로 정리되었습니다.
> 아래의 파일 컨벤션·async `params`·서버 컴포넌트 데이터 페칭은 15에서 도입되어 16까지 이어지는 기반 구조이지만,
> **15 → 16 사이의 변경사항은 이 문서에서 확인하지 않았습니다.** 16 고유 기능이 필요하면 별도로 확인하세요.

---

## 1. 파일 컨벤션

`app/` 디렉터리 안에서는 **파일명 자체가 역할을 결정**합니다. Next.js가 아래 이름들을 자동으로 인식합니다.

| 파일 | 역할 |
|------|------|
| `layout` | 해당 세그먼트와 하위 경로가 공유하는 UI |
| `page` | 라우트의 고유 UI — **이 파일이 있어야 경로가 외부에 공개됨** |
| `loading` | 로딩 UI (Suspense 경계를 자동 생성) |
| `error` | 해당 세그먼트와 하위 경로의 에러 UI |
| `global-error` | 전역 에러 UI |
| `not-found` | 404 UI |
| `route` | 서버 API 엔드포인트 (`.js` / `.ts`만 지원) |
| `template` | 매 탐색마다 다시 렌더되는 레이아웃 |
| `default` | 병렬 라우트(Parallel Routes)의 폴백 UI |

확장자는 `.js` / `.jsx` / `.tsx`를 지원합니다 (`route`는 `.js` / `.ts`만).

---

## 2. 루트 레이아웃 (필수)

루트 레이아웃은 반드시 존재해야 하며, `<html>`과 `<body>` 태그를 **직접 선언**해야 합니다.
모든 하위 레이아웃과 페이지를 감쌉니다.

```tsx
// app/layout.tsx
export default function RootLayout({
  // 레이아웃은 children prop을 반드시 받아야 한다.
  // 하위 레이아웃 또는 페이지가 이 자리에 채워진다.
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```

---

## 3. 중첩 레이아웃

하위 폴더에 `layout.tsx`를 두면 자동으로 중첩됩니다.
아래 예시는 `/dashboard` 이하 모든 경로를 감쌉니다.

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

---

## 4. 동적 라우트

폴더명을 대괄호로 감싸면 동적 세그먼트가 됩니다 — `app/blog/[slug]/page.tsx`.
`generateStaticParams`로 빌드 시점에 정적 생성할 경로 목록을 지정할 수 있습니다.

```tsx
// app/blog/[slug]/page.tsx
export function generateStaticParams() {}

export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

---

## 5. ⚠️ `params` / `searchParams`가 Promise — 15의 최대 변경점

Next.js 14 → 15로 오면서 `params`와 `searchParams`가 **동기 객체에서 Promise로** 바뀌었습니다.
`await` 없이 접근하면 에러가 발생합니다.

```tsx
// ❌ Next.js 14 방식
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}
```

```tsx
// ✅ Next.js 15 방식
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

`generateMetadata`에도 **동일하게** 적용됩니다 — `async`로 바꾸고 `await`해야 합니다.

```tsx
export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

---

## 6. 클라이언트 컴포넌트에서의 params

클라이언트 컴포넌트는 `async`가 될 수 없으므로, React의 `use()` 훅으로 Promise를 풉니다.

```tsx
'use client'

import { use } from 'react'

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = use(params)
  const { query } = use(searchParams)
}
```

쿼리스트링만 필요하다면 `useSearchParams()` 훅이 더 간단합니다.
동적 렌더링 라우트에서는 초기 서버 렌더 시점에도 값을 읽을 수 있습니다.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  // 초기 렌더 시에는 서버에서, 이후 탐색에서는 클라이언트에서 기록된다.
  return <>Search: {search}</>
}
```

---

## 7. 서버 컴포넌트 데이터 페칭

App Router의 기본값은 **서버 컴포넌트**입니다.
컴포넌트 자체를 `async`로 선언하고 직접 `await`하는 것이 권장 방식입니다.

```tsx
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

**클라이언트 컴포넌트는 `async`로 만들 수 없습니다** — `no-async-client-component` 에러가 발생합니다.
데이터 페칭이 필요하면 서버 컴포넌트로 옮기거나, 서버에서 받은 데이터를 props로 내려주세요.

---

## 8. 이 저장소의 실제 구현

위 패턴들이 이 프로젝트에서 어떻게 쓰이는지는 아래를 참고하세요.

| 경로 | 내용 |
|------|------|
| `src/app/layout.tsx` | 루트 레이아웃 실제 예시 (ThemeProvider, Header, Footer 포함) |
| `src/app/page.tsx` | 홈페이지 |
| `src/app/components/` | `/components` 세그먼트 `page.tsx` |
| `src/app/docs/` | `/docs` 세그먼트 `page.tsx` |
| `src/app/examples/` | `/examples` 세그먼트 `page.tsx` |
| `src/app/login/` | `/login` 세그먼트 `page.tsx` |

> 참고: 루트의 `docs/`(이 문서가 있는 폴더)와 `src/app/docs/`(`/docs` 라우트 페이지)는 서로 다릅니다. 혼동하지 마세요.

클라이언트 컴포넌트 구분 규칙(`"use client"`), SSR 안전을 위한 `useIsMounted()` 훅, `cn()` 유틸리티,
상수 중앙화 등 이 프로젝트의 코딩 규칙은 루트 [`CLAUDE.md`](../CLAUDE.md)에 정리되어 있습니다.
