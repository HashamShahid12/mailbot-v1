import { Stack, Flex, Center, Image } from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";

const OtherWebFeedSettings = () => {
  return (
    <>
      <Stack maxW="720px" gap={4}>
        <UiText variant="heading2">Web feeds</UiText>

        <UiBox>
          <Flex justify="space-between" align="center" mb={10}>
            <UiText variant="subheading" fontWeight="semibold">
              Feeds
            </UiText>
            <UiButton uiVariant="solid">Add web feed</UiButton>
          </Flex>

          <Center flexDirection="column" py={10} textAlign="center">
            <Image
              src="/images/emptyApiKeyImage.svg"
              alt="No data"
              mb={6}
              width="160px"
              opacity={0.6}
            />

            <UiText fontWeight="semibold" fontSize="lg" mb={1} color="black">
              No data available
            </UiText>
            <UiText color="gray.400" fontSize="sm">
              Refresh the page to try again.
            </UiText>
          </Center>
        </UiBox>
      </Stack>
    </>
  );
};

export default OtherWebFeedSettings;
