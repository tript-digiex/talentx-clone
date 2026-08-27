import { lazy } from "react";

export const LoginPage = lazy(async () => {
  const module = await import("@/pages/LoginPage")
  return { default: module.LoginPage }
});

export const TalentsPage = lazy(async () => {
  const module = await import("@/pages/TalentsPage")
  return { default: module.TalentsPage }
});

export const ClientsPage = lazy(async () => {
  const module = await import("@/pages/ClientsPage")
  return { default: module.ClientsPage }
});

export const ResellersPage = lazy(async () => {
  const module = await import("@/pages/ReSellersPage")
  return { default: module.ResellersPage }
});

export const SettingsPage = lazy(async () => {
  const module = await import("@/pages/SettingsPage")
  return { default: module.SettingsPage }
});
