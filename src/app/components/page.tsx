import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ComponentsPage() {
  const components = [
    {
      name: "Badge",
      description: "라벨이나 상태를 표시하는 작은 배지 컴포넌트",
    },
    {
      name: "Button",
      description: "다양한 스타일과 크기의 버튼 컴포넌트",
    },
    {
      name: "Card",
      description: "컨텐츠를 담는 기본 카드 컨테이너",
    },
    {
      name: "Dialog",
      description: "모달 다이얼로그 창 컴포넌트",
    },
    {
      name: "Input",
      description: "텍스트 입력 필드 컴포넌트",
    },
    {
      name: "Label",
      description: "폼 라벨 컴포넌트",
    },
    {
      name: "Dropdown Menu",
      description: "드롭다운 메뉴 컴포넌트",
    },
    {
      name: "Popover",
      description: "포퍼오버 팝업 컴포넌트",
    },
    {
      name: "Select",
      description: "선택 드롭다운 컴포넌트",
    },
    {
      name: "Tabs",
      description: "탭 네비게이션 컴포넌트",
    },
    {
      name: "Toast",
      description: "알림 토스트 메시지 컴포넌트",
    },
    {
      name: "Sheet",
      description: "슬라이드인 사이드 패널 컴포넌트",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero 섹션 */}
      <section className="space-y-8 pt-8 md:pt-16">
        <div className="flex justify-center">
          <Badge variant="secondary">컴포넌트</Badge>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            컴포넌트
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NextKit에 포함된 shadcn/ui 기반 컴포넌트들입니다. 이 컴포넌트들을 조합하여
            빠르게 UI를 구축할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 컴포넌트 그리드 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            사용 가능한 컴포넌트
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            설치되어 있는 shadcn/ui 컴포넌트 라이브러리
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Card key={component.name} className="p-6 space-y-3 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-foreground">
                {component.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {component.description}
              </p>
              <div className="pt-2">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  from @/components/ui/{component.name.toLowerCase().replace(/\s+/g, "-")}
                </code>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 컴포넌트 사용법 섹션 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            컴포넌트 사용하기
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            간단한 임포트만으로 컴포넌트를 사용할 수 있습니다
          </p>
        </div>

        <Card className="p-8 space-y-4 bg-muted/50">
          <h3 className="font-semibold text-lg">기본 사용 예제</h3>
          <pre className="bg-foreground/5 p-4 rounded overflow-x-auto text-sm">
            <code>{`import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button>클릭하세요</Button>
  );
}`}</code>
          </pre>
        </Card>

        <Card className="p-8 space-y-4 bg-muted/50">
          <h3 className="font-semibold text-lg">여러 컴포넌트 조합</h3>
          <pre className="bg-foreground/5 p-4 rounded overflow-x-auto text-sm">
            <code>{`import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Example() {
  return (
    <Card className="p-6">
      <Badge>새로운</Badge>
      <Button className="mt-4">확인</Button>
    </Card>
  );
}`}</code>
          </pre>
        </Card>
      </section>

      {/* 추가 리소스 섹션 */}
      <section className="space-y-8 py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            더 알아보기
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            shadcn/ui 공식 문서에서 각 컴포넌트의 더 자세한 사용법과 커스터마이징 방법을 확인하세요.
          </p>
        </div>
      </section>
    </div>
  );
}
