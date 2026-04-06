import { useState } from "react";
import { Stack, HStack, Box } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { UiSelect } from "../select";
import UiTextLink from "../text-link";

const OtherProfileMaintenanceSettings = () => {
  const [selectedList, setSelectedList] = useState<string | undefined>();

  // Mock data for the select items
  const listItems = [
    { value: "email", label: "Email list" },
    { value: "60", label: "Engaged (60 Days)" },
    { value: "90", label: "Engaged (90 Days)" },
    { value: "new", label: "New Subscribers" },
    { value: "preview", label: "Preview List" },
    { value: "sms", label: "SMS List" },
  ];

  return (
    <Stack maxW="720px" gap={4}>
      <UiText variant="heading2">Profile maintenance</UiText>

      <UiBox>
        <Stack gap={6}>
          <Stack gap={1}>
            <UiText variant="subheading" fontWeight="semibold">
              Remove Profiles
            </UiText>
            <UiText color="gray.400" fontSize="sm">
              To delete people from Mailbot, create a list of those people and
              then select it below:
            </UiText>
          </Stack>

          <HStack gap={4} align="center">
            <UiSelect
              searchBar
              width="xs"
              placeholder="Select a list to delete"
              items={listItems}
              selectedItem={selectedList}
              onItemChange={(val) => setSelectedList(val)}
            />
            <UiButton uiVariant="outline" disabled={!selectedList}>
              Delete People
            </UiButton>
          </HStack>

          {/* Footer Text with Link */}
          <Box mt={4}>
            <UiText color="gray.400">
              See profiles that were deleted from your account in compliance
              with data protection laws{" "}
              <UiTextLink
                href="/compliance-logs"
                value="here"
                color="blue.200"
              />
              .
            </UiText>
          </Box>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default OtherProfileMaintenanceSettings;
