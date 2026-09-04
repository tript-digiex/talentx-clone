import md5 from "md5";
import type {
  AuthInfoResponse,
  LoginFormType,
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";
import { DEV_ADMIN_DOMAIN, USER_TYPE } from "../types/auth.constants";
import { apiClient } from "@/lib/axios";

export const loginApi = async (input: LoginFormType) => {
  const payload: LoginPayload = {
    domain: DEV_ADMIN_DOMAIN,
    email: input.email,
    password_hash: md5(input.password),
    keep_login: input.rememberMe ?? false,
    user_type: USER_TYPE.USER_SYSTEM,
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
