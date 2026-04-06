import { Flex, Box, Button } from "@chakra-ui/react";
import { UiText } from "@/components/ui/text";
import Tables from "../../components/ui/table";
import UiBox from "@/components/ui/box";
import UiLink from "@/components/ui/link";
import { commaFormatting } from "@/helpers";

interface Campaign {
  id?: string;
  title?: string;
  status?: string;
  subject?: string;
  template_image?: string;
  segment?: {
    name: string;
  };
  open?: number;
  click?: number;
  delivery?: number;
  success_delivery?: number;
  bounce?: number;
  unsubscribed?: number;
  complaint?: number;
  orders_count?: number;
  revenue?: number;
  campaign_sent?: number;
  subscriber_count?: number;
  created_at?: string;
}

const RecentCompaigns = ({
  campaigns,
  loading,
}: {
  campaigns: Campaign[];
  loading: boolean;
}) => {
  console.log(campaigns, "--------------");

  const columns = [
    { header: "Campaign", key: "name", width: "45%" },
    // { header: "Type", key: "type", width: "20%" },
    { header: "Opens", key: "open", width: "10%" },
    { header: "Sent", key: "sent", width: "10%" },

    {
      header: "Click rate",
      key: "clickrate",
      width: "8%",
      isNumeric: true,
    },
    {
      header: "Active on Site",
      key: "activesite",
      width: "12%",
      isNumeric: true,
    },
    { header: "Revenue", key: "revenue", width: "10%" },
  ];

  const rows = campaigns.map((campaign) => ({
    name: campaign.title,
    open: commaFormatting(campaign.open || 0),
    // type: campaign.type,
    sent: commaFormatting(campaign.campaign_sent || 0),

    clickrate:
      campaign.click && campaign?.campaign_sent
        ? `${(campaign.click / campaign?.campaign_sent) * 100}%`
        : "0%",
    activesite:
      campaign.orders_count && campaign.subscriber_count
        ? `${(campaign.orders_count / campaign?.subscriber_count) * 100}%`
        : "0%",
    revenue: commaFormatting(campaign.revenue || 0),
  }));

  return (
    <>
      {loading ? (
        <Tables columns={columns} rows={[]} loading />
      ) : (
        <>
          {rows.length === 0 ? (
            <UiBox>
              <UiText variant="subheading">Recent Compaigns</UiText>
              <Box p="1rem 2rem" textAlign="center">
                <img
                  src="https://static-app.klaviyo.com/fender/11f9feeba06216fdd42c.svg"
                  alt="No Compaigns"
                  style={{ margin: "0 auto" }}
                />
                <UiText variant="subheading">Create a campaign</UiText>
                <UiText m="auto" mb="10" maxW="2xl">
                  Send a one-time targeted message to a select group of
                  customers. Use campaigns for sales, promotions, and exclusive
                  deals. Then, track your data here.
                </UiText>
                <Button
                  p="4"
                  bg="black"
                  borderRadius="md"
                  fontWeight="medium"
                  variant="solid"
                >
                  Create compaign
                </Button>
              </Box>
            </UiBox>
          ) : (
            <UiBox>
              <Flex gap="4" justify="space-between" align="center">
                <Box>
                  <UiText variant="subheading">Recent Compaigns</UiText>
                  {/* <UiText color="gray.400">Apr 20, 2025 - May 20, 2025</UiText> */}
                </Box>
                <Box>
                  <UiLink href="/campaigns">View all Campaigns</UiLink>
                </Box>
              </Flex>
              <Tables columns={columns} rows={rows} />
            </UiBox>
          )}
        </>
      )}
    </>
  );
};

export default RecentCompaigns;
