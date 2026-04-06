import { Box, Flex, Icon, VStack, HStack, IconButton } from "@chakra-ui/react";
import { UiText } from "@/components/ui/text";
import UiButton from "@/components/ui/button";
import type { Plan } from "@/types/shop-types";
import { FiCheck, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { subscribePlan } from "@/api/plans";
import { toaster } from "@/components/ui/toaster";

interface PlansCardProps {
  plans: Plan[];
  title?: string;
}

export const PlansCard = ({ plans, title }: PlansCardProps) => {
  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentPlan = sortedPlans[currentIndex];

  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (currentIndex < sortedPlans.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubscribe = async () => {
    if (!currentPlan) return;
    setLoading(true);
    try {
      const res = await subscribePlan(currentPlan.id);
      if (res.confirmation_url) {
        window.location.href = res.confirmation_url;
      } else {
        toaster.create({
          title: "Success",
          description: "Plan updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to subscribe to plan",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentPlan) return null;

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={6}
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      boxShadow="sm"
      height="100%"
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <VStack align="start" spacing={4} height="100%">
        <Box w="full">
          <UiText variant="subheading" fontWeight="bold">
            {title || currentPlan.name}
          </UiText>
          <Flex align="baseline" mt={2}>
            <UiText fontSize="3xl" fontWeight="bold">
              ${currentPlan.price}
            </UiText>
            <UiText color="gray.700" ml={1} fontSize="sm">
              /mo
            </UiText>
          </Flex>

          <Flex align="center" justify="space-between" mt={4} w="full">
            <Box>
              <UiText fontSize="2xl" fontWeight="medium">
                {currentPlan.emails.toLocaleString()}
              </UiText>
              <UiText color="gray.700" fontSize="sm">
                Emails per month
              </UiText>
            </Box>
            {sortedPlans.length > 1 && (
              <HStack spacing={2}>
                <IconButton
                  aria-label="Decrease emails"
                  onClick={handleDecrement}
                  disabled={currentIndex === 0}
                  variant="ghost"
                  size="sm"
                  color={currentIndex === 0 ? "gray.300" : "gray.700"}
                  _dark={{
                    color: currentIndex === 0 ? "gray.600" : "white",
                  }}
                  _hover={{
                    bg: "transparent",
                    color: currentIndex === 0 ? "gray.300" : "gray.900",
                    _dark: {
                      color: currentIndex === 0 ? "gray.600" : "gray.200",
                    },
                  }}
                  cursor={currentIndex === 0 ? "not-allowed" : "pointer"}
                >
                  <FiMinusCircle size={24} />
                </IconButton>
                <IconButton
                  aria-label="Increase emails"
                  onClick={handleIncrement}
                  disabled={currentIndex === sortedPlans.length - 1}
                  variant="ghost"
                  size="sm"
                  color={
                    currentIndex === sortedPlans.length - 1
                      ? "gray.300"
                      : "gray.700"
                  }
                  _dark={{
                    color:
                      currentIndex === sortedPlans.length - 1
                        ? "gray.600"
                        : "white",
                  }}
                  _hover={{
                    bg: "transparent",
                    color:
                      currentIndex === sortedPlans.length - 1
                        ? "gray.300"
                        : "gray.900",
                    _dark: {
                      color:
                        currentIndex === sortedPlans.length - 1
                          ? "gray.600"
                          : "gray.200",
                    },
                  }}
                  cursor={
                    currentIndex === sortedPlans.length - 1
                      ? "not-allowed"
                      : "pointer"
                  }
                >
                  <FiPlusCircle size={24} />
                </IconButton>
              </HStack>
            )}
          </Flex>
        </Box>

        <Box flex="1" w="full">
          <VStack spacing={3} w="full" mt={4} align="start">
            <HStack align="center">
              <Icon as={FiCheck} color="green.500" mr={2} />
              <UiText fontSize="sm">Everything in previous plan</UiText>
            </HStack>
            <HStack align="center">
              <Icon as={FiCheck} color="green.500" mr={2} />
              <UiText fontSize="sm">
                {currentPlan.emails_per_dollar} emails per dollar
              </UiText>
            </HStack>
            <HStack align="center">
              <Icon as={FiCheck} color="green.500" mr={2} />
              <UiText fontSize="sm">Priority Support</UiText>
            </HStack>
          </VStack>
        </Box>

        <UiButton
          uiVariant="solid"
          width="full"
          onClick={handleSubscribe}
          loading={loading}
        >
          Choose Plan
        </UiButton>
      </VStack>
    </Box>
  );
};
