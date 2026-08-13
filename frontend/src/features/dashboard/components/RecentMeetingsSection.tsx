"use client";

import { MeetingsSection } from "@/features/dashboard/components/MeetingsSection";
import { fetchRecentMeetings } from "@/features/dashboard/data/meetings";

export function RecentMeetingsSection() {
  return (
    <MeetingsSection
      title="Recent Meetings"
      description="Meetings you've recently hosted or joined"
      variant="recent"
      fetchMeetings={fetchRecentMeetings}
      emptyMessage="You don't have any recent meetings yet."
    />
  );
}
