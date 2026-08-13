"use client";

import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface MeetingControlButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  destructive?: boolean;
  badgeCount?: number;
  disabled?: boolean;
  onClick?: () => void;
}

/** A single Zoom-style toolbar action: icon over label, with an active/badge state. */
export function MeetingControlButton({
  icon: Icon,
  label,
  active = false,
  destructive = false,
  badgeCount,
  disabled = false,
  onClick,
}: MeetingControlButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            onClick={onClick}
            disabled={disabled}
            aria-pressed={active}
            aria-label={label}
            className={cn(
              "h-auto w-16 flex-col gap-1 rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground transition-all duration-150 hover:scale-105 hover:bg-accent hover:text-accent-foreground active:scale-95 sm:w-20",
              active && "bg-accent text-accent-foreground",
              destructive && "bg-destructive text-white hover:bg-destructive/90"
            )}
          />
        }
      >
        <span className="relative flex size-5 items-center justify-center">
          <Icon className="size-5" />
          {typeof badgeCount === "number" && badgeCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0b5cff] px-1 text-[10px] font-semibold text-white">
              {badgeCount}
            </span>
          )}
        </span>
        <span className="truncate">{label}</span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
