import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="space-y-24">
      {/* Hero 섹션 */}
      <section className="space-y-8 pt-8 md:pt-16">
        <div className="flex justify-center">
          <Badge variant="secondary">문서</Badge>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            문서
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NextKit 스타터킷 사용법, 설치 가이드, API 참조를 확인하세요.
          </p>
        </div>
      </section>

      {/* 설치 가이드 섹션 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            설치 가이드
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            프로젝트를 시작하기 위한 단계별 가이드
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-bold text-accent">
                1
              </span>
              <h3 className="text-lg font-semibold">저장소 클론</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              GitHub 저장소를 복제하여 프로젝트 시작
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-bold text-accent">
                2
              </span>
              <h3 className="text-lg font-semibold">의존성 설치</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              npm, yarn, 또는 bun을 사용하여 필요한 패키지 설치
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-bold text-accent">
                3
              </span>
              <h3 className="text-lg font-semibold">개발 서버 실행</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              npm run dev로 로컬 개발 서버 시작
            </p>
          </Card>
        </div>
      </section>

      {/* 사용법 섹션 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            주요 기능 사용법
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NextKit에서 제공하는 기능들을 활용하는 방법
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">다크모드 구현</h3>
            <p className="text-muted-foreground">
              next-themes를 사용하여 구현된 다크/라이트 모드 토글. 레이아웃에서 ThemeProvider를 추가하고,
              컴포넌트에서 useTheme 훅을 사용하여 테마 전환 기능을 쉽게 구현할 수 있습니다.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">shadcn/ui 컴포넌트 사용</h3>
            <p className="text-muted-foreground">
              이미 설치된 shadcn/ui 컴포넌트들을 자유롭게 사용할 수 있습니다.
              Button, Card, Badge, Dialog 등 다양한 컴포넌트가 준비되어 있습니다.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">TypeScript 활용</h3>
            <p className="text-muted-foreground">
              완전히 설정된 TypeScript 환경에서 타입 안정성과 함께 개발할 수 있습니다.
              컴포넌트 Props, 상태 관리, API 응답 등에 대한 타입 정의를 활용하세요.
            </p>
          </Card>
        </div>
      </section>

      {/* API 참조 섹션 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            API 참조
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            스타터킷에 포함된 유틸리티와 훅 참조
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold">useTheme()</h3>
            <p className="text-sm text-muted-foreground">
              현재 테마를 가져오고 테마를 전환하는 훅
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-semibold">constants.ts</h3>
            <p className="text-sm text-muted-foreground">
              앱 전역 설정값 및 네비게이션 링크 정보
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
