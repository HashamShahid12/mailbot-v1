import { useMemo, useState } from "react";
import { Box, Checkbox, HStack, Stack } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { UiSelect } from "../select";

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en-US" },
  { label: "Spanish", value: "es-ES" },
  { label: "French", value: "fr-FR" },
  { label: "German", value: "de-DE" },
];

const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_SHOW_METRIC_NAMES = false;

const PersonalLanguageSet = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [showMetricNames, setShowMetricNames] = useState(
    DEFAULT_SHOW_METRIC_NAMES
  );

  const preview = useMemo(() => {
    const now = new Date();

    const dateTime = new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(now);

    const shortDate = new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const number = new Intl.NumberFormat(language).format(834561242.59);
    const percentage = new Intl.NumberFormat(language, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0.5976);
    const currency = new Intl.NumberFormat(language, {
      style: "currency",
      currency: "USD",
    }).format(3456.68);
    const compactCurrency = new Intl.NumberFormat(language, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(23000);

    return {
      dateTime,
      shortDate,
      number,
      percentage,
      currency,
      compactCurrency,
    };
  }, [language]);

  const hasChanges =
    language !== DEFAULT_LANGUAGE ||
    showMetricNames !== DEFAULT_SHOW_METRIC_NAMES;

  const onSave = () => {
    console.log({ language, showMetricNames });
  };

  return (
    <UiBox
      heading="Personal language and regional format"
      description="Set the language you prefer. These settings don't impact other people."
      actions={
        <UiButton disabled={!hasChanges} uiVariant="solid" onClick={onSave}>
          Save
        </UiButton>
      }
      showLayout={true}
    >
      <HStack align="start" gap={8} flexDir={{ base: "column", md: "row" }}>
        <Stack gap={8} flex="1">
          <Box>
            <UiText variant="body">Language</UiText>
            <UiText variant="caption" color="gray.400">
              Only your account uses this language
            </UiText>
            <Box mt={2}>
              <UiSelect
                selectedItem={language}
                onChange={setLanguage}
                width="full"
                items={LANGUAGE_OPTIONS}
              />
            </Box>
          </Box>

          <Box>
            <UiText variant="body">US regional format</UiText>
            <UiText variant="caption">
              The formatting for numbers, times, dates, and currencies uses the
              standards in the United States.
            </UiText>

            <Checkbox.Root
              mt={5}
              checked={showMetricNames}
              onCheckedChange={(e) => setShowMetricNames(!!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                border="sm"
                borderColor="blackAlpha.100"
                _checked={{ bg: "blue.200", borderColor: "blue.200" }}
              />
              <Checkbox.Label>
                <UiText variant="body">Show English metric and event names</UiText>
                <UiText variant="caption" color="gray.400">
                  Recommended if you will reference these objects in code.
                </UiText>
              </Checkbox.Label>
            </Checkbox.Root>
          </Box>
        </Stack>

        <Box flex="1">
          <UiText variant="body" mb={2}>
            Preview
          </UiText>
          <Box bg="gray.600" p={4}>
            <UiText whiteSpace="pre-line">
              {`Date, time, and timezone
${preview.dateTime}
${preview.shortDate}

Number, percentage, and currency
${preview.number}
${preview.percentage}
${preview.currency}
${preview.compactCurrency}

Metric name
Active on site`}
            </UiText>
          </Box>
        </Box>
      </HStack>
    </UiBox>
  );
};

export default PersonalLanguageSet;
