import { useAuthStore } from "@/store/auth-store";
import { useShopStore } from "@/store/shop-store";
import { refreshTokenRequest } from "./auth";

export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  code?: string;
}

export async function handleResponse<T>(
  res: Response,
): Promise<ApiEnvelope<T>> {
  const json = (await res.json()) as ApiEnvelope<T>;
  if (!json.success) {
    console.error("[API Client] Request failed with envelope:", json);
    throw json;
  }
  console.log("[API Client] Request succeeded with envelope:", {
    statusCode: json.statusCode,
    message: json.message,
  });
  return json;
}

function buildAuthHeaders(existing?: HeadersInit): HeadersInit {
  const token = useAuthStore.getState().accessToken;
  const shop = useShopStore.getState().shop;

  const base: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (existing) {
    for (const [key, value] of Object.entries(
      existing as Record<string, string>,
    )) {
      base[key] = value;
    }
  }

  if (token) {
    base.Authorization = `Bearer ${token}`;
  } else {
    console.warn(
      "[API Client] No access token available for authorized request.",
    );
  }

  if (shop?.id) {
    base["shop-id"] = shop.id;
  } else {
    console.warn(
      "[API Client] No shop context available for authorized request.",
    );
  }

  return base;
}

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

export async function refreshSession() {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    const { refreshToken, sessionId, login, logout } = useAuthStore.getState();
    if (!refreshToken) throw new Error("No refresh token");

    const refreshRes = await refreshTokenRequest(refreshToken, sessionId);
    if (refreshRes.success) {
      console.log("[API Client] Token refresh successful.");
      const {
        accessToken,
        refreshToken: newRefreshToken,
        sessionId,
        user: newUser,
        needsShopConnection: newNeedsShopConnection,
        shop,
      } = refreshRes.data;

      // Update shop store if shop data is present
      if (shop) {
        useShopStore.getState().setShop(shop);
      }

      // Update store with new tokens
      login({
        accessToken,
        refreshToken: newRefreshToken,
        sessionId,
        user: newUser,
        needsShopConnection: newNeedsShopConnection,
      });

      // Reset expired flag
      useAuthStore.getState().setSessionExpired(false);

      onRefreshed(accessToken);
    } else {
      console.error("[API Client] Token refresh failed:", refreshRes);
      logout();
      useShopStore.getState().clearShop();
    }
  } catch (error) {
    console.error("[API Client] Token refresh exception:", error);
    logout();
    useShopStore.getState().clearShop();
  } finally {
    isRefreshing = false;
  }
}

export async function authorizedRequest<T>(
  input: string,
  init?: RequestInit,
): Promise<ApiEnvelope<T>> {
  console.log("[API Client] Authorized request initiated.", { url: input });
  let res = await fetch(input, {
    ...init,
    headers: buildAuthHeaders(init?.headers),
  });
  console.log("[API Client] Authorized request response status:", res.status);

  if (res.status === 401) {
    console.warn(
      "[API Client] 401 Unauthorized received. Attempting to refresh token...",
    );
    const { refreshToken, logout, user } = useAuthStore.getState();

    if (!refreshToken || !user) {
      console.error(
        "[API Client] No refresh token or user profile available. Logging out.",
      );
      logout();
      // Ensure shop store is cleared
      useShopStore.getState().clearShop();
      return handleResponse<T>(res);
    }

    if (!isRefreshing) {
      refreshSession();
    }

    // Wait for refresh to complete
    return new Promise((resolve, reject) => {
      addRefreshSubscriber(async (token) => {
        // Retry original request with new token
        console.log("[API Client] Retrying original request with new token.");
        try {
          // Re-build headers with new token
          const headers = buildAuthHeaders(init?.headers);
          // Override authorization header explicitly to ensure latest token is used
          (headers as Record<string, string>).Authorization = `Bearer ${token}`;

          const retryRes = await fetch(input, {
            ...init,
            headers,
          });
          resolve(handleResponse<T>(retryRes));
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  return handleResponse<T>(res);
}
