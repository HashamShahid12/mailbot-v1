import { Box, VStack, Flex, SimpleGrid, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UiText } from "@/components/ui/text";
import { useAuthStore } from "@/store/auth-store";
import { useShop } from "@/store/shop-store";
import {
  getCountryData,
  getReportByType,
  getRevenueDetail,
  getShop,
} from "@/api/shop";
import { AnalyticsChart } from "@/components/ui/analytics/analytics-chart";
import { MailEventsChart } from "@/components/ui/analytics/mail-events-chart";
import { AutomationEventsChart } from "@/components/ui/analytics/automation-events-chart";
import { TopLocationsTable } from "@/components/ui/analytics/top-locations-table";
import { AnalyticsCard } from "@/components/ui/analytics/analytics-card";
import {
  TbAlertCircle,
  TbCurrencyDollar,
  TbMailFilled,
  TbSend,
  TbUsers,
} from "react-icons/tb";

export default function DashboardDetails() {
  const { shop, setShop } = useShop();
  const [lastCampaign, setLastCampaign] = useState<any>({});
  const [countryData, setCountryData] = useState<any[]>([]);

  const [loadings, setLoadings] = useState({
    countryData: true,
    revenueDetail: true,
    emailReport: true,
    revenueReport: true,
    allEmailEventsReport: true,
    automationEmailEventsReport: true,
  });

  const [revenueDetail, setRevenueDetail] = useState<any>({
    subscriber_count: 1730,
    campaign_count: 89,
    total_emails_sent: 0,
    revenue: 3273.52,
    bounce_rate: 8.82,
    complaint: 0,
    overall_emails: 0,
  });

  const [emailReport, setEmailReport] = useState<any>({
    percentage: 0,
    report: [],
    totalCount: 0,
  });

  const [revenueReport, setRevenueReport] = useState<any>({
    percentage: 0,
    report: [],
    totalCount: 0,
  });

  const [allEmailEventsReport, setAllEmailEventsReport] = useState<any>({
    percentage: 0,
    report: [],
  });

  const [automationEmailEventsReport, setAutomationEmailEventsReport] =
    useState<any>({
      percentage: 0,
      report: [],
    });

  const [emailFilters, setEmailFilters] = useState({
    duration: "30_days",
    group_by: "daily",
  });

  const [revenueFilters, setRevenueFilters] = useState({
    duration: "30_days",
    group_by: "daily",
    automation_type: "overall",
  });

  const [allEmailFilters, setAllEmailFilters] = useState({
    duration: "30_days",
    group_by: "daily",
  });

  const [automationFilters, setAutomationFilters] = useState({
    duration: "30_days",
    group_by: "daily",
    automation_type: "overall",
  });

  const fetchRevenueDetail = async () => {
    try {
      setLoadings((prev) => ({ ...prev, revenueDetail: true }));
      const res = await getRevenueDetail();
      console.log("[Dashboard] Revenue detail loaded:", res.data);
      setRevenueDetail(res.data);
    } catch (error) {
      console.error("Error Fetching Revenue Detail", error);
    } finally {
      setLoadings((prev) => ({ ...prev, revenueDetail: false }));
    }
  };

  const fetchCountryData = async () => {
    try {
      setLoadings((prev) => ({ ...prev, countryData: true }));
      const res = await getCountryData();
      console.log("[Dashboard] Country data loaded:", res.data);
      setCountryData(res.data.countries || []);
      setLastCampaign(res.data?.campaign[0] || {});
    } catch (error) {
      console.error("Error Fetching Country Data", error);
    } finally {
      setLoadings((prev) => ({ ...prev, countryData: false }));
    }
  };

  const fetchReportByType = async (
    type: string,
    payload?: Record<string, any>,
  ) => {
    try {
      const loadingKey =
        type === "total_emails_send"
          ? "emailReport"
          : type === "revenue"
            ? "revenueReport"
            : type === "all_email_events"
              ? "allEmailEventsReport"
              : type === "automation_email_events"
                ? "automationEmailEventsReport"
                : null;

      if (loadingKey) {
        setLoadings((prev) => ({ ...prev, [loadingKey]: true }));
      }

      const res = await getReportByType(type, payload);
      console.log(`[Dashboard] Report by type ${type} loaded:`, res.data);
      if (type === "total_emails_send") {
        setEmailReport(res.data);
      } else if (type === "revenue") {
        setRevenueReport(res.data);
      } else if (type === "all_email_events") {
        setAllEmailEventsReport(res.data);
      } else if (type === "automation_email_events") {
        setAutomationEmailEventsReport(res.data);
      }

      if (loadingKey) {
        setLoadings((prev) => ({ ...prev, [loadingKey]: false }));
      }
    } catch (error) {
      console.error(`Error Fetching Report by type ${type}:`, error);
      // Ensure loading is reset on error
      const loadingKey =
        type === "total_emails_send"
          ? "emailReport"
          : type === "revenue"
            ? "revenueReport"
            : type === "all_email_events"
              ? "allEmailEventsReport"
              : type === "automation_email_events"
                ? "automationEmailEventsReport"
                : null;
      if (loadingKey) {
        setLoadings((prev) => ({ ...prev, [loadingKey]: false }));
      }
    }
  };

  useEffect(() => {
    fetchReportByType("total_emails_send", emailFilters);
  }, [emailFilters]);

  useEffect(() => {
    fetchReportByType("revenue", revenueFilters);
  }, [revenueFilters]);

  useEffect(() => {
    fetchReportByType("all_email_events", allEmailFilters);
  }, [allEmailFilters]);

  useEffect(() => {
    fetchReportByType("automation_email_events", automationFilters);
  }, [automationFilters]);

  useEffect(() => {
    fetchRevenueDetail();
    fetchCountryData();
  }, []);

  useEffect(() => {
    const loadShop = async () => {
      if (shop) return;
      try {
        const res = await getShop();
        console.log("[Dashboard] Shop loaded:", res.data);
        setShop(res.data);
      } catch (error) {
        console.error("Error Fetching Shop", error);
      }
    };
    loadShop();
  }, [shop, setShop]);

  return (
    <Box
      minW="940px"
      w="full"
      overflowX="auto"
      maxW="7xl"
      mx="auto"
      px="6"
      py="5"
    >
      <VStack align="stretch" gap="5">
        {/* <UiBox _dark={{ bg: "gray.900" }}>
          <HStack>
            <UiText variant="subheading">VAT ID requirements</UiText>
            <UiBadge status="alert">Missing</UiBadge>
          </HStack>
          <UiText mt="5">
            Mailbot will start collecting Value Added Tax (VAT). Ensure your VAT
            ID is added to Mailbot so that we can bill you the correct VAT
            amount.
          </UiText>
          <UiTextLink value="Update your VAT information" href="#" />
        </UiBox> */}

        <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap="5">
          <AnalyticsCard
            label="Campaigns Sent"
            value={revenueDetail.campaign_count || 0}
            icon={TbMailFilled}
            loading={loadings.revenueDetail}
          />
          <AnalyticsCard
            label="Total Subscribers"
            value={revenueDetail.subscriber_count?.toLocaleString() || 0}
            icon={TbUsers}
            loading={loadings.revenueDetail}
          />
          <AnalyticsCard
            label="Revenue Generated"
            value={`Rs ${revenueDetail.revenue?.toLocaleString() || "0.00"}`}
            icon={TbCurrencyDollar}
            loading={loadings.revenueDetail}
          />
          <AnalyticsCard
            label="Emails Sent"
            value={`${revenueDetail.total_emails_sent || 0} / 750,000`}
            icon={TbSend}
            progress={{
              current: revenueDetail.total_emails_sent || 0,
              total: 750000,
            }}
            loading={loadings.revenueDetail}
          />
          <AnalyticsCard
            label="Bounce Rate"
            value={`${revenueDetail.bounce_rate || 0}%`}
            icon={TbAlertCircle}
            isNegative={true}
            loading={loadings.revenueDetail}
          />
        </SimpleGrid>
        <MailEventsChart
          title="All Emails"
          data={allEmailEventsReport.report}
          defaultDuration={allEmailFilters.duration}
          defaultGroupBy={allEmailFilters.group_by}
          onDurationChange={(val) =>
            setAllEmailFilters((prev) => ({ ...prev, duration: val }))
          }
          onGroupByChange={(val) =>
            setAllEmailFilters((prev) => ({ ...prev, group_by: val }))
          }
          loading={loadings.allEmailEventsReport}
        />

        <AutomationEventsChart
          title="Automation Email Events"
          data={automationEmailEventsReport.report}
          defaultAutomationType={automationFilters.automation_type}
          defaultDuration={automationFilters.duration}
          defaultGroupBy={automationFilters.group_by}
          onAutomationTypeChange={(val) =>
            setAutomationFilters((prev) => ({
              ...prev,
              automation_type: val,
            }))
          }
          onDurationChange={(val) =>
            setAutomationFilters((prev) => ({ ...prev, duration: val }))
          }
          onGroupByChange={(val) =>
            setAutomationFilters((prev) => ({ ...prev, group_by: val }))
          }
          loading={loadings.automationEmailEventsReport}
        />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          <AnalyticsChart
            title="Total Emails Sent"
            totalValue={emailReport.totalCount || 0}
            data={emailReport.report}
            defaultDuration={emailFilters.duration}
            defaultGroupBy={emailFilters.group_by}
            onDurationChange={(val) =>
              setEmailFilters((prev) => ({ ...prev, duration: val }))
            }
            onGroupByChange={(val) =>
              setEmailFilters((prev) => ({ ...prev, group_by: val }))
            }
            loading={loadings.emailReport}
          />
          <AnalyticsChart
            defaultDuration={revenueFilters.duration}
            defaultGroupBy={revenueFilters.group_by}
            title="Revenue"
            totalValue={revenueReport.totalCount || 0}
            data={revenueReport.report}
            onDurationChange={(val) =>
              setRevenueFilters((prev) => ({ ...prev, duration: val }))
            }
            onGroupByChange={(val) =>
              setRevenueFilters((prev) => ({ ...prev, group_by: val }))
            }
            loading={loadings.revenueReport}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          <TopLocationsTable
            countries={countryData}
            loading={loadings.countryData}
          />
        </SimpleGrid>
        {/* <LastCampaign campaign={lastCampaign} loading={loadings.countryData} /> */}
      </VStack>
    </Box>
  );
}
