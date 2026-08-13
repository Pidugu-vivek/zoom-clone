"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogInIcon, LogOutIcon, SearchIcon, SettingsIcon, VideoIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks";
import { getInitials } from "@/lib/participants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

export function DashboardNavbar() {
  const router = useRouter();
  const toast = useToast();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    toast.success("Signed out");
    router.push("/");
  };

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
          {user ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Settings">
                <SettingsIcon className="size-4.5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" aria-label="Account menu" />}
                >
                  <Avatar>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex flex-col gap-0.5">
                      <span className="truncate text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOutIcon className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
              >
                <LogInIcon className="size-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Button variant="ghost" size="icon" aria-label="Settings">
                <SettingsIcon className="size-4.5" />
              </Button>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
