import { Flex } from "@chakra-ui/react";
import { UiText } from "../../text";
import UiLink from "../../link";

const ProfilesHeader = () => {
  return (
    <>
      <Flex
        px="5"
        py="3"
        bg="white"
        borderY="sm"
        justify="space-between"
        borderColor="gray.600"
        alignItems="center"
        _dark={{ bg: "gray.900" }}
      >
        <UiText variant="heading2">Profiles</UiText>
        <Flex gap="2">
          <UiLink href="#">View subscriber growth</UiLink>
          <UiLink uiVariant="secondary" href="#">
            View suppressed profiles
          </UiLink>
        </Flex>
      </Flex>
    </>
  );
};

export default ProfilesHeader;
