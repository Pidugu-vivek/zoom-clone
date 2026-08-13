import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { API_REQUEST_TIMEOUT_MS, env } from "@/config";
import type { ApiError, ApiErrorResponse } from "@/types";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: API_REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
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
