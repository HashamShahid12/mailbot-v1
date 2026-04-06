import React from "react";
import { Box } from "@chakra-ui/react";
import type { TableNameProps } from "@/types/table-name-props";
import UiTextLink from "../text-link";

export const TableName: React.FC<TableNameProps> = ({ row, col }) => {
  const isMail = row.type === "mail";
  const tooltipLabel = isMail ? "Mail" : "SMS";

  return (
    <>
      <UiTextLink value={row[col.key]} href="#" />
      {row.subtitle && (
        <Box fontSize="xs" color="gray.400">
          {row.subtitle} {tooltipLabel}
        </Box>
      )}
    </>
  );
};
