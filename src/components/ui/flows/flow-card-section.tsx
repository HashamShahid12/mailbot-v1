import { UiText } from "../text";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import UiTextLink from "../text-link";
import { TrendingUp } from "lucide-react";
import UiLink from "../link";
import { MdClose } from "react-icons/md";
import type React from "react";
import flow7 from "../../../assets/flow7.svg";

interface FlowCardSectionValue {
  title: string;
  description1: string;
  description2: string;
  image: string;
}

interface FlowCardSectionProps {
  value: FlowCardSectionValue[];
}

const FlowCardSection: React.FC<FlowCardSectionProps> = ({ value }) => {
  return (
    <>
      <Flex justify="space-between">
        <Box>
          <UiText fontWeight="semibold">Recommended flows for Adex 360</UiText>
          <UiText color="gray.400">
            Drive up revenue and engagement with these essential flows that are
            pre-built and ready to turn on.
          </UiText>
        </Box>
        <UiTextLink fontSize="sm" value="View All Ideas" />
      </Flex>

      <Flex mt="3" gap="5" overflowX="auto">
        {value.map((flow, idx) => (
          <Box
            key={idx}
            w="xs"
            border="sm"
            flex="0 0 auto"
            borderColor="gray.300"
            borderRadius="md"
            display="flex"
            flexDirection="column"
          >
            <Box bg="blue.900" h="16" borderTopRadius="md" position="relative">
              <Box position="absolute" w="16" h="16" top="4" left="4">
                <Image src={flow.image} alt="flow-image" />
              </Box>
              <Icon
                position="absolute"
                cursor="pointer"
                as={MdClose}
                boxSize="6"
                right="4"
                top="5"
              />
            </Box>
            <Box p="4" flex="1" display="flex" flexDirection="column">
              <Box pt="5" flex="1">
                <UiText mb="2" fontSize="sm" fontWeight="semibold">
                  {flow.title}
                </UiText>
                <UiText mb="2" fontSize="sm" flex="1">
                  {flow.description1}
                </UiText>
              </Box>
              <Flex
                gap="5"
                py="5"
                borderTop="sm"
                borderColor="gray.100"
                alignItems="center"
              >
                <Icon as={TrendingUp} boxSize="6" />
                <UiText fontSize="sm" flex="1">
                  {flow.description2}
                </UiText>
              </Flex>
              <UiLink fontWeight="semibold" w="fit">
                Use Flow
              </UiLink>
            </Box>
          </Box>
        ))}
        <Box
          w="xs"
          border="sm"
          flex="0 0 auto"
          borderColor="gray.300"
          borderRadius="md"
          p="5"
          textAlign="center"
          display="flex"
          flexDirection="column"
        >
          <Box w="20" py="6" m="auto">
            <Image src={flow7} alt="flow-image" />
          </Box>
          <UiText py="3" fontSize="sm" fontWeight="semibold">
            Looking for more ideas?
          </UiText>
          <UiText mb="10" fontSize="sm" flex="1">
            Check out the Flow Library for more pre-built flows.
          </UiText>
          <UiTextLink value="Browse Ideas" />
        </Box>
      </Flex>
    </>
  );
};

export default FlowCardSection;
