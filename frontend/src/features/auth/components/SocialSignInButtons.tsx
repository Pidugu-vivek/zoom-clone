"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.79-.07-1.55-.2-2.27H12v4.51h6.47a5.6 5.6 0 0 1-2.4 3.63v2.98h3.87c2.27-2.09 3.56-5.17 3.56-8.85Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.87-2.97c-1.08.72-2.45 1.14-4.07 1.14-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.31A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.31V6.6H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.4Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.6 4.6 1.79l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.6l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true" fill="#1877F2">
      <path d="M24 12.07C24 5.66 18.63.4 12 .4S0 5.66 0 12.07c0 5.79 4.39 10.6 10.13 11.46v-8.1H7.08v-3.36h3.05V9.41c0-3 1.83-4.65 4.6-4.65 1.33 0 2.72.23 2.72.23v2.94h-1.53c-1.51 0-1.98.92-1.98 1.87v2.24h3.37l-.54 3.36h-2.83v8.1C19.61 22.67 24 17.86 24 12.07Z" />
    </svg>
  );
}

/**
 * UI placeholders only — no OAuth is implemented. Clicking either just shows
 * a "coming soon" toast via the existing toast system.
 */
export function SocialSignInButtons() {
  const toast = useToast();

  return (
    <div className="flex flex-col gap-2.5">
      <Button
        type="button"
        variant="outline"
        className="h-10 w-full gap-2 text-sm font-medium"
        onClick={() => toast.info("Google sign-in is coming soon.")}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-10 w-full gap-2 text-sm font-medium"
        onClick={() => toast.info("Facebook sign-in is coming soon.")}
      >
        <FacebookIcon />
        Continue with Facebook
      </Button>
    </div>
  );
}
