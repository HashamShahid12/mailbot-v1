import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Default = () => {
  return (
    <>
      <UiBox maxW="xl" m="auto" p="0" overflow="hidden" my="5" bg="gray.200">
        <Flex gap="3" bg="white" p="5">
          <Box>
            <UiText fontWeight="semibold">Email defaults</UiText>
            <UiText variant="caption">
              Set your brand styling so it’s automatically applied across your
              emails for a consistent look and feel.
            </UiText>
          </Box>
          <UiButton uiVariant="solid">Edit</UiButton>
        </Flex>
        <Box bg="white" m="5" minH="md">
          <Box pt="24" ml="5">
            <UiText variant="heading">Heading 1</UiText>
            <UiText variant="heading2">Heading 2</UiText>
            <UiText variant="subheading">Sub Heading</UiText>
            <UiText variant="body">Body</UiText>
            <UiText variant="caption">Caption</UiText>
            <UiTextLink value="Link" />
          </Box>
          <Flex justify="center" pt="2" pb="4">
            <UiButton uiVariant="solid">Button</UiButton>
          </Flex>
          <Flex gap="5" justify="center" py="5" color="gray.300">
            <Icon as={FaTwitter} boxSize="6" />
            <Icon as={FaFacebookF} boxSize="5" />
            <Icon as={FaInstagram} boxSize="6" />
          </Flex>
          <UiText
            variant="caption"
            maxW="md"
            textAlign="center"
            m="auto"
            pb="5"
          >
            You received this email because you’re subscribed to messages from
            Adex 360. Click here to <UiTextLink value="unsubscribe" /> or{" "}
            <UiTextLink
              value="manage
            preferences"
            />{" "}
            for all emails.
          </UiText>
        </Box>
      </UiBox>
    </>
  );
};

export default Default;
