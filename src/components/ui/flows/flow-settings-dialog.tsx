import { PrimitiveDialog } from "../dailog-model";
import { useFlowStore } from "@/store/flows-store";
import {
  Box,
  VStack,
  Button,
  HStack,
  SimpleGrid,
  Image,
  Spinner,
  Switch,
  Stack,
} from "@chakra-ui/react";
import { UiSelect } from "../select";
import { useState, useMemo, useEffect } from "react";
import { UiText } from "../text";
import { flow_templates } from "./templates";
import FormField from "../input";
import { flowsTimeOptions, flowWelcomeSeriesTimeOptions } from "@/constants";
import FilterConditions from "./filter-conditions";
import { Plus } from "lucide-react";
import { getSegments } from "@/api/segments";
import {
  getTemplates,
  getTemplateById,
  type EmailTemplate,
} from "@/api/email-templates";
import { toaster } from "@/components/ui/toaster";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "../tooltip";

const FlowSettingsDialog = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "";
  const isTemplate = searchParams.get("template") === "true";

  const {
    activeModal,
    setActiveModal,
    selectedNode,
    handleNodesChange,
    nodes,
    automation,
    handleNodeOptionsChange,
    nodeOptions,
    edges,
    setEdges,
  } = useFlowStore();

  const [selectedTrigger, setSelectedTrigger] = useState<any>("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailPreviewText, setEmailPreviewText] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New state for segments and templates
  const [segments, setSegments] = useState<any[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [loadingResources, setLoadingResources] = useState(false);

  const isTriggerSelectionOpen = activeModal === "trigger-selection";
  const isEmailSettingsOpen = activeModal === "email-settings";
  const isOpen = isTriggerSelectionOpen || isEmailSettingsOpen;

  const currentNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedNode?.id);
  }, [nodes, selectedNode]);

  console.log(selectedNode);

  useEffect(() => {
    if (isTriggerSelectionOpen) {
      const node =
        nodes.find((n) => n.id === selectedNode?.id) ||
        (nodes.length > 0 && nodes[0].type === "triggerNode" ? nodes[0] : null);

      if (node?.data?.triggerType && node.data.triggerType !== "custom") {
        setSelectedTrigger(node.data.triggerType);
      } else {
        setSelectedTrigger("");
      }
    } else if (isEmailSettingsOpen) {
      console.log(nodes);

      const node = nodes.find((n) => {
        console.log(n.id, "nid");

        return n.id === selectedNode?.id;
      });
      if (node) {
        setEmailSubject(node.data.subject || "");
        setEmailPreviewText(node.data.preview_text || "");
        setWaitTime(Number(node.data.wait_time));
        setIsEmailEnabled(node.data.enabled || false);

        // Initialize template selection if exists
        if (node.data.template_id && templates.length > 0) {
          const t = templates.find((t) => t.id === node.data.template_id);
          if (t) setSelectedTemplate(t);
        }
      }

      // Fetch resources if not loaded
      if (segments.length === 0 || templates.length === 0) {
        fetchResources();
      }
    }
  }, [
    isOpen,
    selectedNode,
    // nodes, // Removed to prevent infinite loop if we update nodes in effect
    isTriggerSelectionOpen,
    isEmailSettingsOpen,
    templates,
  ]);

  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const [segRes, tempRes] = await Promise.all([
        getSegments(),
        getTemplates(),
      ]);

      if (segRes && segRes.data) {
        const allSegments = [
          ...(segRes.data.shopify_segments || []),
          ...(segRes.data.defaults_custom_segments || []),
          ...(segRes.data.archived || []),
        ];
        setSegments(allSegments);
      }

      if (tempRes.success && tempRes.data && tempRes.data.email_templates) {
        const allTemplates = [
          ...(tempRes.data.email_templates.custom_templates || []),
          ...(tempRes.data.email_templates.default_templates || []),
        ];
        setTemplates(allTemplates);
      }
    } catch (error) {
      console.error("Failed to fetch resources", error);
      toaster.create({
        title: "Error fetching resources",
        type: "error",
      });
    } finally {
      setLoadingResources(false);
    }
  };

  // Logic from dump.md: Filter templates based on already active flows
  const filteredTemplates = useMemo(() => {
    // If automation or automation.all is undefined, return all templates
    if (!automation?.all) return flow_templates;

    // Get current node's trigger type to ensure it's included
    const currentNode =
      nodes.find((n) => n.id === selectedNode?.id) ||
      (nodes.length > 0 && nodes[0].type === "triggerNode" ? nodes[0] : null);
    const currentTriggerType = currentNode?.data?.triggerType;

    return flow_templates.filter((template) => {
      const isAlreadyActive = automation.all.some(
        (flow) => flow.type === template.type,
      );
      // Include if it's not active OR if it's the current one being edited
      return (
        !isAlreadyActive ||
        (currentTriggerType && template.type === currentTriggerType)
      );
    });
  }, [automation?.all, nodes, selectedNode]);

  const triggerOptions = filteredTemplates.map(({ title, type }) => ({
    label: title,
    value: type,
  }));

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleChangeFilterCondition = (
    value: any,
    type: string,
    index: number,
    isAnd = false,
  ) => {
    const updatedNodes = [...nodes];
    const targetNodeIndex = updatedNodes.findIndex(
      (n) => n.id === selectedNode?.id,
    );

    if (targetNodeIndex !== -1) {
      const node = updatedNodes[targetNodeIndex];
      // Ensure filter object exists
      if (!node.data.filter) node.data.filter = { and: [], or: [] };
      if (!node.data.filter.and) node.data.filter.and = [];
      if (!node.data.filter.or) node.data.filter.or = [];

      if (isAnd) {
        if (node.data.filter.and[index]) {
          node.data.filter.and[index][type] = value;
        }
      } else {
        if (node.data.filter.or[index]) {
          node.data.filter.or[index][type] = value;
        }
      }
      handleNodesChange(updatedNodes);
    }
  };

  const addCondition = (isAnd: boolean) => {
    const updatedNodes = [...nodes];
    const targetNodeIndex = updatedNodes.findIndex(
      (n) => n.id === selectedNode?.id,
    );

    if (targetNodeIndex !== -1) {
      const node = updatedNodes[targetNodeIndex];
      // Ensure filter object exists
      if (!node.data.filter) node.data.filter = { and: [], or: [] };
      if (!node.data.filter.and) node.data.filter.and = [];
      if (!node.data.filter.or) node.data.filter.or = [];

      const newCondition = {
        conditionType: "",
        key: "",
        value: "",
        operator: "",
      };

      if (isAnd) {
        node.data.filter.and.push(newCondition);
      } else {
        node.data.filter.or.push(newCondition);
      }
      handleNodesChange(updatedNodes);
    }
  };

  const handleSelectTemplate = (template: EmailTemplate) => {
    if (selectedTemplate?.id === template.id) {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(template);
    }
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;

    const nodeId = selectedNode.id;
    const incomingEdges = edges.filter((e) => e.target === nodeId);
    const outgoingEdges = edges.filter((e) => e.source === nodeId);

    // Filter out edges connected to the node
    const newEdges = edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );

    // Attempt reconnection (linear flow assumption)
    if (incomingEdges.length === 1 && outgoingEdges.length === 1) {
      const source = incomingEdges[0].source;
      const target = outgoingEdges[0].target;

      const newEdge = {
        ...incomingEdges[0],
        id: `e${source}-${target}-${Date.now()}`,
        source,
        target,
        label: "", // Clear label (wait time)
      };
      newEdges.push(newEdge);
    }

    // Calculate position shifts for downstream nodes to fill the gap
    const deletedNode = nodes.find((n) => n.id === nodeId);
    const nodesToShift = new Set<string>();
    let shiftX = 0;
    let shiftY = 0;

    if (deletedNode && outgoingEdges.length === 1) {
      const childId = outgoingEdges[0].target;
      const childNode = nodes.find((n) => n.id === childId);

      if (childNode) {
        // Calculate vector to move child to deleted node's position
        shiftX = deletedNode.position.x - childNode.position.x;
        shiftY = deletedNode.position.y - childNode.position.y;

        // Find all downstream nodes starting from child
        const queue = [childId];
        nodesToShift.add(childId);

        while (queue.length > 0) {
          const currId = queue.shift()!;
          // Use original edges to traverse downstream
          const children = edges
            .filter((e) => e.source === currId)
            .map((e) => e.target);

          for (const child of children) {
            if (!nodesToShift.has(child)) {
              nodesToShift.add(child);
              queue.push(child);
            }
          }
        }
      }
    }

    const newNodes = nodes
      .filter((n) => n.id !== nodeId)
      .map((n) => {
        if (nodesToShift.has(n.id)) {
          return {
            ...n,
            position: {
              x: n.position.x + shiftX,
              y: n.position.y + shiftY,
            },
          };
        }
        return n;
      });

    handleNodesChange(newNodes);
    setEdges(newEdges);
    handleClose();

    toaster.create({
      title: "Node Removed",
      description: "Email node removed successfully.",
      type: "success",
    });
  };

  const handleSave = async () => {
    if (isTriggerSelectionOpen && selectedTrigger) {
      // Logic from dump.md: Update node and set isTriggerAdded
      const newNodes = [...nodes];

      const targetNodeIndex = nodes.findIndex((n) => n.id === selectedNode?.id);

      if (targetNodeIndex !== -1) {
        newNodes[targetNodeIndex] = {
          ...newNodes[targetNodeIndex],
          data: {
            ...newNodes[targetNodeIndex].data,
            triggerType: selectedTrigger,
          },
        };
      } else if (nodes.length > 0 && nodes[0].type === "triggerNode") {
        // Fallback to first node if it is a trigger node
        newNodes[0] = {
          ...newNodes[0],
          data: {
            ...newNodes[0].data,
            triggerType: selectedTrigger,
          },
        };
      }

      handleNodesChange(newNodes);

      handleNodeOptionsChange({
        ...nodeOptions,
        isTriggerAdded: true,
      });
      handleClose();
    } else if (isEmailSettingsOpen) {
      setIsSaving(true);
      try {
        let templateData = selectedTemplate;
        if (selectedTemplate) {
          try {
            const resp = await getTemplateById(selectedTemplate.id);
            if (resp.success && resp.data.email_templates) {
              templateData = resp.data.email_templates;
            }
          } catch (err) {
            console.error("Failed to fetch template details", err);
            toaster.create({
              title: "Warning",
              description:
                "Failed to fetch full template details. Using cached data.",
              type: "warning",
            });
          }
        }

        const newNodes = nodes.map((n) => {
          if (n.id === selectedNode?.id) {
            const newData: any = {
              ...n.data,
              subject: emailSubject,
              preview_text: emailPreviewText,
              wait_time: Number(waitTime),
              is_enabled: isEmailEnabled,
              enabled: isEmailEnabled,
            };

            if (templateData) {
              // newData.template_id = templateData.id;
              newData.template_name = templateData.name;
              newData.template_image = templateData.image;
              newData.template_json = templateData.email_template_json;
              // Transform html to match payload requirement { body: string }
              // Assuming templateData.html is { html: string } based on API type
              const htmlContent =
                templateData.html &&
                typeof templateData.html === "object" &&
                "html" in templateData.html
                  ? templateData.html.html
                  : templateData.html;

              newData.template_html = { body: htmlContent };
            }

            return {
              ...n,
              data: newData,
            };
          }
          return n;
        });
        handleNodesChange(newNodes);

        // Update edges for wait time label
        if (waitTime) {
          const updatedEdges = edges.map((edge) => {
            if (edge.target === selectedNode?.id) {
              const edgeLabel = flowsTimeOptions.filter(
                (time) => time.value === parseInt(waitTime),
              );
              // Also check welcome series options
              const welcomeEdgeLabel = flowWelcomeSeriesTimeOptions.filter(
                (time) => time.value === parseInt(waitTime),
              );

              const label = edgeLabel[0]?.label || welcomeEdgeLabel[0]?.label;

              if (label) {
                return {
                  ...edge,
                  label: "Wait for " + label,
                };
              }
            }
            return edge;
          });
          setEdges(updatedEdges);
        }
        handleClose();
      } catch (error) {
        console.error("Error saving flow settings", error);
        toaster.create({
          title: "Error",
          description: "An error occurred while saving settings.",
          type: "error",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const timeOptions = useMemo(() => {
    return type.includes("welcome_series")
      ? flowWelcomeSeriesTimeOptions
      : flowsTimeOptions;
  }, [type]);

  return (
    <PrimitiveDialog
      title={isTriggerSelectionOpen ? "Select Trigger" : "Email Settings"}
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      size="xl"
    >
      <Box py={4} maxH="80vh" overflowY="auto">
        <VStack gap={4} align="stretch">
          {isTriggerSelectionOpen && (
            <>
              <UiText>Choose a trigger to start your automation flow.</UiText>
              <UiSelect
                items={triggerOptions}
                placeholder="Select a trigger..."
                selectedItem={selectedTrigger}
                onChange={(val: any) => setSelectedTrigger(val)}
                width="full"
              />
            </>
          )}
          {isEmailSettingsOpen && (
            <>
              <Stack alignItems="" mb={4}>
                <Box as="label" htmlFor="email-enabled" mb="0" mr={3}>
                  <UiText>Enable Email</UiText>
                </Box>
                <Tooltip
                  content={
                    isTemplate
                      ? "Create the flow first to enable this email."
                      : "Enable/Disable this email"
                  }
                >
                  <Switch.Root
                    id="email-enabled"
                    checked={isEmailEnabled}
                    onCheckedChange={(e) => setIsEmailEnabled(e.checked)}
                    disabled={isTemplate}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Tooltip>
                <Button
                  variant="solid"
                  color="white"
                  backgroundColor="red"
                  padding={2}
                  onClick={handleDeleteNode}
                >
                  Remove
                </Button>
              </Stack>

              {/* Wait Time */}
              <UiText fontWeight="bold">Wait Time *</UiText>
              <UiSelect
                items={timeOptions}
                placeholder="Select wait time"
                selectedItem={parseInt(waitTime)}
                onChange={(val: any) => setWaitTime(val)}
              />

              {/* Subject */}
              <FormField
                label="Subject *"
                value={emailSubject}
                onChange={(_, val) => setEmailSubject(val)}
                placeholder="Enter email subject"
                required
              />

              {/* Preview Text */}
              <FormField
                label="Preview Text"
                value={emailPreviewText}
                onChange={(_, val) => setEmailPreviewText(val)}
                placeholder="Enter preview text"
              />

              {/* Conditions */}
              <Box mt={4}>
                <UiText fontWeight="bold" mb={2}>
                  Conditions
                </UiText>
                <UiText variant="caption" mb={2}>
                  Customers who meet <b>ALL</b> the following conditions:
                </UiText>
                <VStack
                  align="stretch"
                  spacing={3}
                  p={3}
                  bg="gray.50"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  {currentNode?.data?.filter?.and?.map(
                    (condition: any, index: number) => (
                      <FilterConditions
                        key={`and-${index}`}
                        conditionType={condition.conditionType}
                        filterKey={condition.key}
                        value={condition.value}
                        operator={condition.operator}
                        handleChange={(val, type, idx) =>
                          handleChangeFilterCondition(val, type, index, true)
                        }
                        segments={segments}
                        nodes={nodes}
                        setNodes={handleNodesChange}
                        currentNode={currentNode}
                        index={index}
                        isAnd={true}
                        length={currentNode.data.filter.and.length}
                      />
                    ),
                  )}
                  <Button
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    onClick={() => addCondition(true)}
                    variant="outline"
                  >
                    Add Condition
                  </Button>
                </VStack>

                <UiText variant="caption" mt={4} mb={2}>
                  and at least <b>ONE</b> of the following conditions:
                </UiText>
                <VStack
                  align="stretch"
                  spacing={3}
                  p={3}
                  bg="gray.50"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  {currentNode?.data?.filter?.or?.map(
                    (condition: any, index: number) => (
                      <FilterConditions
                        key={`or-${index}`}
                        conditionType={condition.conditionType}
                        filterKey={condition.key}
                        value={condition.value}
                        operator={condition.operator}
                        handleChange={(val, type, idx) =>
                          handleChangeFilterCondition(val, type, index, false)
                        }
                        segments={segments}
                        nodes={nodes}
                        setNodes={handleNodesChange}
                        currentNode={currentNode}
                        index={index}
                        isAnd={false}
                        length={currentNode.data.filter.or.length}
                      />
                    ),
                  )}
                  <Button
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    onClick={() => addCondition(false)}
                    variant="outline"
                  >
                    Add Condition
                  </Button>
                </VStack>
              </Box>

              {/* Template Selection */}
              <Box mt={6}>
                <UiText fontWeight="bold" mb={3}>
                  Select Email Template
                </UiText>
                {loadingResources ? (
                  <Spinner />
                ) : (
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {templates.map((template) => (
                      <Box
                        key={template.id}
                        borderWidth={
                          selectedTemplate?.id === template.id ? "2px" : "1px"
                        }
                        borderColor={
                          selectedTemplate?.id === template.id
                            ? "blue.500"
                            : "gray.200"
                        }
                        borderRadius="md"
                        overflow="hidden"
                        cursor="pointer"
                        onClick={() => handleSelectTemplate(template)}
                        _hover={{ shadow: "md" }}
                        position="relative"
                      >
                        <Box h="150px" bg="gray.100">
                          {template.image ? (
                            <Image
                              src={template.image}
                              alt={template.name}
                              objectFit="cover"
                              w="full"
                              h="full"
                            />
                          ) : (
                            <Box
                              w="full"
                              h="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <UiText variant="caption">No Preview</UiText>
                            </Box>
                          )}
                        </Box>
                        <Box p={2}>
                          <UiText
                            variant="caption"
                            fontWeight="bold"
                            noOfLines={1}
                          >
                            {template.name}
                          </UiText>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </Box>
            </>
          )}
        </VStack>
        <HStack justify="flex-end" mt={6} gap={3}>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            loading={isSaving}
            loadingText="Saving..."
            disabled={
              (isTriggerSelectionOpen && !selectedTrigger) ||
              (isEmailSettingsOpen && (!emailSubject || !waitTime)) ||
              isSaving
            }
          >
            Save
          </Button>
        </HStack>
      </Box>
    </PrimitiveDialog>
  );
};

export default FlowSettingsDialog;
