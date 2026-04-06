import { Box, Stack } from "@chakra-ui/react";
import { UiTab } from "@/components/ui/tabs";
import PushMobileAppSettings from "@/components/ui/settings/push-mobile-app-settings";



const TABS = [
  { label: "Mobile app settings", value: "mobile_app_settings" },
  { label: "Sender Preferences", value: "sender_preferences" },
  { label: "Universal & app links", value: "universal_app_links" },
];

const CONTENT = {
  mobile_app_settings: <PushMobileAppSettings />,
  sender_preferences: "hello",
  universal_app_links: "hello",
};

export const PushNotificationsSettings = () => {
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
            defaultValue="mobile_app_settings"  
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
