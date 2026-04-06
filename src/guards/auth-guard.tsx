import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { useShopStore } from "@/store/shop-store";
import { useEffect, useState } from "react";
import type React from "react";
import type { AuthGuardProps } from "@/types/auth-guard-props";
import { refreshTokenRequest } from "@/api/auth";
import { getShop } from "@/api/shop";
import AppLoader from "@/components/ui/loadings/app-loader";

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    refreshToken,
    user,
    login,
    logout,
    needsShopConnection,
    sessionId,
  } = useAuthStore();
  const { setShop, clearShop, isLoading: isShopLoading } = useShopStore();
  const location = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Periodic shop fetch
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getShop();
        if (res?.data) {
          setShop(res.data);
        } else {
          clearShop();
        }
      } catch (error) {
        console.error("[AuthGuard] Failed to fetch shop:", error);
        clearShop();
      }
    };

    if (isAuthenticated && !needsShopConnection) {
      // Fetch immediately on mount/update if authenticated
      fetchShop();
    }
  }, [isAuthenticated, needsShopConnection, setShop]);

  useEffect(() => {
    // If not authenticated but we have a refresh token and user profile,
    // attempt to restore the session by refreshing the token.
    if (!isLoading && !isAuthenticated && refreshToken && user) {
      console.log(
        "[AuthGuard] Token present but not authenticated. Attempting refresh...",
      );
      setIsRefreshing(true);
      refreshTokenRequest(refreshToken, sessionId)
        .then((res) => {
          if (res.success) {
            console.log("[AuthGuard] Session restored via refresh token.");

            if (res.data.shop) {
              setShop(res.data.shop);
            }

            login({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              sessionId: res.data.sessionId,
              user: res.data.user,
              needsShopConnection: res.data.needsShopConnection,
            });
          } else {
            console.warn("[AuthGuard] Refresh failed. Redirecting to login.");
            logout();
            clearShop();
          }
        })
        .catch((err) => {
          console.error("[AuthGuard] Refresh error:", err);
          logout();
          clearShop();
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, [
    isLoading,
    isAuthenticated,
    refreshToken,
    user,
    login,
    logout,
    needsShopConnection,
    sessionId,
    setShop,
    clearShop,
  ]);

  if (isLoading || isRefreshing) return <AppLoader />;

  if (isAuthenticated && !needsShopConnection && isShopLoading) {
    return <AppLoader />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
