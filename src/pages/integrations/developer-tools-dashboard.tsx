import UiLink from "@/components/ui/link";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import DeveloperToolsImage from "../../assets/developer-tools-dashboard.svg";
import UiBox from "@/components/ui/box";
import { AiOutlineLike } from "react-icons/ai";
import { TbBulb } from "react-icons/tb";
import UiTextLink from "@/components/ui/text-link";
import { UiBadge } from "@/components/ui/badge";
import DeveloperToolsDashboardChart from "./developer-tools-dashboard-chart";
import DeveloperToolsDashboardForm from "./developer-tools-dashboard-form";

const DeveloperToolsDashboard = () => {
  return (
    <>
      <Box maxW="7xl" m="auto" p="5">
        <Flex
          mb="5"
          h="4xs"
          minH="4xs"
          border="sm"
          overflow="hidden"
          borderRadius="md"
          borderColor="gray.300"
        >
          <Box minW="200px" bg="gray.600">
            <Image
              src={DeveloperToolsImage}
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
                    New feature for Developers
                  </UiText>
                </Flex>
                <UiText mt="3">
                  Visit this page often? Set it as your landing page. You can
                  update this preference anytime in settings.
                </UiText>
                <UiLink fontWeight="semibold" mt="4">
                  Set as landing page
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
        <UiBox mb="5">
          <Flex
            pb="5"
            gap="3"
            align="center"
            borderBottom="sm"
            borderColor="gray.300"
          >
            <Icon as={TbBulb} boxSize="12" rounded="50%" p="3" bg="gray.100" />
            <UiText variant="heading2">Recommended for you</UiText>
          </Flex>
          <Box p="8">
            <UiText variant="heading" mb="2">
              Welcome!
            </UiText>
            <UiText variant="body" mb="2">
              Answer three simple questions and get your personalized starter
              guide.
            </UiText>
            <Flex gap="2">
              <UiLink uiVariant="secondary">Get your starter guide</UiLink>
              <UiLink fontWeight="semibold">Hide for 7 days</UiLink>
            </Flex>
          </Box>
        </UiBox>
        <UiBox mb="5">
          <Flex justify="space-between" align="center">
            <Flex justify="space-between" align="center" gap="3">
              <Icon
                as={AiOutlineLike}
                boxSize="12"
                p="3"
                bg="success.100"
                color="success.200"
                rounded="50%"
              />
              <Box>
                <UiText variant="heading2" fontWeight="semibold">
                  API usage is healthy
                </UiText>
                <UiText color="gray.400">
                  Your account’s API usage has been healthy for the last 7 days.
                  View history for past suggestions.
                </UiText>
              </Box>
            </Flex>
            <UiLink>History</UiLink>
          </Flex>
        </UiBox>
        <UiBox mb="5">
          <Flex mb="5" justify="space-between" align="flex-start" gap="5">
            <Box>
              <UiText variant="heading2" fontWeight="semibold">
                API versions
              </UiText>
              <UiText color="gray.400" mt="2">
                Monitor the status of your API revisions to avoid disruptions in
                service. Deprecated and retired revisions should be reviewed and
                updated on a regular basis.{" "}
                <UiTextLink value="Learn more about API revisions" href="" />
              </UiText>
            </Box>
            <UiLink minW="fit-content">View details</UiLink>
          </Flex>
          <Flex gap="5">
            <Box>
              <UiText variant="heading">0</UiText>
              <UiText fontWeight="semibold">Retired versions</UiText>
            </Box>
            <Box>
              <UiText variant="heading">0</UiText>
              <UiText fontWeight="semibold">Deprecated versions</UiText>
            </Box>
            <Box>
              <UiText variant="heading">0</UiText>
              <UiText fontWeight="semibold">Stable versions</UiText>
              <UiBadge status="success" icon>
                Good
              </UiBadge>
            </Box>
          </Flex>
        </UiBox>
        <Box mb="5">
          <DeveloperToolsDashboardForm />
        </Box>
        <UiBox mb="5">
          <DeveloperToolsDashboardChart />
        </UiBox>
      </Box>
    </>
  );
};

export default DeveloperToolsDashboard;
