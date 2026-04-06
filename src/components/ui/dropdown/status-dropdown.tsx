import type { StatusDropdownProps } from "@/types/status-dropdown-props";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from ".";
import { UiText } from "../text";

const defaultOptions = [
  { label: "Live", value: "live" },
  { label: "Manual", value: "manual" },
  { label: "Draft", value: "draft" },
];

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  selected,
  onChange,
  menuWidth,
  buttonWidth = "fit",
  label,
  borderStyle = "dashed",
  options,
}) => {
  const finalOptions = options ?? defaultOptions;
  const displayLabel =
    selected !== null && selected !== undefined
      ? finalOptions.find((s) => s.value === selected)?.label
      : label ?? "Status";

  const handleSelect = (value: string) => {
    onChange(selected === value ? null : value);
  };

  return (
    <FlexibleDropdown
      label={displayLabel}
      menuWidth={!menuWidth ? "fit" : menuWidth}
      buttonWidth={buttonWidth}
      borderColor="blackAlpha.100"
      boxShadow="none"
      borderStyle={borderStyle}
    >
      <Flex
        direction="column"
        border="sm"
        borderRadius="md"
        borderColor="gray.300"
      >
        {finalOptions.map((status) => (
          <UiText
            key={status.value}
            cursor="button"
            px="4"
            py="2"
            bg={selected === status.value ? "blue.400" : "transparent"}
            borderLeft={selected === status.value ? "lg" : "transparent"}
            borderColor="blue.200"
            color={selected === status.value ? "blue.100" : "current"}
            _hover={{ bg: "gray.100", cursor: "button" }}
            fontWeight={selected === status.value ? "bold" : "normal"}
            onClick={() => handleSelect(status.value)}
          >
            {status.label}
          </UiText>
        ))}
      </Flex>
    </FlexibleDropdown>
  );
};
