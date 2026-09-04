import { navigationItems } from "./navigation.config";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";

export function SidebarNavigation() {
  return (
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
  );
}
