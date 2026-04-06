import { Box, Text, Button } from "@chakra-ui/react";

export const TrackingConfirm = () => (
  <Box textAlign="center" mt="10">
    <Text fontSize="xl" fontWeight="bold" mb={2}>
      Confirm onsite tracking is enabled
    </Text>
    <Text maxW="md" mx="auto" fontSize="md">
      You’ll be able to publish forms to your site and sync data to Mailbot.
    </Text>
    <Button mt={6} colorScheme="black" p="1rem">
      Integrate
    </Button>
  </Box>
);
