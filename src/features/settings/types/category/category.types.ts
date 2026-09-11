import type { ApiResponse } from "@/lib/axios";
import type { CATEGORY_STATUS } from "./category.constants";

export type CategoryData = {
  id: string;
  name: string;
  status: CATEGORY_STATUS;
  custom: boolean;
  is_custom: boolean;
  created_date: string;
  updated_date: string;
};

export type ListCategoryResponse = ApiResponse<CategoryData[]>;
