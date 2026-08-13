"use client";

import { PhoneOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCurrentTime } from "@/hooks";
import { formatMeetingTime } from "@/lib/formatters";

export interface MeetingHeaderProps {
  title: string;
  meetingId: string;
  onLeave: () => void;
}

export function MeetingHeader({ title, meetingId, onLeave }: MeetingHeaderProps) {
  const now = useCurrentTime();

  return (
    <header className="relative z-[60] flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 sm:px-6">
      <div className="flex min-w-0 flex-col">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">Meeting ID: {meetingId}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {formatMeetingTime(now.toISOString())}
        </span>
        <Button
          size="sm"
          className="gap-1.5 bg-destructive text-white hover:bg-destructive/90"
          onClick={onLeave}
        >
          <PhoneOffIcon className="size-4" />
          <span className="hidden sm:inline">Leave Meeting</span>
          <span className="sm:hidden">Leave</span>
        </Button>
      </div>
    </header>
  );
}
