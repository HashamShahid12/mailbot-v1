import type { TableActiveSiteProps } from "@/types/table-activesite-props";
import React from "react";
import { Box } from "@chakra-ui/react";

const TableActiveSite: React.FC<TableActiveSiteProps> = ({
  value,
  subtitle,
}) => {
  return (
    <>
      {value}
      {subtitle && (
        <Box fontSize="xs" color="gray.400">
          {subtitle}
        </Box>
      )}
    </>
  );
};

export default TableActiveSite;
