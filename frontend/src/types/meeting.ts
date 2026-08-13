import type { Participant } from "@/types/participant";

export interface Meeting {
  id: number;
  meeting_id: string;
  title: string;
  description: string | null;
  start_time: string;
  duration: number;
  invite_link: string;
  created_at: string;
  is_instant: boolean;
  participants: Participant[];
}

export interface CreateInstantMeetingRequest {
  title?: string;
  description?: string | null;
  duration?: number;
}

export interface CreateScheduledMeetingRequest {
  title: string;
  description?: string | null;
  start_time: string;
  duration: number;
}

export type CreateMeetingRequest = CreateInstantMeetingRequest | CreateScheduledMeetingRequest;

export interface JoinMeetingRequest {
  meeting_id: string;
  display_name: string;
}

export interface JoinMeetingResponse {
  meeting: Meeting;
  participant: Participant;
}
