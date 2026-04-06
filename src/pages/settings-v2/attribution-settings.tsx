import React, { useState, useMemo } from "react";
import {
  Box,
  Stack,
  HStack,
  Flex,
  Checkbox,
  Input,
  Center,
} from "@chakra-ui/react";
import { History, Mail, ChevronDown, ChevronUp } from "lucide-react";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import Tables from "@/components/ui/table";
import { UiSelect } from "@/components/ui/select";
import UiTextLink from "@/components/ui/text-link";

interface TrackingItemProps {
  label: string;
  description: string;
  link?: string;
  linkText?: string;
  defaultChecked?: boolean;
}

const TimeFramePicker = ({ value, unit, onChange }: any) => {
  const timeUnits = [
    { label: "Days", value: "Days" },
    { label: "Hours", value: "Hours" },
  ];

  return (
    <HStack
      gap={0}
      h="34px"
      border="1px solid"
      borderRight="none"
      borderCollapse="collapse"
      borderColor="gray.300"
      borderRadius="md"
      bg="white"
      overflow="hidden"
    >
      <Input
        value={value}
        onChange={(e) => onChange("value", e.target.value)}
        w="50px"
        textAlign="center"
        fontSize="sm"
        h="full"
        border="none"
        _focus={{ outline: "none" }}
      />

      <UiSelect
        width="110px"
        items={timeUnits}
        selectedItem={unit}
        onChange={(val: string) => onChange("unit", val)}
        bgTrigger="transparent"
        size="sm"
      />
    </HStack>
  );
};

const TrackingItem: React.FC<TrackingItemProps> = ({
  label,
  description,
  link,
  linkText,
  defaultChecked = false,
}) => (
  <HStack align="flex-start" gap={3}>
    <Checkbox.Root defaultChecked={defaultChecked} size="md" pt="1">
      <Checkbox.HiddenInput />
      <Checkbox.Control
        borderColor="gray.300"
        cursor="pointer"
        _checked={{
          bg: "blue.200",
          borderColor: "blue.200",
          borderRadius: "sm",
          color: "white",
        }}
      />
    </Checkbox.Root>
    <Stack gap={0.5}>
      <UiText color="black">{label}</UiText>
      <UiText color="gray.400" fontSize="sm">
        {description}{" "}
        {link && linkText && (
          <UiTextLink href={link} value={linkText} icon color="blue.200" />
        )}
      </UiText>
    </Stack>
  </HStack>
);

const AttributionSettings = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(["email"]);

  // 1. CONDITION: State to track all checkbox toggles and input values
  const [settings, setSettings] = useState({
    emailOpens: { active: true, value: "5", unit: "Days" },
    emailClicks: { active: true, value: "5", unit: "Days" },
    smsDelivered: { active: true, value: "12", unit: "Hours" },
    smsClicks: { active: true, value: "5", unit: "Days" },
  });

  const toggleRow = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // 2. CONDITION: Shared handler for sub-row updates
  const updateSetting = (
    key: keyof typeof settings,
    field: string,
    val: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  };

  const columns = [
    {
      header: "Touchpoints",
      width: "35%",
      key: "touchpoints",
      cell: (row: any) => (
        <HStack gap={0} align="center">
          <Box
            w="32px"
            flexShrink={0}
            display="flex"
            justifyContent="center"
            marginInline={3}
          >
            {!row.isSubRow && (
              <Box
                onClick={() => toggleRow(row.id)}
                cursor="pointer"
                bg="gray.500"
                padding={3}
                borderRadius={3}
                _hover={{
                  bg: "gray.300",
                }}
              >
                {expandedIds.includes(row.id) ? (
                  <ChevronUp size={16} color="#718096" />
                ) : (
                  <ChevronDown size={16} color="#718096" />
                )}
              </Box>
            )}
          </Box>

          <Box flex="1">
            {row.isSubRow ? (
              <Checkbox.Root
                checked={row.active} // Bound to state
                onCheckedChange={(e) =>
                  updateSetting(row.stateKey, "active", !!e.checked)
                }
                size="md"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control
                  borderColor="gray.300"
                  cursor="pointer"
                  _checked={{
                    bg: "blue.200",
                    borderColor: "blue.200",
                    borderRadius: "sm",
                    color: "white",
                  }}
                />
                <Checkbox.Label fontWeight="500" fontSize="sm" ml={3}>
                  {row.label}
                </Checkbox.Label>
              </Checkbox.Root>
            ) : (
              <HStack gap={3}>
                <Box flexShrink={0}>{row.icon}</Box>
                <UiText fontWeight="600" fontSize="sm">
                  {row.label}
                </UiText>
              </HStack>
            )}
          </Box>
        </HStack>
      ),
    },
    {
      header: "Time frame",
      width: "60%",
      key: "timeframe",
      cell: (row: any) => (
        <HStack gap={0} w="full">
          {row.isSubRow ? (
            <TimeFramePicker
              value={row.value}
              unit={row.unit}
              onChange={(field: string, val: any) =>
                updateSetting(row.stateKey, field, val)
              }
            />
          ) : (
            <HStack gap={0} w="full">
              <UiText fontSize="sm" w="210px" flexShrink={0}>
                {row.summary1}
              </UiText>
              <UiText fontSize="sm">{row.summary2}</UiText>
            </HStack>
          )}
        </HStack>
      ),
    },
  ];

  const tableRows = useMemo(() => {
    const data = [];

    // EMAIL ROW
    data.push({
      id: "email",
      label: "Email",
      icon: <Mail size={18} />,
      // CONDITION: Parent text updates based on state. Hides if checkbox is unchecked.
      summary1: settings.emailOpens.active
        ? `Opened: ${settings.emailOpens.value} ${settings.emailOpens.unit}`
        : "",
      summary2: settings.emailClicks.active
        ? `Clicked: ${settings.emailClicks.value} ${settings.emailClicks.unit}`
        : "",
    });

    if (expandedIds.includes("email")) {
      data.push({
        id: "e1",
        isSubRow: true,
        stateKey: "emailOpens",
        label: "Opened email",
        ...settings.emailOpens,
      });
      data.push({
        id: "e2",
        isSubRow: true,
        stateKey: "emailClicks",
        label: "Clicked email",
        ...settings.emailClicks,
      });
    }

    // SMS ROW
    data.push({
      id: "sms",
      label: "Text message",
      icon: (
        <Center boxSize="5" borderRadius="full" border="1.5px solid black">
          <UiText fontSize="10px" fontWeight="bold">
            T
          </UiText>
        </Center>
      ),
      // CONDITION: Parent text updates based on state. Hides if checkbox is unchecked.
      summary1: settings.smsDelivered.active
        ? `Delivered: ${settings.smsDelivered.value} ${settings.smsDelivered.unit}`
        : "",
      summary2: settings.smsClicks.active
        ? `Clicked: ${settings.smsClicks.value} ${settings.smsClicks.unit}`
        : "",
    });

    if (expandedIds.includes("sms")) {
      data.push({
        id: "s1",
        isSubRow: true,
        stateKey: "smsDelivered",
        label: "Delivered text message",
        ...settings.smsDelivered,
      });
      data.push({
        id: "s2",
        isSubRow: true,
        stateKey: "smsClicks",
        label: "Clicked text message",
        ...settings.smsClicks,
      });
    }
    return data;
  }, [expandedIds, settings]);

  return (
    <Box w="full" maxW="5xl" mx="auto" px="6" py="5">
      <Stack gap={6}>
        <Flex justify="space-between" align="center">
          <UiText variant="heading2">Attribution</UiText>
          <HStack gap={3}>
            <UiButton variant="ghost" p={2}>
              <History size={20} />
            </UiButton>
            <UiButton uiVariant="outline">Compare model</UiButton>
            <UiButton uiVariant="solid" disabled bg="#f4f4f5" color="#a1a1aa">
              Save
            </UiButton>
          </HStack>
        </Flex>

        <UiBox
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
        >
          <Stack gap={1}>
            <UiText variant="heading2">Attribution windows</UiText>
            <UiText color="gray.400">
              Determine the time frame leading up to a conversion to give credit
              to.
            </UiText>
          </Stack>

          <Tables
            columns={columns}
            rows={tableRows}
            headerPadding="1"
            headerPaddingBlock="4"
            rowpadding="4"
            cellPadding="1"
          />
        </UiBox>

        {/* Tracking Section UI Unchanged */}
        <UiBox
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
        >
          <Stack gap={1} mb={6}>
            <UiText variant="heading2">Tracking and reporting data</UiText>
            <UiText color="gray.400">
              Determine what data you want to measure in your reports and
              attribution.
            </UiText>
          </Stack>

          <Stack gap={6}>
            <TrackingItem
              label="Exclude transactional messages from attribution data"
              description="Accurately measure marketing message performance by removing transactional communications from attribution metrics."
            />
            <TrackingItem
              label="Exclude bot interactions from Clicked Email"
              description="Accurately measure Clicked Email performance by excluding activity taken by email security software."
              link="#"
              linkText="Learn more about bot interactions"
              defaultChecked
            />
            <TrackingItem
              label="Exclude bot interactions from Clicked Text Message"
              description="Accurately measure Clicked Text Message performance by excluding actions taken by mobile device software."
              link="#"
              linkText="Learn more about bot interactions"
              defaultChecked
            />
            <TrackingItem
              label="Exclude Apple Mail Privacy Protection (MPP) opens from attribution data"
              description="Filter out MPP opens from Opened Email to more easily identify your engaged profiles."
            />
          </Stack>
        </UiBox>
      </Stack>
    </Box>
  );
};

export default AttributionSettings;
