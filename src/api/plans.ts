import { authorizedRequest } from "./client";
import type { Plan } from "@/types/shop-types";

export interface PlansResponse {
  plans: {
    enterprise: Plan[];
    business: Plan[];
    free: Plan[];
  };
}

export const getPlans = async (): Promise<PlansResponse> => {
  const res = await authorizedRequest<PlansResponse>("/api/plan", {
    method: "GET",
  });
  return res.data;
};

export const subscribeExtraEmails = async (emails: string) => {
  const res = await authorizedRequest<{ confirmation_url: string }>(
    "/api/plan/subscribe/extra-emails",
    {
      method: "POST",
      body: JSON.stringify({ emails }),
    },
  );
  return res.data;
};

export const subscribePlan = async (plan_id: string) => {
  const res = await authorizedRequest<{ confirmation_url?: string }>(
    "/api/plan/subscribe",
    {
      method: "POST",
      body: JSON.stringify({ plan_id }),
    },
  );
  return res.data;
};
