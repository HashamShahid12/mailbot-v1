import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MinusIcon } from "lucide-react";
import { Tooltip } from "../tooltip";
import type { TablePercentChangeProps } from "@/types/table-percent-change-props";

export const TablePercentChange: React.FC<TablePercentChangeProps> = ({
  value,
  tooltip = "0 from prior period",
}) => {
  return (
    <Tooltip
      showArrow
      placement="top"
      content={
        <Box>
          <Text fontWeight="semibold">{tooltip}</Text>
        </Box>
      }
      contentProps={{
        borderRadius: "md",
        px: 3,
        py: 3,
        textAlign: "center",
        lineHeight: "1.5rem",
      }}
    >
      <Flex
        bg="gray.600"
        borderRadius="xl"
        maxW="fit-content"
        align="center"
        justify="end"
        px="1"
        ml="auto"
      >
        <Icon as={MinusIcon} color="currentColor" boxSize="4" />
        {value}
      </Flex>
    </Tooltip>
  );
};
