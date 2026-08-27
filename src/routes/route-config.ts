import {
  ClientsPage,
  LoginPage,
  ResellersPage,
  SettingsPage,
  TalentsPage,
} from "@/routes/lazy-imports";

import type { AppRouteConfig } from "./types";

export const PUBLIC_ROUTES: AppRouteConfig[] = [
  {
    path: "/login",
    element: LoginPage,
  },
];

export const SIDEBARRED_ROUTES: AppRouteConfig[] = [
  {
    path: "/talents",
    element: TalentsPage,
  },
  {
    path: "/clients",
    element: ClientsPage,
  },
  {
    path: "/resellers",
    element: ResellersPage,
  },
  {
    path: "/settings",
    element: SettingsPage,
  },
];
