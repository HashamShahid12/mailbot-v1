import { Box, Flex, Icon, Stack } from "@chakra-ui/react";
import UiBox from "../../box";
import { UiText } from "../../text";
import { UiBadge } from "../../badge";
import { TbCircleDashed } from "react-icons/tb";
import UiLink from "../../link";
import UiTextLink from "../../text-link";
import UiButton from "../../button";
import PerformanceCard from "./perfomance-card";

const EmailScore = () => {
  const ActionCardData = [
    {
      heading: 'Create a "Never engaged" segment',
      description:
        "Use this segment to improve your deliverability score by removing subscribers that have shown no engagement",
      link: 'Create a "Never engaged" segment',
      href: "#",
    },
    {
      heading: 'Create a "Never engaged" segment',
      description:
        "Use this segment to improve your deliverability score by removing subscribers that have shown no engagement",
      link: "Create a sending schedule based on email engagement",
      href: "#",
    },
  ];
  return (
    <>
      <Box mr="5">
        <Flex outline="none" gap="5" mb="5">
          <PerformanceCard
            flex="1"
            image={false}
            heading="Deliverability score"
            emptyTable={false}
            position="relative"
            top="0"
            tabs={{
              defaultValue: "factors",
              tabs: [
                { value: "factors", label: "Factors" },
                { value: "overtime", label: "Over Time" },
              ],
            }}
          >
            <Box
              textAlign="center"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="sm"
            >
              <UiText as="div">
                Your score is{" "}
                <UiBadge status="pending" icon>
                  Unavailable
                </UiBadge>
              </UiText>
              <UiText mt="5" color="gray.400">
                To qualify for a deliverability score you must send at least
                1000 emails in the last 30 days.
              </UiText>
            </Box>
          </PerformanceCard>
          <UiBox minH="xl" flex="1">
            <UiText variant="heading2">Action Center</UiText>
            <UiText color="gray.400">Learn how to improve your score</UiText>
            {ActionCardData.map((card, index) => (
              <Flex key={index} gap="2" mt="7">
                <Icon as={TbCircleDashed} boxSize="7" />
                <Box>
                  <UiText>{card.heading}</UiText>
                  <UiText my="4">{card.description}</UiText>
                  <Flex align="center" gap="5">
                    {index === 0 && <UiLink href="#">Create segment</UiLink>}
                    <UiButton fontWeight="semibold">Mark done</UiButton>
                  </Flex>
                  <UiTextLink mt="4" value={card.link} href={card.href} />
                </Box>
              </Flex>
            ))}
          </UiBox>
        </Flex>
        <Stack gap="5">
          <PerformanceCard
            heading="Recent campaign message performance"
            linkTitle="View all campaigns"
            linkHref="#"
            showDate
          />
          <PerformanceCard
            heading="Recent flows performance"
            linkTitle="View all flows"
            linkHref="#"
            showDate
          />
        </Stack>
      </Box>
    </>
  );
};

export default EmailScore;
