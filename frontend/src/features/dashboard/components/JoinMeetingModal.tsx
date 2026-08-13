"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useApi, useToast } from "@/hooks";
import { isApiError, meetingService } from "@/lib/api";
import { extractMeetingId } from "@/lib/meetings";
import { useMeetingStore } from "@/store";

export interface JoinMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormErrors {
  meetingIdOrLink?: string;
  displayName?: string;
}

export function JoinMeetingModal({ open, onOpenChange }: JoinMeetingModalProps) {
  const router = useRouter();
  const toast = useToast();
  const setActiveMeeting = useMeetingStore((state) => state.setActiveMeeting);

  const [meetingIdOrLink, setMeetingIdOrLink] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { execute: joinMeeting, isLoading } = useApi(meetingService.joinMeeting);

  const resetForm = () => {
    setMeetingIdOrLink("");
    setDisplayName("");
    setErrors({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) {
      return;
    }
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleJoin = async () => {
    const nextErrors: FormErrors = {};
    if (!meetingIdOrLink.trim()) {
      nextErrors.meetingIdOrLink = "Enter a meeting ID or invite link";
    }
    if (!displayName.trim()) {
      nextErrors.displayName = "Enter your name";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const response = await joinMeeting({
        meeting_id: extractMeetingId(meetingIdOrLink),
        display_name: displayName.trim(),
      });
      setActiveMeeting(response.meeting);
      toast.success("Joined meeting", `Meeting ID: ${response.meeting.meeting_id}`);
      resetForm();
      onOpenChange(false);
      router.push(`/join/${response.meeting.meeting_id}`);
    } catch (err) {
      const message = isApiError(err) ? err.message : "Failed to join meeting. Please try again.";
      toast.error("Couldn't join meeting", message);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleJoin();
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Join a Meeting"
      description="Enter a meeting ID or paste an invite link to join."
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-2 bg-[#0b5cff] text-white hover:bg-[#0a52e6]"
            onClick={handleJoin}
            disabled={isLoading}
          >
            {isLoading && <Spinner className="size-4" />}
            Join
          </Button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-meeting-id" className="text-sm font-medium text-foreground">
            Meeting ID or Invite Link
          </label>
          <Input
            id="join-meeting-id"
            placeholder="e.g. abc-defg-hij or invite link"
            value={meetingIdOrLink}
            onChange={(event) => setMeetingIdOrLink(event.target.value)}
            disabled={isLoading}
            aria-invalid={Boolean(errors.meetingIdOrLink)}
          />
          {errors.meetingIdOrLink && (
            <p className="text-xs text-destructive">{errors.meetingIdOrLink}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-display-name" className="text-sm font-medium text-foreground">
            Display Name
          </label>
          <Input
            id="join-display-name"
            placeholder="Your name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            disabled={isLoading}
            aria-invalid={Boolean(errors.displayName)}
          />
          {errors.displayName && <p className="text-xs text-destructive">{errors.displayName}</p>}
        </div>
      </form>
    </Modal>
  );
}
