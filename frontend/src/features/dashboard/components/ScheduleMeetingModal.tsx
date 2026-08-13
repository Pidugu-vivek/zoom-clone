"use client";

import { useState, type FormEvent } from "react";

import { Modal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { DEFAULT_MEETING_DURATION_MINUTES, MEETING_DURATION_OPTIONS_MINUTES } from "@/config";
import { useApi, useToast } from "@/hooks";
import { isApiError, meetingService } from "@/lib/api";
import { combineDateAndTimeToISOString } from "@/lib/meetings";
import { useMeetingStore } from "@/store";

export interface ScheduleMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormErrors {
  title?: string;
  date?: string;
  time?: string;
}

export function ScheduleMeetingModal({ open, onOpenChange }: ScheduleMeetingModalProps) {
  const toast = useToast();
  const addMeeting = useMeetingStore((state) => state.addMeeting);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(String(DEFAULT_MEETING_DURATION_MINUTES));
  const [errors, setErrors] = useState<FormErrors>({});

  const { execute: scheduleMeeting, isLoading } = useApi(meetingService.scheduleMeeting);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setDuration(String(DEFAULT_MEETING_DURATION_MINUTES));
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

  const handleSchedule = async () => {
    const nextErrors: FormErrors = {};
    if (!title.trim()) {
      nextErrors.title = "Enter a meeting title";
    }
    if (!date) {
      nextErrors.date = "Select a date";
    }
    if (!time) {
      nextErrors.time = "Select a time";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const meeting = await scheduleMeeting({
        title: title.trim(),
        description: description.trim() || null,
        start_time: combineDateAndTimeToISOString(date, time),
        duration: Number(duration),
      });
      addMeeting(meeting);
      toast.success("Meeting scheduled", `${meeting.title} · Meeting ID: ${meeting.meeting_id}`);
      resetForm();
      onOpenChange(false);
    } catch (err) {
      const message = isApiError(err) ? err.message : "Failed to schedule meeting. Please try again.";
      toast.error("Couldn't schedule meeting", message);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSchedule();
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Schedule a Meeting"
      description="Set up a meeting for later."
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
            onClick={handleSchedule}
            disabled={isLoading}
          >
            {isLoading && <Spinner className="size-4" />}
            Schedule
          </Button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="schedule-title" className="text-sm font-medium text-foreground">
            Meeting Title
          </label>
          <Input
            id="schedule-title"
            placeholder="e.g. Weekly Sync"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isLoading}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="schedule-description" className="text-sm font-medium text-foreground">
            Description <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="schedule-description"
            placeholder="What's this meeting about?"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="schedule-date" className="text-sm font-medium text-foreground">
              Date
            </label>
            <Input
              id="schedule-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              disabled={isLoading}
              aria-invalid={Boolean(errors.date)}
            />
            {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="schedule-time" className="text-sm font-medium text-foreground">
              Time
            </label>
            <Input
              id="schedule-time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={isLoading}
              aria-invalid={Boolean(errors.time)}
            />
            {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="schedule-duration" className="text-sm font-medium text-foreground">
            Duration
          </label>
          <Select
            value={duration}
            onValueChange={(value) => {
              if (value) {
                setDuration(value);
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger id="schedule-duration" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MEETING_DURATION_OPTIONS_MINUTES.map((minutes) => (
                <SelectItem key={minutes} value={String(minutes)}>
                  {minutes} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </Modal>
  );
}
