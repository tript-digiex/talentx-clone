import type z from "zod";
import type { loginFormSchema } from "../schemas/auth.schema";
import type { USER_TYPE } from "./auth.constants";
import type { ApiResponse } from "@/lib/axios";

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type AuthUser = {
  id: string;
  email: string;
  role: string;
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

export type LoginPayload = {
  domain: string;
  email: string;
  keep_login: boolean;
  password_hash: string;
  user_type: USER_TYPE;
};

export type LoginResponse = ApiResponse<{
  jwt_token: string;
  expiration_time: number;
}>;

export type AuthInfoResponse = ApiResponse<AuthUser>;
