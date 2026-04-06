import type { AuthState } from "@/types/auth-store-props";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShopStore } from "@/store/shop-store";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      accessToken: null,
      refreshToken: null,
      sessionId: null,
      user: null,
      needsShopConnection: true,
      isSessionExpired: false,

      login: ({
        accessToken,
        refreshToken,
        sessionId,
        user,
        needsShopConnection,
      }) => {
        console.log("[AuthStore] Login called. Updating state.", {
          userId: user?.id,
          email: user?.email,
          sessionId,
        });
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken: refreshToken ?? null,
          sessionId: sessionId ?? null,
          user,
          needsShopConnection,
          isSessionExpired: false,
        });
      },

      logout: () => {
        console.log("[AuthStore] Logout called. Clearing state.");
        // Clear shop store as well
        useShopStore.getState().clearShop();

        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          sessionId: null,
          user: null,
          needsShopConnection: true,
          isSessionExpired: false,
        });
      },
      setNeedsShopConnection: (value) => {
        console.log("[AuthStore] setNeedsShopConnection called.", { value });
        set({
          needsShopConnection: value,
        });
      },
      setSessionExpired: (value) => {
        set({ isSessionExpired: value });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        sessionId: state.sessionId,
        user: state.user,
        needsShopConnection: state.needsShopConnection,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isLoading = false;
      },
    },
  ),
);
