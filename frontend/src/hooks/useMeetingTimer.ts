"use client";

import { useEffect, useState } from "react";

/** Counts whole seconds elapsed since this hook first mounted. Not persisted anywhere. */
export function useMeetingTimer(): number {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return elapsedSeconds;
}
