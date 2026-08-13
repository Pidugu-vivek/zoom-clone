"use client";

import { MeetingsSection } from "@/features/dashboard/components/MeetingsSection";
import { fetchMockRecentMeetings } from "@/features/dashboard/data/mockMeetings";

export function RecentMeetingsSection() {
  return (
    <MeetingsSection
      title="Recent Meetings"
      description="Meetings you've recently hosted or joined"
      variant="recent"
      fetchMeetings={fetchMockRecentMeetings}
      emptyMessage="You don't have any recent meetings yet."
    />
  );
}
