import { LogOut, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo";
import { SidebarNavigation } from "./SidebarNavigation";
import Button from "@/components/ui/custom/Button";
import { AvatarDisplayFallback } from "@/components/common/AvatarDisplayFallback";

export function AppSidebar() {
  const clearSession = useAuthStore((state) => state.clearSession);
  const { user, displayName } = useAuthInfo();

  return (
    <aside className="peer group fixed inset-y-0 left-0 z-20 w-32 p-3">
      <div className="flex h-full w-25 flex-col overflow-hidden rounded-4xl bg-white px-6 py-9 transition-[width] duration-300 ease-out group-hover:w-94">
        <div className="flex shrink-0 items-center gap-4">
          <img
            src="/public/favicon-96x96.png"
            alt="logo"
            className="rounded-full h-10 w-10"
          />
          <span className="min-w-0 whitespace-nowrap text-lg font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            TalentX
          </span>
        </div>

        <SidebarNavigation />

        <div className="flex flex-col gap-6">
          <NavLink to="/settings">
            {({ isActive }) => (
              <Button
                className={cn(
                  "w-full justify-start gap-4 px-3",
                  isActive && "text-white",
                )}
                variant="ghost"
                size="lg"
                leftIcon={<Settings className="size-7 shrink-0" />}
                active={isActive}
              >
                <span className="min-w-0 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Settings
                </span>
              </Button>
            )}
          </NavLink>

          <div className="h-px w-full bg-[#EAECF0]" />

          <div className="flex h-12 items-center gap-4">
            <AvatarDisplayFallback fullName={displayName} />
            <div className="min-w-0 flex-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="truncate text-base font-medium text-[#14213d]">
                {displayName}
              </div>
              <div className="truncate text-base font-medium text-[#304466]">
                {user?.email}
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={clearSession}
            >
              <LogOut className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
