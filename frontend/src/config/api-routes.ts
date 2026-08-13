export const API_V1_PREFIX = "/api/v1";

export const API_ROUTES = {
  meetings: {
    list: `${API_V1_PREFIX}/meetings`,
    detail: (meetingId: string) => `${API_V1_PREFIX}/meetings/${meetingId}`,
    instant: `${API_V1_PREFIX}/meetings/instant`,
    schedule: `${API_V1_PREFIX}/meetings/schedule`,
    join: `${API_V1_PREFIX}/meetings/join`,
  },
  auth: {
    signup: `${API_V1_PREFIX}/auth/signup`,
    login: `${API_V1_PREFIX}/auth/login`,
    me: `${API_V1_PREFIX}/auth/me`,
  },
} as const;
