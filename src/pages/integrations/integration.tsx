import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import IntegrationHeader from "./integration-header";
import { UiText } from "@/components/ui/text";
import { IoClose } from "react-icons/io5";
import IntegrationImage from "../../assets/IntegrationImage.svg";
import UiLink from "@/components/ui/link";
import EmptyTable from "../../assets/emptytable.svg";
import { UiBadge } from "@/components/ui/badge";
import { CiShoppingBasket } from "react-icons/ci";

const Integration = () => {
  return (
    <>
      <Box bg="white">
        <IntegrationHeader />
        <Box maxW="7xl" m="auto" p="5">
          <Flex
            mb="10"
            minH="4xs"
            border="sm"
            overflow="hidden"
            borderRadius="md"
            borderColor="gray.300"
          >
            <Box minW="200px" bg="gray.600">
              <Image
                src={IntegrationImage}
                objectFit="cover"
                w="full"
                h="full"
                alt="benchmarks-image"
              />
            </Box>
            <Flex
              py="3"
              px="5"
              direction="column"
              bg="white"
              justify="space-between"
              w="full"
            >
              <Flex minH="7xs" justify="space-between">
                <Box>
                  <Flex gap="2" alignItems="center">
                    <UiText fontWeight="semibold" variant="subheading" mt="2">
                      Find integrations that solve your challenges
                    </UiText>
                    <UiBadge status="new">
                      <Icon as={CiShoppingBasket} boxSize="5" />
                      New
                    </UiBadge>
                  </Flex>
                  <UiText mt="3">
                    With personalized recommendations in the new integration
                    directory, quickly identify tools that extend Mailbot
                    capabilities and solve your specific challenges.
                  </UiText>
                  <UiLink fontWeight="semibold" mt="4">
                    Explore Integrations
                  </UiLink>
                </Box>
                <Icon
                  as={IoClose}
                  cursor="button"
                  // mt="1"
                  _hover={{ bg: "gray.300" }}
                  boxSize="10"
                  p="1"
                  borderRadius="md"
                />
              </Flex>
            </Flex>
          </Flex>
          <Box m="auto">
            <Image src={EmptyTable} m="auto" alt="empty-table" w="xs" />
            <UiText
              variant="heading2"
              textAlign="center"
              fontWeight="semibold"
              mt="3"
            >
              No integrations available
            </UiText>
            <UiText textAlign="center" variant="caption">
              To start, select Add integration
            </UiText>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Integration;
