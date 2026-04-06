import type { ToggleButtonProps } from "@/types/toggle-buuton-props";
import { RadioGroup, Icon, Text } from "@chakra-ui/react";
import type React from "react";

const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  label,
  ...props
}) => {
  return (
    <RadioGroup.Item
      {...props}
      px={4}
      py={2}
      display="flex"
      alignItems="center"
      gap={2}
      rounded="md"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      cursor="pointer"
      _checked={{
        bg: "white",
        borderColor: "gray.300",
        shadow: "sm",
      }}
    >
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator>
        <Icon as={icon.type} boxSize={4} />
      </RadioGroup.ItemIndicator>
      <RadioGroup.ItemText>
        <Text fontSize="sm" fontWeight="medium">
          {label}
        </Text>
      </RadioGroup.ItemText>
    </RadioGroup.Item>
  );
};

export default ToggleButton;
