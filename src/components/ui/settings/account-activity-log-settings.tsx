import { Box, Stack } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { UiBadge } from "../badge";
import { CircleAlert } from "lucide-react";

const AccountActivityLogSettings = () => {
  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Activity Logs</UiText>
      </Box>

      <UiBox>
        <Stack direction="row" gap="4" align="center" justify="space-between">
          <Stack gap="4">
            <Stack direction="row" gap="4" align="center">
              <UiText variant="heading2">Activity Logs</UiText>
              <UiBadge status="new" icon={<CircleAlert size={18} />}>
                Beta
              </UiBadge>
            </Stack>
            <UiText variant="subheading" color="gray.400">
              View all actions performed within your Mailbot account
            </UiText>
          </Stack>
          <UiButton uiVariant="solid">View Activity Logs</UiButton>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountActivityLogSettings;
