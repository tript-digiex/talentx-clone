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
  list: (pageNumber: number, pageSize: number) =>
    [...groupKeys.all, "list", { pageNumber, pageSize }] as const,
};
