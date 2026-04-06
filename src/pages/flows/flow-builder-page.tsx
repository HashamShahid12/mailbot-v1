import { Box } from "@chakra-ui/react";
import FlowBuilder from "@/components/ui/flows/flow-builder";
import FlowBuilderHeader from "@/components/ui/flows/flow-builder-header";

const FlowBuilderPage = () => {
  return (
    <>
      {/* <FlowBuilderHeader /> */}
      <Box w="full" h="full">
        <FlowBuilder />
      </Box>
    </>
  );
};

export default FlowBuilderPage;
