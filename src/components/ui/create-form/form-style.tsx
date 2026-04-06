import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  //   Divider,
} from "@chakra-ui/react";
import { FlexibleDropdown } from "../dropdown"; // your existing dropdown component
import Checkbox from "../check-box";

const typeOptions = [
  { label: "Popup", value: "popup" },
  { label: "Embed", value: "embed" },
  { label: "Full page", value: "fullpage" },
  { label: "Flyout", value: "flyout" },
  { label: "Banner", value: "banner" },
];

const stepOptions = [
  { label: "Single step", value: "single" },
  { label: "Multi-step", value: "multi" },
];

export const FormStyleDropdown = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const displayLabel =
    selectedTypes.length + selectedSteps.length === 0
      ? "Form style"
      : `${selectedTypes[0] || selectedSteps[0]}, +${
          selectedTypes.length + selectedSteps.length - 1
        }`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      menuWidth="150px"
      buttonWidth="120px"
      buttonHeight="30px"
      background="transparent !important"
      border="1px dashed #939495"
    >
      <Flex direction="column" gap={3} p={3}>
        {/* Type Section */}
        <Box>
          <Text fontSize="xs" fontWeight="semibold" mb={2}>
            Type
          </Text>
          <Flex direction="column" gap={2}>
            {typeOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={selectedTypes.includes(opt.value)}
                label={opt.label}
                onChange={() =>
                  toggleSelection(opt.value, selectedTypes, setSelectedTypes)
                }
              />
            ))}
          </Flex>
        </Box>

        {/* <Divider /> */}

        {/* Steps Section */}
        <Box>
          <Text fontSize="xs" fontWeight="semibold" mb={2}>
            Steps
          </Text>
          <Flex direction="column" gap={2}>
            {stepOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={selectedSteps.includes(opt.value)}
                label={opt.label}
                onChange={() =>
                  toggleSelection(opt.value, selectedSteps, setSelectedSteps)
                }
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </FlexibleDropdown>
  );
};
