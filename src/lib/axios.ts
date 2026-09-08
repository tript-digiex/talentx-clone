import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { getAuthToken } from "@/features/auth/utils/auth.utils";

let isRedirectingToLogin = false;

export type ApiError = {
  code: string;
  message: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ApiListData<T> = {
  content: T[];
  total_elements: number;
  number_of_elements: number;
  page_size: number;
  page_number: number;
  total_pages: number;
};

export type ApiListResponse<T> = ApiResponse<ApiListData<T>>;

const DEFAULT_API_ERROR_MESSAGE = "Something went wrong. Please try again.";
const UNKNOWN_API_ERROR_CODE = "UNKNOWN_ERROR";

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Partial<ApiErrorResponse>;

  return (
    response.success === false && typeof response.error?.message === "string"
  );
};

const normalizeApiErrorResponse = (
  error: AxiosError<ApiResponse<unknown>>,
): AxiosResponse<ApiErrorResponse> => {
  const fallbackResponse: ApiErrorResponse = {
    success: false,
    error: {
      code: UNKNOWN_API_ERROR_CODE,
      message: error.message || DEFAULT_API_ERROR_MESSAGE,
    },
  };

  const responseData = isApiErrorResponse(error.response?.data)
    ? error.response.data
    : fallbackResponse;

  return {
    data: responseData,
    status: error.response?.status ?? 0,
    statusText: error.response?.statusText ?? "",
    headers: error.response?.headers ?? {},
    config: error.config ?? ({} as InternalAxiosRequestConfig),
    request: error.request,
  };
};

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
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleInvalidSession();
    }
    console.warn(error.response);

    return Promise.resolve(normalizeApiErrorResponse(error));
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
