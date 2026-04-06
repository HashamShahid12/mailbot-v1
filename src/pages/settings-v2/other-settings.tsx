import { Box, Stack } from "@chakra-ui/react";
import { UiTab } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import OtherConsentSettings from "@/components/ui/settings/other-consent-settings";
import OtherWebFeedSettings from "@/components/ui/settings/other-web-feed-settings";
import OtherProfileMaintenanceSettings from "@/components/ui/settings/other-profile-maintenance";
import Downloads from "../downloads/downloads";
import OtherUtmTracking from "@/components/ui/settings/other-utm-tracking";

const TABS = [
  { label: "Consent pages", value: "consent" },
  { label: "Web feeds", value: "web" },
  { label: "Profile maintenance", value: "profile" },
  { label: "UTM tracking", value: "utm" },
  { label: "Back in stock reports", value: "stock" },
  { label: "Downloads", value: "downloads" },
];

const CONTENT = {
  consent: <OtherConsentSettings />,
  web: <OtherWebFeedSettings />,
  profile: <OtherProfileMaintenanceSettings />,
  utm: <OtherUtmTracking />,
  stock: "others",
  downloads: <Downloads />,
};

export const OtherSettings = () => {
  const navigate = useNavigate();

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
            defaultValue="consent"  
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
            onChange={(val) => {
              if (val === "downloads") navigate("/downloads");
            }}
          />
        </Stack>
      </Box>
    </>
  );
};
