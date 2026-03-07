// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// 사용자 타입
export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// 네비게이션 및 기능 타입
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// 폼 및 비동기 상태 타입
export interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
