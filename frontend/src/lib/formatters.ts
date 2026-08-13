import { parseUtcTimestamp } from "@/lib/datetime";

export function formatMeetingDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(parseUtcTimestamp(iso));
}

export function formatMeetingTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parseUtcTimestamp(iso));
}

/** Formats a whole-second count as an elapsed-time clock: "00:00", "01:25", or "01:02:30". */
export function formatElapsedTime(totalSeconds: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourLabel = `${hours} hr${hours > 1 ? "s" : ""}`;

  return remainingMinutes === 0 ? hourLabel : `${hourLabel} ${remainingMinutes} min`;
}
