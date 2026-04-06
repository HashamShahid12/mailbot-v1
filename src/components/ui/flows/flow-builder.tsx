import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TriggerNode from "./nodes/trigger-node";
import "@xyflow/react/dist/style.css";
import "./styles/flow.css";
import { useFlowStore } from "@/store/flows-store";
import AddBtnNode from "./nodes/add-btn-node";
import EmailNode from "./nodes/email-node";
import { useNavigate, useSearchParams } from "react-router-dom";
import FlowSettingsDialog from "./flow-settings-dialog";
import FlowBuilderHeader from "./flow-builder-header";
import { toaster } from "../toaster";
import { getAllFlows } from "@/api/flow-api";

const nodeTypes = {
  triggerNode: TriggerNode,
  addBtnNode: AddBtnNode,
  emailNode: EmailNode,
};

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    createFlow,
    updateFlow,
    flowTypeData,
    handleResetFlows,
    getFlowByType,
    getDefaultFlowTemplate,
    automation,
    setAutomation,
    setFlowsPageLoading,
  } = useFlowStore();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isTemplate = searchParams.get("template") === "true";

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Validation

    const triggerNodes = nodes.filter((n) => n.type === "triggerNode");
    if (triggerNodes.length === 0) {
      toaster.create({
        title: "Validation Error",
        description: "Flow must have a trigger.",
        type: "error",
      });
      return;
    }

    // If it's a custom flow, ensure the trigger has a type selected
    if (type === "custom" && !triggerNodes[0].data?.triggerType) {
      toaster.create({
        title: "Validation Error",
        description: "Please select a trigger type.",
        type: "error",
      });
      return;
    }

    const emailNodes = nodes.filter((n) => n.type === "emailNode");

    if (emailNodes.length === 0) {
      toaster.create({
        title: "Validation Error",
        description: "Flow must have at least one email.",
        type: "error",
      });
      return;
    }

    for (const node of emailNodes) {
      if (!node.data.subject) {
        toaster.create({
          title: "Validation Error",
          description: `Email node "${node.data.label || "Email"}" is missing a subject.`,
          type: "error",
        });
        return;
      }
      if (!node.data.wait_time) {
        toaster.create({
          title: "Validation Error",
          description: `Email node "${node.data.label || "Email"}" is missing a delay time.`,
          type: "error",
        });
        return;
      }
      // template_id check (or template_json if loaded from saved)
      if (!node.data.template_html && !node.data.template_json) {
        toaster.create({
          title: "Validation Error",
          description: `Email node "${node.data.label || "Email"}" is missing a template.`,
          type: "error",
        });
        return;
      }
    }

    setLoading(true);
    try {
      // 2. Determine ID and Method
      const isCustom = type === "custom";
      const isUpdate = !isTemplate;

      console.log(isUpdate, "issssupdateeeee");

      const triggerNode = nodes.find((n) => n.type === "triggerNode");
      const finalType =
        type === "custom" ? triggerNode?.data?.triggerType : type;

      console.log(finalType);

      let flowId = "flow-" + Date.now();
      if (isUpdate) {
        flowId = flowTypeData?.flow?.id || finalType;
      }

      // 4. Construct Payload
      const payload = {
        edges,
        nodes: nodes.map((node) => {
          if (node.type === "emailNode") {
            // Ensure all required fields are present in node.data
            // Remove template_id from payload as requested
            const { template_id, ...dataWithoutTemplateId } = node.data;
            return {
              ...node,
              data: {
                ...dataWithoutTemplateId,
                label: node.data.label || "Email",
                filter: node.data.filter || { or: [], and: [] },
                discount_code: node.data.discount_code || "",
                node_id: node.id, // Explicitly set node_id matching the node's id
                enabled: isUpdate ? false : node.data.enabled,
              },
            };
          }
          return node;
        }),
        type: finalType,
        id: flowId,
        is_shopify_flow: true,
      };

      if (isUpdate) {
        await updateFlow(flowId, payload);
        toaster.create({
          title: "Success",
          description: "Flow updated successfully.",
          type: "success",
        });
      } else {
        await createFlow(payload);
        toaster.create({
          title: "Success",
          description: "Flow created successfully.",
          type: "success",
        });
      }
      navigate("/flows");
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to save flow.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFlows = async () => {
      setFlowsPageLoading(true);
      try {
        const data = await getAllFlows();
        const backendTypes = (data.all || []).reduce((acc: any, flow: any) => {
          if (flow.type) acc[flow.type] = true;
          return acc;
        }, {});

        const currentAutomation = useFlowStore.getState().automation;
        setAutomation({
          ...currentAutomation,
          all: data.all,
          overall: data.overall,
          all_shopify_flows: data.all_shopify_flows,
          backendTypes,
        });
      } catch (error) {
        console.error("Failed to get flows list", error);
      } finally {
        setFlowsPageLoading(false);
      }
    };
    fetchFlows();
  }, []);

  useEffect(() => {
    if (type === "custom") {
      handleResetFlows(type);
    } else if (type && isTemplate) {
      getDefaultFlowTemplate(type);
    } else if (type) {
      getFlowByType(type);
    }
  }, [
    type,
    isTemplate,
    handleResetFlows,
    getFlowByType,
    getDefaultFlowTemplate,
  ]);
  return (
    <Box h="full" w="100%">
      <FlowBuilderHeader
        onSave={handleSave}
        loading={loading}
        isTemplate={isTemplate}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
        deleteKeyCode={["pgUp"]}
        selectionKeyCode={["pgUp"]}
        maxZoom={1.5}
        nodesDraggable={false}
        minZoom={0.5}
        // connectionLineComponent={false}
        fitView
      >
        <Background variant="cross" bgColor={"#fcfcfd"} />
      </ReactFlow>
      <FlowSettingsDialog />
    </Box>
  );
};

export default FlowBuilder;
