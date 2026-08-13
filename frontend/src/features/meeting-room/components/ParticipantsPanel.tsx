"use client";

import { UsersIcon } from "lucide-react";

import { EmptyState } from "@/components/shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatMeetingTime } from "@/lib/formatters";
import { getInitials } from "@/lib/participants";
import type { Participant } from "@/types";

export interface ParticipantsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: Participant[];
}

export function ParticipantsPanel({ open, onOpenChange, participants }: ParticipantsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        modal={false}
        className="dark flex flex-col data-[side=right]:top-14 data-[side=right]:bottom-44 data-[side=right]:h-auto data-[side=right]:w-full sm:data-[side=right]:bottom-24 sm:data-[side=right]:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle>Participants ({participants.length})</SheetTitle>
          <SheetDescription>Everyone currently in this meeting.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {participants.length === 0 ? (
            <EmptyState
              icon={<UsersIcon className="size-4" />}
              title="No participants yet"
              description="Once someone joins this meeting, they'll show up here."
            />
          ) : (
            <ul className="flex flex-col gap-0.5">
              {participants.map((participant) => (
                <li
                  key={participant.id}
                  className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-muted"
                >
                  <Avatar className="size-9 shrink-0 ring-1 ring-border">
                    <AvatarFallback className="text-sm">
                      {getInitials(participant.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-foreground">
                      {participant.display_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Joined at {formatMeetingTime(participant.joined_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
