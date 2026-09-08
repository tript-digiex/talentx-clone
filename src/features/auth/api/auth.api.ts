import md5 from "md5";
import type {
  AuthInfoResponse,
  ForgotPasswordFormType,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginFormType,
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";
import { BASE_AUTH_PAYLOAD } from "../types/auth.constants";
import { apiClient } from "@/lib/axios";

export const loginApi = async (
  input: LoginFormType,
): Promise<LoginResponse> => {
  const payload: LoginPayload = {
    ...BASE_AUTH_PAYLOAD,
    email: input.email,
    password_hash: md5(input.password),
    keep_login: input.rememberMe ?? false,
  };

  const response = await apiClient.post<LoginResponse>(
    "/v1/auth/login",
    payload,
  );

  return response.data;
};

export const getAuthInfoApi = async (): Promise<AuthInfoResponse> => {
  const response = await apiClient.get<AuthInfoResponse>("/v1/auth/info");

  return response.data;
};

export const forgotPasswordApi = async (
  input: ForgotPasswordFormType,
): Promise<ForgotPasswordResponse> => {
  const payload: ForgotPasswordPayload = {
    ...BASE_AUTH_PAYLOAD,
    user_email: input.user_email,
  };

  const response = await apiClient.post<ForgotPasswordResponse>(
    "/v1/auth/reset-password",
    payload,
  );

  return response.data;
};
