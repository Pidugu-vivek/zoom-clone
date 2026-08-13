import { meetingService } from "@/lib/api";
import { splitMeetingsByStartTime } from "@/lib/meetings";
import type { Meeting } from "@/types";

async function fetchAllMeetings(): Promise<Meeting[]> {
  return meetingService.listMeetings({ limit: 100 });
}

export async function fetchUpcomingMeetings(): Promise<Meeting[]> {
  const meetings = await fetchAllMeetings();
  return splitMeetingsByStartTime(meetings).upcoming;
}

export async function fetchRecentMeetings(): Promise<Meeting[]> {
  const meetings = await fetchAllMeetings();
  return splitMeetingsByStartTime(meetings).recent;
}
