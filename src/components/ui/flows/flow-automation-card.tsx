import {
  Box,
  Flex,
  SimpleGrid,
  Text as ChakraText,
  Switch,
} from "@chakra-ui/react";
import { UiText } from "../text";
import type React from "react";

export type FlowAutomationCardData = {
  title: string;
  description: string;
  triggerLabel: string;
  isActive: boolean;
  lastUpdated?: string;
  orderCount: number;
  impressions: number;
  revenue: number;
  conversionRate: number;
};

interface FlowAutomationCardProps {
  data: FlowAutomationCardData;
  onToggleActive?: () => void;
  actionsSlot?: React.ReactNode;
}

const FlowAutomationCard: React.FC<FlowAutomationCardProps> = ({
  data,
  onToggleActive,
  actionsSlot,
}) => {
  const {
    title,
    description,
    triggerLabel,
    isActive,
    lastUpdated,
    orderCount,
    impressions,
    revenue,
    conversionRate,
  } = data;

  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      p="5"
      boxShadow="sm"
    >
      <Flex justify="space-between" align="flex-start" mb="3">
        <Box>
          <UiText variant="subheading">{title}</UiText>
          <Flex align="center" gap="2" mt="1">
            <Box
              as="span"
              px="2.5"
              py="0.5"
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
              bg={isActive ? "green.50" : "gray.100"}
              color={isActive ? "green.700" : "gray.600"}
            >
              {isActive ? "Active" : "Inactive"}
            </Box>
            <ChakraText fontSize="xs" color="gray.700">
              {lastUpdated ? `Updated ${lastUpdated}` : "Not updated yet"}
            </ChakraText>
          </Flex>
        </Box>
        <Flex align="center" gap="3">
          <Switch.Root
            checked={isActive}
            onCheckedChange={() => onToggleActive?.()}
            colorPalette="blue"
          >
            <Switch.HiddenInput />
            <Switch.Control />
          </Switch.Root>
          {actionsSlot}
        </Flex>
      </Flex>

      <ChakraText fontSize="sm" color="gray.800" mb="3">
        {description}
      </ChakraText>

      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        px="2.5"
        py="0.5"
        borderRadius="full"
        fontSize="xs"
        fontWeight="medium"
        bg="gray.100"
        color="gray.700"
        mb="3"
      >
        {triggerLabel}
      </Box>

      <Box mt="2" pt="3" borderTopWidth="1px" borderColor="gray.100">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacingY="3" spacingX="6">
          <Box>
            <ChakraText fontSize="xs" color="gray.700">
              Order Count
            </ChakraText>
            <ChakraText fontSize="sm" fontWeight="semibold">
              {orderCount.toLocaleString()}
            </ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" color="gray.700">
              Order Count
            </ChakraText>
            <ChakraText fontSize="sm" fontWeight="semibold">
              {orderCount.toLocaleString()}
            </ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" color="gray.700">
              Impressions
            </ChakraText>
            <ChakraText fontSize="sm" fontWeight="semibold">
              {impressions.toLocaleString()}
            </ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" color="gray.700">
              Revenue
            </ChakraText>
            <ChakraText fontSize="sm" fontWeight="semibold">
              Rs {revenue.toLocaleString()}
            </ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" color="gray.700">
              Conversion Rate
            </ChakraText>
            <ChakraText fontSize="sm" fontWeight="semibold">
              {conversionRate.toFixed(2)} %
            </ChakraText>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default FlowAutomationCard;
