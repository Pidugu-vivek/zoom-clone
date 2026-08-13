"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseLocalMediaResult {
  stream: MediaStream | null;
  videoEnabled: boolean;
  audioEnabled: boolean;
  permissionGranted: boolean;
  error: string | null;
  toggleCamera: () => void;
  toggleMicrophone: () => void;
  stop: () => void;
}

function getMediaErrorMessage(err: unknown): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case "NotAllowedError":
      case "PermissionDeniedError":
        return "Camera and microphone access was denied. You can still join without video or audio.";
      case "NotFoundError":
      case "DevicesNotFoundError":
        return "No camera or microphone was found on this device.";
      case "NotReadableError":
      case "TrackStartError":
        return "Your camera or microphone is already in use by another application.";
      case "OverconstrainedError":
        return "No camera or microphone matches the requested settings.";
      default:
        return "Couldn't access your camera or microphone.";
    }
  }
  return "Couldn't access your camera or microphone.";
}

/**
 * Requests the local camera/microphone once on mount and holds the resulting
 * MediaStream for the caller to render (e.g. into a <video> tile). Toggling
 * camera/mic flips `track.enabled` on the already-acquired tracks instead of
 * re-requesting permission, matching how Zoom's own mute/video buttons work.
 */
export function useLocalMedia(): UseLocalMediaResult {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function requestMedia() {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        if (!cancelled) {
          setError("This browser doesn't support camera or microphone access.");
        }
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (cancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = mediaStream;
        setStream(mediaStream);
        setPermissionGranted(true);
        setVideoEnabled(true);
        setAudioEnabled(true);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setPermissionGranted(false);
          setError(getMediaErrorMessage(err));
        }
      }
    }

    requestMedia();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  const toggleCamera = useCallback(() => {
    setVideoEnabled((enabled) => {
      const next = !enabled;
      streamRef.current?.getVideoTracks().forEach((track) => {
        track.enabled = next;
      });
      return next;
    });
  }, []);

  const toggleMicrophone = useCallback(() => {
    setAudioEnabled((enabled) => {
      const next = !enabled;
      streamRef.current?.getAudioTracks().forEach((track) => {
        track.enabled = next;
      });
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
    setVideoEnabled(false);
    setAudioEnabled(false);
  }, []);

  return {
    stream,
    videoEnabled,
    audioEnabled,
    permissionGranted,
    error,
    toggleCamera,
    toggleMicrophone,
    stop,
  };
}
