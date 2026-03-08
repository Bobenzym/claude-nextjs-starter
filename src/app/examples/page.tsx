import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Palette, Zap } from "lucide-react";

export default function ExamplesPage() {
  const examples = [
    {
      icon: Code2,
      title: "기본 컴포넌트 사용",
      description: "shadcn/ui의 Button, Card, Badge 등 기본 컴포넌트를 활용한 예제",
    },
    {
      icon: Palette,
      title: "다크모드 구현",
      description: "next-themes를 사용한 다크/라이트 모드 토글 기능 구현",
    },
    {
      icon: Zap,
      title: "반응형 레이아웃",
      description: "Tailwind CSS 그리드와 플렉스박스를 활용한 반응형 디자인",
    },
    {
      icon: Code2,
      title: "TypeScript 타입",
      description: "컴포넌트 Props와 상태 관리에 TypeScript 타입 적용",
    },
    {
      icon: Palette,
      title: "폼 입력",
      description: "shadcn/ui 폼 컴포넌트를 사용한 입력 처리",
    },
    {
      icon: Zap,
      title: "성능 최적화",
      description: "Next.js 이미지 최적화와 동적 임포트 활용",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero 섹션 */}
      <section className="space-y-8 pt-8 md:pt-16">
        <div className="flex justify-center">
          <Badge variant="secondary">예제</Badge>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            예제
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NextKit를 활용한 다양한 사용 예제를 확인하세요. 각 예제는 실제 프로덕션 코드에 적용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 예제 카드 그리드 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            사용 예제
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            실제 개발에서 바로 활용할 수 있는 다양한 예제들
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => {
            const Icon = example.icon;
            return (
              <Card key={example.title} className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{example.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  자세히 보기
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 커뮤니티 예제 섹션 */}
      <section className="space-y-8 py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            더 많은 예제 찾기
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GitHub 저장소에서 추가 예제와 샘플 프로젝트를 확인하세요.
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="outline">GitHub 방문</Button>
          <Button>문서 읽기</Button>
        </div>
      </section>
    </div>
  );
}
