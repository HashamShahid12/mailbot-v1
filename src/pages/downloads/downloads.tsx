import { UiSelect } from "@/components/ui/select";
import { UiText } from "@/components/ui/text";
import {
  Box,
  Stack,
  Separator,
  HStack,
  Button,
  Center,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

const listItems = [
  { value: "all", label: "All" },
  { value: "all-campaigns", label: "All campaigns" },
  { value: "all-flows", label: "All flows" },
  { value: "best-people", label: "Best people" },
  {
    value: "deliverability-client",
    label: "Deliverability insights by client",
  },
  {
    value: "deliverability-country",
    label: "Deliverability insights by country",
  },
  {
    value: "deliverability-domain",
    label: "Deliverability insights by domain",
  },
  { value: "flow-split-activity", label: "Flow split activity" },
  { value: "link-activity", label: "Link activity" },
  { value: "list-segment-members", label: "List / segment members" },
  { value: "list-supressions", label: "List supressions" },
  { value: "metrics", label: "Metrics" },
  { value: "profile-data", label: "Profile data" },
  { value: "profile-supressions", label: "Profile supressions" },
  {
    value: "back-in-stock-recipients",
    label: "Queued back in stock recipients",
  },
  { value: "recipient-activity", label: "Recipient activity" },
  { value: "recipients-client", label: "Recipients by client" },
  { value: "recipients-country", label: "Recipients by country" },
  { value: "recipients-domain", label: "Recipients by domain" },
  { value: "unique-link-activity", label: "Unique link activity" },
];
const statusListItems = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "progress", label: "In progress" },
];

const Downloads = () => {
  const [selectedList, setSelectedList] = useState<string | undefined>("all");
  const [statusList, setStatusList] = useState<string | undefined>("all");

  const handleClear = () => {
    setStatusList("all");
    setSelectedList("all");
  };

  return (
    <Stack gap={4} p={5}>
      {/* 1. Top Navigation & Header */}
      <Box>
        <UiText variant="heading2">Recent downloads</UiText>
      </Box>
      <Separator borderColor="gray.100" />
      <HStack gap={5} align="end" mt={5}>
        <UiSelect
          searchBar
          label="Download type"
          showLabel
          placeholder="Select a download type"
          items={listItems}
          selectedItem={selectedList}
          onItemChange={(val) => setSelectedList(val)}
        />
        <UiSelect
          searchBar
          label="Status"
          showLabel
          width="3xs"
          placeholder="Select a status"
          items={statusListItems}
          selectedItem={statusList}
          onItemChange={(val) => setStatusList(val)}
        />
        <Button
          variant="plain"
          border="none"
          color="blue.200"
          _hover={{ color: "blue.100", textDecoration: "underline" }}
          _focus={{ outline: "none" }}
          onClick={handleClear}
        >
          Clear
        </Button>
      </HStack>
      <Center flexDirection="column" py={10} textAlign="center">
        <Image
          src="/images/emptyApiKeyImage.svg"
          alt="No data"
          mb={6}
          width="200px"
          opacity={0.6}
        />

        <UiText fontWeight="semibold" fontSize="lg" mb={1} color="black">
          No data available
        </UiText>
        <UiText color="gray.400" fontSize="sm">
          Refresh the page to try again.
        </UiText>
      </Center>
    </Stack>
  );
};

export default Downloads;
