"use client";

import { useEffect, useRef } from "react";
import { MicOffIcon, VideoOffIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/participants";
import { cn } from "@/lib/utils";

export interface ParticipantTileProps {
  displayName: string;
  cameraEnabled: boolean;
  microphoneEnabled: boolean;
  stream?: MediaStream | null;
  className?: string;
}

/**
 * The large video tile. When a local (or, in a future commit, remote) stream
 * is available and the camera is enabled, a live <video> fills this same box;
 * otherwise the avatar placeholder below renders instead. The outer box's
 * size/position never changes between the two, so swapping in a real remote
 * stream later won't require any layout changes.
 */
export function ParticipantTile({
  displayName,
  cameraEnabled,
  microphoneEnabled,
  stream = null,
  className,
}: ParticipantTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = Boolean(stream) && cameraEnabled;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.srcObject = showVideo ? stream : null;
  }, [stream, showVideo]);

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-border",
        className
      )}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full scale-x-[-1] object-cover"
        />
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
