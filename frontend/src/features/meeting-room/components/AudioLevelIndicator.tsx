import { cn } from "@/lib/utils";

export interface AudioLevelIndicatorProps {
  /** Normalized 0..1 microphone level, from useAudioLevel. */
  level: number;
  className?: string;
}

const BAR_THRESHOLDS = [0.06, 0.22, 0.45, 0.7];

/** Small animated level bars that react to real local microphone input. */
export function AudioLevelIndicator({ level, className }: AudioLevelIndicatorProps) {
  return (
    <div
      className={cn("flex h-3 items-end justify-center gap-0.5", className)}
      role="presentation"
      aria-hidden="true"
    >
      {BAR_THRESHOLDS.map((threshold, index) => (
        <span
          key={threshold}
          className={cn(
            "w-0.5 rounded-full bg-emerald-400 transition-opacity duration-75",
            level >= threshold ? "opacity-100" : "opacity-25"
          )}
          style={{ height: `${4 + index * 2}px` }}
        />
      ))}
    </div>
  );
}
