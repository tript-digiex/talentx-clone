import {
  ClientsPage,
  DashboardPage,
  EvaluationsPage,
  ForgotPasswordCompletedPage,
  ForgotPasswordPage,
  GroupManagementPage,
  HiringRequestsPage,
  PartnersPage,
  ResellersPage,
  SettingsPage,
  TalentsPage,
  UserManagementPage,
} from "@/routes/lazy-imports";

import type { AppRouteConfig } from "./types";
import { LoginPage } from "@/pages/public/LoginPage";

export const PUBLIC_ROUTES: AppRouteConfig[] = [
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/forgotPassword",
    element: ForgotPasswordPage,
  },
  {
    path: "/forgotPasswordCompleted",
    element: ForgotPasswordCompletedPage,
  },
];

export const SIDEBARRED_ROUTES: AppRouteConfig[] = [
  {
    path: "/dashboard",
    element: DashboardPage,
  },
  {
    path: "/talents",
    element: TalentsPage,
  },
  {
    path: "/clients",
    element: ClientsPage,
  },
  {
    path: "/hiring-requests",
    element: HiringRequestsPage,
  },
  {
    path: "/evaluations",
    element: EvaluationsPage,
  },
  {
    path: "/partners",
    element: PartnersPage,
  },
  {
    path: "/resellers",
    element: ResellersPage,
  },
  {
    path: "/teams",
    element: UserManagementPage,
  },
  {
    path: "/groups",
    element: GroupManagementPage,
  },
  {
    path: "/settings",
    element: SettingsPage,
  },
];
