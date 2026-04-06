import { Box, Stack } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";

const AccountDomainSettings = () => {
  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Domains</UiText>
      </Box>

      <UiBox
        heading="Branded email sending domain"
        description="Improve your email deliverability with a branded sending domain. By default, emails use a Klaviyo domain."
        actions={<UiButton uiVariant="solid">Add Domain</UiButton>}
        showLayout
      />
    </Stack>
  );
};

export default AccountDomainSettings;
