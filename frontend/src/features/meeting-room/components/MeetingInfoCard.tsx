"use client";

import { LinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMeetingTimer, useToast } from "@/hooks";
import {
  formatDuration,
  formatElapsedTime,
  formatMeetingDate,
  formatMeetingTime,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types";

export interface MeetingInfoCardProps {
  meeting: Meeting;
  className?: string;
}

export function MeetingInfoCard({ meeting, className }: MeetingInfoCardProps) {
  const elapsedSeconds = useMeetingTimer();
  const toast = useToast();

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Meeting link copied");
    } catch {
      toast.error("Couldn't copy link", "Copy the URL from your browser's address bar instead.");
    }
  };

  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="truncate text-base font-semibold text-foreground">{meeting.title}</h2>
            <Badge variant={meeting.is_instant ? "default" : "outline"} className="shrink-0">
              {meeting.is_instant ? "Instant" : "Scheduled"}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <span className="font-mono text-xs text-muted-foreground">
              Meeting ID: {meeting.meeting_id}
            </span>
            <TooltipProvider delay={300}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Copy invite link"
                      onClick={handleCopyInviteLink}
                    />
                  }
                >
                  <LinkIcon className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent>Copy invite link</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1 text-sm text-muted-foreground sm:items-end">
          <span className="font-mono text-base font-medium tabular-nums text-foreground">
            {formatElapsedTime(elapsedSeconds)}
          </span>
          <span className="text-xs">
            {formatMeetingDate(meeting.start_time)} · {formatMeetingTime(meeting.start_time)} ·{" "}
            {formatDuration(meeting.duration)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
