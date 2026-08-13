"use client";

import { useEffect, useState } from "react";

export interface UseAudioLevelOptions {
  /** The local MediaStream to analyze (e.g. from useLocalMedia). */
  stream: MediaStream | null;
  /** Whether the microphone is currently unmuted; level is forced to 0 otherwise. */
  enabled: boolean;
}

type AudioContextConstructor = typeof AudioContext;

function getAudioContextConstructor(): AudioContextConstructor | null {
  if (typeof window === "undefined") {
    return null;
  }
  const webkitWindow = window as typeof window & { webkitAudioContext?: AudioContextConstructor };
  return window.AudioContext ?? webkitWindow.webkitAudioContext ?? null;
}

/**
 * Analyzes the real local microphone input via the Web Audio API and returns
 * a normalized 0..1 level, updated every animation frame. Nothing here is
 * transmitted anywhere — it only reads levels for local UI feedback.
 */
export function useAudioLevel({ stream, enabled }: UseAudioLevelOptions): number {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!enabled || !stream) {
      setLevel(0);
      return;
    }

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      setLevel(0);
      return;
    }

    const AudioContextConstructor = getAudioContextConstructor();
    if (!AudioContextConstructor) {
      setLevel(0);
      return;
    }

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaStreamAudioSourceNode;

    try {
      audioContext = new AudioContextConstructor();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.6;
      source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));
      source.connect(analyser);
    } catch {
      setLevel(0);
      return;
    }

    let cancelled = false;
    let frameId = 0;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      if (cancelled) {
        return;
      }
      analyser.getByteTimeDomainData(data);

      let sumOfSquares = 0;
      for (let i = 0; i < data.length; i += 1) {
        const normalizedSample = (data[i]! - 128) / 128;
        sumOfSquares += normalizedSample * normalizedSample;
      }
      const rootMeanSquare = Math.sqrt(sumOfSquares / data.length);

      // Amplify a little so typical speech volume is clearly visible, and clamp to 0..1.
      setLevel(Math.min(1, rootMeanSquare * 4));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      source.disconnect();
      analyser.disconnect();
      void audioContext.close().catch(() => {});
      setLevel(0);
    };
  }, [stream, enabled]);

  return level;
}
