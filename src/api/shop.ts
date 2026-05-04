import { useAuthStore } from "@/store/auth-store";
import { authorizedRequest } from "./client";
import type { Shop, WarmupData } from "@/types/shop-types";

export interface ClaimShopRequest {
  shop_name: string;
  platform: "SHOPIFY";
}

export interface ConnectManualShopRequest {
  shop_name: string;
  store_display_name: string;
  platform: "OTHER";
}

export async function claimShop(payload: ClaimShopRequest) {
  console.log("[ShopAPI] Claim shop request initiated.", payload);
  try {
    return authorizedRequest<unknown>("/api/shop/claim", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[ShopAPI] Claim shop request failed:", error);
    throw error;
  }
}

export async function connectManualShop(payload: ConnectManualShopRequest) {
  console.log("[ShopAPI] Connect manual shop request initiated.", payload);
  try {
    return authorizedRequest<Shop>("/api/shop/connect-manual", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[ShopAPI] Connect manual shop request failed:", error);
    throw error;
  }
}

export async function getShop() {
  console.log("[ShopAPI] Get shop request initiated.");
  try {
    return authorizedRequest<Shop>("/api/shop", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Get shop request failed:", error);
    throw error;
  }
}

export async function getWarmupData() {
  console.log("[ShopAPI] Get warmup data request initiated.");
  try {
    return authorizedRequest<WarmupData>("/api/shop/warmup-data", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Get warmup data request failed:", error);
    throw error;
  }
}

export async function getPoweredImages() {
  console.log("[ShopAPI] Get powered images request initiated.");
  try {
    return authorizedRequest<unknown[]>("/api/powered-image", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Get powered images request failed:", error);
    throw error;
  }
}

export async function updatePoweredImage(payload: {
  id?: string;
  status?: string;
  [key: string]: any;
}) {
  console.log("[ShopAPI] Update powered image request initiated.", payload);
  try {
    return authorizedRequest<unknown>("/api/shop/update-powered-image", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[ShopAPI] Update powered image request failed:", error);
    throw error;
  }
}

export async function uploadShopLogo(file: FormData) {
  console.log("[ShopAPI] Upload shop logo request initiated.");
  try {
    const authToken = useAuthStore.getState().accessToken;
    // return authorizedRequest<Shop>("/api/shop/upload-logo", {
    const res = await fetch("/api/shop/upload-logo", {
      method: "POST",
      body: file,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[ShopAPI] Upload shop logo request failed:", error);
    throw error;
  }
}

export async function syncCustomerTags() {
  console.log("[ShopAPI] Sync customer tags request initiated.");
  try {
    return authorizedRequest<Shop>("/api/shop/sync-customer-tags", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Sync customer tags request failed:", error);
    throw error;
  }
}

export async function updateSenderName(payload: { sender_name: string }) {
  console.log("[ShopAPI] Update sender name request initiated.", payload);
  try {
    return authorizedRequest<unknown>("/api/shop/update-sender-name", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[ShopAPI] Update sender name request failed:", error);
    throw error;
  }
}
export interface RegisterDomainRequest {
  domain: string;
  email: string;
  subdomain: string;
  reply_to_email: string;
}

export async function registerDomain(payload: RegisterDomainRequest) {
  console.log("[ShopAPI] Register domain request initiated.", payload);
  try {
    return authorizedRequest<unknown>("/api/shop/registration", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[ShopAPI] Register domain request failed:", error);
    throw error;
  }
}

export async function refreshDomainStatus() {
  console.log("[ShopAPI] Refresh domain email status request initiated.");
  try {
    return authorizedRequest<unknown>("/api/shop/refresh-domain-email-status", {
      method: "POST",
    });
  } catch (error) {
    console.error(
      "[ShopAPI] Refresh domain email status request failed:",
      error,
    );
    throw error;
  }
}
export async function getRevenueDetail() {
  console.log("[ShopAPI] Get revenue detail request initiated.");
  try {
    return authorizedRequest<unknown>("/api/shop/revenue-detail", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Get revenue detail request failed:", error);
    throw error;
  }
}

export async function getCountryData() {
  console.log("[ShopAPI] Get country counts request initiated.");
  try {
    return authorizedRequest<{
      countries: { code: string; name: string; count: number }[];
      campaign?: [];
    }>("/api/shop/country", {
      method: "GET",
    });
  } catch (error) {
    console.error("[ShopAPI] Get country counts request failed:", error);
    throw error;
  }
}

export async function getReportByType(
  type: string,
  payload?: Record<string, any>,
) {
  console.log(
    `[ShopAPI] Get report by type request initiated. Type: ${type}`,
    payload,
  );
  try {
    return authorizedRequest<unknown>(`/api/shop/report/${type}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(
      `[ShopAPI] Get report by type request failed for type ${type}:`,
      error,
    );
    throw error;
  }
}
