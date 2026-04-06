import { useAuthStore } from "@/store/auth-store";
import { authorizedRequest } from "./client";

export interface UploadImagePayload {
  image: string; // Base64 encoded string or similar
}

export interface UploadImageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    url: string;
  };
}

// POST /api/newsletter-settings/upload-image - Upload image for template
export async function uploadTemplateImage(file: FormData) {
  console.log("[NewsletterAPI] Upload image request initiated.");
  const authToken = useAuthStore.getState().accessToken;

  try {
    return fetch("/api/newsletter-settings/upload-image", {
      method: "POST",
      body: file,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error("[NewsletterAPI] Upload image request failed:", error);
    throw error;
  }
}

export async function getNewsletterSettings() {
  console.log("[NewsletterAPI] Get newsletter settings request initiated.");
  try {
    return authorizedRequest<unknown>("/api/newsletter-settings", {
      method: "GET",
    });
  } catch (error) {
    console.error(
      "[NewsletterAPI] Get newsletter settings request failed:",
      error,
    );
    throw error;
  }
}

export async function UpdateNewsletterById(id: string, body: object) {
  console.log("[NewsletterAPI] Update newsletter settings request initiated.");
  try {
    return authorizedRequest<unknown>(`/api/newsletter-settings/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(
      "[NewsletterAPI] Update newsletter settings request failed:",
      error,
    );
    throw error;
  }
}
export async function enableNewsletterPopup(id: string, enable: boolean) {
  console.log("[NewsletterAPI] Enable newsletter popup request initiated.");
  try {
    return authorizedRequest<unknown>(
      `/api/newsletter-settings/enable-popup/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ enable }),
      },
    );
  } catch (error) {
    console.error(
      "[NewsletterAPI] Enable newsletter popup request failed:",
      error,
    );
    throw error;
  }
}
