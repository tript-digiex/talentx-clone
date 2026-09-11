import type { ApiResponse } from "@/lib/axios";
import type { CATEGORY_STATUS, SKILL_STATUS } from "./category.constants";
import type z from "zod";
import type { categorySchema } from "../../schemas/cateogry.schemas";

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

export type CategoryPayload = z.infer<typeof categorySchema>;

export type CreateCategoryResponse = ApiResponse<
  Omit<CategoryData, "updated_date">
>;

export type UpdateCategoryResponse = ApiResponse<CategoryData>;

export type DeleteCategoryResponse = ApiResponse<string>;

export type SkillData = {
  id: string;
  name: string;
  icon: string;
  category_id: string;
  sequence: number;
  status: SKILL_STATUS;
  display: boolean;
  is_display: boolean;
  created_date: string;
  updated_date: string;
};

export type ListSkillResponse = ApiResponse<SkillData[]>;
