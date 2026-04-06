import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import type React from "react";
import type { AuthGuardProps } from "@/types/auth-guard-props";

const ShopConnectionGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { needsShopConnection, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) return children;

  if (needsShopConnection && location.pathname !== "/connect-shop") {
    console.log("[ShopConnectionGuard] Redirecting to /connect-shop");
    return <Navigate to="/connect-shop" state={{ from: location }} replace />;
  }

  return children;
};

export default ShopConnectionGuard;
