import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FileText, Shield, ListOrdered } from "lucide-react";

const disclosures = [
  {
    icon: FileText,
    title: "Disclosure language",
    description: "Informs subscribers of the messages they’ll receive and any data rates.",
  },
  {
    icon: Shield,
    title: "Privacy policy",
    description: "Explains how your company is storing and sharing data.",
  },
  {
    icon: ListOrdered,
    title: "Mobile terms of service",
    description:
      "An outline of message types and frequency, SMS carrier fees, and opt-in/out guidelines.",
  },
];

export function DisclosuresOverview() {
  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Klaviyo can help you follow SMS-related laws
        </Text>
        <Text fontSize="md" color="gray.700">
          You're required to provide disclosure language when collecting consent.
          We'll guide you through creating and updating this content.
        </Text>

        {disclosures.map((item, idx) => (
          <Flex key={idx} align="start" gap={4} mt={4}>
            <item.icon size={20} />
            <Box>
              <Text fontWeight="semibold" fontSize="lg" mb="2">{item.title}</Text>
              <Text fontSize="md" color="gray.20">
                {item.description}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
