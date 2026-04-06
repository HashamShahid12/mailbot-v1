import { Box, Center, Flex, Image, Link, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { UiSelect } from "../select";
import { UiText } from "../text";

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

const BillingPaymentsHistorySettings = () => {
  const [dateRange, setDateRange] = useState<string | undefined>();
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>();

  const dateRangeOptions = useMemo(
    () => [
      { label: "Last 30 days", value: "last_30_days" },
      { label: "Last month", value: "last_month" },
      { label: "Last 90 days", value: "last_90_days" },
      { label: "Last 365 days", value: "last_365_days" },
      { label: "This year", value: "this_year" },
      { label: "Last year", value: "last_year" },
      { label: "All time", value: "all_time" },
    ],
    [],
  );

  const paymentStatusOptions = useMemo(
    () => [
      { label: "All statuses", value: "all_statuses" },
      {
        label: "Finalized - awaiting payment",
        value: "finalized_awaiting_payment",
      },
      { label: "Draft", value: "draft" },
      { label: "Paid", value: "paid" },
      { label: "Closed and forgiven", value: "closed_and_forgiven" },
      { label: "Void", value: "void" },
    ],
    [],
  );

  const hasFilters = Boolean(dateRange || paymentStatus);

  return (
    <Stack maxW="720px" gap="6" p="2">
      <UiText variant="heading2" fontWeight="medium" color={textColor.title}>
        Payment history
      </UiText>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <UiText fontSize="xl" fontWeight="medium" color={textColor.title}>
            Invoices
          </UiText>

          <Flex align="center" gap="3" flexWrap="wrap">
            <UiSelect
              items={dateRangeOptions}
              placeholder="Date range"
              width="200px"
              selectedItem={dateRange}
              onChange={setDateRange}
              triggerPy="3"
              triggerPx="4"
            />
            <UiSelect
              items={paymentStatusOptions}
              placeholder="Payment status"
              width="220px"
              selectedItem={paymentStatus}
              onChange={setPaymentStatus}
              triggerPy="3"
              triggerPx="4"
            />
            <Link
              color="blue.200"
              fontWeight="medium"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
              onClick={(e) => {
                e.preventDefault();
                setDateRange(undefined);
                setPaymentStatus(undefined);
              }}
              visibility={hasFilters ? "visible" : "hidden"}
            >
              Clear
            </Link>
          </Flex>

          <Center py="20" flexDirection="column">
            <Box mb="6" opacity={0.4}>
              <Image
                src="/images/emptyApiKeyImage.svg"
                alt="No invoice data"
                width={260}
                height={260}
              />
            </Box>

            <UiText fontWeight="medium" fontSize="2xl" mb="1">
              No data available
            </UiText>
            <UiText color="gray.400" fontSize="xl">
              Refresh the page to try again.
            </UiText>
          </Center>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BillingPaymentsHistorySettings;
