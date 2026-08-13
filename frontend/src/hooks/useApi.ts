"use client";

import { useCallback, useState } from "react";

import { isApiError } from "@/lib/api/client";

interface UseApiState<TResult> {
  data: TResult | null;
  error: string | null;
  isLoading: boolean;
}

export function useApi<TArgs extends unknown[], TResult>(
  requestFn: (...args: TArgs) => Promise<TResult>
) {
  const [state, setState] = useState<UseApiState<TResult>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: TArgs) => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const data = await requestFn(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (err) {
        const message = isApiError(err) ? err.message : "Something went wrong. Please try again.";
        setState({ data: null, error: message, isLoading: false });
        throw err;
      }
    },
    [requestFn]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return { ...state, execute, reset };
}
