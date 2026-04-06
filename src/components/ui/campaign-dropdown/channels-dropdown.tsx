import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Checkbox from "../check-box";
import { FlexibleDropdown } from "../dropdown";

interface ChannelDropdownProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const statusOptions = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Push", value: "push" }
];

export const ChannelDropdown = ({ selected, onChange }: ChannelDropdownProps) => {
  const handleToggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const selectedLabels = statusOptions
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayLabel =
    selected.length === 0
      ? "Channels"
      : selected.length === 1
      ? selectedLabels[0]
      : `${selectedLabels[0]}, +${selected.length - 1}`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      menuWidth="8rem"
      buttonWidth="110px"
      buttonHeight="30px"
      background="transparent !important"
      border="2px dotted !important"
      borderColor="#939495 !important"
    >
      <Flex direction="column" gap={2} p={3}>
        {statusOptions.map((status) => (
          <Checkbox
            key={status.value}
            label={status.label}
            value={status.value}
            checked={selected.includes(status.value)}
            onCheckedChange={() => handleToggle(status.value)}
          />
        ))}
      </Flex>
    </FlexibleDropdown>
  );
};
