import { Box, Stack } from "@chakra-ui/react";
import { AccountSettings } from "./account-settings";
import { UiText } from "@/components/ui/text";
import { UiTab } from "@/components/ui/tabs";
import { EmailSettings } from "./email-settings";
import { BillingSettings } from "./billing-settings";
import { DataSettings } from "./data-settings";
import { WhatsAppSettings } from "./whatsapp-settings";
import AttributionSettings from "./attribution-settings";
import MonitorSettings from "./monitor-settings";
import { OtherSettings } from "./other-settings";

const TABS = [
  { label: "Account", value: "account" },
  { label: "Billing", value: "billing" },
  { label: "Email", value: "email" },
  { label: "Text message", value: "text_message" },
  // { label: "Push notifications", value: "push_notifications" },
  { label: "Attribution", value: "attribution" },
  { label: "Data", value: "data" },
  { label: "Monitors", value: "monitors" },
  { label: "WhatsApp", value: "whatsapp" },
  // { label: "Instagram", value: "instagram" },
  // { label: "Web chat", value: "web_chat" },
  { label: "Other", value: "other" },
];

const CONTENT = {
  account: <AccountSettings />,
  billing: <BillingSettings />,
  email: <EmailSettings />,
  data: <DataSettings />,
  whatsapp: <WhatsAppSettings />,
  attribution: <AttributionSettings />,
  monitors: <MonitorSettings />,
  other: <OtherSettings />,
};
export const Settings = () => {
  return (
    <>
      <Box
        minW="940px"
        w="full"
        overflowX="auto"
        mx="auto"
        px="6"
        py="5"
        bg="white"
        border="2px solid"
        borderColor="gray.200"
      >
        <UiText mb={4} variant="heading2">Settings</UiText>
        <Stack gap={2}>
          <UiTab
            defaultValue="account"
            variant="minimal"
            tabs={TABS}
            tabContent={CONTENT}
            noMarginLeft
          />
        </Stack>
      </Box>
    </>
  );
};
