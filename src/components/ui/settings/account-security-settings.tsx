import { useState } from "react";
import {
  Box,
  Stack,
  Center,
  Switch,
  Separator,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { CircleAlert } from "lucide-react";
import UiTextLink from "../text-link";
import { DateRangeDropdown } from "../campaign-dropdown/date-range-dropdown";
import type { DateRange } from "react-day-picker";

const AccountSecuritySettings = () => {
  const [requireMfa, setRequireMfa] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectRange, setSelectRange] = useState("all");

  const handleSwitchChange = (details: { checked?: boolean }) => {
    if (details.checked) {
      setConfirmOpen(true);
      return;
    }

    setRequireMfa(false);
  };

  const onConfirmEnable = () => {
    setRequireMfa(true);
    setConfirmOpen(false);
  };

  const onCancelEnable = () => {
    setConfirmOpen(false);
  };

  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Security</UiText>
      </Box>

      <UiBox>
        <Stack gap="4" justify="space-between">
          <UiText variant="heading2">Improve your account security</UiText>
          <Stack gap="4" direction="row" justify="space-between">
            <Stack direction="row" gap="4">
              <Center
                bg="red.400"
                boxSize="10"
                borderRadius="full"
                flexShrink={0}
              >
                <Center bg="red.600" boxSize="6" borderRadius="full">
                  <CircleAlert size={14} color="white" />
                </Center>
              </Center>
              <Stack>
                <UiText
                  variant="subheading"
                  color="black"
                  fontWeight="semibold"
                >
                  Require MFA for all users
                </UiText>
                <UiText variant="subheading" color="gray.400">
                  Multi-factor authentication (MFA) helps reduce the risk of
                  unauthorized access to accounts.
                </UiText>
              </Stack>
            </Stack>
            <UiButton uiVariant="outline">Set up</UiButton>
          </Stack>
        </Stack>
      </UiBox>

      <UiBox>
        <Stack gap="4">
          <Stack direction="row" justify="space-between">
            <UiText variant="heading2">Klaviyo Remote Access</UiText>
            <UiButton uiVariant="outline" w="fit-content">
              Save
            </UiButton>
          </Stack>
          <UiText variant="subheading" color="gray.400">
            By granting access, you are giving Klaviyo explicit permission to
            edit, troubleshoot, and perform actions on your behalf.{" "}
            <UiTextLink
              href="https://chakra-ui.com"
              value="Learn more"
              color="blue.150"
              icon
            />
          </UiText>
          <Stack>
            <UiText variant="subheading" color="gray.400">
              Grant access until
            </UiText>
            <DateRangeDropdown
              range={selectedDateRange}
              selectRange={selectRange}
              setSelectRange={setSelectRange}
              onChange={(range) => {
                setSelectedDateRange(range);
              }}
              onApply={(range) => {
                console.log("Applied range:", range);
              }}
            />
          </Stack>
        </Stack>
      </UiBox>

      <UiBox>
        <Stack gap="4">
          <Stack direction="row" justify="space-between" align="center">
            <Stack>
              <UiText variant="heading2">MFA methods</UiText>
              <UiText variant="subheading">
                Verify yourself at login with an additional authentication
                method.
              </UiText>
            </Stack>
            <UiButton uiVariant="outline">Add method</UiButton>
          </Stack>

          <Separator />

          <Stack direction="row" align="center" justify="space-between">
            <UiText variant="subheading">
              Require for all users in your organization
            </UiText>
            <Stack direction="row" align="center" gap={2}>
              <Switch.Root
                checked={requireMfa}
                onCheckedChange={handleSwitchChange}
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </Stack>
          </Stack>

          <Dialog.Root
            open={confirmOpen}
            placement="center"
            size="lg"
            onOpenChange={(details) => {
              if (!details.open) onCancelEnable();
            }}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content
                  bg="white"
                  color="black"
                  borderRadius="xl"
                  boxShadow="lg"
                  p={6}
                  gap="4"
                >
                  <Dialog.Header>
                    <Dialog.Title fontSize="2xl">
                      Enable Multi-factor Authentication Requirement
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <UiText my="2" color="black" fontSize="xl">
                      Once enabled, all existing users who don't have
                      multi-factor authentication enabled will be required to
                      set it up the next time they log in to Mailbot.
                    </UiText>
                    <UiText my="2" color="black" fontSize="xl">
                      New users invited to your organization will be required to
                      set up multi-factor authentication upon registering.
                    </UiText>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <UiButton uiVariant="outline">Cancel</UiButton>
                    </Dialog.ActionTrigger>
                    <UiButton uiVariant="solid" onClick={onConfirmEnable}>
                      Enable
                    </UiButton>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild mt="2">
                    <CloseButton size="md" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <UiText variant="subheading" color="gray.400">
            Unchecking this box will not disable MFA for existing users of your
            company.
          </UiText>
          <UiTextLink
            href="https://chakra-ui.com"
            value="MFA increases the security of your Mailbot account."
            color="blue.150"
            fontSize="lg"
          />
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountSecuritySettings;
