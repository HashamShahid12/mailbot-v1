import React from "react";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UiText } from "../text";
import { UiSelect } from "../select";
import { durationOptions, groupByOptions } from "@/constants";

interface ChartDataPoint {
  key: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  totalValue: string | number;
  data: ChartDataPoint[];
  onDurationChange?: (value: string) => void;
  onGroupByChange?: (value: string) => void;
  defaultDuration?: string;
  defaultGroupBy?: string;
  loading?: boolean;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  totalValue,
  data,
  onDurationChange,
  onGroupByChange,
  defaultDuration = "30_days",
  defaultGroupBy = "daily",
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
            <Skeleton h="20px" w="100px" mb="2" />
            <Skeleton h="32px" w="140px" />
          </Box>
          <Flex gap="2">
            <Skeleton h="40px" w="100px" borderRadius="md" />
            <Skeleton h="40px" w="100px" borderRadius="md" />
          </Flex>
        </Flex>
        <Skeleton h="200px" w="full" borderRadius="md" />
      </Box>
    );
  }

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
          <UiText variant="heading2" fontWeight="bold" fontSize="2xl" mt="1">
            {totalValue}
          </UiText>
        </Box>
        <Flex gap="2">
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

      <Box h="200px" w="100%">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182ce" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3182ce" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="key"
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
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3182ce"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
