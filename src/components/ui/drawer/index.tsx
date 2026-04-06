import type { DrawerWrapperProps } from "@/types/drawer-props";
import type React from "react";
import {
  Flex,
  Drawer as ChakraDrawer,
  CloseButton,
  Portal,
} from "@chakra-ui/react";

export const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  placement = "end",
  height,
}) => {
  const isVertical = placement === "top" || placement === "bottom";
  return (
    <ChakraDrawer.Root
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      placement={placement}
    >
      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content
            minW={isVertical ? undefined : "lg"}
            h={isVertical ? height ?? "93vh" : "100%"}
          >
            <ChakraDrawer.Header
              p="7"
              position="relative"
              borderBottom="1px solid #EAEDEF"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="full"
              >
                {typeof title === "string" ? (
                  <ChakraDrawer.Title fontSize="xl" fontWeight="semibold">
                    {title}
                  </ChakraDrawer.Title>
                ) : (
                  title
                )}
                <ChakraDrawer.CloseTrigger asChild>
                  <CloseButton
                    position="absolute"
                    right="5"
                    transform="translateY(-50%)"
                    top="50%"
                  />
                </ChakraDrawer.CloseTrigger>
              </Flex>
            </ChakraDrawer.Header>

            <ChakraDrawer.Body>{children}</ChakraDrawer.Body>

            {footer && (
              <ChakraDrawer.Footer
                display="flex"
                justifyContent="flex-start"
                gap="2"
                padding="1.5rem"
                borderTop="1px solid #EAEDEF"
              >
                {footer}
              </ChakraDrawer.Footer>
            )}
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
};
