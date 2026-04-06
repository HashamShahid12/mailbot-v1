import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from "../../dropdown";

const timeOptions = [
  { label: "All channels", value: "all" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
];

export const ChannelDropDown = () => {
  const [selected, setSelected] = useState(["all"]);

  return (
    <FlexibleDropdown
      label={
        timeOptions.find((opt) => opt.value === selected[0])?.label || "Select"
      }
      selectedValues={selected}
      onChange={(val) => setSelected(val)}
      buttonWidth="16rem"
      buttonHeight="35px"
    >
      <Flex direction="column">
        {timeOptions.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <Box
              key={opt.value}
              cursor="pointer"
              px={3}
              py={1}
              bg={isSelected ? "#E3F7FF" : "transparent"}
              borderLeft={isSelected ? "4px solid #2972BB" : "transparent"}
              fontWeight={isSelected ? "semibold" : "normal"}
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "blue.100" }}
              onClick={() => setSelected([opt.value])}
            >
              {opt.label}
            </Box>
          );
        })}
      </Flex>
    </FlexibleDropdown>
  );
};
