import { Box, VStack, HStack } from "@chakra-ui/react";
import BusinessPerformanceCard from "./business-performance-card";
import TopPerfomanceFlow from "./top-perfomance-flow";
import RecentCompaigns from "./recent-campaigns";
import { useEffect, useState } from "react";
import type { Users } from "@/types/user-type";
import { getUser } from "@/api/dashboard-api";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { UiBadge } from "@/components/ui/badge";
import PickUpLeft from "./pick-up-left";

interface DashboardData {
  users: Users | null;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    users: null,
  });

  useEffect(() => {
    const loadData = async () => {
      const [users] = await Promise.all([getUser()]);

      setData({
        users,
      });
    };

    loadData();
  }, []);
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
        <Box>
          <UiText variant="heading">Welcom, {data.users?.name}</UiText>
          <UiText variant="caption">
            Customize this message with your name in Settings.{" "}
            <UiTextLink uiVariant="secondary" value="Update Profile" href="#" />
          </UiText>
        </Box>

        <UiBox _dark={{ bg: "gray.900" }}>
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
        </UiBox>

        <PickUpLeft />
        <BusinessPerformanceCard />
        <TopPerfomanceFlow />
        <RecentCompaigns />
      </VStack>
    </Box>
  );
}
