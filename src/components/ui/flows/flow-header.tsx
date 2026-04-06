import { Flex } from "@chakra-ui/react";
import { UiText } from "../text";
import UiLink from "../link";

const FlowHeader = () => {
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
      >
        <UiText variant="heading2">Flows</UiText>
        <Flex gap="2">
          {/* <NewDropDown
            icon
            buttonTitle="Options"
            links={[
              {
                title: "Export analytics",
                href: "#",
              },
              {
                title: "View archived flows",
                href: "#",
              },
            ]}
          /> */}
          <UiLink uiVariant="secondary" href="/createflow">
            Create Flow
          </UiLink>
        </Flex>
      </Flex>
    </>
  );
};

export default FlowHeader;
