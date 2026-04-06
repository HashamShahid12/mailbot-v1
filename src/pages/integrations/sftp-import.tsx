import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import { UiText } from "@/components/ui/text";
import { Box } from "@chakra-ui/react";

const SftpImport = () => {
  return (
    <>
      <Box p="5" m="auto" maxW="5xl">
        <PerformanceCard
          heading="Recent Imports"
          linkHref="#"
          linkIcon={true}
          linkTitle="Learn more"
          emptyTable={false}
        >
          <UiText variant="heading2">No import found</UiText>
          <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
            Recent imports on this account will appear here.
          </UiText>
        </PerformanceCard>
      </Box>
    </>
  );
};

export default SftpImport;
