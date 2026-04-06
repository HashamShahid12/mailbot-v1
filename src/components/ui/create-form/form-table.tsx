import { TableStatus } from "@/components/ui/table/table-status";
import { TableType } from "@/components/ui/table/table-type";
import type { Column } from "@/types/table-props";
import type { FormTableRow } from "@/types/user-type";
import { Box, Text } from "@chakra-ui/react";

export const formTableColumns: Column<FormTableRow>[] = [
  {
    key: "name",
    header: "Form name",
    width: "30%",
    cell: (row) => (
      <Box>
        <Text fontWeight="medium" color="blue.500">
          {row.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {row.description}
        </Text>
      </Box>
    ),
  },
  {
    key: "type",
    header: "Type",
    width: "10%",
    cell: (row) => <TableType type={row.type} />,
  },
  {
    key: "status",
    header: "Status",
    width: "10%",
    cell: (row) => <TableStatus status={row.status} />,
  },
  {
    key: "submitted",
    header: "Submitted",
    width: "10%",
    cell: (row) => row.submitted ?? "-",
  },
  {
    key: "submitRate",
    header: "Submit rate",
    width: "10%",
    cell: (row) => row.submitRate ?? "-",
  },
  {
    key: "performance",
    header: "Performance",
    width: "10%",
    cell: (row) => row.performance ?? "-",
  },
  {
    key: "revenue",
    header: "Total revenue",
    width: "10%",
    cell: (row) => row.revenue ?? "-",
  },
  {
    key: "actions",
    header: "",
    width: "5%",
    cell: () => (
      <button style={{ background: "none", border: "none", cursor: "pointer" }}>
        ⋮
      </button>
    ),
  },
];
