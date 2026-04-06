export interface User {
  name: string;
  email: string;
  avatarColor?: string;
}

export interface Users {
  name: string;
}

export interface VatStatus {
  missing: boolean;
  updatedAt: string;
}

export interface DraftCampaign {
  id: string;
  name: string;
  status: "draft" | "sent";
  startedAt: string;
}

export interface BusinessPerformanceData {
  totalConversions: number;
  attributedConversions: number;
  conversionRate: string;
  campaigns: string;
  flows: string;
  email: string;
  sms: string;
  dateRange: {
    from: string;
    to: string;
  };
}

export interface TopPerformanceFlow {
  name: string;
  status: string;
  type: string;
  deliveries: number;
  activesite: number;
  percentchange: string;
  subtitle: string;
  subtitleActiveOnSite?: string;
}

export interface RecentCampaign {
  name: string;
  type: "email" | "sms" | "push";
  openRate: string;
  clickRate: string;
  activeOnSite: number;
  activeOnSitePercent: string;
  sentAt: string;
}
export interface CampaignTable {
  id: string;
  name: string;
  type: "email" | "sms" | "push";
  status: string;
  clicked: number;
  lastUpdate: string;
  bounce: number;
  opened: number;
  revenue: number;

  clickRate: string;
  subtitle: string;
  activeOnSite: number;
  template_image?: string;
}

export interface ListAndSegmentType {
  listandsegmentname: string;
  id: string;
  listandsegmenttype: string;
  tags?: string[];
  members?: number;
  starred: boolean;
  createdate: string;
  query?: string;
  status?: string;
}
export interface ProfileCounts {
  allprofiles: number;
  activeprofiles: number;
  suppressesprofiles: number;
}
export interface ProfileTable {
  name: string;
  profileemail: string;
  profilephone?: number;
  profilecreated: string;
  profileupdated: string;
  profilelocation?: string;
}

export type AnalyticsDashboard = {
  id: string;
  name: string;
  created: string;
  updated: string;
  viewOnly: boolean;
};

export type SettingsApiKey = {
  companyName: string;
  apiKey: string;
  permissions: string;
};

export interface FlowTableProps {
  id?: string;
  name: string;
  subtitle: string;
  sent: string;
  opened: string;
  clicks: string;
  revenue: string;
  conversionRate: string;
  status: string;
  lastUpdated: string;
  type: string;
  site?: string;
  tag?: string[];
}

export interface FormTableRow {
  id: string;
  name: string;
  description: string;
  type: "Popup" | "Inline";
  status: "Draft" | "Active" | "Archived";
  submitted?: number;
  submitRate?: string;
  performance?: string;
  revenue?: string;
}

export interface ImageLibraryTableProps {
  id: string;
  imageName?: string;
  imageSize?: string;
  imageType?: string;
  date: string;
  imageUrl: string;
}
