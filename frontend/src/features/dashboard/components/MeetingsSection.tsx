"use client";

import { useEffect, useRef } from "react";
import { CalendarXIcon } from "lucide-react";

import { EmptyState, MeetingCard, MeetingCardSkeleton, SectionHeader } from "@/components/shared";
import { useApi, useToast } from "@/hooks";
import { useMeetingStore } from "@/store";
import type { Meeting } from "@/types";

export interface MeetingsSectionProps {
  title: string;
  description?: string;
  variant: "upcoming" | "recent";
  fetchMeetings: () => Promise<Meeting[]>;
  emptyMessage: string;
  skeletonCount?: number;
}

export function MeetingsSection({
  title,
  description,
  variant,
  fetchMeetings,
  emptyMessage,
  skeletonCount = 4,
}: MeetingsSectionProps) {
  const { data: meetings, isLoading, error, execute } = useApi(fetchMeetings);
  const toast = useToast();
  const storeMeetings = useMeetingStore((state) => state.meetings);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    execute().catch(() => {
      // error is surfaced via the `error` state + toast effect below
    });
  }, [execute]);

  // Re-fetch whenever a meeting is created/joined elsewhere in the app (e.g. Schedule
  // Meeting), so this section reflects the latest backend state without a page reload.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    execute().catch(() => {
      // error is surfaced via the `error` state + toast effect below
    });
  }, [storeMeetings, execute]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load ${title.toLowerCase()}`, error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={title} description={description} />

      {isLoading && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <MeetingCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && meetings && meetings.length === 0 && (
        <EmptyState
          icon={<CalendarXIcon className="size-4" />}
          title="No meetings"
          description={emptyMessage}
        />
      )}

      {!isLoading && meetings && meetings.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              variant={variant}
              onAction={() => toast.info(`Starting "${meeting.title}" is coming soon`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
