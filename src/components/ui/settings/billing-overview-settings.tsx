import { Box, Flex, HStack, Separator, Stack } from "@chakra-ui/react";
import UiButton from "../button";
import { UiText } from "../text";

const BillingOverviewSettings = () => {
  const cardStyle = {
    border: "1px solid",
    borderColor: "gray.200",
    rounded: "16px",
    bg: "white",
    boxShadow:
      "0px 1px 2px rgba(16, 24, 40, 0.06), 0px 8px 24px rgba(16, 24, 40, 0.08)",
    overflow: "hidden",
  } as const;

  const upgradeCardStyle = {
    ...cardStyle,
    borderColor: "gray.300",
  } as const;

  const textColor = {
    title: "#1d1e20",
    body: "#2f3033",
    muted: "#5b5d63",
  } as const;

  const UsageBar = ({ value }: { value: number }) => {
    const clamped = Math.max(0, Math.min(100, value));
    const hasProgress = clamped > 0;
    return (
      <Box
        h="12px"
        w="full"
        bg="gray.200"
        rounded="sm"
        overflow="hidden"
        position="relative"
      >
        {hasProgress ? (
          <Box h="full" w={`${clamped}%`} bg="blue.500" />
        ) : (
          <Box h="full" w="4px" bg="blue.500" />
        )}
      </Box>
    );
  };

  return (
    <Stack maxW="720px" gap="6" p="2">
      <UiText variant="heading2" fontWeight="semibold" color={textColor.title}>
        Overview
      </UiText>

      <Flex {...upgradeCardStyle} minH="180px">
        <Flex
          w={{ base: "0", md: "280px" }}
          display={{ base: "none", md: "flex" }}
          align="center"
          justify="center"
          bgGradient="linear(to-br, #f7f2ff 0%, #fff2f3 55%, #fff7e8 100%)"
          position="relative"
          borderRight="1px solid"
          borderRightColor="gray.200"
        >
          <Box
            w="190px"
            h="132px"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="lg"
            boxShadow="md"
            position="absolute"
            left="14"
            top="10"
            opacity="0.75"
          />
          <Box
            w="190px"
            h="132px"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="lg"
            boxShadow="md"
            position="relative"
          >
            <Stack p="4" gap="3">
              <Box h="2" bg="gray.200" rounded="full" w="70%" />
              <HStack gap="3">
                <Box boxSize="7" bg="gray.200" rounded="full" />
                <Box h="2" bg="gray.200" rounded="full" flex="1" />
              </HStack>
              <Box h="6" bg="#E8C88E" rounded="md" w="80%" />
              <HStack gap="2">
                <Stack gap="2" flex="1">
                  <Box h="3" bg="gray.200" rounded="sm" />
                  <Box h="3" bg="gray.200" rounded="sm" />
                  <Box h="3" bg="gray.200" rounded="sm" />
                </Stack>
                <Stack gap="2" w="8">
                  <Box
                    h="3"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="sm"
                  />
                  <Box
                    h="3"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="sm"
                  />
                  <Box
                    h="3"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="sm"
                  />
                </Stack>
              </HStack>
            </Stack>
          </Box>
        </Flex>

        <Stack flex="1" p={{ base: "6", md: "8" }} gap="3" justify="center">
          <UiText fontSize="xl" fontWeight="semibold" color={textColor.title}>
            Upgrade and grow
          </UiText>
          <UiText color={textColor.body} maxW="2xl">
            Estimate the cost to upgrade your account and increase your plan
            limits for profiles, emails, and text messages.
          </UiText>
          <Box pt="2">
            <UiButton uiVariant="outline" py="3" px="5">
              Estimate cost
            </UiButton>
          </Box>
        </Stack>
      </Flex>

      <Box
        {...cardStyle}
      >
        <Flex
          p="6"
          justify="space-between"
          align={{ base: "start", md: "center" }}
          gap="4"
          flexWrap="wrap"
        >
          <UiText fontSize="xl" fontWeight="semibold" color={textColor.title}>
            Billing
          </UiText>
          <HStack gap="3">
            <UiButton uiVariant="outline" py="3" px="5">
              Close and delete account
            </UiButton>
            <UiButton uiVariant="solid" py="3" px="5">
              Change plan
            </UiButton>
          </HStack>
        </Flex>

        <Stack p="6" gap="6">
          <Flex justify="space-between" gap="10">
            <UiText fontWeight="semibold" color={textColor.title} minW="220px">
              Billing cycle
            </UiText>
            <Stack flex="1" gap="2">
              <UiText color={textColor.title} fontWeight="medium">
                Mar 1, 2026 to Mar 31, 2026
              </UiText>
              <UiText color={textColor.muted} maxW="2xl">
                Billing cycle resets at midnight on Apr 1 in your account&apos;s
                timezone (UTC+05:00).
              </UiText>
            </Stack>
          </Flex>

          <Separator borderColor="gray.100" />

          <Flex justify="space-between" align="center" gap="10">
            <UiText fontWeight="semibold" color={textColor.title} minW="220px">
              Billing information
            </UiText>
            <Box flex="1">
              <UiButton uiVariant="outline" py="3" px="5">
                Update billing
              </UiButton>
            </Box>
          </Flex>

          <Separator borderColor="gray.100" />

          <Flex justify="space-between" gap="10">
            <UiText fontWeight="semibold" color={textColor.title} minW="220px">
              Monthly total
            </UiText>
            <Stack flex="1" gap="2">
              <UiText color={textColor.title} fontWeight="medium">
                $0.00
              </UiText>
              <UiText color={textColor.muted} maxW="2xl">
                Your total is an estimate of your next monthly invoice due at
                the start of the next billing cycle. Your upcoming bill may be
                higher or lower based on your profile count or actions taken.
              </UiText>
            </Stack>
          </Flex>
        </Stack>
      </Box>

      <Box {...cardStyle}>
        <Stack p="8" gap="8">
          <UiText fontSize="xl" fontWeight="semibold" color={textColor.title}>
            Profiles and emails
          </UiText>

          <Stack gap="4">
            <Flex justify="space-between" align="flex-end" gap="6">
              <Box>
                <UiText
                  fontSize="48px"
                  lineHeight="1"
                  fontWeight="semibold"
                  color={textColor.title}
                >
                  0%
                </UiText>
              </Box>
              <Box flex="1" />
            </Flex>

            <Flex justify="space-between" align="center" gap="6">
              <UiText fontWeight="semibold" color={textColor.title}>
                Profiles monthly usage
              </UiText>
              <UiText fontWeight="medium" color={textColor.title}>
                1 of 250 monthly profiles
              </UiText>
            </Flex>

            <UsageBar value={0} />

            <HStack gap="3" pt="2">
              <Box boxSize="4" bg="blue.500" rounded="sm" />
              <UiText color={textColor.title}>Active profiles</UiText>
            </HStack>
          </Stack>

          <Stack gap="4">
            <Flex justify="space-between" align="flex-end" gap="6">
              <Box>
                <UiText
                  fontSize="48px"
                  lineHeight="1"
                  fontWeight="semibold"
                  color={textColor.title}
                >
                  0%
                </UiText>
              </Box>
              <Box flex="1" />
            </Flex>

            <Flex justify="space-between" align="center" gap="6">
              <UiText fontWeight="semibold" color={textColor.title}>
                Email monthly usage
              </UiText>
              <UiText fontWeight="medium" color={textColor.title}>
                0 of 500 monthly email sends
              </UiText>
            </Flex>

            <UsageBar value={0} />

            <HStack gap="3" pt="2">
              <Box boxSize="4" bg="blue.500" rounded="sm" />
              <UiText color={textColor.title}>Emails sent</UiText>
            </HStack>
          </Stack>
        </Stack>
      </Box>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <Box>
            <UiText fontSize="xl" fontWeight="semibold" color={textColor.title}>
              Mobile messaging
            </UiText>
            <UiText color={textColor.muted}>
              Includes SMS, MMS, and WhatsApp.
            </UiText>
          </Box>

          <Stack gap="4">
            <UiText
              fontSize="48px"
              lineHeight="1"
              fontWeight="semibold"
              color={textColor.title}
            >
              0%
            </UiText>

            <Flex justify="space-between" align="center" gap="6">
              <UiText fontWeight="semibold" color={textColor.title}>
                Mobile messaging monthly usage
              </UiText>
              <UiText fontWeight="medium" color={textColor.title}>
                0 of 150 monthly mobile credits
              </UiText>
            </Flex>

            <UsageBar value={0} />

            <HStack gap="3" pt="2">
              <Box boxSize="4" bg="blue.500" rounded="sm" />
              <UiText color={textColor.title}>
                Mobile messaging credits used
              </UiText>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BillingOverviewSettings;
