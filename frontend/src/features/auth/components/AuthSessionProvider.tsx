"use client";

import { useEffect, type ReactNode } from "react";

import { authService, isApiError } from "@/lib/api";
import { getStoredAuthToken, useAuthStore } from "@/store";

/**
 * Restores a previously-stored session on app load: if a token exists in
 * localStorage, primes the store with it and validates/refreshes the user
 * via GET /auth/me. An invalid or expired token safely clears the session
 * instead of leaving the UI in an inconsistent state.
 */
export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setRestoring = useAuthStore((state) => state.setRestoring);

  useEffect(() => {
    const token = getStoredAuthToken();
    if (!token) {
      setRestoring(false);
      return;
    }

    setToken(token);
    authService
      .me()
      .then((user) => setUser(user))
      .catch((err) => {
        if (isApiError(err)) {
          clearSession();
        }
      })
      .finally(() => setRestoring(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
