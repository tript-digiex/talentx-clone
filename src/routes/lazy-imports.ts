import { lazy } from "react";

export const LoginPage = lazy(async () => {
  const module = await import("@/pages/public/LoginPage");
  return { default: module.LoginPage };
});

export const ForgotPasswordPage = lazy(async () => {
  const module = await import("@/pages/public/ForgotPasswordPage");
  return { default: module.ForgotPasswordPage };
});

export const ForgotPasswordCompletedPage = lazy(async () => {
  const module = await import("@/pages/public/ForgotPasswordCompletedPage");
  return { default: module.ForgotPasswordCompletedPage };
});

export const DashboardPage = lazy(async () => {
  const module = await import("@/pages/protected/DashboardPage");
  return { default: module.DashboardPage };
});

export const TalentsPage = lazy(async () => {
  const module = await import("@/pages/protected/TalentsPage");
  return { default: module.TalentsPage };
});

export const ClientsPage = lazy(async () => {
  const module = await import("@/pages/protected/ClientsPage");
  return { default: module.ClientsPage };
});

export const HiringRequestsPage = lazy(async () => {
  const module = await import("@/pages/protected/HiringRequestsPage");
  return { default: module.HiringRequestsPage };
});

export const EvaluationsPage = lazy(async () => {
  const module = await import("@/pages/protected/EvaluationsPage");
  return { default: module.EvaluationsPage };
});

export const PartnersPage = lazy(async () => {
  const module = await import("@/pages/protected/PartnersPage");
  return { default: module.PartnersPage };
});

export const ResellersPage = lazy(async () => {
  const module = await import("@/pages/protected/ResellersPage");
  return { default: module.ResellersPage };
});

export const UserManagementPage = lazy(async () => {
  const module = await import("@/pages/protected/UserManagementPage");
  return { default: module.UserManagementPage };
});

export const GroupManagementPage = lazy(async () => {
  const module = await import("@/pages/protected/GroupManagementPage");
  return { default: module.GroupManagementPage };
});

export const SettingsPage = lazy(async () => {
  const module = await import("@/pages/protected/SettingsPage");
  return { default: module.SettingsPage };
});
