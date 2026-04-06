import { Center, Spinner, Stack } from "@chakra-ui/react";
import { UiText } from "../text";

export const AppLoader = () => {
  return (
    <Center
      h="100vh"
      w="100vw"
      position="fixed"
      top="0"
      left="0"
      bg="white"
      zIndex="9999"
    >
      <Stack align="center" gap="4">
        <Spinner speed="0.65s" emptyColor="gray.200" color="black" size="xl" />
        <UiText variant="body" fontWeight="medium">
          Loading your shop ...
        </UiText>
      </Stack>
    </Center>
  );
};

export default AppLoader;
