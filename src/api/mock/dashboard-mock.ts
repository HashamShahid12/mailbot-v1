import type {
  User,
  Users,
  VatStatus,
  DraftCampaign,
  BusinessPerformanceData,
  TopPerformanceFlow,
  RecentCampaign,
  ListAndSegmentType,
  CampaignTable,
  ProfileTable,
  ProfileCounts,
  FlowTableProps,
  AnalyticsDashboard,
  FormTableRow,
  ImageLibraryTableProps,
  SettingsApiKey,
} from "@/types/user-type";
export const mockUser: User = {
  name: "Adex360",
  email: "hasham.shahid@adex360.com",
  avatarColor: "#5D5E60",
};

export const mockUsers: Users = {
  name: "Hasham",
};

export const mockVatStatus: VatStatus = {
  missing: true,
  updatedAt: "2025-05-15T18:31:00",
};

export const mockDraftCampaigns: DraftCampaign[] = [
  {
    id: "draft1",
    name: "Testing",
    status: "draft",
    startedAt: "2025-05-15T18:31:00",
  },
];

export const mockBusinessPerformance: BusinessPerformanceData = {
  totalConversions: 0,
  attributedConversions: 0,
  conversionRate: "0.00%",
  campaigns: "1",
  flows: "1",
  email: "1",
  sms: "1",
  dateRange: {
    from: "2025-04-20",
    to: "2025-05-20",
  },
};

export const mockTopPerformanceFlows: TopPerformanceFlow[] = [
  {
    name: "Attempt to Opt-Out Auto Response - Ask to Unsubscribe Detection",
    status: "sent",
    type: "mail",
    deliveries: 0,
    activesite: 0,
    percentchange: "0.00%",
    subtitle: "Sent ",
    subtitleActiveOnSite: "0.00% of recipients",
  },
  {
    name: "Attempt to Opt-Out Auto Response - Ask to Unsubscribe Detection",
    status: "Live",
    type: "sms",
    deliveries: 0,
    activesite: 0,
    percentchange: "0.00%",
    subtitle: "Sent ",
    subtitleActiveOnSite: "0.00% of recipients",
  },
];

export const mockRecentCampaigns: RecentCampaign[] = [
  {
    name: "Email Campaign – May 22, 2025, 4:38 PM",
    type: "email",
    openRate: "100.00%",
    clickRate: "0.00%",
    activeOnSite: 0,
    activeOnSitePercent: "0.00%",
    sentAt: "2025-05-22T12:45:00",
  },
];
export const mockCampaignsTable: CampaignTable[] = [
  {
    id: "campaign-1",
    name: "Email Campaign – May 22, 2025, 4:38 PM",
    type: "email",
    status: "Draft",
    lastUpdate: "2025-05-22T07:44:00",
    openRate: "100.00%",
    subtitle: "Sent ",
    clickRate: "0.00%",
    activeOnSite: 0,
  },
  {
    id: "campaign-2",
    name: "Email Campaign – May 22, 2025, 4:38 PM",
    type: "sms",
    status: "Sent",
    lastUpdate: "2025-05-22T07:44:00",
    openRate: "100.00%",
    subtitle: "Preview List",
    clickRate: "0.00%",
    activeOnSite: 0,
  },
  {
    id: "campaign-3",
    name: "Email Campaign – May 22, 2025, 4:38 PM",
    type: "push",
    status: "Sent",
    lastUpdate: "2025-05-22T07:44:00",
    openRate: "100.00%",
    subtitle: "Sent ",
    clickRate: "0.00%",
    activeOnSite: 0,
  },
];

export const mockListAndSegment: ListAndSegmentType[] = [
  {
    id: "listandsegment-1",
    listandsegmentname: "60",
    listandsegmenttype: "Segment",
    members: 2,
    starred: false,
    tags: ["tag1", "tag2"],
    createdate: "May 15, 2025, 3:52 PM",
  },
  {
    id: "listandsegment-2",
    listandsegmentname: "Preview",
    listandsegmenttype: "List",
    members: 2,
    tags: ["tag2"],
    starred: false,
    createdate: "May 15, 2025, 3:52 PM",
  },
  {
    id: "listandsegment-3",
    listandsegmentname: "30",
    listandsegmenttype: "Segment",
    members: 1,
    tags: [],
    starred: false,
    createdate: "May 15, 2025, 3:52 PM",
  },
  {
    id: "listandsegment-4",
    listandsegmentname: "90",
    listandsegmenttype: "Segment",
    tags: ["tag3"],
    starred: false,
    createdate: "May 15, 2025, 3:52 PM",
  },
  {
    id: "listandsegment-5",
    listandsegmentname: "New Subscribers",
    listandsegmenttype: "Segment",
    members: 1,
    tags: ["tag3"],
    starred: false,
    createdate: "May 15, 2025, 3:52 PM",
  },
];
export const mockProfilecount: ProfileCounts = {
  allprofiles: 1,
  activeprofiles: 1,
  suppressesprofiles: 0,
};

export const mockProfile: ProfileTable[] = [
  {
    name: "waleed.mushtaq@adex360.com",
    profileemail: "waleed.mushtaq@adex360.com",
    profilecreated: "May 15, 2025 at 3:52 PM",
    profileupdated: "May 15, 2025 at 3:52 PM",
  },
  {
    name: "waleed.mushtaq@adex360.com",
    profileemail: "waleed.mushtaq@adex360.com",
    profilecreated: "May 15, 2025 at 3:52 PM",
    profileupdated: "May 15, 2025 at 3:52 PM",
  },
];

export const mockAnalyticsDashboards: AnalyticsDashboard[] = [
  {
    id: "6cb682c2-7efb-4ec1-9b8b-9bb79f7611c4",
    name: "Business review",
    created: "2023-09-19T16:18:00",
    updated: "2025-06-05T12:28:00",
    viewOnly: true,
  },
];

export const mockSettingsApiKey: SettingsApiKey[] = [
  { companyName: "Adex360", apiKey: "ssss", permissions: "All Domains" },
];

export const mockFlowTableProps: FlowTableProps[] = [
  {
    name: "Happy Birthday - Standard",
    subtitle: "Sent",
    id: "1",
    status: "draft",
    type: "mail",
    lastUpdated: "May 20 2025, 5:40 PM",
    conversion: "0",
    conversionRate: "0.0%",
    tag: ["hello", "life"],
    site: "API",
  },
  {
    name: "Good Morning",
    subtitle: "Sent",
    type: "sms",
    id: "2",
    status: "sent",
    lastUpdated: "June 20 2025, 12:40 PM",
    conversion: "0",
    tag: ["hello"],
    conversionRate: "0.0%",
  },
  {
    name: "Happy Birthday - Standard",
    subtitle: "Sent",
    id: "3",
    status: "sent",
    type: "mail,sms",
    lastUpdated: "Nov 20 2024, 5:40 PM",
    conversion: "0",
    conversionRate: "0.0%",
  },
];

export const mockFormTableData: FormTableRow[] = [
  {
    id: "form-1",
    name: "Email & SMS Popup",
    description: "Newsletter and SMS Subscribers",
    type: "Popup",
    status: "Draft",
    submitted: 0,
    submitRate: "0.00%",
    performance: "-",
    revenue: "-",
  },
];
export const mockImageLibraryTableData: ImageLibraryTableProps[] = [
  {
    id: "form-1",
    imageUrl:
      "https://media.istockphoto.com/id/1176921834/photo/young-woman-using-her-laptop-on-bed.jpg?s=1024x1024&w=is&k=20&c=F6mqP8UNzLwSz_Nm0wGg0MdhuSNY9hwgMiDz-l8LUWs=",
    date: "May 15, 2025, 3:53 PM",
  },
];
