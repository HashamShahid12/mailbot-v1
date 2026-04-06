import CreateFlowHeader from "@/components/ui/flows/create-flow-header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const CreateFlow = () => {
  return (
    <>
      <CreateFlowHeader />
      <Box p="5" maxW="5xl" minW="xl" m="auto">
        <Outlet />
        {/* <CreateFlowCategory /> */}
      </Box>
    </>
  );
};

export default CreateFlow;
