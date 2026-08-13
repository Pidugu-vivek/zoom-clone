"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useApi, useToast } from "@/hooks";
import { authService, isApiError } from "@/lib/api";
import { useAuthStore } from "@/store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpForm() {
  const router = useRouter();
  const toast = useToast();
  const setSession = useAuthStore((state) => state.setSession);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const { execute: signup, isLoading } = useApi(authService.signup);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const nextErrors: FormErrors = {};

    if (!trimmedName) {
      nextErrors.name = "Enter your name";
    }
    if (!trimmedEmail) {
      nextErrors.email = "Enter your email address";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Enter a password";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const { user, access_token } = await signup({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });
      setSession(user, access_token);
      toast.success("Account created", `Welcome, ${user.name}!`);
      router.push("/");
    } catch (err) {
      const message = isApiError(err)
        ? err.message
        : "Failed to create your account. Please try again.";
      toast.error("Couldn't sign up", message);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={nameId} className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id={nameId}
          autoComplete="name"
          placeholder="Jane Doe"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError("name");
          }}
          disabled={isLoading}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={emailId} className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError("email");
          }}
          disabled={isLoading}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={passwordId} className="text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Input
            id={passwordId}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearError("password");
              clearError("confirmPassword");
            }}
            disabled={isLoading}
            aria-invalid={Boolean(errors.password)}
            className="pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            disabled={isLoading}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={confirmPasswordId} className="text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <Input
          id={confirmPasswordId}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            clearError("confirmPassword");
          }}
          disabled={isLoading}
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-10 w-full gap-2 bg-[#0b5cff] text-base text-white hover:bg-[#0a52e6]"
      >
        {isLoading ? (
          <Spinner className="size-4" />
        ) : (
          <>
            Create Account
            <ArrowRightIcon className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
