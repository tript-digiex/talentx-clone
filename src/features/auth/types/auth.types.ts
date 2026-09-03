import type z from "zod";
import type { loginFormSchema } from "../schemas/auth.schema";
import type { USER_TYPE } from "./auth.constants";

export type LoginFormType = z.infer<typeof loginFormSchema>;

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

export type LoginResponse = {
  success: boolean;
  data?: {
    jwt_token: string;
    expiration_time: number;
  };
  error?: {
    code: string;
    message: string;
  };
};
