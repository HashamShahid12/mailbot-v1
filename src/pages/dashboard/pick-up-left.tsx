import {
  Box,
  Button,
  Collapsible,
  Flex,
  Icon,
  Link,
  Text,
  HStack,
  Separator,
  Badge,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CollapsibleIcon } from "@/components/ui/collapsible-icon";
import { useEffect, useState } from "react";
import type { DraftCampaign } from "@/types/user-type";
import { getDraftCampaigns } from "@/api/dashboard-api";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import { Plus } from "lucide-react";
import { RiEditCircleFill } from "react-icons/ri";
import { HiOutlineCursorArrowRays } from "react-icons/hi2";
import SkeletonLoader from "@/components/ui/skeletons";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";

interface DashboardData {
  drafts: DraftCampaign[];
}

export default function PickUpLeft() {
  const [data, setData] = useState<DashboardData>({
    drafts: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const [drafts] = await Promise.all([getDraftCampaigns()]);

      setData({
        drafts,
      });
    };

    loadData();
  }, []);
  return (
    <UiBox _dark={{ bg: "gray.950" }}>
      <Collapsible.Root defaultOpen>
        <Flex justifyContent="space-between" alignItems="center">
          <Collapsible.Trigger asChild cursor="pointer">
            <HStack>
              <Icon as={CollapsibleIcon} boxSize="8" />
              <Icon
                as={HiOutlineCursorArrowRays}
                boxSize="8"
                bg="gray.600"
                borderRadius="2xl"
                p="1"
                mx="3"
              />
              <UiText variant="subheading">Pick up where you left off</UiText>
            </HStack>
          </Collapsible.Trigger>
          <NewDropDown
            buttonTitle={<BsThreeDotsVertical />}
            border="none"
            p="2"
            links={[
              {
                title: "Dismiss this section",
                href: "#",
              },
              {
                title: "Leave feedback",
                href: "#",
              },
            ]}
          />
        </Flex>
        <SkeletonLoader
          boxHeight={0}
          showAvatar={false}
          lineCount={3}
          w="full"
          h="9xs"
        >
          <Collapsible.Content mt="5">
            <Flex direction={["column", "row"]} gap="4">
              {data.drafts.map((draft) => (
                <Link
                  href={`/drafts/${draft.id}`}
                  _hover={{ textDecoration: "none" }}
                  flex="1"
                  key={draft.id}
                >
                  <Box
                    border="sm"
                    borderColor="blackAlpha.100"
                    borderRadius="md"
                    p="4"
                    width="full"
                    height="100%"
                    _hover={{ borderColor: "blue.200" }}
                  >
                    <Text fontWeight="semibold" fontSize="md">
                      testingacsc
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="normal"
                      color="gray.400"
                      _dark={{ color: "white" }}
                    >
                      Added to Newsletter list
                    </Text>
                    <Separator mt="2" color="gray.100" />
                    <HStack mt={4} justify="space-between">
                      <Badge
                        fontWeight="normal"
                        bg="gray.600"
                        px="1"
                        borderRadius="xl"
                        _dark={{ color: "black" }}
                      >
                        <Icon
                          as={RiEditCircleFill}
                          boxSize="4"
                          _dark={{ color: "black" }}
                        />{" "}
                        {draft.status}
                      </Badge>
                      <Text
                        fontSize="sm"
                        color="black"
                        _dark={{ color: "white" }}
                      >
                        Started on: {new Date(draft.startedAt).toLocaleString()}
                      </Text>
                    </HStack>
                  </Box>
                </Link>
              ))}

              <Link
                href="/create-campaign"
                _hover={{ textDecoration: "none" }}
                flex="1"
              >
                <Box
                  border="sm"
                  borderColor="gray.300"
                  borderRadius="md"
                  pt="7"
                  width="full"
                  height="100%"
                  textAlign="center"
                >
                  <UiText mb="2">
                    You have no more drafts created in the last 30 days.
                  </UiText>
                  <Button
                    background="transparent"
                    px="3"
                    color="black"
                    textAlign="center"
                    _hover={{ bg: "gray.600" }}
                    _dark={{ color: "white" }}
                  >
                    <Plus />
                    Create campaign
                  </Button>
                </Box>
              </Link>
            </Flex>
          </Collapsible.Content>
        </SkeletonLoader>
      </Collapsible.Root>
    </UiBox>
  );
}
