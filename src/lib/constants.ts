import {
  Code2,
  Zap,
  Palette,
  Package,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import type { NavLink, Feature, TechStackItem } from "./types";

// 앱 기본 정보
export const APP_NAME = "NextKit";
export const APP_DESCRIPTION = "현대적인 Next.js 웹 개발을 위한 완전한 스타터킷";
export const APP_URL = "https://nextkit.dev";
export const GITHUB_URL = "https://github.com/yourusername/nextkit";

// 네비게이션 링크
export const NAV_LINKS: NavLink[] = [
  {
    label: "문서",
    href: "/docs",
  },
  {
    label: "예제",
    href: "/examples",
  },
  {
    label: "컴포넌트",
    href: "/components",
  },
];

// 주요 기능
export const FEATURES: Feature[] = [
  {
    icon: Code2,
    title: "Next.js 16 + React 19",
    description: "최신 Next.js와 React를 활용한 고성능 웹 애플리케이션 개발",
  },
  {
    icon: Zap,
    title: "고속 개발",
    description: "shadcn UI와 Tailwind CSS로 빠른 UI 개발 가능",
  },
  {
    icon: Palette,
    title: "다크모드 지원",
    description: "next-themes로 구현한 완벽한 다크/라이트 모드 토글",
  },
  {
    icon: Package,
    title: "TypeScript 기본",
    description: "타입 안정성을 위한 완전한 TypeScript 설정",
  },
  {
    icon: Code2,
    title: "커스텀 훅",
    description: "일반적인 기능을 위한 재사용 가능한 훅 모음",
  },
  {
    icon: ArrowRight,
    title: "확장 가능",
    description: "프로덕션 애플리케이션을 위한 확장성 있는 구조",
  },
];

// 기술 스택
export const TECH_STACK: TechStackItem[] = [
  {
    name: "Next.js",
    description: "React 프레임워크",
  },
  {
    name: "TypeScript",
    description: "정적 타입 시스템",
  },
  {
    name: "Tailwind CSS v4",
    description: "유틸리티 CSS 프레임워크",
  },
  {
    name: "shadcn/ui",
    description: "재사용 가능한 컴포넌트",
  },
  {
    name: "next-themes",
    description: "테마 관리",
  },
  {
    name: "Lucide React",
    description: "아이콘 라이브러리",
  },
];

// 푸터 링크
export const FOOTER_LINKS: Record<string, NavLink[]> = {
  제품: [
    { label: "기능", href: "#features" },
    { label: "가격", href: "#pricing" },
    { label: "문서", href: "/docs" },
  ],
  리소스: [
    { label: "블로그", href: "/blog" },
    { label: "가이드", href: "/guides" },
    { label: "FAQ", href: "/faq" },
  ],
  커뮤니티: [
    { label: "GitHub", href: GITHUB_URL, external: true },
    { label: "Twitter", href: "https://twitter.com", external: true },
    { label: "Discord", href: "https://discord.gg", external: true },
  ],
};

// 소셜 링크
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
];
