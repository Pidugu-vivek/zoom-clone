import type { Meeting } from "@/types";

const NOW = new Date();

function offsetFromNow(hours: number): string {
  return new Date(NOW.getTime() + hours * 60 * 60 * 1000).toISOString();
}

function buildMeeting(overrides: Omit<Meeting, "created_at" | "participants">): Meeting {
  return {
    ...overrides,
    created_at: NOW.toISOString(),
    participants: [],
  };
}

export const mockUpcomingMeetings: Meeting[] = [
  buildMeeting({
    id: 101,
    meeting_id: "874 2201 5563",
    title: "Customer Onboarding Call",
    description: "Walkthrough of the new workspace with the Acme team.",
    start_time: offsetFromNow(5),
    duration: 30,
    invite_link: "https://zoom-clone.app/j/8742201556",
    is_instant: false,
  }),
  buildMeeting({
    id: 102,
    meeting_id: "902 1147 3382",
    title: "Q3 Roadmap Planning",
    description: "Prioritize next quarter's engineering roadmap.",
    start_time: offsetFromNow(26),
    duration: 60,
    invite_link: "https://zoom-clone.app/j/9021147338",
    is_instant: false,
  }),
  buildMeeting({
    id: 103,
    meeting_id: "615 7783 0294",
    title: "1:1 with Manager",
    description: null,
    start_time: offsetFromNow(29),
    duration: 30,
    invite_link: "https://zoom-clone.app/j/6157783029",
    is_instant: false,
  }),
  buildMeeting({
    id: 104,
    meeting_id: "348 9021 6675",
    title: "Company All Hands",
    description: "Monthly company-wide update from leadership.",
    start_time: offsetFromNow(96),
    duration: 60,
    invite_link: "https://zoom-clone.app/j/3489021667",
    is_instant: false,
  }),
];

export const mockRecentMeetings: Meeting[] = [
  buildMeeting({
    id: 201,
    meeting_id: "220 4471 9938",
    title: "Quick Bug Triage",
    description: "Ad-hoc call to debug the staging deploy issue.",
    start_time: offsetFromNow(-0.5),
    duration: 20,
    invite_link: "https://zoom-clone.app/j/2204471993",
    is_instant: true,
  }),
  buildMeeting({
    id: 202,
    meeting_id: "776 0932 4415",
    title: "Design Sync",
    description: "Weekly design critique.",
    start_time: offsetFromNow(-2),
    duration: 45,
    invite_link: "https://zoom-clone.app/j/7760932441",
    is_instant: true,
  }),
  buildMeeting({
    id: 203,
    meeting_id: "441 8823 7701",
    title: "Sprint Retro",
    description: "Retro for the previous two-week sprint.",
    start_time: offsetFromNow(-24),
    duration: 30,
    invite_link: "https://zoom-clone.app/j/4418823770",
    is_instant: false,
  }),
  buildMeeting({
    id: 204,
    meeting_id: "509 2214 8867",
    title: "Marketing Review",
    description: "Review of the Q2 campaign performance.",
    start_time: offsetFromNow(-72),
    duration: 60,
    invite_link: "https://zoom-clone.app/j/5092214886",
    is_instant: false,
  }),
];

const MOCK_FETCH_DELAY_MS = 600;

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function fetchMockUpcomingMeetings(): Promise<Meeting[]> {
  return delay(mockUpcomingMeetings, MOCK_FETCH_DELAY_MS);
}

export function fetchMockRecentMeetings(): Promise<Meeting[]> {
  return delay(mockRecentMeetings, MOCK_FETCH_DELAY_MS);
}
