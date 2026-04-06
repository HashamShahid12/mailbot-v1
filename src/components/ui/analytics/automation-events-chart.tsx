import React from "react";
import { Box, Flex, HStack, Skeleton } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UiText } from "../text";
import { UiSelect } from "../select";
import { durationOptions, groupByOptions } from "@/constants";
import { titleCase } from "@/helpers";

interface EventData {
  open: number;
  click: number;
  bounce: number;
  unsubscribed: number;
  complaint: number;
}

interface ChartDataPoint {
  key: string;
  value: EventData;
}

interface AutomationEventsChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  onDurationChange?: (value: string) => void;
  onGroupByChange?: (value: string) => void;
  onAutomationTypeChange?: (value: string) => void;
  defaultDuration?: string;
  defaultGroupBy?: string;
  defaultAutomationType?: string;
  loading?: boolean;
}

const eventConfig = [
  { key: "open", label: "Opened", color: "#0088FF" },
  { key: "click", label: "Clicked", color: "#CC00FF" },
  { key: "bounce", label: "Bounced", color: "#FF0000" },
  { key: "unsubscribed", label: "Unsubscribed", color: "#FF9900" },
  { key: "complaint", label: "Complaint", color: "#FF00FF" },
];

const AUTO_TYPES = [
  "welcomed",
  "browser_abandonment",
  "cart_recovery",
  "checkout_recovery",
  "shipping",
  "first_purchase_upsell",
  "post_purchase_thankyou",
  "welcome_series_brand_story",
  "welcome_series_with_discount",
];

const automationOptions = [
  { label: "Overall", value: "overall" },
  ...AUTO_TYPES.map((auto) => ({
    label: titleCase(auto),
    value: auto,
  })),
];

export const AutomationEventsChart: React.FC<AutomationEventsChartProps> = ({
  title,
  subtitle = "Data Visualization",
  data,
  onDurationChange,
  onGroupByChange,
  onAutomationTypeChange,
  defaultDuration = "30_days",
  defaultGroupBy = "daily",
  defaultAutomationType = "overall",
  loading,
}) => {
  if (loading) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        p="5"
        boxShadow="sm"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      >
        <Flex justify="space-between" align="flex-start" mb="4">
          <Box>
            <Skeleton h="20px" w="120px" mb="2" />
            <Skeleton h="14px" w="180px" />
          </Box>
          <Flex gap="2">
            <Skeleton h="40px" w="100px" borderRadius="md" />
            <Skeleton h="40px" w="100px" borderRadius="md" />
            <Skeleton h="40px" w="100px" borderRadius="md" />
          </Flex>
        </Flex>
        <Skeleton h="300px" w="full" borderRadius="md" />
      </Box>
    );
  }

  // Flatten the data for Recharts
  const chartData = data.map((item) => ({
    name: item.key,
    ...item.value,
  }));

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p="5"
      boxShadow="sm"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <Flex justify="space-between" align="flex-start" mb="4">
        <Box>
          <UiText variant="subheading" fontWeight="bold" fontSize="lg">
            {title}
          </UiText>
          <UiText variant="caption" color="gray.700">
            {subtitle}
          </UiText>
        </Box>
        <Flex gap="2">
          <UiSelect
            width="3xs"
            items={automationOptions}
            selectedItem={defaultAutomationType}
            bgTrigger="white"
            placeholder="Automation Type"
            onChange={onAutomationTypeChange}
          />
          <UiSelect
            width="3xs"
            items={durationOptions}
            selectedItem={defaultDuration}
            bgTrigger="white"
            placeholder="Duration"
            onChange={onDurationChange}
          />
          <UiSelect
            width="3xs"
            items={groupByOptions}
            selectedItem={defaultGroupBy}
            bgTrigger="white"
            placeholder="Group By"
            onChange={onGroupByChange}
          />
        </Flex>
      </Flex>

      <Flex wrap="wrap" gap="4" mb="6">
        {eventConfig.map((event) => (
          <HStack key={event.key} gap="2">
            <Box boxSize="3" bg={event.color} borderRadius="sm" />
            <UiText fontSize="xs" color="gray.700" fontWeight="medium">
              {event.label}
            </UiText>
          </HStack>
        ))}
      </Flex>

      <Box h="250px" w="100%">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#A0AEC0" }}
              tickFormatter={(str) => {
                const date = new Date(str);
                if (isNaN(date.getTime())) return str;
                return date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                });
              }}
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#A0AEC0" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(label) => new Date(label).toDateString()}
            />
            {eventConfig.map((event) => (
              <Bar
                key={event.key}
                dataKey={event.key}
                stackId="a"
                fill={event.color}
                radius={[0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
