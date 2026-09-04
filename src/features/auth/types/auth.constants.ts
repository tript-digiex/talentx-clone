export const DEV_ADMIN_DOMAIN = "dev-admin.talentx.asia";

export enum USER_TYPE {
  USER_SYSTEM = "USER_SYSTEM",
}

export const AUTH_TOKEN_STORAGE_KEY = "talent-x-token";
export const AUTH_EXPIRE_TIME_STORAGE_KEY = "expire_time";

export const authKeys = {
  all: ["auth"] as const,
  info: () => [...authKeys.all, "info"] as const,
}