import { Box, Flex } from "@chakra-ui/react";
import PerformanceCard from "./perfomance-card";
import { UiSelect } from "../../select";

const EmailBounceDetails = () => {
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
      <Box mr="5">
        <Flex gap="5" mb="5">
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
        <PerformanceCard heading="Bounce report" />
      </Box>
    </>
  );
};

export default EmailBounceDetails;
