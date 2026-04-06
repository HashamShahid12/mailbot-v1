import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import type { WarmupData } from "@/types/shop-types";

interface WarmupPeriodSectionProps {
  warmUpDetails: WarmupData;
}

export const WarmupPeriodSection: React.FC<WarmupPeriodSectionProps> = ({
  warmUpDetails,
}) => {
  const currentPeriod = warmUpDetails.warmup_data.filter(
    (data) => parseInt(data.age.toString()) === warmUpDetails.warmup_age,
  );

  const currentIdx = warmUpDetails.warmup_data.findIndex(
    (data) => data.age === warmUpDetails.warmup_age,
  );

  // Guard against undefined currentPeriod if data doesn't match
  if (!currentPeriod.length) return null;

  const currentData = currentPeriod[0];
  const totalDays = warmUpDetails.warmup_data.length;
  // If warmup is completed or current age is the last one, days left should be 0.
  // The original logic subtracts 1 which causes -1 when on the last day.
  const daysLeft = Math.max(0, totalDays - currentData.age);

  const progressPercentage =
    currentData.age === 0 ? 1 : (currentData.age / totalDays) * 100;

  return (
    <UiBox>
      <Stack gap="4">
        <UiText variant="subheading" fontWeight="semibold">
          Warmup Period
        </UiText>

        <Flex align="center" justify="space-between" gap="5">
          <UiText variant="heading2">{daysLeft} days left</UiText>
          <Box flex="1">
            <Box
              w="full"
              h="2"
              bg="gray.100"
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                h="full"
                bg="blue.500"
                w={`${progressPercentage}%`}
                borderRadius="full"
              />
            </Box>
          </Box>
        </Flex>

        <Flex gap="2">
          <UiText variant="body">Daily Emails Limit : </UiText>
          <UiText fontWeight="bold" variant="body">
            {currentData.daily_email_limit}
          </UiText>
        </Flex>

        {warmUpDetails.warmup_data[currentIdx] !==
          warmUpDetails.warmup_data[warmUpDetails.warmup_data.length - 1] && (
          <Flex gap="2">
            <UiText variant="body">Tomorrow's Emails Limit : </UiText>
            <UiText fontWeight="bold" variant="body">
              {
                warmUpDetails.warmup_data[
                  parseInt(currentData.age.toString()) + 1
                ]?.daily_email_limit
              }
            </UiText>
          </Flex>
        )}
      </Stack>
    </UiBox>
  );
};
