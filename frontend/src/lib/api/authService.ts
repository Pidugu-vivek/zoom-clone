import { apiClient } from "@/lib/api/client";
import { API_ROUTES } from "@/config";
import type { AuthResponse, LoginRequest, SignupRequest, User } from "@/types";

export const authService = {
  async signup(payload: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ROUTES.auth.signup, payload);
    return response.data;
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ROUTES.auth.login, payload);
    return response.data;
  },

  async me(): Promise<User> {
    const response = await apiClient.get<User>(API_ROUTES.auth.me);
    return response.data;
  },
};
