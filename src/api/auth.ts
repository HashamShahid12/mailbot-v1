import { handleResponse } from "./client";
import type { Shop } from "@/types/shop-types";

export interface LoginRequest {
  email: string;
  password: string;
  sessionId?: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  provider: string;
}

export interface LoginResponse {
  user: User;
  shop: Shop | null;
  needsShopConnection: boolean;
  accessToken: string;
  refreshToken?: string | null;
  sessionId?: string | null;
  emailVerificationRequired: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export async function signupRequest(payload: SignupRequest) {
  console.log("[AuthAPI] Signup request initiated for:", payload.email);
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("[AuthAPI] Signup response status:", res.status);
    return handleResponse<unknown>(res);
  } catch (error) {
    console.error("[AuthAPI] Signup request failed:", error);
    throw error;
  }
}

export async function verifyEmailRequest(token: string) {
  console.log(
    "[AuthAPI] Verify email request initiated with token:",
    token.substring(0, 10) + "...",
  );
  try {
    const res = await fetch(`/api/auth/verify-email?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[AuthAPI] Verify email response status:", res.status);
    return handleResponse<unknown>(res);
  } catch (error) {
    console.error("[AuthAPI] Verify email request failed:", error);
    throw error;
  }
}

export interface RefreshTokenResponse {
  user: User;
  shop: Shop | null;
  needsShopConnection: boolean;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export async function refreshTokenRequest(
  refreshToken: string,
  sessionId?: string | null,
) {
  console.log("[AuthAPI] Refresh token request initiated.");
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    console.log("[AuthAPI] Refresh token response status:", res.status);
    return handleResponse<RefreshTokenResponse>(res);
  } catch (error) {
    console.error("[AuthAPI] Refresh token request failed:", error);
    throw error;
  }
}

export async function loginRequest(payload: LoginRequest) {
  console.log("[AuthAPI] Login request initiated for:", payload.email);
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("[AuthAPI] Login response status:", res.status);
    return handleResponse<LoginResponse>(res);
  } catch (error) {
    console.error("[AuthAPI] Login request failed:", error);
    throw error;
  }
}

export async function resendVerificationRequest(email: string) {
  console.log("[AuthAPI] Resend verification request initiated for:", email);
  try {
    const res = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log("[AuthAPI] Resend verification response status:", res.status);
    return handleResponse<unknown>(res);
  } catch (error) {
    console.error("[AuthAPI] Resend verification request failed:", error);
    throw error;
  }
}

export async function logoutRequest(refreshToken: string) {
  console.log("[AuthAPI] Logout request initiated.");
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    console.log("[AuthAPI] Logout response status:", res.status);
    return handleResponse<unknown>(res);
  } catch (error) {
    console.error("[AuthAPI] Logout request failed:", error);
    throw error;
  }
}

export async function startGoogleOAuthLogin() {
  console.log("[AuthAPI] Starting Google OAuth login.");
  try {
    const res = await fetch("/api/auth/google", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[AuthAPI] Google OAuth login response status:", res.status);
    return handleResponse<unknown>(res);
  } catch (error) {
    console.error("[AuthAPI] Google OAuth login request failed:", error);
    throw error;
  }
}
