import { create } from "zustand";

import type { User } from "@/types";

const AUTH_TOKEN_STORAGE_KEY = "zoom-clone-auth-token";

interface AuthState {
  user: User | null;
  token: string | null;
  /** True until the initial session-restore check (see AuthSessionProvider) completes. */
  isRestoring: boolean;
}

interface AuthActions {
  setSession: (user: User, token: string) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearSession: () => void;
  setRestoring: (isRestoring: boolean) => void;
}

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

function persistToken(token: string | null): void {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isRestoring: true,
  setSession: (user, token) => {
    persistToken(token);
    set({ user, token });
  },
  setToken: (token) => {
    persistToken(token);
    set({ token });
  },
  setUser: (user) => set({ user }),
  clearSession: () => {
    persistToken(null);
    set({ user: null, token: null });
  },
  setRestoring: (isRestoring) => set({ isRestoring }),
}));
