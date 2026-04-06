import {
  Box,
  Text,
  Heading,
  Button,
  Link,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function WooIntegrationPage() {
  const navigate = useNavigate();

  return (
    <Box p="16px 8px">
      {/* Header */}
      <Flex justify="space-between" align="center" p="16px">
        <HStack gap={2} fontSize="sm" color="gray.500">
          <Text fontSize="2xl" color="gray.900">Integrations</Text>
          <Text fontSize="2xl" color="gray.900">{">"}</Text>
          <Text color="purple.500" fontWeight="bold">WooCommerce</Text>
        </HStack>
        <Button variant="solid" p="1rem" colorScheme="gray">
          Remove Integration
        </Button>
      </Flex>

      {/* Main section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        bg="white"
        borderRadius="md"
        p={8}
        boxShadow="sm"
        mb={8}
      >
        <Box maxW="xl">
          <Heading size="lg" mb={2}>
            Let&apos;s get WooCommerce integrated with Mailbot.
          </Heading>
          <Text fontSize="md" color="gray.800" mb={6}>
            Integrate your WooCommerce account to pull in data to build custom segments, send automations, track purchase activity, and more.
          </Text>
          <Button colorScheme="black" px={8}>
            Connect to WooCommerce
          </Button>
        </Box>
        <Box mt={{ base: 8, md: 0 }}>
        
        </Box>
      </Flex>

      {/* Instructions */}
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="sm"
        p={6}
        maxW="3xl"
        mx="auto"
      >
        <VStack align="start" gap={4}>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              1. Install and activate the Mailbot plugin on WooCommerce.
            </Text>
            <VStack align="start" gap={1} mt={2} pl={4}>
              <Text fontSize="sm">
                • In WooCommerce, navigate to Plugins &gt; Add New and search for "Mailbot".
              </Text>
              <Text fontSize="sm">
                • Install the Mailbot Plugin and press "Activate".
              </Text>
            </VStack>
          </Box>

          {/* <Divider /> */}

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              2. Follow the instructions to set up your integration!
            </Text>
          </Box>
        </VStack>
        <Text fontSize="sm" mt={4}>
          Need help? Check out {" "}
          <Link href="https://help.klaviyo.com/hc/en-us/articles/115005253888"  color="blue.500">
            How to Integrate with WooCommerce 
            {/* <ExternalLinkIcon mx="2px" /> */}
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
