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

/**
 * Accepts either a raw meeting ID or a full invite link (e.g.
 * "https://host/join/abc-defg-hij") and returns just the meeting ID.
 */
export function extractMeetingId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const segments = url.pathname.split("/").filter(Boolean);
    const joinIndex = segments.indexOf("join");
    if (joinIndex !== -1 && segments[joinIndex + 1]) {
      return segments[joinIndex + 1];
    }
    if (segments.length > 0) {
      return segments[segments.length - 1];
    }
    return trimmed;
  } catch {
    const joinMatch = trimmed.match(/\/join\/([^/?#]+)/);
    return joinMatch ? joinMatch[1] : trimmed;
  }
}
