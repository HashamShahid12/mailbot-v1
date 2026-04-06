// src/onboarding/dashboard-onboarding-steps/DisclosuresCompanyInfo.tsx
import { FormField } from "@/components/ui";
import Checkbox from "@/components/ui/check-box";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormValues {
  companyName: string;
  supportEmail: string;
  messageTypes: string[];
}

export function DisclosuresCompanyInfo() {
  const { register, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      companyName: "Adex360",
      supportEmail: "hasham.shahid@adex360.com",
      messageTypes: ["Promotional"],
    },
  });

  const messageTypes = watch("messageTypes");

  const handleCheckboxChange = (type: string) => {
    const updated = messageTypes.includes(type)
      ? messageTypes.filter((item) => item !== type)
      : [...messageTypes, type];
    setValue("messageTypes", updated);
  };

  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            First, review your company information
          </Text>
          <Text fontSize="md" color="gray.700" mt={1}>
            We'll use this information to generate your disclosure language and mobile terms of service.
          </Text>
        </Box>

        <FormField
          name="companyName"
          label="Company name"
          required
          register={register("companyName")}
        />

        <FormField
          name="supportEmail"
          label="Support email"
          required
          register={register("supportEmail")}
        />

        <Box>
          <Text fontWeight="semibold" mt={4}>
            What type of SMS messages will you be sending?
          </Text>
          <Text fontSize="sm" color="gray.700">
            Select all that apply
          </Text>

          <VStack align="start" gap={3} mt={3}>
            <Checkbox
              label={
                <>
                  <Text fontWeight="medium">Promotional</Text>
                  <Text fontSize="sm" color="gray.700" mt="1">
                    Marketing and advertising messages
                  </Text>
                </>
              }
              checked={messageTypes.includes("Promotional")}
              onCheckedChange={() => handleCheckboxChange("Promotional")}
            />
            <Checkbox
              label={
                <>
                  <Text fontWeight="medium">Transactional</Text>
                  <Text fontSize="sm" color="gray.700" mt="1">
                    Messages without marketing promotions, such as order or delivery updates
                  </Text>
                </>
              }
              checked={messageTypes.includes("Transactional")}
              onCheckedChange={() => handleCheckboxChange("Transactional")}
            />
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
