import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Flex, Icon, List, Image, useBreakpointValue } from "@chakra-ui/react";
import { TbCircleCheckFilled } from "react-icons/tb";
import BrandImage from "../../assets/brand.png";

const Brand = () => {
  const listItems = [
    { value: "Sort and save the logos, colors, and fonts you want to use." },
    {
      value: "Send faster by setting brand assets as defaults in your emails.",
    },
    { value: "Build customer loyalty with cohesive brand messages." },
  ];

  const showPic = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Flex bg="red.300" h="80vh" px="20" py="12" gap="8">
        <Flex
          direction="column"
          align="start"
          w={{ base: "full", "2xl": "half" }}
          justify="center"
        >
          <UiText variant="heading" mb="5">
            Save time adding your branding
          </UiText>
          <UiText mb="3">
            We'll use your website to find and add your brand assets.
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
            <UiButton uiVariant="solid">Guide me</UiButton>
            <UiTextLink value="I'll add it myself" href="" icon />
          </Flex>
        </Flex>
        {showPic && (
          <Flex
            justify="center"
            w="half"
            display={{ base: "none", "2xl": "flex" }}
          >
            <Image
              src={BrandImage}
              w="full"
              objectFit="contain"
              alt="BrandImage"
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Brand;
