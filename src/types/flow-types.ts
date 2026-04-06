export interface FlowStats {
  unsubscribed: number;
  open: number;
  delivery: number;
  revenue: number;
  bounce: number;
  click: number;
  type: string;
  created_at?: number;
  updated_at?: number;
}

export interface FlowAutomationStatus {
  welcome_automation: boolean;
  cart_recovery_automation: boolean;
  browser_abandonment_automation: boolean;
  shipping_automation: boolean;
  checkout_recovery_automation: boolean;
  back_in_stock_automation: boolean;
  product_release_automation: boolean;
  welcome_series_with_discount_automation: boolean;
  welcome_series_brand_story_automation: boolean;
  post_purchase_thankyou_automation: boolean;
  first_purchase_upsell_automation: boolean;
  customer_winback_automation: boolean;
  [key: string]: boolean;
}

export interface FlowListResponse {
  all: FlowStats[];
  all_shopify_flows: FlowStats[];
  overall: {
    bounce: number;
    click: number;
    open: number;
    revenue: number;
    unsubscribed: number;
    delivery: number;
  };
}

export interface EnableFlowBody {
  welcome_automation?: boolean;
  cart_recovery_automation?: boolean;
  browser_abandonment_automation?: boolean;
  shipping_automation?: boolean;
  checkout_recovery_automation?: boolean;
  back_in_stock_automation?: boolean;
  product_release_automation?: boolean;
  welcome_series_with_discount_automation?: boolean;
  welcome_series_brand_story_automation?: boolean;
  post_purchase_thankyou_automation?: boolean;
  first_purchase_upsell_automation?: boolean;
  customer_winback_automation?: boolean;
  [key: string]: boolean | undefined;
}
