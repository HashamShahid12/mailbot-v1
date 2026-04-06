import { Box, Flex, Image, Icon } from "@chakra-ui/react";
import { UiText } from "../text";
import UiLink from "../link";
import { UiBadge } from "../badge";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import createFlow2 from "../../../assets/createflow2.svg";
import createFlow3 from "../../../assets/createflow3.svg";
import createFlow4 from "../../../assets/createflow4.svg";
import createFlow5 from "../../../assets/createflow5.svg";
import createFlow6 from "../../../assets/createflow6.svg";
import createFlow7 from "../../../assets/createflow7.svg";

const flowCards = [
  {
    title: "Prevent lost sales",
    description:
      "Turn browses and abandoned carts into purchases with these high-converting flows",
    flowCount: 17,
    href: "preventlostsales",
    image: createFlow2,
  },
  {
    title: "Nurture subscribers",
    description:
      "Turn subscribers into customers by sending them message at key points.",
    flowCount: 10,
    href: "nurturesubscribers",
    image: createFlow4,
  },
  {
    title: "Build customer loyalty",
    description:
      "Build personalized relationships with your customers with these flows tailored for each recipient.",
    flowCount: 3,
    href: "buildcustomerloyalty",
    image: createFlow7,
  },
  {
    title: "Reminder people to purchase",
    description:
      "Send personalized reminders to customers prompting them to return and purchase specific products.",
    flowCount: 11,
    href: "reminderpeoplepurchase",
    image: createFlow3,
  },
  {
    title: "Encourage repeat purchases",
    description:
      "After a customer makes a purchase, utilize these flows to retain engagement or win black odd customers.",
    flowCount: 5,
    href: "encouragerepeatpurchases",
    image: createFlow5,
  },
  {
    title: "Send order updates",
    description:
      "Send essential non-marketing emails with flows to keep customers updated on their order status.",
    flowCount: 15,
    href: "sendorderupdates",
    image: createFlow6,
  },
];

const CreateFlowCategory = () => {
  return (
    <Box>
      <Flex justify="space-between" py="3">
        <UiText variant="heading2">Browse by goal</UiText>
        {/* <UiLink fontWeight="semibold" href="#">
          View All Flows
        </UiLink> */}
      </Flex>

      <Flex gap="4" wrap="wrap">
        {flowCards.map((item, index) => (
          <Box
            key={index}
            whiteSpace="none"
            w={{ base: "100%", xl: "calc(50% - 0.5rem)" }}
          >
            <Link
              to={item.href}
              onClick={() => {
                document.querySelector(".main")?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <Flex
                borderRadius="md"
                border="sm"
                borderColor="gray.600"
                overflow="hidden"
                boxShadow="sm"
                _hover={{ borderColor: "blue.200" }}
              >
                <Box minW="180px">
                  <Image src={item.image} alt="create-flow-image" />
                </Box>
                <Flex
                  p="3"
                  direction="column"
                  bg="white"
                  justify="space-between"
                  w="full"
                >
                  <Flex minH="7xs" justify="space-between">
                    <Box>
                      <UiText fontWeight="semibold">{item.title}</UiText>
                      <UiText variant="caption">{item.description}</UiText>
                    </Box>
                    <Icon as={ChevronRight} boxSize="6" />
                  </Flex>
                  <UiBadge status="pending" icon w="fit">
                    {item.flowCount} flows
                  </UiBadge>
                </Flex>
              </Flex>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default CreateFlowCategory;
