import { DashboardNavbar } from "@/features/dashboard/components/DashboardNavbar";
import { HeroSection } from "@/features/dashboard/components/HeroSection";
import { RecentMeetingsSection } from "@/features/dashboard/components/RecentMeetingsSection";
import { UpcomingMeetingsSection } from "@/features/dashboard/components/UpcomingMeetingsSection";
import { Separator } from "@/components/ui/separator";

export function Dashboard() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/30">
      <DashboardNavbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HeroSection />
        <Separator />
        <UpcomingMeetingsSection />
        <RecentMeetingsSection />
      </main>
    </div>
  );
}
