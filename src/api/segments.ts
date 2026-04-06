import { authorizedRequest } from "./client";
import type { SegmentsData } from "@/types/segment-types";

export async function getSegments() {
  console.log("[SegmentsAPI] Get segments request initiated.");
  try {
    return authorizedRequest<SegmentsData>("/api/segment", {
      method: "GET",
    });
  } catch (error) {
    console.error("[SegmentsAPI] Get segments request failed:", error);
    throw error;
  }
}

export async function getCountries() {
  console.log("[SegmentsAPI] Get countries request initiated.");
  try {
    return authorizedRequest<{ success: boolean; countries: string[] }>(
      "/api/segment/countries",
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Get countries request failed:", error);
    throw error;
  }
}

export async function createSegment(data: any) {
  console.log("[SegmentsAPI] Create segment request initiated.", data);
  try {
    return authorizedRequest<{ success: boolean; message: string; data: any }>(
      "/api/segment",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Create segment request failed:", error);
    throw error;
  }
}

export async function updateSegment(id: string, data: any) {
  console.log("[SegmentsAPI] Update segment request initiated.", { id, data });
  try {
    return authorizedRequest<{ success: boolean; message: string; data: any }>(
      `/api/segment/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Update segment request failed:", error);
    throw error;
  }
}

export async function getSegmentById(id: string) {
  console.log("[SegmentsAPI] Get segment by ID request initiated.", { id });
  try {
    return authorizedRequest<{ success: boolean; data: any }>(
      `/api/segment/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Get segment by ID request failed:", error);
    throw error;
  }
}

export async function syncSegment(id: string) {
  console.log("[SegmentsAPI] Sync segment request initiated.", { id });
  try {
    return authorizedRequest<{ message: string }>(`/api/segment/sync/${id}`, {
      method: "POST",
    });
  } catch (error) {
    console.error("[SegmentsAPI] Sync segment request failed:", error);
    throw error;
  }
}

export async function syncShopifySegments() {
  console.log("[SegmentsAPI] Sync Shopify segments request initiated.");
  try {
    return authorizedRequest<{ success: boolean; message: string }>(
      "/api/segment/sync-shopify-segments",
      {
        method: "GET",
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Sync Shopify segments request failed:", error);
    throw error;
  }
}

export async function syncShopifySegmentMembers(id: string, query: string) {
  console.log("[SegmentsAPI] Sync Shopify segment members request initiated.", {
    id,
  });
  try {
    return authorizedRequest<{ success: boolean; message: string }>(
      "/api/segment/sync-shopify-segment-members",
      {
        method: "POST",
        body: JSON.stringify({ id, query }),
      },
    );
  } catch (error) {
    console.error(
      "[SegmentsAPI] Sync Shopify segment members request failed:",
      error,
    );
    throw error;
  }
}

export async function archiveSegment(id: string) {
  console.log("[SegmentsAPI] Archive segment request initiated.", { id });
  try {
    return authorizedRequest<{ success: boolean; message: string }>(
      `/api/segment/archive/${id}`,
      {
        method: "POST",
      },
    );
  } catch (error) {
    console.error("[SegmentsAPI] Archive segment request failed:", error);
    throw error;
  }
}
