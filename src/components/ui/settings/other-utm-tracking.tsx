import React, { useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Flex,
  Checkbox,
  Switch,
  Separator,
} from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { UiSelect } from "@/components/ui/select";
import UiTextLink from "@/components/ui/text-link";

const CAMPAIGN_VALUE_OPTIONS = [
  // --- Static values ---
  { label: "Klaviyo", value: "Klaviyo" },
  { label: "campaign", value: "campaign" },
  { label: "email", value: "email" },
  { label: "sms", value: "sms" },
  { label: "whatsapp", value: "whatsapp" },

  // --- Dynamic values ---
  {
    label: "Campaign id",
    value: "{id}",
    description: "e.g. X02FCw",
  },
  {
    label: "Campaign name",
    value: "{name}",
    description: "e.g. Fall Launch",
  },
  {
    label: "Campaign name (campaign id)",
    value: "{name} ({id})",
    description: "e.g. Fall Launch (X02FCw)",
  },
  {
    label: "Campaign name (send date)",
    value: "{name} ({send_day})",
    description: "e.g. Fall Launch (2017-09-18)",
  },
  {
    label: "Email subject",
    value: "{email_subject}",
    description: "e.g. Check out our best-sellers",
  },
  {
    label: "External id ($id)",
    value: "{customer_external_id}",
    description: "e.g. x92jdjfhs",
  },
  {
    label: "Klaviyo profile id",
    value: "{customer_id}",
    description: "e.g. Csw93s",
  },
  {
    label: "Link text or alt text",
    value: "$$$__LINK_TEXT__$$$",
    description: "e.g. header logo",
  },
  {
    label: "List or segment id(s)",
    value: "{segment_id}",
    description: "e.g. H7syPn",
  },
  {
    label: "List or segment name(s)",
    value: "{segment}",
    description: "e.g. Newsletter",
  },
  {
    label: "List or segment name(s) (list or segment id)",
    value: "{segment} ({segment_id})",
    description: "e.g. Newsletter (H7syPn)",
  },
  {
    label: "Message type",
    value: "{message_type}",
    description: "e.g. email or sms",
  },
];

const FLOW_VALUE_OPTIONS = [
  // --- Static values ---
  { label: "Klaviyo", value: "Klaviyo" },
  { label: "email", value: "email" },
  { label: "flow", value: "flow" },
  { label: "sms", value: "sms" },
  { label: "whatsapp", value: "whatsapp" },

  // --- Dynamic values ---
  {
    label: "Email subject",
    value: "{email_subject}",
    description: "e.g. Thanks for signing up!",
  },
  {
    label: "External id ($id)",
    value: "{customer_external_id}",
    description: "e.g. x92jdjfhs",
  },
  {
    label: "Flow id",
    value: "{flow_id}",
    description: "e.g. X03jsf",
  },
  {
    label: "Flow message name",
    value: "{message_name}",
    description: "e.g. Welcome Email #1",
  },
  {
    label: "Flow message name (flow message id)",
    value: "{message_name} ({message_id})",
    description: "e.g. Welcome Email #1 (s03m2d)",
  },
  {
    label: "Flow name",
    value: "{flow_name}",
    description: "e.g. Welcome Series",
  },
  {
    label: "Klaviyo profile id",
    value: "{customer_id}",
    description: "e.g. Csw93s",
  },
  {
    label: "Link text or alt text",
    value: "$$$__LINK_TEXT__$$$",
    description: "e.g. header logo",
  },
  {
    label: "Message type",
    value: "{message_type}",
    description: "e.g. email or sms",
  },
];

const UTM_PARAMETERS = [
  {
    label: "Source (utm_source)",
    campaignValue: "Klaviyo",
    flowValue: "Klaviyo",
    defaultChecked: true,
    disabled: true,
  },
  {
    label: "Medium (utm_medium)",
    campaignValue: "{message_type}", // Shows "Message type"
    flowValue: "{message_type}", // Shows "Message type"
    defaultChecked: true,
    disabled: true,
  },
  {
    label: "Campaign (utm_campaign)",
    campaignValue: "{name}", // Shows "Campaign name"
    flowValue: "{message_name}", // Shows "Flow message name"
    defaultChecked: false,
    disabled: false,
  },
  {
    label: "Id (utm_id)",
    campaignValue: "{id}", // Shows "Campaign id"
    flowValue: "{flow_id}", // Shows "Flow id"
    defaultChecked: false,
    disabled: false,
  },
  {
    label: "Term (utm_term)",
    campaignValue: "", // Placeholder "Value"
    flowValue: "", // Placeholder "Value"
    defaultChecked: false,
    disabled: false,
  },
];

const OtherUtmTracking = () => {
  const [autoAdd, setAutoAdd] = useState(false);

  const [utmParams, setUtmParams] = useState(UTM_PARAMETERS);

  // 2. HANDLER: Updates the specific row and field (campaign or flow)
  const handleValueUpdate = (
    index: number,
    field: "campaignValue" | "flowValue",
    newValue: string,
  ) => {
    const updatedParams = [...utmParams];
    updatedParams[index][field] = newValue;
    setUtmParams(updatedParams);
  };

  return (
    <Box w="full" maxW="5xl" mx="auto" px="6" py="5">
      <Stack gap={6}>
        {/* 1. Header Section */}
        <Flex justify="space-between" align="center">
          <UiText variant="heading2">UTM tracking</UiText>
          <UiButton uiVariant="solid">Save</UiButton>
        </Flex>

        {/* 2. Main Tracking Card */}
        <UiBox>
          <Stack gap={6}>
            <Stack gap={1}>
              <UiText variant="subheading" fontWeight="semibold">
                Tracking
              </UiText>
              <UiText color="gray.400">
                These settings determine the default behavior to append UTM
                parameters to every link in a campaign or flow message, but can
                be changed per campaign or flow message.
              </UiText>
            </Stack>

            <HStack
              bg="#fffccc"
              border="1px solid"
              p={3}
              borderRadius="lg"
              gap={3}
            >
              <AlertTriangle size={18} color="#92400e" />
              <UiText fontSize="sm">
                Don't use personal data.{" "}
                <UiTextLink
                  href="#"
                  value="Learn more"
                  color="blue.200"
                  fontSize="sm"
                />
              </UiText>
            </HStack>

            <Stack>
              <Flex mt={4} px={2}>
                <UiText fontSize="sm" color="black" w="35%" ml={10}>
                  UTM parameter
                </UiText>
                <UiText fontSize="sm" color="black" w="30%">
                  Campaign value
                </UiText>
                <UiText fontSize="xs" color="black" w="30%">
                  Flow value
                </UiText>
              </Flex>
              <Separator />

              {/* Parameter Rows */}
              <Stack gap={0}>
                {utmParams.map((param, index) => (
                  <Box key={index}>
                    <Flex align="center" py={4} px={2} gap={4}>
                      <Box w="35%">
                        <HStack gap={3}>
                          <Checkbox.Root
                            defaultChecked={param.defaultChecked}
                            disabled={param.disabled}
                            size="md"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control
                              cursor={
                                param.disabled ? "not-allowed" : "pointer"
                              }
                            />
                          </Checkbox.Root>
                          <UiText
                            fontSize="sm"
                            color={param.disabled ? "gray.400" : "black"}
                          >
                            {param.label}
                          </UiText>
                        </HStack>
                      </Box>

                      <Box w="30%">
                        <UiSelect
                          searchBar
                          items={CAMPAIGN_VALUE_OPTIONS}
                          selectedItem={param.campaignValue}
                          onItemChange={(val) =>
                            handleValueUpdate(index, "campaignValue", val)
                          }
                          placeholder="Value"
                        />
                      </Box>

                      <Box w="30%">
                        <UiSelect
                          searchBar
                          items={FLOW_VALUE_OPTIONS}
                          selectedItem={param.flowValue}
                          onItemChange={(val) =>
                            handleValueUpdate(index, "flowValue", val)
                          }
                          placeholder="Value"
                        />
                      </Box>
                    </Flex>
                    <Separator borderColor="gray.100" />
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* Bottom Actions */}
            <Stack gap={6} mt={2}>
              <UiButton uiVariant="outline" w="fit-content">
                Add UTM parameter
              </UiButton>

              <HStack gap={3}>
                <Switch.Root
                  checked={autoAdd}
                  onCheckedChange={(e) => setAutoAdd(!!e.checked)}
                  colorPalette="blue"
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
                <UiText fontSize="sm">
                  Automatically add UTM parameters to links
                </UiText>
              </HStack>
            </Stack>
          </Stack>
        </UiBox>
      </Stack>
    </Box>
  );
};

export default OtherUtmTracking;
