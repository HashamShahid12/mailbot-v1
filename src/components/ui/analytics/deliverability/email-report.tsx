import { Box, Flex } from "@chakra-ui/react";
import PerformanceCard from "./perfomance-card";
import { UiSelect } from "../../select";
import { UiText } from "../../text";

const EmailReport = () => {
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
  const messageCategory = [
    {
      label: "Inbox Provider",
      value: "inbox-provider",
    },
    {
      label: "Email Domain",
      value: "email-domain",
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
          <UiSelect
            width="5xs"
            items={messageCategory}
            showLabel
            label="Message category"
            defaultValue="inbox-provider"
            bgTrigger="white"
          />
          <UiSelect
            width="3xs"
            showLabel
            label="Message category"
            defaultValue="inbox-provider"
            bgTrigger="white"
            searchBar
          >
            <UiText p="2" borderTop="sm" borderColor="gray.300">
              No results available
            </UiText>
          </UiSelect>
        </Flex>
        <PerformanceCard heading="Key metrics" />
      </Box>
    </>
  );
};

export default EmailReport;
