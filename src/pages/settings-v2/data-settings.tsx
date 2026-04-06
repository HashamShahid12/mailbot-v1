import { Box, Checkbox, HStack, Stack } from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";

export const DataSettings = () => {
  return (
    <Box w="full" display="flex" justifyContent="center">
    <Stack maxW="720px" w="full" gap={4}>
      {/* Page heading */}
      <Box pt="5" pb="1">
        <UiText variant="heading2" fontWeight="medium">Data Preferences</UiText>
      </Box>

      {/* Anonymous visitor tracking card */}
      <UiBox>
        <Stack gap={4}>
          <HStack justify="space-between" align="center">
            <UiText variant="subheading" fontWeight="bold">
              Anonymous visitor tracking
            </UiText>
            <UiButton uiVariant="plain" disabled>
              Update
            </UiButton>
          </HStack>

          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control
              mt="1"
              border="sm"
              borderColor="blackAlpha.100"
              _checked={{ bg: "blue.200", borderColor: "blue.200" }}
            />
            <Checkbox.Label>
              <UiText variant="body">
                Enable anonymous visitor tracking
              </UiText>
              <UiText mt={1} variant="caption" color="gray.400">
                Track each site visitor's activity before they're identified.
                Once they become a profile, any tracked activity and behavior
                will be backfilled.
              </UiText>
            </Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </UiBox>

      {/* Extended ID card */}
      <UiBox>
        <Stack gap={4}>
          <HStack justify="space-between" align="center">
            <UiText variant="subheading" fontWeight="bold">
              Extended ID
            </UiText>
            <HStack gap={2}>
              <UiButton uiVariant="outline">Advanced Options</UiButton>
              <UiButton uiVariant="plain" disabled>
                Update
              </UiButton>
            </HStack>
          </HStack>

          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control
              mt="1"
              border="sm"
              borderColor="blackAlpha.100"
              _checked={{ bg: "blue.200", borderColor: "blue.200" }}
            />
            <Checkbox.Label>
              <UiText variant="body">Enable Extended ID tracking</UiText>
              <UiText mt={1} variant="caption" color="gray.400">
                Track web visitors and create personalized experiences by
                extending cookies indefinitely with our first-party identity
                graph.
              </UiText>
            </Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </UiBox>
    </Stack>
    </Box>
  );
};
