"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ChatPanel } from "@/features/meeting-room/components/ChatPanel";
import { MeetingHeader } from "@/features/meeting-room/components/MeetingHeader";
import { MeetingInfoCard } from "@/features/meeting-room/components/MeetingInfoCard";
import { MeetingToolbar } from "@/features/meeting-room/components/MeetingToolbar";
import { ParticipantTile } from "@/features/meeting-room/components/ParticipantTile";
import { ParticipantsPanel } from "@/features/meeting-room/components/ParticipantsPanel";
import type { Meeting } from "@/types";

const LOCAL_PARTICIPANT_NAME = "You";

export interface MeetingRoomProps {
  meeting: Meeting;
}

export function MeetingRoom({ meeting }: MeetingRoomProps) {
  const router = useRouter();

  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [participantsPanelOpen, setParticipantsPanelOpen] = useState(false);
  const [chatPanelOpen, setChatPanelOpen] = useState(false);

  const handleLeave = () => {
    router.push("/");
  };

  const handleToggleParticipants = () => {
    setParticipantsPanelOpen((open) => !open);
    setChatPanelOpen(false);
  };

  const handleToggleChat = () => {
    setChatPanelOpen((open) => !open);
    setParticipantsPanelOpen(false);
  };

  return (
    <div className="dark flex h-dvh flex-col bg-background text-foreground">
      <MeetingHeader title={meeting.title} meetingId={meeting.meeting_id} onLeave={handleLeave} />

      <main className="flex flex-1 flex-col items-center gap-4 overflow-y-auto p-4 sm:gap-6 sm:p-6">
        <MeetingInfoCard meeting={meeting} className="w-full max-w-4xl" />

        <div className="flex w-full max-w-4xl flex-1 items-center justify-center">
          <ParticipantTile
            displayName={LOCAL_PARTICIPANT_NAME}
            cameraEnabled={cameraEnabled}
            microphoneEnabled={microphoneEnabled}
          />
        </div>
      </main>

      <MeetingToolbar
        microphoneEnabled={microphoneEnabled}
        cameraEnabled={cameraEnabled}
        participantsPanelOpen={participantsPanelOpen}
        chatPanelOpen={chatPanelOpen}
        participantCount={meeting.participants.length}
        onToggleMicrophone={() => setMicrophoneEnabled((enabled) => !enabled)}
        onToggleCamera={() => setCameraEnabled((enabled) => !enabled)}
        onToggleParticipants={handleToggleParticipants}
        onToggleChat={handleToggleChat}
        onLeave={handleLeave}
      />

      <ParticipantsPanel
        open={participantsPanelOpen}
        onOpenChange={setParticipantsPanelOpen}
        participants={meeting.participants}
      />
      <ChatPanel
        open={chatPanelOpen}
        onOpenChange={setChatPanelOpen}
        authorName={LOCAL_PARTICIPANT_NAME}
      />
    </div>
  );
}
