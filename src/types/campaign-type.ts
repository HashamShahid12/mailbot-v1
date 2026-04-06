export type CampaignType = "email" | "sms" | "push";

export interface CampaignFormState {
  title: string;
  scheduledDate: string;
  type: CampaignType;
  tags: string;
  sendingOption: string;
}
