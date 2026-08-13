"use client";

import { useEffect } from "react";
import { CalendarXIcon } from "lucide-react";

import { EmptyState, MeetingCard, MeetingCardSkeleton, SectionHeader } from "@/components/shared";
import { useApi, useToast } from "@/hooks";
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

  useEffect(() => {
    execute().catch(() => {
      // error is surfaced via the `error` state + toast effect below
    });
  }, [execute]);

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
