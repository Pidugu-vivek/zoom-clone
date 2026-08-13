import { create } from "zustand";

import type { Meeting } from "@/types";

interface MeetingState {
  meetings: Meeting[];
  activeMeeting: Meeting | null;
  isLoading: boolean;
  error: string | null;
}

interface MeetingActions {
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  setActiveMeeting: (meeting: Meeting | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: MeetingState = {
  meetings: [],
  activeMeeting: null,
  isLoading: false,
  error: null,
};

export const useMeetingStore = create<MeetingState & MeetingActions>((set) => ({
  ...initialState,
  setMeetings: (meetings) => set({ meetings }),
  addMeeting: (meeting) => set((state) => ({ meetings: [meeting, ...state.meetings] })),
  setActiveMeeting: (activeMeeting) => set({ activeMeeting }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
