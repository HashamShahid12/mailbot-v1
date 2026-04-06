import { useState } from "react";
import { Box, Stack, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { UiBadge } from "../badge";
import UiTextLink from "../text-link";
import FormField from "../input";

const AccountTestingSettings = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onConfirmEnable = () => {
    setConfirmOpen(false);
  };

  const onCancelEnable = () => {
    setConfirmOpen(false);
  };
  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Testing</UiText>
      </Box>

      <UiBox>
        <Stack gap="4">
          <Stack justify="space-between" direction="row" gap="4">
            <Stack direction="row" gap="4" align="center">
              <UiText variant="heading2">Test account</UiText>
              <UiBadge status="pending" icon>
                Inactive
              </UiBadge>
            </Stack>
            <UiButton uiVariant="solid" onClick={() => setConfirmOpen(true)}>
              Convert to test account
            </UiButton>
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
                      Convert to test account
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <UiText my="2" color="black" fontSize="xl">
                      You’re about to convert this account into a test account.
                      Please note that once the account is converted, you will
                      not be able to reverse this action without the help of
                      support.{" "}
                      <UiTextLink
                        href="/"
                        value="Learn more"
                        icon
                        color="blue.150"
                      />
                    </UiText>

                    <Stack my={6}>
                      <UiText color="black" fontSize="xl">
                        Type CONVERT to confirm
                      </UiText>
                      <FormField type={"text"} placeholder="Company name" />
                    </Stack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <UiButton uiVariant="outline">Cancel</UiButton>
                    </Dialog.ActionTrigger>
                    <UiButton
                      uiVariant="solid"
                      bg="red"
                      onClick={onConfirmEnable}
                      _hover={{
                        bg: "red.200",
                      }}
                    >
                      Convert account
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
            Convert this account if you plan to use it for testing. There will
            be minor visual changes, but the account will have the same features
            and functionality as a production account. Please note that once the
            account is converted, you will not be able to reverse this action
            without the help of support.{" "}
            <UiTextLink href="/" value="Learn more" icon color="blue.150" />
          </UiText>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountTestingSettings;
