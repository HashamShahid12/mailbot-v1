import {
  Stack,
  Icon,
  RadioGroup,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { UseRadioGroupProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { UiText } from "../text";
import { UiBadge } from "../badge";
type Option = {
  value: string;
  label: string;
  description?: string | React.ReactNode;
  icon?: React.ElementType;
  badge?: string;
  link?: { text: string; href: string };
};
interface SelectableCardGroupProps extends Partial<UseRadioGroupProps> {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}
export function SelectableCardGroup({
  value,
  onChange,
  options,
  ...rest
}: SelectableCardGroupProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={(details) => {
        if (details.value) onChange(details.value);
      }}
      {...rest}
    >
      <Stack gap={2}>
        {options.map((opt) => {
          const isActive = selectedOption === opt.value;
          return (
            <RadioGroup.Item
              key={opt.value}
              value={opt.value}
              borderWidth={isActive ? "3px" : "1px"}
              colorPalette="blue.200"
              borderColor={isActive ? "blue.200" : "blackAlpha.100"}
              _hover={!isActive ? { borderColor: "blue.200" } : undefined}
              _dark={{
                bg: isActive ? "blue.900" : "gray.800",
                borderColor: isActive ? "blue.400" : "gray.700",
              }}
              borderRadius="md"
              p="4"
              mb="3"
              cursor="button"
              _focus={{ outline: "none" }}
              onClick={() => setSelectedOption(opt.value)}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator
                cursor="button"
                _focus={{ outline: "none" }}
                borderColor={isActive ? "blue.200" : "blackAlpha.100"}
                color="white"
                bg={isActive ? "blue.200" : "white"}
              />
              <RadioGroup.ItemText width="full">
                <Flex direction="column" gap="1">
                  <Flex gap={2}>
                    {opt.icon && <Icon as={opt.icon} boxSize={5} />}
                    <UiText fontWeight="semibold">{opt.label}</UiText>
                    {opt.badge && (
                      <UiBadge status="pending" showIcon={false}>
                        {opt.badge}
                      </UiBadge>
                    )}
                  </Flex>
                  {opt.description && (
                    <UiText color="gray.400" pl={opt.icon ? "7" : "0"}>
                      {opt.description}
                    </UiText>
                  )}
                  {opt.link && (
                    <ChakraLink
                      href={opt.link.href}
                      fontSize="sm"
                      color="blue.200"
                      _hover={{ textDecoration: "underline" }}
                      pl={6}
                      mt={1}
                    >
                      {opt.link.text}
                    </ChakraLink>
                  )}
                </Flex>
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          );
        })}
      </Stack>
    </RadioGroup.Root>
  );
}
