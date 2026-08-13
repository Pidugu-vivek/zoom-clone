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

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourLabel = `${hours} hr${hours > 1 ? "s" : ""}`;

  return remainingMinutes === 0 ? hourLabel : `${hourLabel} ${remainingMinutes} min`;
}
