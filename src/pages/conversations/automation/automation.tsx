import { Box, Flex, Image } from "@chakra-ui/react";
import automationImage from "../../../assets/automationImage.png";
import automationBgImage from "../../../assets/automationBgImage.png";
import AutomationLeftBox from "./automation-left-box";

const Automation = () => {
  return (
    <>
      <Flex h="full" bg="red.300" maxW="full" minW="2xl" overflow="hidden">
        <Flex
          px="20"
          maxW="3xl"
          minW="3xl"
          align="center"
          overflow="auto"
          justifyContent={{ sm: "center", lg: "flex-end" }}
        >
          <AutomationLeftBox />
        </Flex>
        <Flex w="full" position="relative">
          {/* <Image
            src={automationBgImage}
            h="full"
            objectFit="cover"
            alt="AutomationBgImage"
          /> */}
          <Box bgImage={`url(${automationBgImage})`} bgSize="cover" w="full" />
          <Image
            src={automationImage}
            alt="AutomationImage"
            position="absolute"
            w="xl"
            minW="xl"
            top="28"
            left="10"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Automation;
