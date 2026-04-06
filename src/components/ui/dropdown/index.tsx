import React, { useState } from "react";
import type { FlexibleDropdownProps } from "@/types/flexible-drpdown-props";
import { ChevronDown } from "lucide-react";
import {
  Menu,
  Portal,
  Button,
  MenuPositioner,
  MenuTrigger,
  MenuContent,
  Checkbox,
  Flex,
  Icon,
  Box,
} from "@chakra-ui/react";

export const FlexibleDropdown: React.FC<FlexibleDropdownProps> = ({
  label,
  options = [],
  selectedValues = [],
  onChange,
  children,
  menuWidth = "2xs",
  boxShadow = "sm",
  buttonWidth = "2xs",
  borderStyle = "normal",
  buttonHeight,
  border,
  flex,
  borderColor,
  background,
  icon,
  menuPadding,
  isOpen,
  onOpen,
  onClose,
  usePortal = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const handleOpenChange = ({ open }: { open: boolean }) => {
    if (isOpen === undefined) {
      setInternalOpen(open);
    }
    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleToggle = (value: string) => {
    if (!onChange) return;
    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updated);
  };

  return (
    <Menu.Root open={open} onOpenChange={handleOpenChange}>
      <MenuTrigger bg="white" rounded="md" asChild _dark={{ bg: "gray.900" }}>
        <Button
          background={background || "white"}
          border={border || "sm"}
          boxShadow={boxShadow}
          borderColor={borderColor || "gray.200"}
          borderStyle={borderStyle}
          w={buttonWidth}
          h={buttonHeight}
          flex={flex}
          variant="outline"
          size="sm"
          px="3"
          py="5"
          justifyContent="space-between"
          _focus={{ outline: "none" }}
          _hover={{ borderColor: "blue.200" }}
        >
          <Flex align="center" gap={2}>
            {icon && <Icon as={icon.type} boxSize="6" color="gray.700" />}
            <Box>{label}</Box>
          </Flex>
          <Icon
            as={ChevronDown}
            boxSize="6"
            transition="transform 0.2s ease"
            transform={open ? "rotate(180deg)" : "rotate(0deg)"}
          />
        </Button>
      </MenuTrigger>
      {usePortal ? (
        <Portal>
          <MenuPositioner w={menuWidth === "full" ? "94%" : "auto"}>
            <MenuContent w={menuWidth} padding={menuPadding} zIndex="2000">
              {children ? (
                children
              ) : (
                <Flex direction="column" gap="2">
                  {options.map((opt) => (
                    <Checkbox.Root
                      key={opt.value}
                      checked={selectedValues.includes(opt.value)}
                      onCheckedChange={() => handleToggle(opt.value)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>{opt.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </Flex>
              )}
            </MenuContent>
          </MenuPositioner>
        </Portal>
      ) : (
        <MenuPositioner w={menuWidth === "full" ? "94%" : "auto"}>
          <MenuContent w={menuWidth} padding={menuPadding} zIndex="2000">
            {children ? (
              children
            ) : (
              <Flex direction="column" gap="2">
                {options.map((opt) => (
                  <Checkbox.Root
                    key={opt.value}
                    checked={selectedValues.includes(opt.value)}
                    onCheckedChange={() => handleToggle(opt.value)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label>{opt.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Flex>
            )}
          </MenuContent>
        </MenuPositioner>
      )}
    </Menu.Root>
  );
};
