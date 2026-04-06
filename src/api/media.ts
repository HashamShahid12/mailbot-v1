import { useAuthStore } from "@/store/auth-store";

const authToken = useAuthStore.getState().accessToken;

export async function uploadImage(file: FormData) {
  console.log("[NewsletterAPI] Upload image request initiated.");
  const authToken = useAuthStore.getState().accessToken;

  try {
    const response = await fetch("/api/media/upload-image", {
      method: "POST",
      body: file,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("[NewsletterAPI] Upload image request failed:", error);
    throw error;
  }
}
