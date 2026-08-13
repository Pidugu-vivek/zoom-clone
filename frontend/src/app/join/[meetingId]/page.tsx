"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, CalendarXIcon, VideoOffIcon } from "lucide-react";

import { EmptyState } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi, useToast } from "@/hooks";
import { meetingService } from "@/lib/api";
import { formatDuration, formatMeetingDate, formatMeetingTime } from "@/lib/formatters";

export default function MeetingRoomPage() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const router = useRouter();
  const toast = useToast();

  const { data: meeting, isLoading, error, execute } = useApi(meetingService.getMeeting);

  useEffect(() => {
    execute(meetingId).catch(() => {
      // error is surfaced via the `error` state + toast effect below
    });
  }, [execute, meetingId]);

  useEffect(() => {
    if (error) {
      toast.error("Couldn't load meeting", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4 sm:px-6">
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => router.push("/")}>
            <ArrowLeftIcon className="size-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6">
        {isLoading && (
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center gap-3 py-10">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        )}

        {!isLoading && !meeting && (
          <EmptyState
            icon={<CalendarXIcon className="size-4" />}
            title="Meeting not found"
            description={`We couldn't find a meeting with ID "${meetingId}".`}
            action={
              <Button size="sm" onClick={() => router.push("/")}>
                Back to Dashboard
              </Button>
            }
          />
        )}

        {!isLoading && meeting && (
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#0b5cff]/10 text-[#0b5cff]">
                <VideoOffIcon className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-heading text-xl font-semibold text-foreground">
                  {meeting.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {formatMeetingDate(meeting.start_time)} · {formatMeetingTime(meeting.start_time)} ·{" "}
                  {formatDuration(meeting.duration)}
                </p>
              </div>
              <Badge variant={meeting.is_instant ? "default" : "outline"}>
                {meeting.is_instant ? "Instant" : "Scheduled"}
              </Badge>
              <p className="font-mono text-xs text-muted-foreground">
                Meeting ID: {meeting.meeting_id}
              </p>
              <p className="text-sm text-muted-foreground">
                You&apos;re in the meeting room. Video calling isn&apos;t available yet.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
