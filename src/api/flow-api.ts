import { authorizedRequest } from "./client";
import type {
  EnableFlowBody,
  FlowAutomationStatus,
  FlowListResponse,
} from "@/types/flow-types";

// Helper to map flow type to automation key
export const getAutomationKey = (type: string): string => {
  const mapping: Record<string, string> = {
    welcomed: "welcome_automation",
    cart_recovery: "cart_recovery_automation",
    browse_abandonment: "browser_abandonment_automation", // Note: browser vs browse
    shipping: "shipping_automation",
    checkout_recovery: "checkout_recovery_automation",
    back_in_stock: "back_in_stock_automation",
    product_release: "product_release_automation",
    welcome_series_with_discount: "welcome_series_with_discount_automation",
    welcome_series_brand_story: "welcome_series_brand_story_automation",
    post_purchase_thankyou: "post_purchase_thankyou_automation",
    first_purchase_upsell: "first_purchase_upsell_automation",
    customer_winback: "customer_winback_automation",
  };
  return mapping[type] || `${type}_automation`;
};

interface FlowListWrapper {
  success: boolean;
  data: FlowListResponse;
}

export const getAllFlows = async (
  from: Date | undefined,
  to: Date | undefined,
): Promise<FlowListResponse> => {
  console.log(from, to, "from, to");

  const res = await authorizedRequest<FlowListWrapper>(
    `/api/flow/get-all?from=${from ? from : ""}&to=${to ? to : ""}`,
    {
      method: "GET",
    },
  );
  return res.data.data;
};

export const fetchCustomFlows = async (from: string, to: string) => {
  return authorizedRequest<{ data: any }>(
    `flows/get-all?from=${from}&to=${to}`,
    { method: "GET" },
  );
};

export const fetchFlowByType = async (type: string) => {
  return authorizedRequest<any>(`/api/flow/get-single/${type}`, {
    method: "GET",
  });
};

export const fetchAllAutomation = async (from: string, to: string) => {
  return authorizedRequest<{ data: any }>(`automation?from=${from}&to=${to}`, {
    method: "GET",
  });
};

export const fetchFlowData = async (flowId: string) => {
  return authorizedRequest<any>("automation/" + flowId, {
    method: "GET",
  });
};

interface EnableFlowWrapper {
  message: string;
  data: FlowAutomationStatus;
}

export const enableFlows = async (
  body: EnableFlowBody,
): Promise<FlowAutomationStatus> => {
  const res = await authorizedRequest<EnableFlowWrapper>("/api/flow/enable", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.data.data;
};

export const createFlow = async (body: any) => {
  const res = await authorizedRequest<any>("/api/flow", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;
};

export const updateFlow = async (id: string, body: any) => {
  const res = await authorizedRequest<any>(`/api/flow/update/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;
};

export const fetchDefaultFlowTemplate = async (type: string) => {
  return authorizedRequest<any>(`/api/flow/default-template/${type}`, {
    method: "GET",
  });
};
