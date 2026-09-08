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

export const loginApi = async (input: LoginFormType) => {
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
  
  if (!response) {
    throw new Error("Login failed. Please try again.");
  }

  const data = response.data;

  if (!data.success) {
    throw new Error(data.error?.message ?? "Login failed. Please try again.");
  }

  if (!data.data) {
    throw new Error("Login failed. Please try again.");
  }

  return data.data;
};

export const getAuthInfoApi = async () => {
  const response = await apiClient.get<AuthInfoResponse>("/v1/auth/info");

  if (!response) {
    throw new Error("Could not get user info. Please try again.");
  }

  const data = response.data;

  if (!data.success) {
    throw new Error(
      data.error?.message ?? "Could not get user info. Please try again.",
    );
  }

  if (!data.data) {
    throw new Error("Could not get user info. Please try again.");
  }

  return data.data;
};

export const forgotPasswordApi = async (input: ForgotPasswordFormType) => {
  const payload: ForgotPasswordPayload = {
    ...BASE_AUTH_PAYLOAD,
    email: input.email,
  };

  const response = await apiClient.post<ForgotPasswordResponse>(
    "/v1/auth/reset-password",
    payload,
  );

  if (!response) {
    throw new Error("Could not reset password. Please try again.");
  }

  const data = response.data;

  if (!data.success) {
    throw new Error(
      data.error?.message ?? "Could not get user email. Please try again.",
    );
  }

  return data;
};
