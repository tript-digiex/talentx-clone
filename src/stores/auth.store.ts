import {
  clearAuthStorage,
  hasValidAuthSession,
  persistAuthSession,
} from "@/features/auth/utils/auth.utils";
import { create } from "zustand";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  userType: string;
  firstName: string;
  lastName: string;
  isOnBoarded: boolean;
  permissions: string[];
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (input: { jwtToken: string; expirationTime: number }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: hasValidAuthSession(),
  setSession: ({ jwtToken, expirationTime }) => {
    persistAuthSession({ jwtToken, expirationTime });

    set({
      isAuthenticated: true,
    });
  },
  clearSession: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    clearAuthStorage();
  },
}));
