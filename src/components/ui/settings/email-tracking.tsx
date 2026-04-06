import { Box, Checkbox, HStack, RadioGroup, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";

const DEFAULT_EMAIL_TO_WEB_TRACKING = true;
const DEFAULT_TRACKER_POSITION = "bottom";

const EmailTracking = () => {
  const [emailToWebTracking, setEmailToWebTracking] = useState(
    DEFAULT_EMAIL_TO_WEB_TRACKING,
  );
  const [trackerPosition, setTrackerPosition] = useState(
    DEFAULT_TRACKER_POSITION,
  );

  const hasChanges = useMemo(
    () =>
      emailToWebTracking !== DEFAULT_EMAIL_TO_WEB_TRACKING ||
      trackerPosition !== DEFAULT_TRACKER_POSITION,
    [emailToWebTracking, trackerPosition],
  );

  const onSave = () => {
    console.log({ emailToWebTracking, trackerPosition });
  };

  return (
    <Stack maxW="720px" gap={4}>
      <HStack justify="space-between" align="start">
        <UiText variant="heading2">Tracking</UiText>
        <UiButton uiVariant="solid" disabled={!hasChanges} onClick={onSave}>
          Save
        </UiButton>
      </HStack>

      <UiBox>
        <Stack gap={4}>
          <UiText variant="subheading">Email to website tracking</UiText>

          <Checkbox.Root
            checked={emailToWebTracking}
            onCheckedChange={(e) => setEmailToWebTracking(!!e.checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control
              mt="1"
              border="sm"
              borderColor="blackAlpha.100"
              _checked={{ bg: "blue.200", borderColor: "blue.200" }}
            />
            <Checkbox.Label>
              <UiText variant="body">Turn on email-to-website activity tracking</UiText>
              <HStack gap={1} align="center" wrap="wrap">
                <UiText variant="caption" color="gray.400">
                  If turned on, make sure you have the Klaviyo Analytics snippet
                  installed on your site.
                </UiText>
                <HStack gap={1} color="blue.200" align="center">
                  <UiText variant="caption" color="blue.200">
                    Learn more
                  </UiText>
                  <ExternalLink size={13} />
                </HStack>
              </HStack>
            </Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </UiBox>

      <UiBox>
        <Stack gap={4}>
          <UiText variant="subheading">Email tracker position</UiText>

          <UiText variant="body">
            Tracking pixels record when someone opens or clicks into an email.
            By default, the pixel is added to the bottom of the email to
            minimize impact on design. If you have long emails that get
            truncated, you can ensure accurate tracking by placing the tracking
            pixel at the top of your emails.
          </UiText>

          <Box>
            <UiText variant="body" mb={2}>
              Place pixel at the:
            </UiText>

            <RadioGroup.Root
              value={trackerPosition}
              onValueChange={(details) => {
                if (details.value) setTrackerPosition(details.value);
              }}
            >
              <Stack gap={3}>
                <RadioGroup.Item value="top">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>
                    <UiText variant="body">Top of email content</UiText>
                    <UiText variant="caption" color="gray.400">
                      Ensures accurate tracking for long emails that get
                      truncated
                    </UiText>
                  </RadioGroup.ItemText>
                </RadioGroup.Item>

                <RadioGroup.Item value="bottom">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>
                    <UiText variant="body">Bottom of email content (default)</UiText>
                    <UiText variant="caption" color="gray.400">
                      Minimizes impact to design
                    </UiText>
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              </Stack>
            </RadioGroup.Root>
          </Box>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default EmailTracking;
