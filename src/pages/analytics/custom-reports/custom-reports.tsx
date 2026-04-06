import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Box, Flex, Image } from "@chakra-ui/react";
import revenueMessageReport from "../../../assets/revenue-message-report.svg";
import engageMessageReport from "../../../assets/engage-message-report.svg";
import productMessageReport from "../../../assets/product-messge-report.svg";
import UiLink from "@/components/ui/link";

const CustomReports = () => {
  const reportCards = [
    {
      image: revenueMessageReport,
      title: "How much revenue are my messages generating?",
      description:
        "See what flows and campaigns are driving sales on your site.",
      href: "#",
    },
    {
      image: engageMessageReport,
      title: "How are customers engaging with my messages?",
      description:
        "Assess customer health through engagement metrics like message opens, clicks, and unsubscribes.",
      href: "#",
    },
    {
      image: productMessageReport,
      title: "Which products are my customers purchasing?",
      description:
        "Dive into your product performance to see what offerings resonate with your customers.",
      href: "#",
    },
  ];
  return (
    <>
      <Box position="relative">
        <Box
          h="md"
          bg="gray.100"
          w="full"
          overflowX="auto"
          position="absolute"
        ></Box>
        <Box
          w="5xl"
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          py="20"
        >
          <UiText variant="heading2" fontWeight="semibold">
            Identify opportunities for growth
          </UiText>
          <UiText my="3">
            Build a custom CSV report in seconds with the raw data you need for
            a deep dive analysis.
          </UiText>
          <Flex gap="3" my="6">
            <UiButton uiVariant="solid">Create Custom Report</UiButton>
            <UiTextLink value="Learn More" />
          </Flex>
          <Box bg="white" border="sm" borderRadius="md" borderColor="gray.300">
            <Box p="4">
              <UiText fontWeight="semibold">Popular business questions</UiText>
              <UiText color="gray.400">
                Other companies using Mailbot have used custom reports to
                investigate the below questions.
              </UiText>
            </Box>
            <Flex p="6" pt="4" pr="4" gap="3">
              {reportCards.map((card, index) => (
                <Box
                  key={index}
                  border="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                  overflow="hidden"
                  w="sm"
                  _hover={{ bg: "gray.500" }}
                >
                  <Image src={card.image} w="full" alt="Report Image" />
                  <UiText m="3" fontWeight="semibold">
                    {card.title}
                  </UiText>
                  <UiText m="3" py="3" minH="7xs" color="gray.400">
                    {card.description}
                  </UiText>
                  <UiLink m="3" mt="6" href={card.href}>
                    Get Started
                  </UiLink>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomReports;
