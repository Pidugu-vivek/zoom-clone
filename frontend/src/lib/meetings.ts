import type { Meeting } from "@/types";

export interface SplitMeetings {
  upcoming: Meeting[];
  recent: Meeting[];
}

export function splitMeetingsByStartTime(
  meetings: Meeting[],
  referenceDate: Date = new Date()
): SplitMeetings {
  const upcoming: Meeting[] = [];
  const recent: Meeting[] = [];

  for (const meeting of meetings) {
    if (new Date(meeting.start_time) >= referenceDate) {
      upcoming.push(meeting);
    } else {
      recent.push(meeting);
    }
  }

  upcoming.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  recent.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

  return { upcoming, recent };
}
