import {
  AUTH_EXPIRE_TIME_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
} from "../types/auth.constants";
import type { AuthSession } from "../types/auth.types";

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
};

export const getAuthExpireTime = () => {
  const expireTime = localStorage.getItem(AUTH_EXPIRE_TIME_STORAGE_KEY);

  if (!expireTime) {
    return null;
  }

  const parsedExpireTime = Number(expireTime);

  if (Number.isNaN(parsedExpireTime)) {
    return null;
  }

  return parsedExpireTime;
};

export const hasValidAuthSession = () => {
  const token = getAuthToken();
  const expireTime = getAuthExpireTime();

  return Boolean(token && expireTime && Date.now() < expireTime);
};

export const persistAuthSession = ({
  jwtToken,
  expirationTime,
}: AuthSession) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, jwtToken);
  localStorage.setItem(AUTH_EXPIRE_TIME_STORAGE_KEY, String(expirationTime));
};

export const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_EXPIRE_TIME_STORAGE_KEY);
};

export const getRedirectPath = (searchParams: URLSearchParams) => {
  return searchParams.get("redirect") || "/talents";
};
