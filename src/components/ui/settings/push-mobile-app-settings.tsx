import { Box, Stack } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";

const PushMobileAppSettings = () => {
  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Mobile app settings</UiText>
      </Box>

      <UiBox
        heading="iOS"
        description="Send push notifications to iOS users via Klaviyo campaigns and flows."
        actions={<UiButton uiVariant="solid">Enable</UiButton>}
        showLayout
        
      />
      <UiBox
        heading="Android"
        description="Send push notifications to Android users via Klaviyo campaigns and flows."
        actions={<UiButton uiVariant="solid">Enable</UiButton>}
        showLayout
      />
    </Stack>
  );
};

export default PushMobileAppSettings;
