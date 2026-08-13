"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Frontend-only email "continue" form — no backend call, no real auth yet. */
export function SignInForm() {
  const toast = useToast();
  const emailInputId = useId();
  const emailErrorId = useId();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Enter your email address");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    setError(null);
    toast.info("Email sign-in will be available soon.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={emailInputId} className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id={emailInputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? emailErrorId : undefined}
        />
        {error && (
          <p id={emailErrorId} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="h-10 w-full gap-2 bg-[#0b5cff] text-base text-white hover:bg-[#0a52e6]"
      >
        Continue
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  );
}
