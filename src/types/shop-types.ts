export interface WarmupDataEntry {
  age: number;
  daily_email_limit: number;
}

export interface WarmupData {
  warmup_age: number;
  warmup_data: WarmupDataEntry[];
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  type: string;
  emails: number;
  emails_per_dollar: number;
  created_at: string;
  updated_at: string;
}

export interface ShopSettings {
  email: string;
  reply_to_email: string;
  domain: string;
  subdomain: string;
  sender_name: string;
  domain_status: string;
  email_status: string;
  subdomain_status: string;
  registration_keys: string[];
}

export interface Shop {
  id: string;
  owner_user_id: string;
  platform: "SHOPIFY" | string;
  shop_name: string;
  shop_id: string;
  name: string;
  session_id: string;
  logo: string | null;
  currency: string;
  email: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  total_emails_sent: number;
  created_at: string;
  updated_at: string;
  plan_id: string | null;
  powered_image_url: string | null;
  powered_image_enabled: boolean;
  shopify_subscribed_customer_count: number;
  customer_synched_error: string | null;
  customer_synched_status: string;
  domain: string;
  shopify_segments_synced_error: string | null;
  shopify_segments_synced_status: string;
  extra_email_count: number;
  password_enabled: boolean;
  country: string;
  subaccount_id: string;
  is_allowed_to_send_emails: boolean;
  subaccount_status: string;
  service_type: string;
  ip_warmup_age: number;
  ip_warmup_status: string;
  ip_last_warm_up_date: string | null;
  customer_tags: string[];
  customer_tags_synced_status: string;
  ip_warmup_schedule: string;
  shop_settings: ShopSettings | null;
  plan: Plan | null;
  is_opt_in_disabled: boolean;
  theme_link: string | null;
}
