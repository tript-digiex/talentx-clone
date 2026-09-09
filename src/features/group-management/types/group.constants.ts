import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import type { CreateGroupPayload } from "./group.types";
import { MODAL_MODE } from "@/constants/modal.constants";

export enum GROUP_TYPES {
  ADMIN_MEMBER = "ADMIN_MEMBER",
}

export enum GROUP_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE = 30;

export const groupKeys = {
  all: ["group-management"] as const,
  list: (pageNumber: number = DEFAULT_PAGE_NUMBER, pageSize: number = DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE) =>
    [...groupKeys.all, "list", { pageNumber, pageSize }] as const,
  permissions: () => [...groupKeys.all, "permissions"] as const,
  detail: (groupId: string | null) => [...groupKeys.all, "detail", groupId] as const,
  groups: () => [...groupKeys.all, "groups"] as const,
};

export const DEFAULT_GROUP_FORM_VALUES: CreateGroupPayload = {
  name: "",
  description: "",
  permissions: [],
};

export const NAME_PERMISSION_LABELS: Record<string, string> = {
    evaluation: "Evaluations",
    skill_management: "Skill Management",
    partner: "Partners",
    talent: "Talents",
    reseller: "Resellers",
    client: "Clients",
    job: "Jobs",
    dashboard: "Dashboard",
}

export const PERMISSION_LABELS: Record<string, string> = {
  // Evaluation
  EVALUATION_CREATE: "Create Evaluation",
  EVALUATION_UPDATE: "Update Evaluation",
  EVALUATION_DELETE: "Delete Evaluation",
  EVALUATION_VIEW: "View Evaluation",

  // Skill Management
  SKILL_CREATE: "Create Skill",
  SKILL_UPDATE: "Update Skill",
  SKILL_DELETE: "Delete Skill",
  SKILL_VIEW: "View Skill",

  // Partner
  PARTNER_CREATE: "Create Partner",
  PARTNER_UPDATE: "Update Partner",
  PARTNER_DELETE: "Delete Partner",
  PARTNER_VIEW: "View Partner",

  // Talent
  TALENT_CREATE: "Create Talent",
  TALENT_UPDATE: "Update Talent",
  TALENT_DELETE: "Delete Talent",
  TALENT_VIEW: "View Talent",

  // Reseller
  RESELLER_CREATE: "Create Reseller",
  RESELLER_UPDATE: "Update Reseller",
  RESELLER_DELETE: "Delete Reseller",
  RESELLER_VIEW: "View Reseller",

  // Client
  CLIENT_CREATE: "Create Client",
  CLIENT_UPDATE: "Update Client",
  CLIENT_DELETE: "Delete Client",
  CLIENT_VIEW: "View Client",

  // Job
  JOB_CREATE: "Create Job",
  JOB_UPDATE: "Update Job",
  JOB_VIEW: "View Job",

  // Dashboard
  DASHBOARD_TALENT: "Talent Dashboard",
  DASHBOARD_EVALUATION: "Evaluation Dashboard",
  DASHBOARD_CLIENT: "Client Dashboard",
  DASHBOARD_JOB: "Job Dashboard",
};

export const GROUP_MODAL_MODE_CONFIG = {
  [MODAL_MODE.ADD]: {
    title: "Add Group",
    description:
      "Create a new user group and assign permissions for shared access.",
    submitButton: "Add",
  },

  [MODAL_MODE.EDIT]: {
    title: "Edit Group",
    description:
      "Modify group details and adjust permissions for shared access.",
    submitButton: "Save",
  },
} as const;