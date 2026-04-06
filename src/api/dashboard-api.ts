import {
  mockBusinessPerformance,
  mockDraftCampaigns,
  mockRecentCampaigns,
  mockTopPerformanceFlows,
  mockUser,
  mockUsers,
  mockVatStatus,
  mockListAndSegment,
  mockCampaignsTable,
  mockAnalyticsDashboards,
  mockProfile,
  mockProfilecount,
  mockFlowTableProps,
  mockFormTableData,
  mockImageLibraryTableData,
} from "./mock/dashboard-mock";
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
  AnalyticsDashboard,
  ProfileTable,
  ProfileCounts,
  FlowTableProps,
  FormTableRow,
  ImageLibraryTableProps,
} from "@/types/user-type";

const useMock = true;

export const getUserInfo = async (): Promise<User> => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUser), 300);
    });
  }
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getUser = async (): Promise<Users> => {
  await delay(300);
  return mockUsers;
};

export const getVatStatus = async (): Promise<VatStatus> => {
  await delay(300);
  return mockVatStatus;
};

export const getDraftCampaigns = async (): Promise<DraftCampaign[]> => {
  await delay(300);
  return mockDraftCampaigns;
};

export const getBusinessPerformance =
  async (): Promise<BusinessPerformanceData> => {
    await delay(300);
    return mockBusinessPerformance;
  };

export const getTopPerformanceFlows = async (): Promise<
  TopPerformanceFlow[]
> => {
  await delay(300);
  return mockTopPerformanceFlows;
};

export const getRecentCampaigns = async (): Promise<RecentCampaign[]> => {
  await delay(300);
  return mockRecentCampaigns;
};
export const getCampaignsTable = async (): Promise<CampaignTable[]> => {
  await delay(300);
  return mockCampaignsTable;
};
export const getListAndSegment = async (): Promise<ListAndSegmentType[]> => {
  await delay(300);
  return mockListAndSegment;
};

export const getDashboards = async (): Promise<AnalyticsDashboard[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return mockAnalyticsDashboards;
};
export const getProfileCount = async (): Promise<ProfileCounts> => {
  await delay(300);
  return mockProfilecount;
};
export const getProfileTable = async (): Promise<ProfileTable[]> => {
  await delay(300);
  return mockProfile;
};
export const getFlowTable = async (): Promise<FlowTableProps[]> => {
  await delay(300);
  return mockFlowTableProps;
};

export const getFormTable = async (): Promise<FormTableRow[]> => {
  await delay(300);
  return mockFormTableData;
};

export const getImageLibraryTable = async (): Promise<
  ImageLibraryTableProps[]
> => {
  await delay(300);
  return mockImageLibraryTableData;
};
