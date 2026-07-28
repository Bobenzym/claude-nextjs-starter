"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";

// 구독이 필요 없는 스토어용 no-op (참조 고정을 위해 모듈 스코프에 선언)
const noopSubscribe = () => () => {};

// SSR 하이드레이션 불일치 방지 훅
// 서버 렌더링과 하이드레이션 중에는 false, 클라이언트 마운트 이후 true를 반환한다.
export function useIsMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // 클라이언트 스냅샷
    () => false // 서버 스냅샷
  );
}

/**
 * localStorage에서 값을 읽어 파싱한다. SSR 환경이거나 실패 시 fallback을 반환한다.
 */
function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.error(`localStorage 읽기 오류 [${key}]:`, error);
    return fallback;
  }
}

// localStorage 상태 관리 훅 (SSR 안전)
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 초기화 시점에 바로 읽는다. 서버에서는 initialValue가 사용되고,
  // 클라이언트 첫 렌더는 아래 isMounted 게이트가 initialValue를 반환하므로
  // 하이드레이션 불일치가 발생하지 않는다.
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue)
  );
  const [currentKey, setCurrentKey] = useState(key);
  const isMounted = useIsMounted();

  // key가 바뀌면 렌더 중에 값을 다시 읽는다 (effect보다 권장되는 패턴)
  if (currentKey !== key) {
    setCurrentKey(key);
    setStoredValue(readStoredValue(key, initialValue));
  }

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
// 서버 렌더링과 하이드레이션 중에는 false, 이후 실제 매칭 결과를 반환한다.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [
    query,
  ]);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false // 서버 스냅샷
  );
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

      // 연속 호출 시 이전 타이머가 copied를 조기에 해제하는 것을 방지
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

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

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copied, copy };
}
