import { getBusinessPerformance } from "@/api/dashboard-api";
import { PopoverMenu } from "@/components/ui";
import { FlexibleDropdown } from "@/components/ui/dropdown";
import type { BusinessPerformanceData } from "@/types/user-type";
import { format } from "date-fns";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import UiLink from "@/components/ui/link";

import { Box, Button, Flex, Grid, Icon, Stat, Text } from "@chakra-ui/react";

import {
  ClockIcon,
  SendIcon,
  MailIcon,
  SmartphoneIcon,
  UserIcon,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import ActiveSiteDropDown from "@/components/ui/dropdown/active-site-dropdown";
// import { BsThreeDotsVertical } from "react-icons/bs";

const timeOptions = [
  { label: "Today", value: "today" },
  { label: "Week-to-date", value: "7d" },
  { label: "Month-to-date", value: "30d" },
  { label: "Last 7 Days", value: "last7days" },
  { label: "Last 30 days", value: "last30day" },
  { label: "Custom", value: "custom" },
];
const comparisonOptions = [
  { label: "Previous period", value: "today" },
  { label: "Previous year", value: "7d" },
  { label: "Custom", value: "custom" },
];

const ConversionStat = ({
  label,
  value,
  helpText,
  icon,
}: {
  label: string;
  value: string | number;
  helpText?: string;
  icon?: React.ReactNode;
}) => (
  <Flex direction="column" fontSize="sm" align="flex-start" gap="1">
    <Flex align="center" gap="2">
      <Box boxSize="5" as={Icon} display="flex" alignItems="center">
        {icon}
      </Box>
      <Text fontWeight="semibold">{label}</Text>
    </Flex>
    <Stat.Root>
      <Stat.ValueText fontSize="sm" fontWeight="normal">
        {value}
      </Stat.ValueText>
      {helpText && (
        <Stat.HelpText fontSize="sm" color="gray.400" _dark={{ color: "gray.500" }}>
          {helpText}
        </Stat.HelpText>
      )}
    </Stat.Root>
  </Flex>
);

const BusinessPerformanceCard = () => {
  const [selected, setSelected] = useState(["all"]);
  const [comparisonSelected, setComparisonSelected] = useState(["Custom"]);
  const [data, setData] = useState<BusinessPerformanceData | null>(null);
  const [activeSiteFilter, setActiveSiteFilter] = useState<string | null>(
    "API"
  );

  useEffect(() => {
    getBusinessPerformance().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Flex gap="3">
        <ActiveSiteDropDown
          selected={activeSiteFilter}
          onChange={setActiveSiteFilter}
        />
        <PopoverMenu
          contentProps={{
            minW: "300px",
            minH: "280px",
            border: "1px solid",
            borderColor: "gray.300",
            padding: "5",
            borderRadius: "sm",
            boxShadow: "xl",
          }}
          placement="bottom-start"
          trigger={
            <UiText
              bg="white"
              rounded="sm"
              px="3"
              border="sm"
              borderColor="blackAlpha.100"
              display="flex"
              alignItems="center"
              fontSize="md"
              fontWeight="medium"
              cursor="pointer"
              _dark={{ bg: "gray.900", color: "white", }}
              _hover={{ bg: "gray.600", textDecoration: "none" }}
            >
              <Icon as={Calendar} boxSize="5" mr="2" />
              Time period
            </UiText>
          }
        >
          <Flex direction="column" gap="3">
            <UiText>Time period</UiText>
            <FlexibleDropdown
              label={
                timeOptions.find((opt) => opt.value === selected[0])?.label ||
                "Select"
              }
              selectedValues={selected}
              onChange={(val) => setSelected(val)}
              buttonWidth="16rem"
              buttonHeight="35px"
            >
              <Flex direction="column">
                {timeOptions.map((opt) => {
                  const isSelected = selected.includes(opt.value);
                  return (
                    <Box
                      key={opt.value}
                      cursor="pointer"
                      px={3}
                      py={1}
                      bg={isSelected ? "#E3F7FF" : "transparent"}
                      borderLeft={
                        isSelected ? "4px solid #2972BB" : "transparent"
                      }
                      fontWeight={isSelected ? "semibold" : "normal"}
                      _hover={{ bg: "gray.100" }}
                      _focus={{ bg: "blue.100" }}
                      onClick={() => setSelected([opt.value])}
                    >
                      {opt.label}
                    </Box>
                  );
                })}
              </Flex>
            </FlexibleDropdown>
            <UiText>Comparison period</UiText>
            <FlexibleDropdown
              label={
                comparisonOptions.find(
                  (opt) => opt.value === comparisonSelected[0]
                )?.label || "Select"
              }
              selectedValues={comparisonSelected}
              onChange={(val) => setComparisonSelected(val)}
              buttonWidth="16rem"
              buttonHeight="35px"
            >
              <Flex direction="column">
                {comparisonOptions.map((opt) => {
                  const isSelected = comparisonSelected.includes(opt.value);
                  return (
                    <Box
                      key={opt.value}
                      cursor="pointer"
                      px={3}
                      py={1}
                      bg={isSelected ? "#E3F7FF" : "transparent"}
                      borderLeft={
                        isSelected ? "4px solid #2972BB" : "transparent"
                      }
                      fontWeight={isSelected ? "semibold" : "normal"}
                      _hover={{ bg: "gray.100" }}
                      _focus={{ bg: "blue.100" }}
                      onClick={() => setComparisonSelected([opt.value])}
                    >
                      {opt.label}
                    </Box>
                  );
                })}
              </Flex>
            </FlexibleDropdown>
            <Flex gap="2" mt="2">
              <Button borderRadius="md" fontWeight="medium" p="4">
                Apply
              </Button>
              <Button borderRadius="md" fontWeight="medium" p="4">
                Cancel
              </Button>
            </Flex>
          </Flex>
        </PopoverMenu>
        <UiText lineHeight="shorter">
          May 17, 2025 - May 24, 2025 compared to <br /> previous year
        </UiText>
      </Flex>
      <UiBox _dark={{ bg: "gray.900" }}>
        <Flex justify="space-between" align="center" mb="4">
          <Box>
            <UiText variant="subheading">Business performance summary</UiText>
            {data?.dateRange?.from && data?.dateRange?.to && (
              <UiText color="gray.400">
                {format(new Date(data.dateRange.from), "MMM d, yyyy")} –{" "}
                {format(new Date(data.dateRange.to), "MMM d, yyyy")}
              </UiText>
            )}
          </Box>
          <UiLink href="#">View dashboard</UiLink>
        </Flex>

        <Grid
          templateColumns={["1fr", "1fr 1fr"]}
          gap="6"
          p="4"
          border="sm"
          borderColor="gray.300"
          rounded="md"
          mb="6"
        >
          <Stat.Root>
            <Stat.ValueText fontSize="4xl">
              {data?.totalConversions}
            </Stat.ValueText>
            <Stat.Label fontSize="md" color="gray.400" fontWeight="semibold" _dark={{ color: "gray.500" }}>
              Total conversions
            </Stat.Label>
            <Stat.HelpText fontSize="md" color="black">
              0% vs. previous period
            </Stat.HelpText>
          </Stat.Root>

          <Stat.Root>
            <Stat.ValueText fontSize="4xl">
              {data?.attributedConversions}
            </Stat.ValueText>
            <Stat.Label fontSize="md" color="gray.400" fontWeight="semibold" _dark={{ color: "gray.500" }}>
              Attributed conversions (0.00% of total)
            </Stat.Label>
            <Stat.HelpText fontSize="md" color="black">
              0% vs. previous period
            </Stat.HelpText>
          </Stat.Root>
        </Grid>

        <UiText fontWeight="semibold" mb="5" >
          Attributed conversions
        </UiText>

        <Grid templateColumns={["1fr", "repeat(5, 1fr)"]} gap="6">
          <ConversionStat
            icon={<Icon as={ClockIcon} />}
            label="Conversion rate"
            value={data?.conversionRate ?? "0"}
          />
          <ConversionStat
            icon={<Icon as={SendIcon} />}
            label="Campaigns"
            value={data?.campaigns ?? "0"}
            helpText="0.00%"
          />
          <ConversionStat
            icon={<Icon as={UserIcon} />}
            label="Flows"
            value={data?.flows ?? "0"}
            helpText="0.00%"
          />
          <ConversionStat
            icon={<Icon as={MailIcon} />}
            label="Email"
            value={data?.email ?? "0"}
            helpText="0.00%"
          />
          <ConversionStat
            icon={<Icon as={SmartphoneIcon} />}
            label="SMS"
            value={data?.sms ?? "0"}
            helpText="0.00%"
          />
        </Grid>
      </UiBox>
    </>
  );
};

export default BusinessPerformanceCard;
