"use client";

import { MeetingsSection } from "@/features/dashboard/components/MeetingsSection";
import { fetchUpcomingMeetings } from "@/features/dashboard/data/meetings";

export function UpcomingMeetingsSection() {
  return (
    <MeetingsSection
      title="Upcoming Meetings"
      description="Meetings scheduled for the days ahead"
      variant="upcoming"
      fetchMeetings={fetchUpcomingMeetings}
      emptyMessage="You have no upcoming meetings scheduled."
    />
  );
}
