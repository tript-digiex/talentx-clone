import { lazy } from "react";

export const LoginPage = lazy(async () => {
  const module = await import("@/pages/LoginPage");
  return { default: module.LoginPage };
});

export const DashboardPage = lazy(async () => {
  const module = await import("@/pages/DashboardPage");
  return { default: module.DashboardPage };
});

export const TalentsPage = lazy(async () => {
  const module = await import("@/pages/TalentsPage");
  return { default: module.TalentsPage };
});

export const ClientsPage = lazy(async () => {
  const module = await import("@/pages/ClientsPage");
  return { default: module.ClientsPage };
});

export const HiringRequestsPage = lazy(async () => {
  const module = await import("@/pages/HiringRequestsPage");
  return { default: module.HiringRequestsPage };
});

export const EvaluationsPage = lazy(async () => {
  const module = await import("@/pages/EvaluationsPage");
  return { default: module.EvaluationsPage };
});

export const PartnersPage = lazy(async () => {
  const module = await import("@/pages/PartnersPage");
  return { default: module.PartnersPage };
});

export const ResellersPage = lazy(async () => {
  const module = await import("@/pages/ResellersPage");
  return { default: module.ResellersPage };
});

export const UserManagementPage = lazy(async () => {
  const module = await import("@/pages/UserManagementPage");
  return { default: module.UserManagementPage };
});

export const GroupManagementPage = lazy(async () => {
  const module = await import("@/pages/GroupManagementPage");
  return { default: module.GroupManagementPage };
});

export const SettingsPage = lazy(async () => {
  const module = await import("@/pages/SettingsPage");
  return { default: module.SettingsPage };
});
