import React from "react";
import {
  Box,
  Flex,
  Icon,
  Progress,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { UiText } from "../text";

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  progress?: {
    current: number;
    total: number;
  };
  isNegative?: boolean;
  loading?: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  label,
  value,
  icon,
  progress,
  isNegative,
  loading,
}) => {
  if (loading) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        p="5"
        flex="1"
        minW="240px"
        boxShadow="sm"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      >
        <Flex align="center" gap="3" mb="3">
          <SkeletonCircle size="4" />
          <Skeleton h="14px" w="100px" />
        </Flex>
        <Box>
          <Skeleton h="28px" w="120px" mb="2" />
          {progress && <Skeleton h="4px" w="full" mt="3" />}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p="5"
      flex="1"
      minW="240px"
      boxShadow="sm"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <Flex align="center" gap="3" mb="3">
        <Icon as={icon} boxSize="4" color="gray.700" />
        <UiText
          variant="body"
          color="gray.700"
          fontSize="sm"
          fontWeight="medium"
          borderBottom="1px dashed"
          borderColor="gray.300"
          pb="0.5"
        >
          {label}
        </UiText>
      </Flex>

      <Box>
        <UiText
          variant="heading2"
          fontSize="xl"
          fontWeight="bold"
          color={isNegative ? "red.500" : "black"}
        >
          {value}
        </UiText>

        {progress && (
          <Box mt="3">
            <Progress.Root
              value={(progress.current / progress.total) * 100}
              size="xs"
              colorPalette="green"
            >
              <Progress.Track bg="gray.100">
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
        )}
      </Box>
    </Box>
  );
};
