import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from "../dropdown";
import Checkbox from "../check-box";
import SearchBar from "../search-bar";

const statusOptions = [
  { label: "Tag", value: "tag" },
  { label: "Tag", value: "tag2" },
];

export const TagsDropdown = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const selectedLabels = statusOptions
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayLabel =
    selected.length === 0
      ? "Tags"
      : selected.length === 1
      ? selectedLabels[0]
      : `${selectedLabels[0]}, +${selected.length - 1}`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      buttonWidth="80px"
      buttonHeight="30px"
      border="sm"
      borderColor="blackAlpha.100"
      boxShadow="none"
      borderStyle="dotted"
      background="transparent !important"
    >
      <Box p="3">
        <SearchBar placeholder="Select tags" />
      </Box>
      <Flex
        direction="column"
        bg="gray.200"
        borderTop="sm"
        borderColor="gray.300"
      >
        {statusOptions.map((status) => (
          <Checkbox
            key={status.value}
            outline="none"
            p="3"
            _checked={{ bg: "blue.400", color: "blue.100" }}
            cursor="button"
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
