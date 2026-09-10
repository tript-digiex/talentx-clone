import FR from "@/assets/images/flag/FR.svg";
import GB from "@/assets/images/flag/GB.svg";
import JP from "@/assets/images/flag/JP.svg";
import KR from "@/assets/images/flag/KR.svg";
import SG from "@/assets/images/flag/SG.svg";
import US from "@/assets/images/flag/US.svg";
import VN from "@/assets/images/flag/VN.svg";
import type { CountryInfo } from "./holidays.types";
import { MODAL_MODE } from "@/constants/modal.constants";

export enum COUNTRY_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum HOLIDAY_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const holidayKeys = {
  all: ["holidays"] as const,
  countries: () => [...holidayKeys.all, "countries"] as const,
};

export const COUNTRY_FLAG_MAP: Record<string, CountryInfo> = {
  FR: {
    name: "France",
    img: FR,
  },
  GB: {
    name: "United Kingdom",
    img: GB,
  },
  JP: {
    name: "Japan",
    img: JP,
  },
  KR: {
    name: "South Korea",
    img: KR,
  },
  SG: {
    name: "Singapore",
    img: SG,
  },
  US: {
    name: "United States Of America (USA)",
    img: US,
  },
  VN: {
    name: "Viet Nam",
    img: VN,
  },
};

export const COUNTRY_MODAL_MODE_CONFIG = {
  [MODAL_MODE.ADD]: {
    title: "Add Country",
    submitButton: "Add",
  },

  [MODAL_MODE.EDIT]: {
    title: "Edit Country",
    submitButton: "Save",
  },
} as const;

export const DEFAULT_CREATE_HOLIDAY_FORM_VALUES = {
  country_code: "",
};
