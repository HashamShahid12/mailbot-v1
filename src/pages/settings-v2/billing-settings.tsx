import { Box, Stack } from "@chakra-ui/react";
import { UiTab } from "@/components/ui/tabs";
import BillingOverviewSettings from "@/components/ui/settings/billing-overview-settings";
import BillingAccountUsageSettings from "@/components/ui/settings/billing-account-usage-settings";
import BillingPaymentsHistorySettings from "@/components/ui/settings/billing-payments-history-settings";
import BillingPreferencesSettings from "@/components/ui/settings/billing-preferences-settings";



const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Account usage", value: "account_usage" },
  { label: "Preferences", value: "preferences" },
  { label: "Payment history", value: "payment_history" },
];


const CONTENT = {
  overview: <BillingOverviewSettings />,
  account_usage: <BillingAccountUsageSettings />,
  preferences: <BillingPreferencesSettings />,
  payment_history: <BillingPaymentsHistorySettings />,
};

export const BillingSettings = () => {
  return (
    <>
      <Box
        minW="940px"
        w="full"
        overflowX="auto"
        maxW="7xl"
        mx="auto"
        px="0"
        py="0"
        bg="white"
      >
        <Stack gap={2}>
          <UiTab
            defaultValue="overview"
            variant="column"
            tabs={TABS}
            noMarginLeft={true}
            noTriggerBorders
            tabContent={CONTENT}
            columnBorderRightRadius="xl"
            triggerBorderRadius="xl"
            triggerColor="#4b4d4e"
            triggerFontWeight="normal"
            selectedColor="#1d1e20"
            selectedFontWeight="medium"
          />
        </Stack>
      </Box>
    </>
  );
};
