import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Box, Flex, Icon, List } from "@chakra-ui/react";
import { TbCircleCheckFilled } from "react-icons/tb";

const Objects = () => {
  const listItems = [
    { value: "Personalize your messaging in campaigns" },
    { value: "Improve flow filtering and triggers" },
    { value: "Segment your audience based on object properties" },
  ];
  return (
    <>
      <Box bg="red.300" maxH="92vh" h="full" overflowY="auto">
        <Flex
          direction="column"
          ml="28"
          mr="12"
          h="full"
          justify="center"
          minW="2xl"
        >
          <UiText variant="heading" mb="5">
            Create objects for your business needs
          </UiText>
          <UiText mb="3">
            Objects store unique business data, like bookings or loyalty
            programs, for your marketing. They have customizable properties,
            just like profile data.
          </UiText>
          <List.Root gap="2" variant="plain" align="center" mb="10">
            {listItems.map((list, index) => (
              <List.Item key={index}>
                <List.Indicator asChild mr="2">
                  <Icon as={TbCircleCheckFilled} boxSize="5" />
                </List.Indicator>
                {list.value}
              </List.Item>
            ))}
          </List.Root>
          <Flex align="center" gap="3">
            <UiButton uiVariant="solid">Upgrade email plan</UiButton>
            <UiTextLink value="Learn more" href="" icon />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Objects;
