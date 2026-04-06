import { Box, Stack } from "@chakra-ui/react";
import { UiTab } from "@/components/ui/tabs";
import UserPersonalSettings from "@/components/ui/settings/user-personal-settings";
import AccountOrganizationSettings from "@/components/ui/settings/account-organization-settings";
import AccountUsersSettings from "@/components/ui/settings/account-users-settings";
import AccountMessagingSettings from "@/components/ui/settings/account-messaging-settings";
import AccountDomainSettings from "@/components/ui/settings/account-domain-settings";
import AccountApiKeySettings from "@/components/ui/settings/account-api-key-settings";
import AccountActivityLogSettings from "@/components/ui/settings/account-activity-log-settings";
import AccountSecuritySettings from "@/components/ui/settings/account-security-settings";
import AccountTestingSettings from "@/components/ui/settings/account-testing-settings";
import AccountTagsSettings from "@/components/ui/settings/account-tags-settings";

const TABS = [
  { label: "Personal", value: "personal" },
  { label: "Organization", value: "organization" },
  { label: "Users", value: "users" },
  { label: "Messaging", value: "messaging" },
  { label: "Domains", value: "domains" },
  { label: "API keys", value: "api_keys" },
  { label: "Activity log", value: "activity_log" },
  { label: "Security", value: "security" },
  { label: "Tags", value: "tags" },
  { label: "Testing", value: "testing" },
];

const CONTENT = {
  personal: <UserPersonalSettings />,
  organization: <AccountOrganizationSettings />,
  users: <AccountUsersSettings />,
  messaging: <AccountMessagingSettings />,
  domains: <AccountDomainSettings />,
  api_keys: <AccountApiKeySettings />,
  activity_log: <AccountActivityLogSettings />,
  security: <AccountSecuritySettings />,
  tags: <AccountTagsSettings />,
  testing: <AccountTestingSettings />,
};

export const AccountSettings = () => {
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
            defaultValue="personal"
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
