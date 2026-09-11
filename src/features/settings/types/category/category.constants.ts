import { MODAL_MODE } from "@/constants/modal.constants";

export enum CATEGORY_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const categoryKeys = {
    list: ["category"] as const,
} as const;

export const DEFAULT_CATEGORY_FORM_VALUES = {
  name: "",
};


export const CATEGORY_MODAL_MODE_CONFIG = {
  [MODAL_MODE.ADD]: {
    title: "Add Category",
    submitButton: "Add",
  },

  [MODAL_MODE.EDIT]: {
    title: "Edit Category",
    submitButton: "Save",
  },
} as const;
