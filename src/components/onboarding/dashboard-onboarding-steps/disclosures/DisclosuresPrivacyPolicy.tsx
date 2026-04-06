import { FormField } from "@/components/ui";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export function DisclosuresPrivacyPolicy() {
  const { register } = useForm<{ privacyUrl: string }>({
    defaultValues: {
      privacyUrl: "",
    },
  });

  return (
    <Box w="40rem" mx="auto" mt="10">
      <VStack align="start" gap={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Link your privacy policy
          </Text>
          <Text fontSize="md" color="gray.700" mt={2}>
            This explains how your company is storing and sharing subscriber data, from phone numbers to viewing history.
            Your disclosure block includes a link to your policy for subscribers to review.
          </Text>
        </Box>

        <FormField
          name="privacyUrl"
          label="Privacy policy URL"
          required
          placeholder="https://yourdomain.com/privacy-policy"
          type="url"
          register={register("privacyUrl")}
        />
      </VStack>
    </Box>
  );
}
