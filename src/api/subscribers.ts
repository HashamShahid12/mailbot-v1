import { authorizedRequest } from "./client";

export interface Subscriber {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  country: string;
  state: string;
  created_at: number;
  orders_count: number;
  total_spent: number;
  unsubscribed: boolean;
}

export interface SubscribersResponseData {
  subscribers: Subscriber[];
  cursor: string;
  totalCount: number;
}

export async function getSubscribers(cursor?: string) {
  console.log("[SubscribersAPI] Get subscribers request initiated.");
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  const qs = params.toString();
  const url = `/api/subscriber${qs ? `?${qs}` : ""}`;

  try {
    return authorizedRequest<SubscribersResponseData>(url, {
      method: "GET",
    });
  } catch (error) {
    console.error("[SubscribersAPI] Get subscribers request failed:", error);
    throw error;
  }
}
