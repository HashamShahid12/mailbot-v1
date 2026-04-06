import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export function DisclosuresTermsOfServiceOption() {
  const [selectedOption, setSelectedOption] = useState("generate");

  const options = [
    {
      value: "link",
      label: "Yes, link to existing",
    },
    {
      value: "generate",
      label: "No, generate for me",
    },
  ];

  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Do you already have a mobile terms of service?
          </Text>
          <Text fontSize="md" color="gray.700" mt={2}>
            This is an overview of the types of messages you’ll send and how subscribers can opt out. Your disclosure block includes your terms of service for subscribers to review.
          </Text>
        </Box>

        <Box w="full">
          <Text fontWeight="semibold" mb={2}>
            Select an option <Text as="span" color="red.500">*</Text>
          </Text>

          <SelectableCardGroup
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </Box>
      </VStack>
    </Box>
  );
}
