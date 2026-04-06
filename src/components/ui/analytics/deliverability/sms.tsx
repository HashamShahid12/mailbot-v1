import { Box, Flex, Stack } from "@chakra-ui/react";
import PerformanceCard from "./perfomance-card";
import { UiSelect } from "../../select";

const SMS = () => {
  const time = [
    {
      label: "Last 7 days",
      value: "7days",
    },
    {
      label: "Last 30 days",
      value: "30days",
    },
    {
      label: "Last 90 days",
      value: "90days",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ];
  const message = [
    {
      label: "All messages",
      value: "messages",
    },
    {
      label: "All campaigns",
      value: "campaigns",
    },
    {
      label: "All flows",
      value: "flows",
    },
  ];
  return (
    <>
      <Box w="7xl" m="auto" my="10">
        <Stack gap="5">
          <Flex gap="5">
            <UiSelect
              width="5xs"
              showLabel
              label="Time Period"
              items={time}
              bgTrigger="white"
              defaultValue="30days"
            />
            <UiSelect
              width="5xs"
              items={message}
              showLabel
              label="Message type"
              defaultValue="messages"
              bgTrigger="white"
            />
          </Flex>
          <PerformanceCard heading="Fail details" image={false} />
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

export default SMS;
