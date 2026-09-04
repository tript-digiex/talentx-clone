import { BriefcaseBusiness, ChartColumnIncreasing, FileCheckCorner, HandCoins, Handshake, Sparkles, UserCog, UserRoundSearch, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type NavigationItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: ChartColumnIncreasing,
  },
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
    href: "/hiring-requests",
    label: "Hiring Requests",
    icon: UserRoundSearch,
  },
  {
    href: "/evaluations",
    label: "Evaluations",
    icon: FileCheckCorner,
  },
  {
    href: "/partners",
    label: "Partners",
    icon: Handshake,
  },
  {
    href: "/resellers",
    label: "Resellers",
    icon: HandCoins,
  },
  {
    href: "/teams",
    label: "User Management",
    icon: UserCog,
  },
  {
    href: "/groups",
    label: "Group Management",
    icon: Users,
  },
];