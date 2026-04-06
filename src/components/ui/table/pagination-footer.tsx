import type { TablePaginationFooterProps } from "@/types/table-pagination-footer-props";
import { Flex, Text, ButtonGroup, Button } from "@chakra-ui/react";
import type React from "react";

export const TablePaginationFooter: React.FC<TablePaginationFooterProps> = ({
  currentPage,
  totalPages,
  goToPrevious,
  goToNext,
}) => {
  return (
    <Flex mt="4" alignItems="center" gap="4">
      <Text fontSize="sm" color="gray.400">
        Page {currentPage} of {totalPages}
      </Text>
      <ButtonGroup size="sm" attached variant="plain">
        <Button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          Prev
        </Button>
        <Button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

/////////// use as a props in tabel
//  <TablePaginationFooter
//         pagination={pagination}
//         currentPage={currentPage}
//         totalPages={totalPages}
//         goToPrevious={goToPrevious}
//         goToNext={goToNext}
//       />
