import type z from "zod";
import type { USER_ROLES } from "@/features/user-management/types/user.constants";
import type { ApiResponse } from "@/lib/axios";
import type { updateUserProfileSchema } from "../../schemas/profile.schemas";

export type UserProfilePayload = z.infer<typeof updateUserProfileSchema>;

export type UserProfileData = {
  id: string;
  user_code: string;
  first_name: string;
  last_name: string;
  email: string;
  role: USER_ROLES;
  experience_year: number;
  remote_experience_year: number;
  super_level: number;
  result_live: number;
  show_overall_rating: boolean;
  show_level: boolean;
  show_salary: boolean;
  user_skill: boolean;
  work_history: boolean;
  education: boolean;
  communication: boolean;
  general: boolean;
  submitted: boolean;
  hired: boolean;
  upload_cv: boolean;
  is_general: boolean;
  is_user_skill: boolean;
  is_work_history: boolean;
  is_education: boolean;
  is_communication: boolean;
  is_submitted: boolean;
  is_hired: boolean;
  is_show_level: boolean;
  is_show_salary: boolean;
  is_show_overall_rating: boolean;
  promote_interview: boolean;
};

export type UserProfileResponse = ApiResponse<UserProfileData>;
