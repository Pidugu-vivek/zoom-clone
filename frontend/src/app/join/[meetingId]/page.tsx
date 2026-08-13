"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CalendarXIcon } from "lucide-react";

import { EmptyState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MeetingRoom } from "@/features/meeting-room";
import { useApi, useToast } from "@/hooks";
import { meetingService } from "@/lib/api";

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

  if (isLoading) {
    return (
      <div className="dark flex h-dvh flex-col items-center justify-center gap-3 bg-background">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="dark flex h-dvh flex-col items-center justify-center gap-4 bg-background px-4">
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
      </div>
    );
  }

  return <MeetingRoom meeting={meeting} />;
}
