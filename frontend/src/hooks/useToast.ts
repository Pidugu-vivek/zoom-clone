"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import { TOAST_DURATION_MS } from "@/config";

export function useToast() {
  const success = useCallback((message: string, description?: string) => {
    toast.success(message, { description, duration: TOAST_DURATION_MS });
  }, []);

  const error = useCallback((message: string, description?: string) => {
    toast.error(message, { description, duration: TOAST_DURATION_MS });
  }, []);

  const info = useCallback((message: string, description?: string) => {
    toast.info(message, { description, duration: TOAST_DURATION_MS });
  }, []);

  const loading = useCallback((message: string) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((id?: string | number) => {
    toast.dismiss(id);
  }, []);

  return { success, error, info, loading, dismiss };
}
