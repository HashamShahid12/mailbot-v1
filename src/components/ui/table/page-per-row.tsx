import React, { useState } from "react";
import { Button, VStack, Box, Icon } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import PopoverMenu from "../popover";
import type { PagePerRowProps } from "@/types/page-per-row-props";

const PagePerRow: React.FC<PagePerRowProps> = ({
  pageSize,
  setPageSize,
  setCurrentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt="4"
    >
      <PopoverMenu
        trigger={
          <Button
            size="sm"
            border="sm"
            borderColor="gray.300"
            p="3"
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
          >
            Show {pageSize}{" "}
            <Icon
              as={isOpen ? FiChevronUp : FiChevronDown}
              boxSize="6"
              pt="1"
              color="black"
            />
          </Button>
        }
      >
        <VStack align="start" gap="0">
          {[10, 25, 50].map((size) => (
            <Button
              key={size}
              borderRadius="0"
              border="none"
              size="sm"
              borderLeft={pageSize === size ? "md" : "none"}
              borderColor={pageSize === size ? "blue.100" : "none"}
              variant={pageSize === size ? "solid" : "ghost"}
              color={pageSize === size ? "blue.100" : "black"}
              px="3"
              backgroundColor={pageSize === size ? "blue.400" : "ghost"}
              justifyContent="flex-start"
              _focus={{ outline: "none" }}
              onClick={() => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            >
              Show {size}
            </Button>
          ))}
        </VStack>
      </PopoverMenu>
    </Box>
  );
};

export default PagePerRow;
