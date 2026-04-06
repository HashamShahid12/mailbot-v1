import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from "../dropdown";
import Checkbox from "../check-box";

interface StatusDropdownProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

const statusOptions = [
  { label: "Sent", value: "sent" },
  { label: "Scheduled", value: "schedule" },
  { label: "Draft", value: "draft" },
  { label: "Cancelled", value: "cancelled" },
];

export const StatusDropdown = ({ selected, onChange }: StatusDropdownProps) => {
  const handleToggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const selectedLabels = statusOptions
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayLabel =
    selected.length === 0
      ? "Status"
      : selected.length === 1
        ? selectedLabels[0]
        : `${selectedLabels[0]}, +${selected.length - 1}`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      menuWidth="9rem"
      buttonWidth="100px"
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
