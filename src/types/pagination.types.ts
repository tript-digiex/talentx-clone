import type { ApiListData } from "@/lib/axios";

export type PaginationType = Omit<ApiListData<null>, "content"> | null;
