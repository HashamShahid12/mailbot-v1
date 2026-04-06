import { authorizedRequest } from "./client";
import type { CampaignBackend } from "@/types/campaign-backend-types";
import type { CampaignForm } from "@/store/useCampaignStore";

export interface PageInfo {
  lastCursor: string;
  hasNext: boolean;
}

export interface PaginatedCampaignsResponseData {
  list: CampaignBackend[];
  pageInfo: PageInfo;
}

export interface PaginatedCampaignsData {
  campaigns: PaginatedCampaignsResponseData;
}

export async function getCampaigns(type?: string, cursor?: string) {
  console.log("[CampaignAPI] Get campaigns request initiated.");
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (cursor) params.set("cursor", cursor);
  const qs = params.toString();
  const url = `/api/campaign/get/paginated${qs ? `?${qs}` : ""}`;

  try {
    return authorizedRequest<PaginatedCampaignsData>(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("[CampaignAPI] Get campaigns request failed:", error);
    throw error;
  }
}

export async function getCampaign(id: string) {
  console.log("[CampaignAPI] Get campaign request initiated.", id);
  try {
    return authorizedRequest<any>(`/api/campaign/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("[CampaignAPI] Get campaign request failed:", error);
    throw error;
  }
}

export async function sendTestEmail(data: {
  to: string;
  subject: string;
  template_html: string;
  preview_text?: string;
}) {
  console.log("[CampaignAPI] Send test email request initiated.", data);
  try {
    return authorizedRequest<any>("/api/shop/test-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("[CampaignAPI] Send test email request failed:", error);
    throw error;
  }
}

export async function startCampaign(data: CampaignForm) {
  console.log("[CampaignAPI] Start campaign request initiated.", data);

  const payload: any = { ...data };

  // Remove template_id from payload as backend doesn't expect it
  if ("template_id" in payload) {
    delete payload.template_id;
  }

  // Ensure template_html has correct structure
  if (payload.template_html && typeof payload.template_html === "string") {
    payload.template_html = { body: payload.template_html };
  } else if (
    payload.template_html &&
    payload.template_html.content &&
    !payload.template_html.body
  ) {
    // Remap content to body if needed (legacy support)
    payload.template_html = {
      ...payload.template_html,
      body: payload.template_html.content,
    };
    delete payload.template_html.content;
  }

  // Remove discount_code if null
  if (!payload.discount_code) {
    delete payload.discount_code;
  }

  // Remove scheduled_date if sending_option is now
  if (payload.sending_option === "now") {
    // @ts-ignore
    payload.scheduled_date = null;
  } else if (payload.scheduled_date) {
    // Ensure scheduled_date is a valid ISO-8601 string (UTC)
    const date = new Date(payload.scheduled_date);
    if (!isNaN(date.getTime())) {
      payload.scheduled_date = date.toISOString();
    } else {
      // If invalid date, maybe set to null or let it fail?
      // Let's try to append Z if it looks like ISO but missing timezone as fallback
      if (
        typeof payload.scheduled_date === "string" &&
        !payload.scheduled_date.endsWith("Z")
      ) {
        payload.scheduled_date = payload.scheduled_date + "Z";
      }
    }
  }

  // Ensure sending_option is valid (now or scheduled)
  if (
    payload.sending_option !== "now" &&
    payload.sending_option !== "scheduled"
  ) {
    // Default to "now" if invalid (e.g. "draft")
    payload.sending_option = "now";
  }

  try {
    return authorizedRequest<any>("/api/campaign/start", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[CampaignAPI] Start campaign request failed:", error);
    throw error;
  }
}

export async function duplicateCampaign(id: string) {
  console.log("[CampaignAPI] Duplicate campaign request initiated.", id);
  try {
    return authorizedRequest<any>(`/api/campaign/duplicate/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("[CampaignAPI] Duplicate campaign request failed:", error);
    throw error;
  }
}

export async function saveDraft(data: CampaignForm) {
  console.log("[CampaignAPI] Save draft request initiated.", data);

  const payload: any = { ...data };

  // Remove template_id from payload as backend doesn't expect it
  if ("template_id" in payload) {
    delete payload.template_id;
  }

  // Ensure template_html has correct structure
  if (payload.template_html && typeof payload.template_html === "string") {
    payload.template_html = { body: payload.template_html };
  } else if (
    payload.template_html &&
    payload.template_html.content &&
    !payload.template_html.body
  ) {
    payload.template_html = {
      ...payload.template_html,
      body: payload.template_html.content,
    };
    delete payload.template_html.content;
  }

  // Remove discount_code if null
  if (!payload.discount_code) {
    delete payload.discount_code;
  }

  // Remove scheduled_date if sending_option is now
  if (payload.sending_option === "now") {
    // @ts-ignore
    payload.scheduled_date = null;
  } else if (payload.scheduled_date) {
    // Ensure scheduled_date is a valid ISO-8601 string (UTC)
    const date = new Date(payload.scheduled_date);
    if (!isNaN(date.getTime())) {
      payload.scheduled_date = date.toISOString();
    } else {
      if (
        typeof payload.scheduled_date === "string" &&
        !payload.scheduled_date.endsWith("Z")
      ) {
        payload.scheduled_date = payload.scheduled_date + "Z";
      }
    }
  }

  // Ensure sending_option is valid (now or scheduled) for backend validation
  if (
    payload.sending_option !== "now" &&
    payload.sending_option !== "scheduled"
  ) {
    payload.sending_option = "now";
  }

  try {
    return authorizedRequest<any>("/api/campaign/draft", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[CampaignAPI] Save draft request failed:", error);
    throw error;
  }
}
