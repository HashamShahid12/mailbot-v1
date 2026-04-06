import { Handle, Position } from "@xyflow/react";
// import { TriggerIcon } from "../add-btn-node/svg";
import { renderFlowName } from "../../../../helpers";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { UiText } from "../../text";
import { useFlowStore } from "@/store/flows-store";

const TriggerNode = ({ data, id }) => {
  const { setActiveModal, setSelectedNode } = useFlowStore();
  const { triggerType } = data;
  return (
    <Box padding={4}>
      <VStack>
        <Flex align="space-between">
          <UiText fontWeight="bold">Entry Trigger</UiText>
        </Flex>
        {triggerType !== "custom" ? (
          <Box>
            {/* <TriggerIcon /> */}
            <b>{renderFlowName(triggerType)?.split("Email")[0]}</b>
          </Box>
        ) : (
          <button
            className="trigger-btn"
            onClick={() => {
              setSelectedNode({ id, type: "triggerNode", options: {} });
              setActiveModal("trigger-selection");
            }}
          >
            Add a trigger
          </button>
        )}
      </VStack>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </Box>
  );
};

export default TriggerNode;
