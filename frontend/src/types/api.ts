export interface ApiErrorResponse {
  detail: string;
}

export interface ApiError {
  status: number | null;
  message: string;
}

export type ApiListResponse<T> = T[];
