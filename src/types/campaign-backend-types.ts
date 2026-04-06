export interface CampaignBackend {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  campaign_end_time: string | null;
  campaign_start_time: string | null;
  preview_text: string;
  segment_id: string;
  sending_option: string;
  status: string;
  subject: string;
  template_image: string;
  scheduled_date: string | null;
  segment: {
    name: string;
  };
  open: number;
  click: number;
  delivery: number;
  success_delivery: number;
  bounce: number;
  unsubscribed: number;
  complaint: number;
  deliverydelay: number;
  temporary_failed: number;
  orders_count: number;
  revenue: number;
  campaign_sent: number;
  subscriber_count: number;
}
