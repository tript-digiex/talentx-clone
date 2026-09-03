import {
  BriefcaseBusiness,
  Handshake,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuthStore } from "@/stores/auth.store";
import { getDisplayUserAvatar } from "@/utils/user.utils";
import Button from "../ui/custom/Button";
import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/talents",
    label: "Talents",
    icon: Sparkles,
  },
  {
    href: "/clients",
    label: "Clients",
    icon: BriefcaseBusiness,
  },
  {
    href: "/resellers",
    label: "Resellers",
    icon: Handshake,
  },
];

export function AppLayout() {
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <div className="min-h-screen bg-[#EAECF0] text-[#071124]">
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

          <nav className="mt-8 flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-none">
            {navigationItems.map((item) => (
              <NavLink key={item.href} to={item.href}>
                {({ isActive }) => (
                  <Button
                    className={cn(
                      "w-full justify-start gap-4 px-3",
                      isActive && "text-white",
                    )}
                    variant="ghost"
                    size="lg"
                    leftIcon={<item.icon className="size-7 shrink-0" />}
                    active={isActive}
                  >
                    <span
                      className={cn(
                        "min-w-0 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>

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
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#d7dce5] bg-[#eef1f6] text-sm font-bold text-[#071124]">
                {getDisplayUserAvatar("Khoa Tran")}
              </div>
              <div className="min-w-0 flex-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="truncate text-base font-bold text-[#14213d]">
                  khoa tran
                </div>
                <div className="truncate text-lg font-medium text-[#304466]">
                  khoa.tran@yopmail.com
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

      <main className="min-h-screen pl-32 transition-[padding-left] duration-300 ease-out peer-hover:pl-101">
        <div className="min-h-screen px-4 py-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
