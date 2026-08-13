"use client";

import { useEffect, useState } from "react";

/** Returns the current time, re-rendering the caller every `intervalMs`. */
export function useCurrentTime(intervalMs = 10_000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
