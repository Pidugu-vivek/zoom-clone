import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration, formatMeetingDate, formatMeetingTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types";

export interface MeetingInfoCardProps {
  meeting: Meeting;
  className?: string;
}

export function MeetingInfoCard({ meeting, className }: MeetingInfoCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="truncate text-base font-semibold text-foreground">{meeting.title}</h2>
          <Badge variant={meeting.is_instant ? "default" : "outline"} className="shrink-0">
            {meeting.is_instant ? "Instant" : "Scheduled"}
          </Badge>
        </div>

        <div className="flex flex-col gap-0.5 text-sm text-muted-foreground sm:items-end">
          <span className="font-mono text-xs">Meeting ID: {meeting.meeting_id}</span>
          <span>
            {formatMeetingDate(meeting.start_time)} · {formatMeetingTime(meeting.start_time)} ·{" "}
            {formatDuration(meeting.duration)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
