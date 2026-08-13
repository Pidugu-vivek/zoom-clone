"use client";

import type { ReactNode } from "react";

import { AuthSessionProvider } from "@/features/auth/components/AuthSessionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthSessionProvider>{children}</AuthSessionProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}
