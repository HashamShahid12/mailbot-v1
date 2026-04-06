import { Box, Stack } from "@chakra-ui/react";
import { UiTab } from "@/components/ui/tabs";
import EmailSenderInfo from "@/components/ui/settings/email-sender-info";
import EmailSenderPref from "@/components/ui/settings/email-sender-pref";
import EmailTracking from "@/components/ui/settings/email-tracking";

const TABS = [
  { label: "Sender Information", value: "sender_info" },
  { label: "Sender Preferences", value: "sender_preferences" },
  { label: "Tracking", value: "tracking" },
];

const CONTENT = {
  sender_info: <EmailSenderInfo />,
  sender_preferences: <EmailSenderPref />,
  tracking: <EmailTracking />,
};

export const EmailSettings = () => {
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
            defaultValue="sender_info"
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
