import { onboardingFlow } from "@/onboarding/OnboardingFlow";
import { Flex, VStack, Box, Text, Button } from "@chakra-ui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UiText } from "../ui/text";

export default function OnboardingLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname.split("/").pop();

  return (
  <>
   <Flex justify="space-between" alignItems="center" p="16px" borderBottom="1px solid rgb(221, 224, 224)">
    <UiText fontSize="2xl">Welcome, Adex360</UiText>
    <Button variant="solid" p="1rem">Dismiss this page</Button>
  </Flex>
    <Flex p={6} gap={12} align="start">
      <VStack align="start"  minW="250px">
        {onboardingFlow.map((section) => {
          const isActive = section.path === current;
          return (
            <Box
              key={section.id}
              bg={isActive ? "gray.300" : "transparent"}
              borderRadius="md"
              p={2}
              onClick={() => navigate(`/onboarding/${section.path}`)}
              cursor="pointer"
              w="100%"
            >
              <Flex align="center" gap={2}>
                {/* <Radio isChecked={isActive} pointerEvents="none" /> */}
                <Text fontWeight={isActive ? "bold" : "normal"}>{section.title}</Text>
              </Flex>
            </Box>
          );
        })}
      </VStack>
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
    </>
  );
}