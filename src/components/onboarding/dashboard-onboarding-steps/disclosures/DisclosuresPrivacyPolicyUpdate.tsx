import Checkbox from "@/components/ui/check-box";
import { Accordion, Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export function DisclosuresPrivacyPolicyUpdate() {
  const [acknowledged, setAcknowledged] = useState(false);

  const items = [
    {
      title: "Best practices",
      body: "Include clear opt-in language, usage explanation, and opt-out instructions to align with mobile compliance requirements.",
    },
    {
      title: "SMS abandoned cart",
      body: "Make sure your privacy policy outlines if you use SMS reminders for abandoned carts, including data collection and timing rules.",
    },
    {
      title: "Third-party data sharing",
      body: "Disclose if you share user data with third parties such as analytics or marketing partners for SMS communication.",
    },
    {
      title: "Location tracking and location-based services",
      body: "Mention if you collect or use subscribers’ location data for targeted SMS or geolocation-based promotions.",
    },
  ];

  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Update your privacy policy
          </Text>
          <Text fontSize="md" color="gray.700" mt={2}>
            We recommend updating your privacy policy to cover the following best practices for mobile SMS marketing compliance.
          </Text>
        </Box>

        <Accordion.Root collapsible>
          {items.map((item, index) => (
            <Accordion.Item key={index} value={item.title}>
              <Accordion.ItemTrigger>
                <Accordion.ItemIndicator />
                <Text fontWeight="medium" fontSize="lg" p="1rem 0 1rem 0">{item.title}</Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Text fontSize="sm" color="gray.700" mt={2} mb={5}>
                    {item.body}
                  </Text>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <Box pt={4}>
          <Checkbox
            checked={acknowledged}
            onCheckedChange={() => setAcknowledged((prev) => !prev)}
            label={
              <Text fontSize="sm">
                I understand the importance of updating my privacy policy to comply with applicable laws and guidelines in connection with my SMS marketing activities.
              </Text>
            }
          />
        </Box>
      </VStack>
    </Box>
  );
}
