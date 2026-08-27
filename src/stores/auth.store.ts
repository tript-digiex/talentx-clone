import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  login: (input: { email: string; name?: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ email, name }) =>
        set({
          user: {
            id: "mock-user",
            email,
            role: "admin",
            userType: "admin",
            firstName: name?.trim() || email.split("@")[0] || "Admin",
            lastName: "",
            isOnBoarded: true,
            permissions: [],
          },
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "talentx-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
