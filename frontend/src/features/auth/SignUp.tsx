import Link from "next/link";
import { VideoIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export function SignUp() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#0b5cff] text-white">
            <VideoIcon className="size-4.5" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-foreground">zoom</span>
        </Link>

        <Card className="w-full">
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-center">
              <h1 className="font-heading text-xl font-semibold text-foreground">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign up to start hosting and joining meetings.
              </p>
            </div>

            <SignUpForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
