import { SearchIcon, SettingsIcon, VideoIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-[#0b5cff] text-white">
            <VideoIcon className="size-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">zoom</span>
        </div>

        <div className="hidden flex-1 justify-center px-4 sm:flex">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meetings"
              aria-label="Search meetings"
              className="pl-8"
              disabled
            />
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0">
          <Button variant="ghost" size="icon" aria-label="Settings">
            <SettingsIcon className="size-4.5" />
          </Button>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
