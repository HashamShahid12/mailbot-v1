import { Box, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { FormField } from "@/components/ui";
import Checkbox from "@/components/ui/check-box";

export function DisclosuresTermsOfServiceHosting() {
  const { register, setValue, watch } = useForm<{ tosUrl: string }>({
    defaultValues: { tosUrl: "" },
  });

//   const tosOption = watch("tosOption");
  const [selectedOption, setSelectedOption] = useState("host");
  const [acknowledged, setAcknowledged] = useState(false);

  const options = [
    {
      value: "host",
      label: "Host for me",
      description: "Klaviyo will create a unique page for your terms.",
    },
    {
      value: "custom",
      label: "I'll add to my website",
      description:
        "Copy the terms from the right and add them to a page on your website. Then, add the link to the page here.",
    },
  ];

  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Here are your mobile terms of service
          </Text>
          <Text fontSize="md" color="gray.700" mt={2}>
            Now, select where your terms will be hosted.
          </Text>
        </Box>

        <Box w="full">
          <Text fontWeight="semibold" mb={2}>
            Select an option <Text as="span" color="red.500">*</Text>
          </Text>

          <SelectableCardGroup
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
            options={options}
          />
        </Box>

        {selectedOption === "custom" && (
          <FormField
            name="tosUrl"
            label="Terms of service URL"
            required
            placeholder="https://yourdomain.com/terms"
            register={register("tosUrl")}
          />
        )}

        <Checkbox
          checked={acknowledged}
          onCheckedChange={() => setAcknowledged(!acknowledged)}
          label={
            <Text fontSize="sm">
              I acknowledge that Klaviyo is not providing legal advice by generating my mobile terms of service. Klaviyo advises consulting with legal counsel to make sure I am compliant with applicable laws for my SMS marketing activities.
            </Text>
          }
        />
      </VStack>
    </Box>
  );
}
