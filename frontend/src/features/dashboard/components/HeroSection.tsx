"use client";

import { CalendarIcon, UsersIcon, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks";

export function HeroSection() {
  const toast = useToast();

  const handlePlaceholderAction = (action: string) => {
    toast.info(`${action} is coming soon`);
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-6 py-10 text-center sm:py-12">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Start, join, or schedule your next meeting
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            size="lg"
            className="h-11 gap-2 bg-[#0b5cff] px-6 text-base text-white hover:bg-[#0a52e6]"
            onClick={() => handlePlaceholderAction("New Meeting")}
          >
            <VideoIcon className="size-5" />
            New Meeting
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 gap-2 px-6 text-base"
            onClick={() => handlePlaceholderAction("Join Meeting")}
          >
            <UsersIcon className="size-5" />
            Join Meeting
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 gap-2 px-6 text-base"
            onClick={() => handlePlaceholderAction("Schedule Meeting")}
          >
            <CalendarIcon className="size-5" />
            Schedule Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
