import { MicOffIcon, VideoIcon, VideoOffIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/participants";
import { cn } from "@/lib/utils";

export interface ParticipantTileProps {
  displayName: string;
  cameraEnabled: boolean;
  microphoneEnabled: boolean;
  className?: string;
}

/**
 * The large video tile. There is no real media stream in this commit — a live
 * <video> element bound to a camera MediaStream can be dropped into the branch
 * below in a future commit without touching this tile's size/position, since
 * every state (camera on/off, no stream) already renders inside this same box.
 */
export function ParticipantTile({
  displayName,
  cameraEnabled,
  microphoneEnabled,
  className,
}: ParticipantTileProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-border",
        className
      )}
    >
      {cameraEnabled ? (
        <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
          <VideoIcon className="size-10" />
          <p className="text-sm">Camera preview isn&apos;t available yet</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar className="size-28 ring-4 ring-white/5 sm:size-32">
            <AvatarFallback className="text-3xl font-medium">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <p className="text-base font-medium text-foreground">{displayName}</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <VideoOffIcon className="size-3.5" />
            <span>Camera is turned off</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {!microphoneEnabled && <MicOffIcon className="size-3.5 text-destructive" />}
        <span>{displayName}</span>
      </div>
    </div>
  );
}
