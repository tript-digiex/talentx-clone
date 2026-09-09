import { MODAL_MODE } from "@/constants/modal.constants";

export enum USER_ROLES {
  ADMIN = "ADMIN",
  ADMIN_MEMBER = "ADMIN_MEMBER",
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
}

export const DEFAULT_USER_MANAGEMENT_PAGE_SIZE = 30;

export const USER_ROLE_OPTIONS = [
  {
    value: USER_ROLES.ADMIN,
    label: "Admin",
    description:
      "This role includes all access to all settings, including adding and removing users, modifying account settings.",
  },
  {
    value: USER_ROLES.ADMIN_MEMBER,
    label: "Member",
    description:
      "For team members who have all access except all settings including and removing admin users, modifying system settings.",
  },
];

export const DEFAULT_CREATE_USER_FORM_VALUES = {
  first_name: "",
  last_name: "",
  email: "",
  role: USER_ROLES.ADMIN,
  group_member_id: "",
  permissions: [],
};

export const USER_MODAL_MODE_CONFIG = {
  [MODAL_MODE.ADD]: {
    title: "Invite User",
    description: "Add or update user details and save changes.",
    submitButton: "Invite",
  },

  [MODAL_MODE.EDIT]: {
    title: "Edit User",
    description: "Update user details and permissions",
    submitButton: "Save",
  },
} as const;
