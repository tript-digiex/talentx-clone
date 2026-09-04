import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { getAuthToken } from "@/features/auth/utils/auth.utils";

let isRedirectingToLogin = false;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers["Auth-Token"] = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleInvalidSession();
    }

    return Promise.reject(error);
  },
);

const handleInvalidSession = () => {
  const currentPath = `${window.location.pathname}${window.location.search}`;

  useAuthStore.getState().clearSession();

  if (window.location.pathname === "/login" || isRedirectingToLogin) {
    return;
  }

  isRedirectingToLogin = true;
  window.location.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
};

export type ApiRequestConfig = InternalAxiosRequestConfig;

export type ApiError = {
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
};
