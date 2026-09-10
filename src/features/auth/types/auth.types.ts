import type z from "zod";
import type {
  forgotPasswordFormSchema,
  loginFormSchema,
} from "../schemas/auth.schema";
import type { USER_TYPE } from "./auth.constants";
import type { ApiResponse } from "@/lib/axios";
import type { USER_ROLES } from "@/features/user-management/types/user.constants";

export type BaseAuthPayload = {
  domain: string;
  user_type: USER_TYPE;
};

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type AuthUser = {
  id: string;
  email: string;
  role: USER_ROLES;
  user_type: string;
  first_name: string;
  last_name: string;
  is_on_boarded: boolean;
  permissions: string[];
};

export type AuthSession = {
  jwtToken: string;
  expirationTime: number;
};

export type LoginPayload = BaseAuthPayload & {
  email: string;
  keep_login: boolean;
  password_hash: string;
};

export type LoginResponse = ApiResponse<{
  jwt_token: string;
  expiration_time: number;
}>;

export type AuthInfoResponse = ApiResponse<AuthUser>;

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export type ForgotPasswordPayload = BaseAuthPayload & {
  user_email: string;
};

export type ForgotPasswordResponse = ApiResponse<null>;
