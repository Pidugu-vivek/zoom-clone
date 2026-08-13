"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatMeetingTime } from "@/lib/formatters";

export interface ChatMessage {
  id: string;
  author: string;
  text: string;
  sentAt: string;
}

export interface ChatPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorName: string;
}

/** Local-only, in-memory chat: nothing here is persisted or sent to the backend. */
export function ChatPanel({ open, onOpenChange, authorName }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) {
      return;
    }
    // Deferred a frame so this runs after the sheet's own enter/focus
    // handling settles, otherwise base-ui can steal focus back to itself.
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const handleSend = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, author: authorName, text, sentAt: new Date().toISOString() },
    ]);
    setDraft("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        modal={false}
        className="dark flex flex-col gap-0 data-[side=right]:top-14 data-[side=right]:bottom-44 data-[side=right]:h-auto data-[side=right]:w-full sm:data-[side=right]:bottom-24 sm:data-[side=right]:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle>In-call Chat</SheetTitle>
          <SheetDescription>Only visible to you during this session.</SheetDescription>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-2">
          {messages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No messages yet. Say hello!
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {messages.map((message) => (
                <li key={message.id} className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-foreground">{message.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatMeetingTime(message.sentAt)}
                    </span>
                  </div>
                  <p className="text-sm break-words text-foreground">{message.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-4">
          <Input
            ref={inputRef}
            placeholder="Type a message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Chat message"
          />
          <Button type="submit" size="icon" disabled={!draft.trim()} aria-label="Send message">
            <SendIcon className="size-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
