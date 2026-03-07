"use client";

import { useEffect, useState, useRef, useCallback } from "react";

// SSR 하이드레이션 불일치 방지 훅
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

// localStorage 상태 관리 훅 (SSR 안전)
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isMounted = useIsMounted();

  // 값 설정 함수
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`localStorage 오류 [${key}]:`, error);
      }
    },
    [key, storedValue]
  );

  // 마운트 시 localStorage에서 값 로드
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`localStorage 읽기 오류 [${key}]:`, error);
    }
  }, [key, isMounted]);

  return [isMounted ? storedValue : initialValue, setValue] as const;
}

// 값 디바운싱 훅
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 미디어 쿼리 감지 훅 (SSR 안전)
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query, isMounted]);

  return isMounted ? matches : false;
}

// boolean 상태 토글 훅
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const set = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return { value, toggle, set };
}

// 클립보드 복사 훅
export function useCopyToClipboard(timeout: number = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copy = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          timeoutRef.current = setTimeout(() => {
            setCopied(false);
          }, timeout);
        })
        .catch((error) => {
          console.error("클립보드 복사 오류:", error);
        });
    },
    [timeout]
  );

  return { copied, copy };
}
