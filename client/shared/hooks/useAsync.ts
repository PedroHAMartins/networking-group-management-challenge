"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: Error };

export interface UseAsyncOptions<TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: Error) => void;
}

export function useAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options?: UseAsyncOptions<TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const run = useCallback(
    async (...args: TArgs): Promise<AsyncResult<TResult>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fn(...args);
        setData(result);
        options?.onSuccess?.(result);
        return { ok: true, data: result };
      } catch (e: unknown) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        options?.onError?.(err);
        return { ok: false, error: err };
      } finally {
        setLoading(false);
      }
    },
    [fn, options]
  );

  const reset = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  return { run, loading, error, data, reset } as const;
}

export function useUseCase<TUseCase, TResult, TArgs extends unknown[]>(
  createUseCase: () => TUseCase,
  execute: (useCase: TUseCase, ...args: TArgs) => Promise<TResult>,
  options?: UseAsyncOptions<TResult>
) {
  const instanceRef = useRef<TUseCase | null>(null);
  useEffect(() => {
    if (instanceRef.current == null) {
      instanceRef.current = createUseCase();
    }
  }, [createUseCase]);

  const wrapped = useCallback(
    (...args: TArgs) => execute(instanceRef.current as TUseCase, ...args),
    [execute]
  );

  return useAsync<TArgs, TResult>(wrapped, options);
}
