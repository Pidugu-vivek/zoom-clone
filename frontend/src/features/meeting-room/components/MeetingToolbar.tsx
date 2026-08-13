"use client";

import {
  MessageSquareIcon,
  MicIcon,
  MicOffIcon,
  MonitorUpIcon,
  MoreHorizontalIcon,
  PhoneOffIcon,
  UsersIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { MeetingControlButton } from "@/features/meeting-room/components/MeetingControlButton";
import { useToast } from "@/hooks";

export interface MeetingToolbarProps {
  microphoneEnabled: boolean;
  cameraEnabled: boolean;
  participantsPanelOpen: boolean;
  chatPanelOpen: boolean;
  participantCount: number;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onToggleParticipants: () => void;
  onToggleChat: () => void;
  onLeave: () => void;
}

export function MeetingToolbar({
  microphoneEnabled,
  cameraEnabled,
  participantsPanelOpen,
  chatPanelOpen,
  participantCount,
  onToggleMicrophone,
  onToggleCamera,
  onToggleParticipants,
  onToggleChat,
  onLeave,
}: MeetingToolbarProps) {
  const toast = useToast();

  return (
    <footer className="relative z-[60] flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-border bg-background px-3 py-3 sm:gap-3">
      <TooltipProvider delay={300}>
        <MeetingControlButton
          icon={microphoneEnabled ? MicIcon : MicOffIcon}
          label={microphoneEnabled ? "Mute" : "Unmute"}
          active={microphoneEnabled}
          onClick={onToggleMicrophone}
        />
        <MeetingControlButton
          icon={cameraEnabled ? VideoIcon : VideoOffIcon}
          label={cameraEnabled ? "Stop Video" : "Start Video"}
          active={cameraEnabled}
          onClick={onToggleCamera}
        />
        <MeetingControlButton
          icon={UsersIcon}
          label="Participants"
          active={participantsPanelOpen}
          badgeCount={participantCount}
          onClick={onToggleParticipants}
        />
        <MeetingControlButton
          icon={MessageSquareIcon}
          label="Chat"
          active={chatPanelOpen}
          onClick={onToggleChat}
        />
        <MeetingControlButton
          icon={MonitorUpIcon}
          label="Share Screen"
          onClick={() => toast.info("Screen sharing is coming soon")}
        />
        <MeetingControlButton
          icon={MoreHorizontalIcon}
          label="More"
          onClick={() => toast.info("More options are coming soon")}
        />
        <MeetingControlButton icon={PhoneOffIcon} label="Leave" destructive onClick={onLeave} />
      </TooltipProvider>
    </footer>
  );
}
