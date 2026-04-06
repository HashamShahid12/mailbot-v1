import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, SimpleGrid, Icon } from "@chakra-ui/react";
import { HelpCircle } from "lucide-react";
// import { EmailIconSvg } from "../add-btn-node/svg";
import { Handle, Position } from "@xyflow/react";
import { commaFormatting } from "../../../../helpers";
import { useFlowStore } from "@/store/flows-store";
import { UiText } from "@/components/ui/text";
import { UiBadge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

const EmailNode = ({ data }: { data: any }) => {
  const { flowTypeData, setActiveModal, setSelectedNode } = useFlowStore();
  const { label, subject, preview_text, enabled, node_id } = data;
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (!flowTypeData.flow || flowTypeData.flow?.reminders.length === 0) {
      setFilteredData([
        {
          click: 0,
          open: 0,
          orders_count: 0,
          revenue: 0,
          unsubscribed: 0,
        },
      ]);
    } else {
      const matchedData = flowTypeData.flow.reminders.find(
        (reminder: any) => reminder.node_id === node_id,
      );

      setFilteredData([
        matchedData || {
          click: 0,
          open: 0,
          orders_count: 0,
          revenue: 0,
          unsubscribed: 0,
        },
      ]);
    }
  }, [flowTypeData, node_id]);

  const handleOpenModal = () => {
    setSelectedNode({
      id: node_id || data.id,
      type: "emailNode",
      options: data,
    });
    setActiveModal("email-settings");
  };

  return (
    <Box onClick={handleOpenModal} cursor="pointer">
      <Handle type="target" position={Position.Left} />
      <VStack
        gap={0}
        align="stretch"
        bg="white"
        borderRadius="md"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
      >
        <HStack justify="space-between" p={3}>
          <HStack>
            <Box display="flex" alignItems="center" justifyContent="center">
              <span className="node-header-icon">
                {/* <EmailIconSvg /> */}
                emailIcon
              </span>
            </Box>
            <UiText fontWeight="bold" variant="body">
              {label}
            </UiText>
          </HStack>
          <Box display="flex" alignItems="center">
            <UiBadge status={enabled ? "success" : "pending"}>
              {enabled ? "Active" : "Inactive"}
            </UiBadge>
          </Box>
        </HStack>
        <Box p={3} borderTop="1px solid" borderColor="gray.100">
          <Box textAlign="left" display="flex" alignItems="center" mb={1}>
            {subject ? (
              <Box>
                <UiText fontWeight="bold" variant="caption">
                  {subject}
                </UiText>
              </Box>
            ) : (
              <HStack
                align="center"
                justify="center"
                gap={1}
                textAlign="center"
                width="100%"
              >
                <Tooltip
                  content={
                    <Box>
                      <VStack align="start">
                        <UiText variant="subheading">Invalid Content</UiText>
                        <UiText variant="body">Subject is Empty</UiText>
                      </VStack>
                    </Box>
                  }
                >
                  <Box width="19px">
                    <Icon as={HelpCircle} color="blue.500" />
                  </Box>
                </Tooltip>
                <UiText variant="body">No Subject</UiText>
              </HStack>
            )}
          </Box>
          <Box textAlign="left" py={1}>
            <UiText variant="caption">{preview_text}</UiText>
          </Box>
          <Box p={2} bg="gray.50" borderRadius="md" mt={2}>
            <SimpleGrid columns={2} gap={2}>
              {[
                {
                  label: "Clicks",
                  value: commaFormatting(filteredData[0]?.click),
                },
                {
                  label: "Opened",
                  value: commaFormatting(filteredData[0]?.open),
                },
                {
                  label: "Orders Count",
                  value: commaFormatting(filteredData[0]?.orders_count),
                },
                {
                  label: "Revenue",
                  value: commaFormatting(filteredData[0]?.revenue),
                  // shopCurrencySymbol +
                  // " " +
                },
                {
                  label: "Unsubscribed",
                  value: commaFormatting(filteredData[0]?.unsubscribed),
                },
              ].map(({ label, value }, idx) => {
                return (
                  <Box key={idx} display="flex" flexDirection="column">
                    <UiText variant="caption">{label}</UiText>
                    <UiText variant="body" fontWeight="bold">
                      {value}
                    </UiText>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        </Box>
      </VStack>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

export default EmailNode;
