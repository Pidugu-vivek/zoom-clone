"use client";

import { MeetingsSection } from "@/features/dashboard/components/MeetingsSection";
import { fetchMockUpcomingMeetings } from "@/features/dashboard/data/mockMeetings";

export function UpcomingMeetingsSection() {
  return (
    <MeetingsSection
      title="Upcoming Meetings"
      description="Meetings scheduled for the days ahead"
      variant="upcoming"
      fetchMeetings={fetchMockUpcomingMeetings}
      emptyMessage="You have no upcoming meetings scheduled."
    />
  );
}
