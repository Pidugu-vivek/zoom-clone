import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { API_REQUEST_TIMEOUT_MS, env } from "@/config";
import { useAuthStore } from "@/store/authStore";
import type { ApiError, ApiErrorResponse } from "@/types";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: API_REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      // Invalid/expired token — drop the client-side session so the UI
      // safely falls back to the unauthenticated state.
      useAuthStore.getState().clearSession();
    }

    const apiError: ApiError = {
      status: error.response?.status ?? null,
      message:
        error.response?.data?.detail ?? error.message ?? "Something went wrong. Please try again.",
    };
    return Promise.reject(apiError);
  }
);

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}
