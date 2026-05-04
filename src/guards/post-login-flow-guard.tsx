import type { AuthGuardProps } from "@/types/auth-guard-props";
import { useAuthStore } from "@/store/auth-store";
import type React from "react";
import { Navigate, useLocation } from "react-router-dom";

const POST_LOGIN_SETUP_PATH = "/post-login-setup";

const PostLoginFlowGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isPostLoginFlowComplete } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) return children;

  if (
    !isPostLoginFlowComplete &&
    location.pathname !== POST_LOGIN_SETUP_PATH
  ) {
    return (
      <Navigate to={POST_LOGIN_SETUP_PATH} state={{ from: location }} replace />
    );
  }

  if (
    isPostLoginFlowComplete &&
    location.pathname === POST_LOGIN_SETUP_PATH
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PostLoginFlowGuard;
