import { CalendarIcon, VideoIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration, formatMeetingDate, formatMeetingTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types";

export interface MeetingCardProps {
  meeting: Meeting;
  variant?: "upcoming" | "recent";
  onAction?: () => void;
  className?: string;
}

export function MeetingCard({ meeting, variant = "upcoming", onAction, className }: MeetingCardProps) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", className)}>
      <CardContent className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            meeting.is_instant
              ? "bg-[#0b5cff]/10 text-[#0b5cff]"
              : "bg-muted text-muted-foreground"
          )}
        >
          {meeting.is_instant ? (
            <VideoIcon className="size-5" />
          ) : (
            <CalendarIcon className="size-5" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-medium text-foreground">{meeting.title}</h3>
            <Badge variant={meeting.is_instant ? "default" : "outline"} className="shrink-0">
              {meeting.is_instant ? "Instant" : "Scheduled"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {formatMeetingDate(meeting.start_time)} · {formatMeetingTime(meeting.start_time)} ·{" "}
            {formatDuration(meeting.duration)}
          </p>

          <p className="truncate font-mono text-xs text-muted-foreground">
            Meeting ID: {meeting.meeting_id}
          </p>
        </div>

        {variant === "upcoming" && (
          <Button variant="outline" size="sm" className="shrink-0" onClick={onAction}>
            Start
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
