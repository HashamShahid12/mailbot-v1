import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import DeveloperToolsLogsForm from "./developer-tools-logs-form";
import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";

const DeveloperToolsLogs = () => {
  return (
    <>
      <Box p="5" bg="white">
        <Flex
          p="2"
          border="sm"
          bg="blue.400"
          align="center"
          borderRadius="md"
          borderColor="blue.300"
          justify="space-between"
        >
          <Flex align="center" gap="1">
            <Icon as={IoInformationCircle} boxSize="5" color="blue.450" />
            <UiText color="blue.100">
              The API Logs Tool retains data for individual API calls for 14
              days. Aggregate data, like that shown in the Dashboard's API
              Activity Panel, is retained for 180 days.
            </UiText>
          </Flex>
          <Icon as={IoClose} boxSize="6" cursor="pointer" color="blue.450" />
        </Flex>
        <Flex my="5">
          <DeveloperToolsLogsForm />
        </Flex>
        <PerformanceCard border="none" boxShadow="none" />
      </Box>
    </>
  );
};

export default DeveloperToolsLogs;
