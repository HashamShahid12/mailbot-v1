import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { MailIcon, MessageSquareTextIcon } from "lucide-react";
import { Tooltip } from "../tooltip";
import type { TableTypeProps } from "@/types/table-type-props";

export const TableType: React.FC<TableTypeProps> = ({ type }) => {
  const isMail = type === "mail";
  const icon = isMail ? MailIcon : MessageSquareTextIcon;
  const tooltipLabel = isMail ? "Mail" : "SMS";

  return (
    <Tooltip
      showArrow
      placement="top"
      content={<Text fontWeight="semibold">{tooltipLabel}</Text>}
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
        justify="start"
        p="1"
        gap="1"
        
      >
        <Icon as={icon} color="currentColor" _dark={{ color: "gray.900" }} boxSize="4.5" />
      </Flex>
    </Tooltip>
  );
};
