
 "use client";
import React from "react";
import {
  Box,
  Center,
  Collapsible,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Separator,
  Stack,
} from "@chakra-ui/react";
import UiButton from "../button";
import { UiText } from "../text";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { UiSelect } from "../select";
import { CollapsibleIcon } from "../collapsible-icon";
import { ExternalLink, Info, X } from "lucide-react";

const cardStyle = {
  border: "1px solid",
  borderColor: "gray.200",
  rounded: "16px",
  bg: "white",
  boxShadow:
    "0px 1px 2px rgba(16, 24, 40, 0.06), 0px 8px 24px rgba(16, 24, 40, 0.08)",
  overflow: "hidden",
} as const;

const textColor = {
  title: "#1d1e20",
  muted: "#5b5d63",
} as const;

const chartBlue = "#2F7ED8";

type Timeframe = "3m" | "6m" | "12m";

const timeframeOptions = [
  { label: "Last 3 months", value: "3m" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last 12 months", value: "12m" },
];

const viewOptions = [{ label: "Overview", value: "overview" }];

const buildData = (tf: Timeframe) => {
  const full = [
    { label: "Jan 1 - Jan 31", abbr: "Jan", value: 0 },
    { label: "Feb 1 - Feb 28", abbr: "Feb", value: 0 },
    { label: "Mar 1 - Mar 31", abbr: "Mar", value: 1 },
  ];
  if (tf === "3m")
    return full.map((d) => ({ month: d.label, value: d.value }));
  if (tf === "6m") {
    const prev = [
      { label: "Oct 1 - Oct 31", abbr: "Oct", value: 0 },
      { label: "Nov 1 - Nov 30", abbr: "Nov", value: 0 },
      { label: "Dec 1 - Dec 31", abbr: "Dec", value: 0 },
    ];
    return [...prev, ...full].map((d) => ({ month: d.abbr, value: d.value }));
  }
  const last12 = [
    { label: "Jul 1 - Jul 31", abbr: "Jul", value: 0 },
    { label: "Aug 1 - Aug 31", abbr: "Aug", value: 0 },
    { label: "Sep 1 - Sep 30", abbr: "Sep", value: 0 },
    { label: "Oct 1 - Oct 31", abbr: "Oct", value: 0 },
    { label: "Nov 1 - Nov 30", abbr: "Nov", value: 0 },
    { label: "Dec 1 - Dec 31", abbr: "Dec", value: 0 },
    ...full,
  ];
  return last12.map((d) => ({ month: d.abbr, value: d.value }));
};

const chartCss = {
  "--chakra-colors-fg-muted": "#000000",
  ".recharts-cartesian-axis-tick-value": {
    fill: "#000000 !important",
  },
  ".recharts-polar-angle-axis-tick-value": {
    fill: "#000000 !important",
  },
  ".recharts-polar-radius-axis-tick-value": {
    fill: "#000000 !important",
  },
  ".recharts-pie-label-text": {
    fill: "#000000 !important",
  },
} as const;

type UsageDatum = { month: string; usage: number };

const UsageChart = ({
  data,
  yDomain,
  yTicks,
}: {
  data: UsageDatum[];
  yDomain: [number, number];
  yTicks: number[];
}) => {
  const chart = useChart({
    data,
    series: [{ name: "usage", color: chartBlue }],
  });

  return (
    <Box css={chartCss}>
      <Chart.Root h="220px" chart={chart}>
        <BarChart data={chart.data} margin={{ top: 8, right: 12, bottom: 22, left: 22 }}>
          <CartesianGrid stroke="#6b7280" strokeDasharray="0" vertical={false} />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={chart.key("month")}
            tickMargin={12}
            minTickGap={18}
            interval="preserveStartEnd"
            tick={{
              fill: "#000000",
              fontSize: 14,
              fontWeight: 700,
              opacity: 1,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={yDomain}
            ticks={yTicks}
            tick={{
              fill: "#000000",
              fontSize: 14,
              fontWeight: 700,
              opacity: 1,
            }}
            tickFormatter={(v: number) => String(v)}
          />
          <Tooltip
            cursor={{ fill: chart.color("bg.muted") }}
            animationDuration={0}
            content={<Chart.Tooltip />}
          />
          {chart.series.map((item) => (
            <Bar
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </Chart.Root>
    </Box>
  );
};

const UsageDropdownChart = ({
  title,
}: {
  title: string;
}) => {
  const [tf, setTf] = React.useState<Timeframe>("3m");
  const data = buildData(tf).map((d) => ({ month: d.month, usage: d.value }));

  return (
    <Box {...cardStyle}>
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger asChild cursor="pointer">
          <HStack justify="space-between" p="6">
            <HStack gap="4">
              <Box as={CollapsibleIcon} boxSize="8" bg="gray.600" borderRadius="2xl" />
              <UiText fontWeight="medium" color={textColor.title} fontSize="xl">
                {title}
              </UiText>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack p="6" gap="6">
            <Stack gap="2">
              <UiText fontWeight="normal" color={textColor.title}>
                Timeframe
              </UiText>
              <UiSelect
                size="sm"
                width="170px"
                bgTrigger="white"
                borderStyle="sm"
                triggerPy="1"
                triggerPx="2"
                items={timeframeOptions.map((o) => ({ label: o.label, value: o.value }))}
                selectedItem={tf}
                onChange={(val: string) => setTf(val as Timeframe)}
              />
            </Stack>

            <Stack gap="2">
              <UiText fontWeight="medium" color={textColor.title}>
                Active profiles per cycle
              </UiText>
              <UsageChart
                data={data}
                yDomain={[0, 1]}
                yTicks={[0, 0.5, 1]}
              />
            </Stack>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const EmailUsageDropdown = () => {
  const [tf, setTf] = React.useState<Timeframe>("3m");
  const [view, setView] = React.useState("overview");
  const data = buildData(tf).map((d) => ({ month: d.month, usage: d.value }));

  return (
    <Box {...cardStyle}>
      <Collapsible.Root defaultOpen={false}>
        <Collapsible.Trigger asChild cursor="pointer">
          <HStack justify="space-between" p="6">
            <HStack gap="4">
              <Box as={CollapsibleIcon} boxSize="8" bg="gray.600" borderRadius="2xl" />
              <UiText fontWeight="medium" color={textColor.title} fontSize="xl">
                Email usage
              </UiText>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack p="6" gap="6">
            <Flex gap="4" flexWrap="nowrap" overflowX="auto">
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  Timeframe
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={timeframeOptions.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                  selectedItem={tf}
                  onChange={(val: string) => setTf(val as Timeframe)}
                />
              </Stack>
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  View
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={viewOptions}
                  selectedItem={view}
                  onChange={(val: string) => setView(val)}
                />
              </Stack>
            </Flex>

            <Stack gap="2">
              <UiText fontWeight="medium" color={textColor.title}>
                Emails sent per cycle
              </UiText>
              <UsageChart
                data={data}
                yDomain={[0, 1.2]}
                yTicks={[0, 0.4, 0.8, 1.2]}
              />
            </Stack>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const UsageTabs = ({
  value,
  onChange,
}: {
  value: "credits" | "messages";
  onChange: (val: "credits" | "messages") => void;
}) => {
  return (
    <Stack gap="0">
      <HStack gap="6" align="end" px="1">
        <Box
          as="button"
          display="inline-block"
          borderBottom="2px solid"
          borderBottomColor={value === "credits" ? "black" : "transparent"}
          pb={2}
          cursor="pointer"
          onClick={() => onChange("credits")}
        >
          <UiText fontWeight={value === "credits" ? "semibold" : "normal"} fontSize="md">
            Credits used
          </UiText>
        </Box>
        <Box
          as="button"
          display="inline-block"
          borderBottom="2px solid"
          borderBottomColor={value === "messages" ? "black" : "transparent"}
          pb={2}
          cursor="pointer"
          onClick={() => onChange("messages")}
        >
          <UiText fontWeight={value === "messages" ? "semibold" : "normal"} fontSize="md">
            Messages sent
          </UiText>
        </Box>
      </HStack>
      <Separator mt="-1px" />
    </Stack>
  );
};

const TextMessageUsageDropdown = () => {
  const [tab, setTab] = React.useState<"credits" | "messages">("credits");
  const [tf, setTf] = React.useState<Timeframe>("3m");
  const [view, setView] = React.useState("overview");
  const data = buildData(tf).map((d) => ({ month: d.month, usage: d.value }));

  return (
    <Box {...cardStyle}>
      <Collapsible.Root defaultOpen={false}>
        <Collapsible.Trigger asChild cursor="pointer">
          <HStack justify="space-between" p="6">
            <HStack gap="4">
              <Box as={CollapsibleIcon} boxSize="8" bg="gray.600" borderRadius="2xl" />
              <UiText fontWeight="medium" color={textColor.title} fontSize="xl">
                Text message usage
              </UiText>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack p="6" gap="6">
            <UsageTabs value={tab} onChange={setTab} />

            <Flex gap="4" flexWrap="nowrap" overflowX="auto">
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  Timeframe
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={timeframeOptions.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                  selectedItem={tf}
                  onChange={(val: string) => setTf(val as Timeframe)}
                />
              </Stack>
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  View
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={viewOptions}
                  selectedItem={view}
                  onChange={(val: string) => setView(val)}
                />
              </Stack>
            </Flex>

            <Stack gap="2">
              <UiText fontWeight="medium" color={textColor.title}>
                {tab === "credits"
                  ? "Text message credits used per cycle"
                  : "Text messages sent per cycle"}
              </UiText>
              <UiText color={textColor.muted}>
                {tab === "credits"
                  ? "This graph shows how many text message credits you've used. "
                  : "This graph shows how many text messages you've sent. "}
                {tab === "credits" && (
                  <Link
                    href="#"
                    color="blue.200"
                    fontWeight="medium"
                    _hover={{ color: "blue.100", textDecoration: "underline" }}
                  >
                    Learn how you're charged for text messages{" "}
                    <Icon as={ExternalLink} boxSize="4" ml="1" />
                  </Link>
                )}
              </UiText>
              <UsageChart
                data={data}
                yDomain={[0, 1.2]}
                yTicks={[0, 0.4, 0.8, 1.2]}
              />
            </Stack>

            <Link
              href="#"
              color="blue.200"
              fontSize="lg"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
            >
              View text message ratios
            </Link>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const WhatsAppUsageDropdown = () => {
  const [tab, setTab] = React.useState<"credits" | "messages">("credits");
  const [tf, setTf] = React.useState<Timeframe>("3m");
  const [view, setView] = React.useState("overview");
  const data = buildData(tf).map((d) => ({ month: d.month, usage: d.value }));

  return (
    <Box {...cardStyle}>
      <Collapsible.Root defaultOpen={false}>
        <Collapsible.Trigger asChild cursor="pointer">
          <HStack justify="space-between" p="6">
            <HStack gap="4">
              <Box as={CollapsibleIcon} boxSize="8" bg="gray.600" borderRadius="2xl" />
              <UiText fontWeight="medium" color={textColor.title} fontSize="xl">
                WhatsApp usage
              </UiText>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack p="6" gap="6">
            <UsageTabs value={tab} onChange={setTab} />

            <Flex gap="4" flexWrap="nowrap" overflowX="auto">
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  Timeframe
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={timeframeOptions.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                  selectedItem={tf}
                  onChange={(val: string) => setTf(val as Timeframe)}
                />
              </Stack>
              <Stack gap="2">
                <UiText fontWeight="normal" color={textColor.title}>
                  View
                </UiText>
                <UiSelect
                  size="sm"
                  width="170px"
                  bgTrigger="white"
                  borderStyle="sm"
                  triggerPy="1"
                  triggerPx="2"
                  items={viewOptions}
                  selectedItem={view}
                  onChange={(val: string) => setView(val)}
                />
              </Stack>
            </Flex>

            <Stack gap="2">
              <UiText fontWeight="medium" color={textColor.title}>
                {tab === "credits"
                  ? "WhatsApp credits used per cycle"
                  : "WhatsApp messages sent per cycle"}
              </UiText>
              <UiText color={textColor.muted}>
                {tab === "credits"
                  ? "This graph shows how many WhatsApp credits you've used."
                  : "This graph shows how many WhatsApp messages you've sent."}
              </UiText>
              <UsageChart
                data={data}
                yDomain={[0, 1.2]}
                yTicks={[0, 0.4, 0.8, 1.2]}
              />
            </Stack>

            <Link
              href="#"
              color="blue.200"
              fontSize="lg"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
            >
              View WhatsApp ratios
            </Link>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const HistoryOfPlanChangesDropdown = () => {
  return (
    <Box {...cardStyle}>
      <Collapsible.Root defaultOpen={false}>
        <Collapsible.Trigger asChild cursor="pointer">
          <HStack justify="space-between" p="6">
            <HStack gap="4">
              <Box as={CollapsibleIcon} boxSize="8" bg="gray.600" borderRadius="2xl" />
              <UiText fontWeight="medium" color={textColor.title} fontSize="xl">
                History of plan changes
              </UiText>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack p="6">
            <Center py={20} flexDirection="column">
              <Box mb={6} opacity={0.4}>
                <Image
                  src="/images/emptyApiKeyImage.svg"
                  alt="No plan changes"
                  width={260}
                  height={260}
                />
              </Box>
              <UiText fontWeight="medium" fontSize="2xl" mb={1}>
                Your plan changes will appear here
              </UiText>
              <UiText color="gray.400" fontSize="xl">
                Plan changes are only shown for paid plans.
              </UiText>
            </Center>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const BillingAccountUsageSettings = () => {
  const [showNotice, setShowNotice] = React.useState(true);
  return (
    <Stack maxW="720px" gap={6} p="2">
      {showNotice && (
        <Flex
          align="center"
          justify="space-between"
          bg="#DBEAFE"
          border="1px solid"
          borderColor="#BFDBFE"
          color="#001c60"
          rounded="2xl"
          px="5"
          py="3"
          gap="4"
        >
          <HStack gap="3" align="center" flex="1">
            <Box
              boxSize="7"
              rounded="full"
              bg="#3B82F6"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              flexShrink={0}
            >
              <Info size={16} />
            </Box>
            <UiText fontSize="sm" color="#001c60" fontWeight="normal">
              Plan changes may update your billing date and adjust how past usage is
              displayed. Access usage data from the last 12 cycles in the Historical
              Usage Download report.
            </UiText>
          </HStack>
          <IconButton
            aria-label="Close notice"
            size="sm"
            variant="ghost"
            color="#2563EB"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            onClick={() => setShowNotice(false)}
          >
            <X size={16} />
          </IconButton>
        </Flex>
      )}

      <Flex justify="space-between" align="center">
        <Stack gap={1}>
          <UiText variant="heading2" fontWeight="medium" color={textColor.title}>
            Account usage
          </UiText>
          <UiText color={textColor.muted}>
            Download a report of your billing history and plan usage.
          </UiText>
        </Stack>
        <UiButton uiVariant="outline">Download</UiButton>
      </Flex>

      <UsageDropdownChart title="Active profiles usage" />
      <EmailUsageDropdown />
      <TextMessageUsageDropdown />
      <WhatsAppUsageDropdown />
      <HistoryOfPlanChangesDropdown />
    </Stack>
  );
};

export default BillingAccountUsageSettings
