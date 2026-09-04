import type { AuthUser } from "@/features/auth/types/auth.types";
import {
  clearAuthStorage,
  hasValidAuthSession,
  persistAuthSession,
} from "@/features/auth/utils/auth.utils";
import { queryClient } from "@/lib/query-client";
import { create } from "zustand";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (input: { jwtToken: string; expirationTime: number }) => void;
  setUser: (user: AuthUser) => void;
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
  setUser: (user) => {
    set({ user });
  },
  clearSession: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    queryClient.clear();
    clearAuthStorage();
  },
}));
