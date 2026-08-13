import Link from "next/link";
import { VideoIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpPrompt } from "@/features/auth/components/SignUpPrompt";
import { SocialSignInButtons } from "@/features/auth/components/SocialSignInButtons";

export function SignIn() {
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
              <h1 className="font-heading text-xl font-semibold text-foreground">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to start or join your meetings.
              </p>
            </div>

            <SignInForm />

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs font-medium text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <SocialSignInButtons />
          </CardContent>
        </Card>

        <SignUpPrompt />
      </div>
    </div>
  );
}
