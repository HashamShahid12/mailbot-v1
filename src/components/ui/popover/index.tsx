import type { PopoverMenuProps } from "@/types/popover-menu-props";
import { Popover, Portal, Box } from "@chakra-ui/react";
import type React from "react";

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  trigger,
  children,
  placement = "bottom-end",
  contentProps = {},
  isOpen,
  onOpenChange,
}) => {
  return (
    <Popover.Root
      positioning={{ placement }}
      open={isOpen}
      onOpenChange={({ open }) => onOpenChange?.(open)}
    >
      <Popover.Trigger asChild cursor="button">
        {trigger}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            transition="none"
            border="sm"
            borderColor="gray.300"
            borderRadius="sm"
            overflow="hidden"
            w="fit"
            bg="white"
            boxShadow="xl"
            color="black"
            _dark={{ bg: "gray.900" }}
            {...contentProps}
          >
            <Popover.Body>
              <Box>{children}</Box>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
export default PopoverMenu;
