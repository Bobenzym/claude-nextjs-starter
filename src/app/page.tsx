import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURES, TECH_STACK, GITHUB_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero 섹션 */}
      <section className="space-y-8 pt-8 md:pt-16">
        {/* 버전 배지 */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            v0.1.0 공개됨
          </Badge>
        </div>

        {/* 메인 제목 */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            현대적인 웹 개발을 위한
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              완전한 스타터킷
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Next.js 16, React 19, TypeScript, Tailwind CSS v4로 구축한 프로덕션 레디 스타터킷.
            shadcn UI 컴포넌트와 커스텀 훅으로 빠른 개발을 시작하세요.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="gap-2">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub에서 보기
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">문서 읽기</Link>
          </Button>
        </div>

        {/* 기술 배지 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui"].map(
            (tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            )
          )}
        </div>
      </section>

      {/* Features 섹션 */}
      <section className="space-y-8" id="features">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            핵심 기능
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            프로덕션 애플리케이션을 위한 필수 기능들을 모두 포함했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tech Stack 섹션 */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            기술 스택
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            최신 기술을 활용한 견고한 개발 기반
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map((tech) => (
            <Card key={tech.name} className="p-4 space-y-2">
              <h3 className="font-semibold">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="space-y-8 py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            지금 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            몇 분 안에 현대적인 웹 애플리케이션 개발을 시작할 수 있습니다.
          </p>
        </div>
        <Button size="lg" asChild className="gap-2">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            저장소 방문
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
