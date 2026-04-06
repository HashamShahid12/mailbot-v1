import UiBox from "@/components/ui/box";
import FlowHeader from "@/components/ui/flows/flow-header";
import FlowTable from "@/components/ui/flows/flow-table";

import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { useFlowStore } from "@/store/flows-store";
import { AnalyticsCard } from "@/components/ui/analytics/analytics-card";
import {
  TbEye,
  TbPointer,
  TbMailCheck,
  TbCurrencyDollar,
  TbUsers,
  TbMailX,
} from "react-icons/tb";
import { commaFormatting } from "@/helpers";
import { DateRangeDropdown } from "@/components/ui/campaign-dropdown/date-range-dropdown";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { getAllFlows } from "@/api/flow-api";

const Flows = () => {
  const { automation, flowsPageLoading, setFlowsPageLoading, setAutomation } =
    useFlowStore();

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectRange, setSelectRange] = useState("all");
  const { overall } = automation;

  const fetchFlows = async (from: Date | undefined, to: Date | undefined) => {
    setFlowsPageLoading(true);
    try {
      const data = await getAllFlows(from, to);
      const backendTypes = (data.all || []).reduce((acc: any, flow: any) => {
        if (flow.type) acc[flow.type] = true;
        return acc;
      }, {});

      const currentAutomation = useFlowStore.getState().automation;
      setAutomation({
        ...currentAutomation,
        all: data.all,
        overall: data.overall,
        all_shopify_flows: data.all_shopify_flows,
        backendTypes,
      });
    } catch (error) {
      console.error("Failed to get flows list", error);
    } finally {
      setFlowsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  return (
    <>
      <Box minW="4xl" w="full" overflowX="auto">
        <FlowHeader />
        <Box bg="white" px="6" py="3">
          <HStack mb="4" justifyContent="flex-end">
            <DateRangeDropdown
              range={selectedDateRange}
              selectRange={selectRange}
              setSelectRange={setSelectRange}
              onChange={(range) => {
                console.log(range, "rangee.");
                setSelectedDateRange(range);
              }}
              onApply={(range) => {
                fetchFlows(range?.from, range.to);
              }}
            />
          </HStack>
          <SimpleGrid columns={4} gap={4} mb={4}>
            <AnalyticsCard
              label="Emails Sent"
              value={commaFormatting(overall.delivery || 0)}
              icon={TbMailCheck}
              loading={flowsPageLoading}
            />
            <AnalyticsCard
              label="Opened"
              value={commaFormatting(overall.open || 0)}
              icon={TbEye}
              loading={flowsPageLoading}
            />
            <AnalyticsCard
              label="Clicks"
              value={commaFormatting(overall.click || 0)}
              icon={TbPointer}
              loading={flowsPageLoading}
            />
            <AnalyticsCard
              label="Bounced"
              value={commaFormatting(overall.bounce || 0)}
              icon={TbMailX}
              loading={flowsPageLoading}
            />
            <AnalyticsCard
              label="Unsubscribed"
              value={commaFormatting(overall.unsubscribed || 0)}
              icon={TbUsers}
              loading={flowsPageLoading}
            />
            <AnalyticsCard
              label="Revenue"
              value={commaFormatting(overall.revenue || 0)}
              icon={TbCurrencyDollar}
              loading={flowsPageLoading}
            />
          </SimpleGrid>
          <UiBox>
            <FlowTable />
          </UiBox>
        </Box>
      </Box>
    </>
  );
};

export default Flows;
