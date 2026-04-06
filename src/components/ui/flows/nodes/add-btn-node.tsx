import { Handle, Position } from "@xyflow/react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "../../tooltip";
import { useFlowStore } from "@/store/flows-store";

const AddBtnNode = ({ data }) => {
  const { id } = data;
  const {
    nodeOptions,
    selectedNode,
    handleSelectedNodeChange,
    nodes,
    handleNodeOptionsChange,
    setNodes,
    edges,
    setEdges,
  } = useFlowStore();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const triggerSelected = nodes.filter((n) => n.type === "triggerNode")[0];

  const remindersLimit =
    type === "welcomed" || triggerSelected?.data?.triggerType === "welcomed"
      ? 1
      : 10;

  const handleOptionClick = (option, isDisabled = false) => {
    if (isDisabled) return;

    if (option === "emailNode") {
      const emailNodeId = "email-" + Date.now();
      const currentBtnNode = nodes.find((n) => n.id === id);

      if (!currentBtnNode) return;

      const emailNode = {
        id: emailNodeId,
        type: "emailNode",
        position: { ...currentBtnNode.position },
        data: {
          label: "Email",
          subject: "",
          preview_text: "",
          enabled: true,
          is_enabled: true,
          node_id: emailNodeId,
        },
      };

      const updatedBtnNode = {
        ...currentBtnNode,
        position: {
          ...currentBtnNode.position,
          x: currentBtnNode.position.x + 400,
        },
      };

      const sourceEdge = edges.find((e) => e.target === id);

      const newNodes = nodes
        .map((n) => (n.id === id ? updatedBtnNode : n))
        .concat(emailNode);

      let newEdges = [...edges];
      if (sourceEdge) {
        newEdges = newEdges.filter((e) => e.id !== sourceEdge.id);
        const newEdgeToEmail = {
          ...sourceEdge,
          target: emailNodeId,
          id: "e-" + sourceEdge.source + "-" + emailNodeId,
        };
        const newEdgeFromEmail = {
          id: "e-" + emailNodeId + "-" + id,
          source: emailNodeId,
          target: id,
          type: "smoothstep", // Assuming default or common edge type
        };
        newEdges.push(newEdgeToEmail, newEdgeFromEmail);
      }

      setNodes(newNodes);
      setEdges(newEdges);

      // Update options
      handleSelectedNodeChange({
        ...selectedNode,
        type: option,
        id: emailNodeId,
        options: emailNode.data,
      });

      handleNodeOptionsChange({
        ...nodeOptions,
        counts: {
          ...nodeOptions.counts,
          emailNode: (nodeOptions.counts?.emailNode || 0) + 1,
        },
      });
    } else {
      handleSelectedNodeChange({
        ...selectedNode,
        type: option,
        id: id,
      });
    }
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Tooltip
        content={
          nodeOptions.isTriggerAdded === false
            ? "Add Trigger to continue"
            : nodes.filter((n) => n.type === "emailNode").length >=
                remindersLimit
              ? "Maximum nodes limit reached"
              : "Add Email node"
        }
      >
        <button
          className="add-node-btn"
          disabled={
            nodeOptions.counts?.emailNode === remindersLimit ||
            nodeOptions.isTriggerAdded === false
          }
          style={{
            cursor:
              nodeOptions.counts?.emailNode === remindersLimit ||
              nodeOptions.isTriggerAdded === false
                ? "not-allowed"
                : "pointer",
          }}
          onClick={() =>
            handleOptionClick(
              "emailNode",
              nodeOptions.counts?.emailNode === remindersLimit,
            )
          }
        >
          <svg
            style={{
              transform: nodeOptions.isBtnModalOpen && "rotate(45deg)",
            }}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5.5V1a1 1 0 0 0-2 0v4.5H1a1 1 0 0 0 0 2h4.5V12a1 1 0 0 0 2 0V7.5H12a1 1 0 0 0 0-2H7.5z"
              fill={
                nodeOptions.counts?.emailNode === remindersLimit ||
                nodeOptions.isTriggerAdded === false
                  ? "#b2b2cc"
                  : "#000"
              }
            ></path>
          </svg>{" "}
          Add Email
        </button>
      </Tooltip>
    </>
  );
};

export default AddBtnNode;
