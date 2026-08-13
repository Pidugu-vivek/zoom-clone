import { apiClient } from "@/lib/api/client";
import { API_ROUTES } from "@/config";
import type {
  CreateInstantMeetingRequest,
  CreateScheduledMeetingRequest,
  JoinMeetingRequest,
  JoinMeetingResponse,
  Meeting,
} from "@/types";

export interface ListMeetingsParams {
  skip?: number;
  limit?: number;
}

export const meetingService = {
  async listMeetings(params?: ListMeetingsParams): Promise<Meeting[]> {
    const response = await apiClient.get<Meeting[]>(API_ROUTES.meetings.list, { params });
    return response.data;
  },

  async getMeeting(meetingId: string): Promise<Meeting> {
    const response = await apiClient.get<Meeting>(API_ROUTES.meetings.detail(meetingId));
    return response.data;
  },

  async createInstantMeeting(payload: CreateInstantMeetingRequest = {}): Promise<Meeting> {
    const response = await apiClient.post<Meeting>(API_ROUTES.meetings.instant, payload);
    return response.data;
  },

  async scheduleMeeting(payload: CreateScheduledMeetingRequest): Promise<Meeting> {
    const response = await apiClient.post<Meeting>(API_ROUTES.meetings.schedule, payload);
    return response.data;
  },

  async joinMeeting(payload: JoinMeetingRequest): Promise<JoinMeetingResponse> {
    const response = await apiClient.post<JoinMeetingResponse>(API_ROUTES.meetings.join, payload);
    return response.data;
  },
};
