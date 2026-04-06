import type React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Collapsible } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { CollapsibleIcon } from "@/components/ui/collapsible-icon";
import type { SegmentToggleTriggerProps } from "@/types/list-and-segment-toggler-trigger-props";

export const ListAndSegmentToggleTrigger: React.FC<
  SegmentToggleTriggerProps
> = ({ isExpanded, onToggle }) => {
  return (
    <Box as="span" display="inline-flex">
      <Collapsible.Root open={isExpanded} onOpenChange={onToggle}>
        <Collapsible.Trigger>
          <Tooltip
            showArrow
            placement="top"
            content={
              <Text fontWeight="semibold">
                {isExpanded ? "Hide details" : "Show details"}
              </Text>
            }
            contentProps={{
              borderRadius: "md",
              px: 3,
              py: 3,
              textAlign: "center",
              lineHeight: "1.5rem",
            }}
          >
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              p="1"
              bg="white"
              borderRadius="md"
              _hover={{ bg: "gray.300", cursor: "pointer" }}
            >
              <Icon
                as={CollapsibleIcon}
                boxSize="8"
                transform={isExpanded ? "rotate(180deg)" : "none"}
                transition="transform 0.2s"
              />
            </Box>
          </Tooltip>
        </Collapsible.Trigger>
      </Collapsible.Root>
    </Box>
  );
};
