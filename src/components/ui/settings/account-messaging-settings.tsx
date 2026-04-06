import { RadioGroup, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";

const DEFAULT_SINGLE_CHANNEL_RULE = "at_scheduling";

const AccountMessagingSettings = () => {
  const [singleChannelRule, setSingleChannelRule] = useState(
    DEFAULT_SINGLE_CHANNEL_RULE,
  );

  const hasChanges = useMemo(
    () => singleChannelRule !== DEFAULT_SINGLE_CHANNEL_RULE,
    [singleChannelRule],
  );

  const onSave = () => {
    console.log({ singleChannelRule });
  };

  return (
    <Stack maxW="720px" gap={4}>
      <UiText variant="heading2">Messaging</UiText>

      <UiBox
        heading="Campaign sending defaults"
        actions={
          <UiButton uiVariant="solid" disabled={!hasChanges} onClick={onSave}>
            Save
          </UiButton>
        }
        showLayout
      >
        <Stack gap={6}>
          <Stack gap={1}>
            <UiText variant="subheading">Single channel campaigns</UiText>
            <UiText variant="body" color="gray.400">
              Choose when eligible recipients are determined before sending.
            </UiText>
          </Stack>

          <RadioGroup.Root
            value={singleChannelRule}
            onValueChange={(details) => {
              if (details.value) setSingleChannelRule(details.value);
            }}
          >
            <Stack gap={4}>
              <RadioGroup.Item value="at_scheduling">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  <UiText variant="body">At time of scheduling</UiText>
                  <UiText variant="caption" color="gray.400">
                    Recipients are determined shortly after the scheduling
                    request completes. Changes to recipients after scheduling may
                    not be applied.
                  </UiText>
                </RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="at_send_time">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  <UiText variant="body">At send time</UiText>
                  <UiText variant="caption" color="gray.400">
                    Recipients are determined as close to send time as possible.
                    Send may start slightly later, but all eligible recipients
                    are included.
                  </UiText>
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>

          <Stack gap={1}>
            <UiText variant="subheading">Omnichannel campaigns</UiText>
            <UiText variant="body" color="gray.400">
              Recipients are always determined at send time.
            </UiText>
          </Stack>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountMessagingSettings;
