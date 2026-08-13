"use client";

import { useToast } from "@/hooks";

/** Registration doesn't exist yet — clicking "Sign up" just shows a toast. */
export function SignUpPrompt() {
  const toast = useToast();

  return (
    <p className="text-center text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <button
        type="button"
        onClick={() => toast.info("Sign up is coming soon.")}
        className="font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-ring/50 rounded-xs"
      >
        Sign up
      </button>
    </p>
  );
}
